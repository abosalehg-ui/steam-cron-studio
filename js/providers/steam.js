// =============================================================
// STEAM CRON STUDIO — Steam Provider
// Uses Steam Community XML endpoints (CORS-compatible in browser)
// Steam Web API does NOT support CORS — these endpoints do.
// =============================================================

const STEAM_CDN = 'https://cdn.cloudflare.steamstatic.com/steam/apps';

/**
 * Validate a SteamID64 string
 * @param {string|number} id
 * @returns {boolean}
 */
export function isValidSteamId64(id) {
  return /^7656119\d{10}$/.test(String(id).trim());
}

/**
 * Fetch Steam profile via Community XML (CORS OK)
 * @param {string} steamId64
 * @returns {Promise<Object>}
 */
export async function fetchProfile(steamId64) {
  if (!isValidSteamId64(steamId64)) {
    throw new Error('invalid_steam_id');
  }

  const url = `https://steamcommunity.com/profiles/${steamId64}/?xml=1`;
  const res  = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const text   = await res.text();
  const parser = new DOMParser();
  const xml    = parser.parseFromString(text, 'application/xml');

  const get = tag => xml.querySelector(tag)?.textContent?.trim() ?? '';

  const customURL  = get('customURL');
  const profileUrl = customURL
    ? `https://steamcommunity.com/id/${customURL}/`
    : `https://steamcommunity.com/profiles/${steamId64}/`;

  return {
    steamId64:   get('steamID64') || steamId64,
    displayName: get('steamID')   || 'Unknown',
    realName:    get('realname'),
    avatar:      get('avatarFull') || get('avatarMedium') || get('avatarIcon'),
    profileUrl,
    visibility:  get('visibilityState'),  // '3' = public
    memberSince: get('memberSince'),
    gameCount:   get('gameCount'),
    isPublic:    get('visibilityState') === '3',
  };
}

/**
 * Fetch owned games via Community XML (games tab)
 * Returns array of { appid, name, hoursOnRecord }
 * NOTE: Only works for public profiles
 * @param {string} steamId64
 * @returns {Promise<Array>}
 */
export async function fetchOwnedGamesXml(steamId64) {
  const url = `https://steamcommunity.com/profiles/${steamId64}/games?tab=all&xml=1`;
  const res  = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const text   = await res.text();
  const parser = new DOMParser();
  const xml    = parser.parseFromString(text, 'application/xml');

  const games = [];
  xml.querySelectorAll('game').forEach(g => {
    const get   = tag => g.querySelector(tag)?.textContent?.trim() ?? '';
    const appid = get('appID');
    const name  = get('name');
    if (appid && name) {
      games.push({
        appid,
        name,
        hoursOnRecord: parseFloat(get('hoursOnRecord').replace(',', '')) || 0,
        hoursLast2Weeks: parseFloat(get('hoursLast2Weeks').replace(',', '')) || 0,
        logoURL: get('logo'),
        storeLink: get('storeLink'),
      });
    }
  });

  return games;
}

/**
 * Build Steam store URL for a game
 * @param {string|number} appid
 * @returns {string}
 */
export function storeUrl(appid) {
  return `https://store.steampowered.com/app/${appid}/`;
}

/**
 * Build game header thumbnail URL (CDN)
 * @param {string|number} appid
 * @returns {string}
 */
export function thumbnailUrl(appid) {
  return `${STEAM_CDN}/${appid}/header.jpg`;
}

/**
 * Build fallback capsule thumbnail
 * @param {string|number} appid
 * @returns {string}
 */
export function fallbackThumbnailUrl(appid) {
  return `${STEAM_CDN}/${appid}/capsule_616x353.jpg`;
}

/**
 * Build Steam gift URL
 * @param {string|number} appid
 * @returns {string}
 */
export function giftUrl(appid) {
  return `https://store.steampowered.com/buyitem/${appid}/1/`;
}
