// =============================================================
// STEAM CRON STUDIO — ITAD (IsThereAnyDeal) Provider
// Informational wrapper — used in Task 7 (cross-platform prices)
// =============================================================

const ITAD_BASE = 'https://api.isthereanydeal.com';

/**
 * Check if an ITAD API key looks valid (basic format check)
 * @param {string} key
 * @returns {boolean}
 */
export function isValidItadKey(key) {
  return typeof key === 'string' && key.trim().length >= 20;
}

/**
 * Lookup ITAD game ID from Steam appid
 * POST /games/lookup/v1
 * @param {string} apiKey
 * @param {number|string} appid
 * @returns {Promise<string|null>} ITAD game ID or null
 */
export async function lookupGameId(apiKey, appid) {
  const res = await fetch(`${ITAD_BASE}/games/lookup/v1?key=${encodeURIComponent(apiKey)}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ appid: parseInt(appid) }),
    signal:  AbortSignal.timeout(10000),
  });

  if (res.status === 401) throw new Error('invalid_key');
  if (res.status === 429) throw new Error('rate_limited');
  if (!res.ok) return null;

  const data = await res.json();
  return data?.game?.id ?? null;
}

/**
 * Fetch prices for multiple ITAD game IDs
 * POST /games/prices/v3
 * @param {string} apiKey
 * @param {string[]} itadIds
 * @param {string} [country='SA']
 * @returns {Promise<Object[]>}
 */
export async function fetchPrices(apiKey, itadIds, country = 'SA') {
  if (!itadIds.length) return [];

  const url = `${ITAD_BASE}/games/prices/v3?key=${encodeURIComponent(apiKey)}&country=${country}&nondeals=true&vouchers=false`;
  const res  = await fetch(url, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(itadIds),
    signal:  AbortSignal.timeout(15000),
  });

  if (res.status === 401) throw new Error('invalid_key');
  if (res.status === 429) throw new Error('rate_limited');
  if (!res.ok) return [];

  return await res.json();
}

/**
 * Whitelisted legitimate stores (exclude gray market)
 */
export const WHITELISTED_STORES = new Set([
  'Epic Game Store',
  'GOG',
  'Humble Store',
  'Fanatical',
  'GreenManGaming',
  'WinGameStore',
  'GamersGate',
  'Noctre',
]);

/**
 * Gray market stores to exclude
 */
export const GRAY_MARKET_STORES = new Set([
  'Kinguin', 'G2A', 'Eneba', 'CDKeys', 'HRKGame',
  'Instant Gaming', 'AllKeyShop',
]);

/**
 * Filter ITAD price results to only whitelisted stores
 * @param {Object[]} prices
 * @param {boolean} excludeGray
 * @returns {Object[]}
 */
export function filterByStore(prices, excludeGray = true) {
  return prices.filter(p => {
    if (excludeGray && GRAY_MARKET_STORES.has(p.shop?.name)) return false;
    return WHITELISTED_STORES.has(p.shop?.name);
  });
}

/**
 * Get ITAD docs URL
 */
export const ITAD_DOCS_URL     = 'https://docs.isthereanydeal.com/';
export const ITAD_REGISTER_URL = 'https://isthereanydeal.com/apps/my/';
