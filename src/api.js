// Vite env (change for prod):  VITE_API_BASE=http://localhost:8080
const API_BASE = import.meta.env.VITE_API_BASE ?? "https://planet-protector-dba76d4b6b9b.herokuapp.com";
//const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8080";

function q(params) {
  const u = new URLSearchParams();
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") u.set(k, v);
  });
  return u.toString();
}



export async function createContact(payload) {
  // If no file -> plain JSON endpoint
  if (!payload.image) {
    const { image, status, ...json } = payload;
    const res = await fetch(`${API_BASE}/api/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  // With file -> multipart endpoint
  const fd = new FormData();
  const { image, status, ...json } = payload;

  // MUST be named "data" and typed as JSON so @RequestPart can deserialize
  fd.append("data", new Blob([JSON.stringify(json)], { type: "application/json" }));
  fd.append("image", image); // File from <input type="file">

  const res = await fetch(`${API_BASE}/api/contacts/with-image`, {
    method: "POST",
    body: fd, // no headers!
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

 // ---- DETAIL (ContactResponse with imageUrl) ----
export async function getContact(id) {
  const res = await fetch(`${API_BASE}/api/contacts/${id}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // ContactResponse
}

export async function toggleStatus(id) {
  const res = await fetch(`${API_BASE}/api/contacts/${id}/status`, { method: "PUT" });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deleteContact(id) {
  const res = await fetch(`${API_BASE}/api/contacts/delete/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error((await res.text()) || `Failed with ${res.status}`);
  return; // no body to parse
}





