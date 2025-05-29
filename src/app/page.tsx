'use client';
import { useState } from 'react';

export default function Home() {
  const [zip, setZip] = useState('');
  const [bill, setBill] = useState('');
  const [provider, setProvider] = useState('');
  const [savings, setSavings] = useState<null | { annual: number; solar: number }>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const monthly = parseFloat(bill);
    const annual = monthly * 12;
    const solar = annual * 0.3; // assume 30% solar savings
    setSavings({ annual, solar });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Clean Energy Savings Estimator</h1>

        <input
          type="text"
          placeholder="ZIP Code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-3"
        />
        <input
          type="number"
          placeholder="Monthly Electricity Bill ($)"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-3"
        />
        <input
          type="text"
          placeholder="Utility Provider"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Estimate Savings
        </button>

        {savings && (
          <div className="mt-6 text-center">
            <p className="text-gray-700 font-medium">
              Annual Electricity Cost: <span className="font-bold">${savings.annual.toFixed(2)}</span>
            </p>
            <p className="text-green-700 font-medium mt-2">
              Estimated Solar Savings: <span className="font-bold">${savings.solar.toFixed(2)}</span>
            </p>
          </div>
        )}
      </form>
    </main>
  );
}

