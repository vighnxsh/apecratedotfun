"use client"
import React, { useEffect, useState } from 'react';
import { TokenProfile } from '@/types/TokenProfile';
import axios from 'axios';

export default function TokenProfilesPage() {
  const [tokenProfiles, setTokenProfiles] = useState<TokenProfile[]>([]);
  const [tokenPrices, setTokenPrices] = useState<{ [tokenAddress: string]: any }>({});
  const [selectedToken, setSelectedToken] = useState<TokenProfile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://api.dexscreener.com/token-profiles/latest/v1');
      const data = response.data;
      // Filter the data to show only profiles with chainId 'solana'
      const solanaProfiles = data.filter((profile: TokenProfile) => profile.chainId === 'solana');
      setTokenProfiles(solanaProfiles);
      // Log the token addresses
      solanaProfiles.forEach(profile => console.log(profile.tokenAddress));
    };

    fetchData();
  }, []);

  const handleTokenClick = async (profile: TokenProfile) => {
    setSelectedToken(profile);
    const priceResponse = await axios.get(`https://api.dexscreener.com/latest/dex/tokens/${profile.tokenAddress}`);
    const priceData = priceResponse.data;
    setTokenPrices(prevState => ({ ...prevState, [profile.tokenAddress]: priceData }));
  };

  return (
    <div className="container mx-auto p-4 mt-10 bg-black text-white">
      <h1 className="text-2xl font-bold mb-4">Solana Token Profiles</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-gray-800">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2">Chain ID</th>
              <th className="px-4 py-2">Token Address</th>
              <th className="px-4 py-2">Icon</th>
              <th className="px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {tokenProfiles.map((profile) => (
              <tr key={profile.tokenAddress} className="bg-gray-700 border-b border-gray-600" onClick={() => handleTokenClick(profile)}>
                <td className="px-4 py-2">{profile.chainId}</td>
                <td className="px-4 py-2">{profile.tokenAddress}</td>
                <td className="px-4 py-2">
                  {profile.icon ? <img src={profile.icon} alt="Icon" className="w-10 h-10" /> : 'N/A'}
                </td>
                <td className="px-4 py-2">{profile.description ? profile.description : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedToken && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md w-1/2">
            <h2 className="text-lg font-bold mb-2">{selectedToken.name}</h2>
            <p>Token Address: {selectedToken.tokenAddress}</p>
            <p>Price: {tokenPrices[selectedToken.tokenAddress] ? tokenPrices[selectedToken.tokenAddress].price : 'N/A'}</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setSelectedToken(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
