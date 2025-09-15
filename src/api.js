// Vite env (change for prod):  VITE_API_BASE=http://localhost:8080
const API_BASE = import.meta.env.VITE_API_BASE ?? "https://planet-protector-dba76d4b6b9b.herokuapp.com";

function q(params) {
  const u = new URLSearchParams();
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") u.set(k, v);
  });
  return u.toString();
}

export async function createContact(payload) {
  const res = await fetch(`${API_BASE}/api/contacts`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function listContacts({page=0, size=10, sortBy="createdAt", direction="DESC"} = {}) {
  const res = await fetch(`${API_BASE}/api/contacts?${q({page, size, sortBy, direction})}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // Spring Page<Contact>
}

export async function listByStatus(status, {page=0, size=10, sortBy="createdAt", direction="DESC"} = {}) {
  const res = await fetch(`${API_BASE}/api/contacts/status/${status}?${q({page, size, sortBy, direction})}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function listStatusNotDone({page=0, size=10, sortBy="createdAt", direction="DESC"} = {}) {
  const res = await fetch(`${API_BASE}/api/contacts/status/not-done?${q({page, size, sortBy, direction})}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function findByPhone(phone) {
  const res = await fetch(`${API_BASE}/api/contacts/phone/${encodeURIComponent(phone)}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // List<Contact>
}

export async function getContact(id) {
  const res = await fetch(`${API_BASE}/api/contacts/${id}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function toggleStatus(id) {
  const res = await fetch(`${API_BASE}/api/contacts/${id}/status`, { method: "PUT" });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
