import type { Winner } from './types';

const STORAGE_KEY = 'lottery_winners';

export function storeWinners(winners: Winner[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(winners));
}

export function getWinners(): Winner[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function clearWinners() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
