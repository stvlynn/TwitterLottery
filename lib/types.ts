export type Winner = {
  id: string;
  name: string;
};

export type LotteryMode = 'tweet_url' | 'keyword';

export type BaseLotteryInputs = {
  type: LotteryMode;
  num: string;
  lang: string;
};

export type TweetUrlInputs = BaseLotteryInputs & {
  type: 'tweet_url';
  tweet_url: string;
};

export type KeywordInputs = BaseLotteryInputs & {
  type: 'keyword';
  keyword: string;
  twitter_id: string;
};

export type DifyInputs = TweetUrlInputs | KeywordInputs;

export type DifyResponse = {
  task_id: string;
  workflow_run_id: string;
  data: {
    id: string;
    workflow_id: string;
    status: string;
    outputs: {
      result: string[];
    };
    error: string | null;
    elapsed_time: number;
    total_tokens: number;
    total_steps: number;
    created_at: number;
    finished_at: number;
  };
};
