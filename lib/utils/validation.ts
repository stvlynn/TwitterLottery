export function isValidTwitterId(id: string): boolean {
  const twitterIdRegex = /^[A-Za-z0-9_]+$/;
  return twitterIdRegex.test(id);
}
