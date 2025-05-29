'use client';
import { useState } from 'react';
import axios from 'axios';

export default function AiExplainer() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const askAI = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAnswer('');

    try {
      const res = await axios.post('/api/ask', { question });
      setAnswer(res.data.answer.trim());
    } catch (err) {
      setAnswer('Something went wrong. Try again!');
    }

    setLoading(false);
  };

  return (
    <div className="mt-10 bg-white p-6 rounded-xl shadow max-w-md w-full">
      <h2 className="text-xl font-bold mb-4 text-center">Ask AI About Solar</h2>
      <form onSubmit={askAI}>
        <textarea
          rows={3}
          className="w-full p-2 border border-gray-300 rounded mb-3"
          placeholder="Ask anything about solar..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Thinking...' : 'Ask AI'}
        </button>
      </form>
      {answer && (
        <div className="mt-4 p-3 border border-green-300 rounded bg-green-50 text-sm">
          {answer}
        </div>
      )}
    </div>
  );
}
