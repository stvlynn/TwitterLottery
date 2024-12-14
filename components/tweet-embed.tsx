'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    twttr: any;
  }
}

interface TweetEmbedProps {
  tweetUrl: string;
}

export function TweetEmbed({ tweetUrl }: TweetEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    const loadTweet = () => {
      if (!containerRef.current) return;
      
      // 清除容器内容
      containerRef.current.innerHTML = '';

      if (window.twttr) {
        window.twttr.widgets.createTweet(
          tweetUrl.split('/').pop()!,
          containerRef.current,
          {
            theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
            width: '100%',
          }
        );
      }
    };

    if (!scriptLoadedRef.current) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.onload = () => {
        scriptLoadedRef.current = true;
        loadTweet();
      };
      document.head.appendChild(script);
    } else {
      loadTweet();
    }
  }, [tweetUrl]);

  return <div ref={containerRef} className="w-full" />;
}
