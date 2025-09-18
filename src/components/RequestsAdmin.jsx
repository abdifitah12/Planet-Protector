import React, { useEffect, useMemo, useState } from "react";
import {
  listContacts, listByStatus, listStatusNotDone,
  findByPhone, getContact, toggleStatus, deleteContact
} from "../api";
import StatusBadge from "./StatusBadge.jsx";

const PAGE_SIZE = 10;

export default function RequestsAdmin() {
  const [mode, setMode] = useState("ALL"); // ALL | NOT_DONE | STATUS | PHONE
  const [status, setStatus] = useState("OPEN"); // for STATUS mode
  const [phone, setPhone]   = useState("");     // for PHONE mode

  const [page, setPage] = useState(0);
  const [data, setData] = useState({ content: [], totalPages: 0, number: 0 });
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useState(null);
  const [detail, setDetail] = useState(null);

  const fetcher = useMemo(() => {
    return async () => {
      setBusy(true);
      setFlash(null);
      try {
        if (mode === "ALL") {
          const res = await listContacts({ page, size: PAGE_SIZE });
          setData(res);
        } else if (mode === "NOT_DONE") {
          const res = await listStatusNotDone({ page, size: PAGE_SIZE });
          setData(res);
        } else if (mode === "STATUS") {
          const res = await listByStatus(status, { page, size: PAGE_SIZE });
          setData(res);
        } else if (mode === "PHONE") {
          if (!phone) { setData({ content: [], totalPages: 0, number: 0 }); return; }
          const list = await findByPhone(phone);
          setData({ content: list, totalPages: 1, number: 0 });
        }
      } catch (e) {
        setFlash({ type: "error", text: e.message || "Failed to load" });
      } finally {
        setBusy(false);
      }
    };
  }, [mode, status, phone, page]);

  useEffect(() => { fetcher(); }, [fetcher]);

  function resetAndReload() {
    setPage(0);
    fetcher();
  }

  async function onView(id) {
    setBusy(true);
    try {
      const c = await getContact(id);
      setDetail(c);
    } catch (e) {
      setFlash({ type: "error", text: e.message || "Failed to fetch contact" });
    } finally {
      setBusy(false);
    }
  }

  async function onToggle(id) {
    setBusy(true);
    try {
      const updated = await toggleStatus(id);
      setFlash({ type: "success", text: `Status set to ${updated.status} (#${updated.id})` });
      resetAndReload();
    } catch (e) {
      setFlash({ type: "error", text: e.message || "Failed to update status" });
    } finally {
      setBusy(false);
    }
  }

  async function onDelete(id) {
  if (!confirm(`Delete request #${id}? This cannot be undone.`)) return;
  setBusy(true);
  try {
    await deleteContact(id);
    setFlash({ type: "success", text: `Deleted #${id}` });
    resetAndReload();
  } catch (e) {
    setFlash({ type: "error", text: e.message || "Failed to delete" });
  } finally {
    setBusy(false);
  }
}


  return (
    <section id="requests" className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
        
          <button onClick={() => resetAndReload()}
            className="rounded-full border px-4 py-2 text-sm hover:bg-slate-50">
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="mt-6 grid gap-3 md:grid-cols-4 items-end">
          <div className="flex items-center gap-2">
            <input id="mode-all" type="radio" name="mode" className="size-4"
                   checked={mode === "ALL"} onChange={() => { setMode("ALL"); setPage(0); }} />
            <label htmlFor="mode-all" className="text-sm text-slate-700">All</label>
          </div>
          <div className="flex items-center gap-2">
            <input id="mode-nd" type="radio" name="mode" className="size-4"
                   checked={mode === "NOT_DONE"} onChange={() => { setMode("NOT_DONE"); setPage(0); }} />
            <label htmlFor="mode-nd" className="text-sm text-slate-700">Not Done</label>
          </div>
          <div className="flex items-center gap-2">
            <input id="mode-status" type="radio" name="mode" className="size-4"
                   checked={mode === "STATUS"} onChange={() => { setMode("STATUS"); setPage(0); }} />
            <label htmlFor="mode-status" className="text-sm text-slate-700">By Status</label>
            <select value={status} onChange={e => { setStatus(e.target.value); setPage(0); }}
                    className="rounded-xl border px-2 py-1 text-sm">
              <option>OPEN</option>
              <option>PENDING</option>
              <option>DONE</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input id="mode-phone" type="radio" name="mode" className="size-4"
                   checked={mode === "PHONE"} onChange={() => { setMode("PHONE"); setPage(0); }} />
            <label htmlFor="mode-phone" className="text-sm text-slate-700">By Phone</label>
            <input value={phone} onChange={e => setPhone(e.target.value)}
                   placeholder="206-326-8924" className="rounded-xl border px-2 py-1 text-sm" />
          </div>
        </div>

        {/* Flash */}
        {flash && (
          <div className={`mt-4 rounded-xl p-3 text-sm ${
            flash.type === "success" ? "bg-emerald-100 text-emerald-900" : "bg-red-100 text-red-800"
          }`}>{flash.text}</div>
        )}

        {/* Table */}
        <div className="mt-6 overflow-auto rounded-xl border">
          <table className="min-w-[800px] w-full text-left">
            <thead className="bg-slate-50 text-slate-700 text-sm">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {busy && data.content.length === 0 && (
                <tr><td colSpan="7" className="px-4 py-6 text-center text-slate-500">Loading…</td></tr>
              )}
              {data.content?.map((c) => (
                <tr key={c.id} className="border-t hover:bg-slate-50">
                  <td className="px-4 py-2">{c.id}</td>
                  <td className="px-4 py-2">{c.name}</td>
                  <td className="px-4 py-2">{c.email}</td>
                  <td className="px-4 py-2">{c.phoneNumber}</td>
                  <td className="px-4 py-2"><StatusBadge status={c.status}/></td>
                  <td className="px-4 py-2">{c.address}</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => onView(c.id)}
                        className="rounded-full border px-3 py-1 text-xs hover:bg-slate-100">View</button>
                      <button onClick={() => onToggle(c.id)}
                        className="rounded-full bg-emerald-600 text-white px-3 py-1 text-xs hover:bg-emerald-700">
                        Status
                      </button>
                      <button
                        onClick={() => onDelete(c.id)}
                        className="rounded-full bg-red-600 text-white px-3 py-1 text-xs hover:bg-red-700">
                        Delete
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
              {!busy && data.content?.length === 0 && (
                <tr><td colSpan="7" className="px-4 py-6 text-center text-slate-500">No results</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination (for Page<> responses; phone mode returns a simple list) */}
        {mode !== "PHONE" && (
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              disabled={page <= 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="rounded-full border px-3 py-1 text-sm disabled:opacity-50 hover:bg-slate-50"
            >
              Prev
            </button>
            <div className="text-sm text-slate-600">Page {data.number + 1} of {Math.max(1, data.totalPages || 1)}</div>
            <button
              disabled={(data.number + 1) >= (data.totalPages || 1)}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-full border px-3 py-1 text-sm disabled:opacity-50 hover:bg-slate-50"
            >
              Next
            </button>
          </div>
        )}

        {/* Detail modal */}
        {detail && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Request #{detail.id}</h3>
                <button onClick={() => setDetail(null)} className="rounded-full border px-2 py-1 text-sm">Close</button>
              </div>
              <div className="mt-4 grid gap-2 text-sm text-slate-700">
                <div><span className="font-medium">Name:</span> {detail.name}</div>
                <div><span className="font-medium">Email:</span> {detail.email}</div>
                <div><span className="font-medium">Phone:</span> {detail.phoneNumber}</div>
                <div><span className="font-medium">Address:</span> {detail.address}</div>
                <div><span className="font-medium">Status:</span> <StatusBadge status={detail.status}/></div>
                {detail.description && <div><span className="font-medium">Notes:</span> {detail.description}</div>}
                {detail.image && <img src={detail.image} alt="upload" className="mt-2 rounded-xl border max-h-60 object-contain" />}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
