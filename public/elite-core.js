/* Elite Trading — shared client configuration and API layer.
   Public settings only. Never put passwords, API secrets, or private keys here.
   Deploy frontend and backend on the same Railway domain to use the default. */
(function (global) {
  'use strict';
  const config = Object.freeze({
    API_BASE_URL: 'https://elite-b.pxxlspace.cv', // Set to 'https://your-api.up.railway.app' for a separate backend; blank when same origin.
    MINIMUM_FUNDING_USD: 20,
    MARKET_REFRESH_MS: 30000,
    APP_NAME: 'Elite Trading'
  });
  function url(path) {
    if (typeof path !== 'string') throw new TypeError('API path must be a string');
    if (!path.startsWith('/api/')) throw new Error('Only /api/ routes are allowed');
    return config.API_BASE_URL.replace(/\/$/, '') + path;
  }
  async function apiFetch(path, options = {}) {
    return fetch(url(path), { ...options, credentials: 'include', cache: 'no-store' });
  }
  async function apiJSON(path, options = {}) {
    const res = await apiFetch(path, options);
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.error || `Request failed (${res.status})`);
    return json;
  }
  function post(path, data) {
    return apiJSON(path, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
  }
  function put(path, data) {
    return apiJSON(path, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
  }
  global.Elite = Object.freeze({ config, url, apiFetch, apiJSON, post, put });
})(window);
