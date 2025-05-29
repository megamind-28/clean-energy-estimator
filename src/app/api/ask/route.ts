import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { question } = await req.json();
  console.log('ENV KEY:', process.env.OPENAI_API_KEY);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert on solar energy and savings. Be helpful, clear, and concise.',
        },
        {
          role: 'user',
          content: question,
        },
      ],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  console.log('[OpenAI Response]', JSON.stringify(data, null, 2));
  
  const answer = data.choices?.[0]?.message?.content || 'No response from AI.';
  

  return NextResponse.json({ answer });
}
