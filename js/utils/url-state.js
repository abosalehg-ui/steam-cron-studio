// =============================================================
// STEAM CRON STUDIO — URL State Encoder/Decoder
// Encodes builder configuration into a shareable URL param
// =============================================================

const PARAM_KEY = 'cfg';

/**
 * Encode a config object to a base64url string
 * @param {Object} config
 * @returns {string}
 */
export function encodeConfig(config) {
  try {
    const json    = JSON.stringify(config);
    const encoded = btoa(unescape(encodeURIComponent(json)));
    // Make URL-safe
    return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  } catch {
    return '';
  }
}

/**
 * Decode a base64url string back to config object
 * @param {string} encoded
 * @returns {Object|null}
 */
export function decodeConfig(encoded) {
  try {
    // Restore base64 padding
    const padded = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const pad    = padded.length % 4;
    const b64    = pad ? padded + '='.repeat(4 - pad) : padded;
    const json   = decodeURIComponent(escape(atob(b64)));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/**
 * Build a shareable URL for the current config
 * @param {Object} config  - the full builder config to share
 * @returns {string}       - full URL with ?cfg=... parameter
 */
export function buildShareUrl(config) {
  const encoded = encodeConfig(config);
  if (!encoded) return window.location.href;

  const url = new URL(window.location.href);
  url.searchParams.set(PARAM_KEY, encoded);
  // Remove sensitive keys before sharing
  const safe = { ...config };
  delete safe.steamId;   // never share Steam ID in URL
  delete safe.chatId;    // never share Chat ID
  const safeEncoded = encodeConfig(safe);
  url.searchParams.set(PARAM_KEY, safeEncoded);
  return url.toString();
}

/**
 * Read config from current URL params (if any)
 * @returns {Object|null}
 */
export function readConfigFromUrl() {
  try {
    const params  = new URLSearchParams(window.location.search);
    const encoded = params.get(PARAM_KEY);
    if (!encoded) return null;
    return decodeConfig(encoded);
  } catch {
    return null;
  }
}

/**
 * Clear the cfg param from URL without reload
 */
export function clearUrlConfig() {
  const url = new URL(window.location.href);
  url.searchParams.delete(PARAM_KEY);
  window.history.replaceState({}, '', url.toString());
}
