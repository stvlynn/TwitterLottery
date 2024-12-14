'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export function ConfettiEffect() {
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    // 创建一个间隔来发射礼花
    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      // 随机位置发射礼花
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { 
          x: Math.random(),
          y: Math.random() - 0.2
        },
        colors: ['#FFD700', '#FFA500', '#FF6347', '#FF69B4', '#4169E1'],
        disableForReducedMotion: true
      });
    }, 250);

    // 初始爆炸效果
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#FFD700', '#FFA500', '#FF6347', '#FF69B4', '#4169E1'],
      origin: {
        x: 0.5,
        y: 0.5
      }
    };

    function shoot() {
      confetti({
        ...defaults,
        particleCount: 80,
        scalar: 1.2
      });

      confetti({
        ...defaults,
        particleCount: 60,
        scalar: 0.75
      });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return null;
}
