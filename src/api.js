// src/api.js
const API_BASE = (process.env.REACT_APP_API_BASE || "").replace(/\/+$/, "");

function fullUrl(path) {
  if (!API_BASE) throw new Error("REACT_APP_API_BASE is not set");
  if (!path.startsWith("/")) path = "/" + path;
  return API_BASE + path;
}

export function getToken() {
  return localStorage.getItem("gg_token") || "";
}
export function setToken(t) {
  if (t) localStorage.setItem("gg_token", t);
}
export function clearToken() {
  localStorage.removeItem("gg_token");
}

export async function apiGet(path) {
  const res = await fetch(fullUrl(path), {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `GET ${path} ${res.status}`);
  }
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(fullUrl(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `POST ${path} ${res.status}`);
  }
  return res.json();
}
