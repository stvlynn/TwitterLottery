import type { Winner } from './types';

type ShareContent = {
  text: string;
  language: string;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://twitter-lottery.com';

const getShareContent = (winners: Winner[]): ShareContent => {
  // Get browser language
  const lang = typeof navigator !== 'undefined' 
    ? navigator.language.toLowerCase() 
    : 'en';

  const winnerMentions = winners
    .map(winner => `@${winner.userId}`)
    .join(' ');

  // Chinese content
  if (lang.startsWith('zh')) {
    return {
      text: `🎉 恭喜以下用户中奖！\n${winnerMentions}\n\n通过 Twitter Lottery 抽奖 ${SITE_URL}`,
      language: 'zh'
    };
  }
  
  // Japanese content
  if (lang.startsWith('ja')) {
    return {
      text: `🎉 当選おめでとうございます！\n${winnerMentions}\n\nTwitter Lottery で抽選 ${SITE_URL}`,
      language: 'ja'
    };
  }
  
  // Default English content
  return {
    text: `🎉 Congratulations to the winners!\n${winnerMentions}\n\nDrawn by Twitter Lottery ${SITE_URL}`,
    language: 'en'
  };
};

export const shareToTwitter = (winners: Winner[]) => {
  const { text } = getShareContent(winners);
  const encodedText = encodeURIComponent(text);
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
  window.open(twitterUrl, '_blank');
};
