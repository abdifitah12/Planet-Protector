import React, { useState, useRef } from "react";
import { createContact } from "../api";

const init = { name:"", email:"", phoneNumber:"", address:"", description:"", image:"", status:null };

export default function ContactForm() {
  const [f, setF] = useState(init);
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef(null); // 👈 added reference

  const on = (e) => setF({ ...f, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setMsg(null);
    if (!f.name || !f.email || !f.phoneNumber || !f.address) {
      setMsg({ t:"error", x:"Name, email, phone and address are required." }); 
      return;
    }

    try {
      setBusy(true);
      const saved = await createContact(f);
      setMsg({ t:"ok", x:`Request received! Ref #${saved.id}.` });
      setF(init);

      // ✅ clear uploaded file after submit
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      setMsg({ t:"error", x: err.message || "Failed to submit." });
    } finally { 
      setBusy(false); 
    }
  }

  return (
    <section id="contact" className="py-16 bg-emerald-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900">Contact / Schedule</h2>
        <p className="mt-1 text-slate-600">We’ll confirm by email.</p>

        {msg && (
          <div className={`mt-4 rounded-xl p-3 text-sm ${
            msg.t==="ok"?"bg-emerald-100 text-emerald-900":"bg-red-100 text-red-800"
          }`}>
            {msg.x}
          </div>
        )}

        <form onSubmit={submit} className="mt-6 grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Full Name</label>
              <input 
                name="name" 
                value={f.name} 
                onChange={on} 
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Phone</label>
              <input 
                name="phoneNumber" 
                value={f.phoneNumber} 
                onChange={on} 
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                required 
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input 
                type="email" 
                name="email" 
                value={f.email} 
                onChange={on} 
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Address</label>
              <input 
                name="address" 
                value={f.address} 
                onChange={on} 
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Notes</label>
            <textarea 
              name="description" 
              value={f.description} 
              onChange={on} 
              rows={4} 
              className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Upload Photo (optional)</label>
            <input
              ref={fileRef} // 👈 attached ref
              type="file"
              name="image"
              accept="image/*"
              onChange={e => setF({ ...f, image: e.target.files[0] })}
              className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button 
            disabled={busy} 
            className="mt-2 inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {busy ? "Submitting…" : "Submit Request"}
          </button>
        </form>
      </div>
    </section>
  );
}
