declare global {
  var __SAMA_MARKET_API_URL__: string | undefined;
}

const configuredApiUrl =
  globalThis.__SAMA_MARKET_API_URL__?.trim();

export const API_BASE_URL =
  configuredApiUrl
    ? `${configuredApiUrl.replace(/\/$/, '')}/api`
    : 'https://samamarket.onrender.com/api';

export function toApiUrl(url: string): string {
  if (url.startsWith('/api') && API_BASE_URL !== '/api') {
    return `${API_BASE_URL}${url.slice('/api'.length)}`;
  }

  return url;
}