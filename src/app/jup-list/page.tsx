"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function page() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://quote-api.jup.ag/v6');
      setQuotes(response.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Quote</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote, index) => (
            <tr key={index}>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
