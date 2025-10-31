import React, { useState } from "react";
import RequestsAdmin from "../components/RequestsAdmin.jsx";


// Set a password in .env.local: VITE_ADMIN_PASSWORD=secret123
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "abdi123";

export default function Admin() {
  const [ok, setOk] = useState(() => localStorage.getItem("admin-ok") === "1");
  const [pwd, setPwd] = useState("");

  function login(e) {
    e.preventDefault();
    if (pwd === ADMIN_PASSWORD) {
      localStorage.setItem("admin-ok", "1");
      setOk(true);
    } else {
      alert("Wrong password");
    }
  }

  function logout() {
    localStorage.removeItem("admin-ok");
    setOk(false);
  }

  if (!ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <form onSubmit={login} className="w-full max-w-sm rounded-2xl bg-white p-6 shadow">
          <h1 className="text-xl font-bold text-slate-900">Admin Login</h1>
          <p className="mt-1 text-sm text-slate-600">Enter admin password to view requests.</p>
          <input
            type="password"
            className="mt-4 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Password"
            value={pwd}
            onChange={(e)=>setPwd(e.target.value)}
          />
          <button className="mt-4 w-full rounded-full bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/bg.png" className="h-8 w-8" alt="logo" />
            <span className="text-lg font-semibold">Planet Protector</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="rounded-full border px-3 py-1 text-sm hover:bg-slate-50">Public Site</a>
            <button onClick={logout} className="rounded-full border px-3 py-1 text-sm hover:bg-slate-50">Logout</button>
          </div>
        </div>
      </header>
      <main>
        <RequestsAdmin />
      </main>
    </div>
  );
}
