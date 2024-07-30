export function formatMs(ms: number) {
  const seconds: number = Math.floor((ms / 1000) % 60);
  const minutes: number = Math.floor((ms / (1000 * 60)) % 60);
  const hours: number = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days: number = Math.floor(ms / (1000 * 60 * 60 * 24));

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
