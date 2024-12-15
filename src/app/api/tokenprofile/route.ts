import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { TokenProfile } from '@/types/TokenProfile'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TokenProfile[] | { message: string }>
) {
  try {
    const response = await axios.get('https://api.dexscreener.com/token-profiles/latest/v1')
    
    // Ensure we always return an array
    const tokenProfiles = Array.isArray(response.data) 
      ? response.data 
      : [response.data]

    res.status(200).json(tokenProfiles)
  } catch (error) {
    console.error('Error fetching token profiles:', error)
    res.status(500).json({ message: 'Failed to fetch token profiles' })
  }
}