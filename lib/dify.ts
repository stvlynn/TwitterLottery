import type { DifyResponse, Winner, DifyInputs, TweetUrlInputs, KeywordInputs } from './types';

const DIFY_API_KEY = process.env.NEXT_PUBLIC_DIFY_API_TOKEN;
const DIFY_BASE_URL = process.env.NEXT_PUBLIC_DIFY_BASE_URL || 'https://api.dify.ai/v1';

if (!DIFY_API_KEY) {
  console.error('NEXT_PUBLIC_DIFY_API_TOKEN is not set');
}

if (!DIFY_BASE_URL) {
  console.error('NEXT_PUBLIC_DIFY_BASE_URL is not set');
}

function parseWinners(response: any): Winner[] {
  console.log('API Response:', response);
  
  if (!response?.data?.outputs?.result) {
    console.error('Invalid response format:', response);
    return [];
  }

  return response.data.outputs.result.map((item: string) => {
    const [id, name] = item.split(':').map(s => s.replace(/"/g, ''));
    return { id, name };
  });
}

function extractUserFromTweetUrl(url: string): string {
  const match = url.match(/(?:twitter\.com|x\.com)\/([^/]+)/);
  return match ? match[1] : '';
}

export async function runLotteryWorkflow(inputs: DifyInputs): Promise<Winner[]> {
  if (!DIFY_API_KEY || !DIFY_BASE_URL) {
    throw new Error('Dify API configuration is missing');
  }

  try {
    const response = await fetch(`${DIFY_BASE_URL}/workflows/run`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DIFY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: {
          ...inputs,
          lang: navigator.language,
        },
        response_mode: 'blocking',
        user: 'user',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data: DifyResponse = await response.json();
    
    if (data.data.error) {
      throw new Error(data.data.error);
    }

    return parseWinners(data);
  } catch (error) {
    console.error('Error running lottery workflow:', error);
    throw error;
  }
};

export async function runTweetUrlLottery(
  tweetUrl: string,
  num: number,
): Promise<Winner[]> {
  const user = extractUserFromTweetUrl(tweetUrl);
  console.log('Running tweet URL lottery with:', { tweetUrl, num, user });
  
  const inputs: TweetUrlInputs = {
    type: 'tweet_url',
    tweet_url: tweetUrl,
    lang: navigator.language,
    num: num.toString(),
  };

  return runLotteryWorkflow(inputs);
}

export async function runKeywordLottery(
  keyword: string,
  twitterId: string,
  winnerCount: number,
): Promise<Winner[]> {
  console.log('Running keyword lottery with:', { keyword, twitterId, winnerCount });
  
  const inputs: KeywordInputs = {
    type: 'keyword',
    keyword,
    twitter_id: twitterId,
    lang: navigator.language,
    num: winnerCount.toString(),
  };

  return runLotteryWorkflow(inputs);
}