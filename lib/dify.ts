import { extractTwitterUsername } from '@/lib/utils/url';
import { DifyResponse } from './types';

export async function runLotteryWorkflow(tweetUrl: string, num: number) {
  const user = extractTwitterUsername(tweetUrl);
  const lang = navigator.language || 'en-US';

  const response = await fetch(`${process.env.NEXT_PUBLIC_DIFY_BASE_URL}/workflows/run`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DIFY_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: {
        tweet_url: tweetUrl,
        lang,
        num,
      },
      response_mode: 'blocking',
      user,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to run lottery');
  }

  const data: DifyResponse = await response.json();
  
  if (data.data.error) {
    throw new Error(data.data.error);
  }

  return data.data.outputs.result.map(winner => {
    const [userName, userId] = winner.replace(/"/g, '').split(':');
    return { userName, userId };
  });
}