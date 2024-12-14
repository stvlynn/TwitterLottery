export function isValidTwitterUrl(url: string): boolean {
  return url.startsWith('https://twitter.com/') || url.startsWith('https://x.com/');
}

export function extractTwitterUsername(url: string): string {
  return url.split('/')[3];
}