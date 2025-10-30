// --- Base URL ---------------------------------------------------------------
// In dev put this in your .env file:  
 //VITE_API_BASE=http://localhost:8080
const API_BASE = import.meta.env.VITE_API_BASE ?? "https://planet-protector-dba76d4b6b9b.herokuapp.com";

// --- Helpers ----------------------------------------------------------------
function q(params) {
  const u = new URLSearchParams();
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") u.set(k, v);
  });
  return u.toString();
}

// Optional: simple fetch with timeout
async function xf(url, init = {}, ms = 30000) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { ...init, signal: ctrl.signal });
    if (!res.ok) throw new Error((await res.text()) || `${res.status} ${res.statusText}`);
    return res;
  } finally {
    clearTimeout(id);
  }
}

// --- Create contact ---------------------------------------------------------
/**
 * Creates a contact.
 * If payload contains image and/or video (File objects), it uses the multipart endpoint.
 * Otherwise it sends plain JSON to the simple create endpoint.
 */
export async function createContact(payload) {
  const { image, video, status, ...json } = payload;

  // no media → plain JSON endpoint
  if (!image && !video) {
    const res = await fetch(`${API_BASE}/api/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  // with media → multipart
  const fd = new FormData();
  fd.append("data", new Blob([JSON.stringify(json)], { type: "application/json" }));
  if (image) fd.append("image", image);
  if (video) fd.append("video", video);

  const res = await fetch(`${API_BASE}/api/contacts/with-media`, {
    method: "POST",
    body: fd, // DO NOT set Content-Type manually
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// --- Optional single-upload helpers (for editing existing contact) ----------
export async function uploadContactImage(id, file) {
  const fd = new FormData();
  fd.append("image", file);
  const res = await xf(`${API_BASE}/api/contacts/${id}/image`, { method: "POST", body: fd });
  return res.json();
}

export async function uploadContactVideo(id, file) {
  const fd = new FormData();
  fd.append("video", file);
  const res = await xf(`${API_BASE}/api/contacts/${id}/video`, { method: "POST", body: fd });
  return res.json();
}

// --- Lists & queries --------------------------------------------------------
export async function listContacts({ page = 0, size = 10, sortBy = "createdAt", direction = "DESC" } = {}) {
  const res = await xf(`${API_BASE}/api/contacts?${q({ page, size, sortBy, direction })}`);
  return res.json(); // Spring Page<Contact>
}

export async function listByStatus(status, { page = 0, size = 10, sortBy = "createdAt", direction = "DESC" } = {}) {
  const res = await xf(`${API_BASE}/api/contacts/status/${status}?${q({ page, size, sortBy, direction })}`);
  return res.json();
}

export async function listStatusNotDone({ page = 0, size = 10, sortBy = "createdAt", direction = "DESC" } = {}) {
  const res = await xf(`${API_BASE}/api/contacts/status/not-done?${q({ page, size, sortBy, direction })}`);
  return res.json();
}

export async function findByPhone(phone) {
  const res = await xf(`${API_BASE}/api/contacts/phone/${encodeURIComponent(phone)}`);
  return res.json(); // List<Contact>
}

// --- Detail / actions -------------------------------------------------------
export async function getContact(id) {
  const res = await xf(`${API_BASE}/api/contacts/${id}`);
  return res.json(); // ContactResponse (with imageUrl/videoUrl when present)
}

export async function toggleStatus(id) {
  const res = await xf(`${API_BASE}/api/contacts/${id}/status`, { method: "PUT" });
  return res.json();
}

export async function deleteContact(id) {
  await xf(`${API_BASE}/api/contacts/${id}`, { method: "DELETE" });
}
