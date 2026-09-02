'use client';

import React, { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { countries } from '@/lib/countries';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
  Edit,
  Trash2,
  X,
  Loader2,
} from 'lucide-react';

interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  countryCode?: string;
  position: string;
  description: string;
  cvUrl?: string;
  cvPath?: string;
  cvFileName?: string;
  createdAt: string;
  updatedAt?: string;
}

async function adminFetch(url: string, init?: RequestInit) {
  if (!auth.currentUser) throw new Error('Not signed in');
  const token = await auth.currentUser.getIdToken();
  const headers = new Headers(init?.headers);
  headers.set('Authorization', `Bearer ${token}`);
  if (init?.body && typeof init.body === 'string' && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  return fetch(url, { ...init, headers });
}

const emptyEdit = {
  fullName: '',
  email: '',
  phone: '',
  countryCode: '+91',
  position: '',
  description: '',
};

const CareersPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const [total, setTotal] = useState(0);
  const [limit] = useState(50);
  const [lastCreatedAt, setLastCreatedAt] = useState<string | null>(null);
  const [pageHistory, setPageHistory] = useState<string[]>([]);

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const [editing, setEditing] = useState<Application | null>(null);
  const [editForm, setEditForm] = useState(emptyEdit);
  const [editCv, setEditCv] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [editError, setEditError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (auth.currentUser) {
      setPageHistory([]);
      fetchApplications(null);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      let attempts = 0;
      while (!auth.currentUser && attempts < 5) {
        await new Promise((r) => setTimeout(r, 200));
        attempts++;
      }
      if (auth.currentUser && applications.length === 0) {
        fetchApplications(null);
      }
    };
    checkAuthAndFetch();
  }, []);

  const fetchApplications = async (cursor: string | null = null) => {
    setLoading(true);
    try {
      if (!auth.currentUser) return;
      const params = new URLSearchParams();
      params.append('limit', limit.toString());
      if (cursor) params.append('lastCreatedAt', cursor);
      if (debouncedSearch) params.append('search', debouncedSearch);

      const res = await adminFetch(`/api/admin/careers?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch');

      const data = await res.json();
      setApplications(data.applications || []);
      setTotal(data.total || 0);
      setLastCreatedAt(data.lastVisible);
    } catch (error) {
      console.error('Failed to fetch applications', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (lastCreatedAt) {
      setPageHistory([...pageHistory, lastCreatedAt]);
      fetchApplications(lastCreatedAt);
    }
  };

  const handlePrevPage = () => {
    window.location.reload();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const openEdit = (app: Application) => {
    setEditing(app);
    setEditForm({
      fullName: app.fullName || '',
      email: app.email || '',
      phone: app.phone || '',
      countryCode: app.countryCode || '+91',
      position: app.position || '',
      description: app.description || '',
    });
    setEditCv(null);
    setEditError('');
  };

  const closeEdit = () => {
    if (saving) return;
    setEditing(null);
    setEditCv(null);
    setEditError('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    setEditError('');
    try {
      const data = new FormData();
      data.append('fullName', editForm.fullName.trim());
      data.append('email', editForm.email.trim());
      data.append('phone', editForm.phone.trim());
      data.append('countryCode', editForm.countryCode);
      data.append('position', editForm.position.trim());
      data.append('description', editForm.description.trim());
      if (editCv) data.append('cv', editCv);

      const res = await adminFetch(`/api/admin/careers/${editing.id}`, {
        method: 'PUT',
        body: data,
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error || 'Failed to save');

      const updated = payload.application as Application;
      setApplications((prev) => prev.map((app) => (app.id === updated.id ? { ...app, ...updated } : app)));
      setEditing(null);
      setEditCv(null);
    } catch (error) {
      setEditError(error instanceof Error ? error.message : 'Failed to save application');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (app: Application) => {
    if (!confirm(`Delete the application from ${app.fullName || app.email}? This cannot be undone.`)) {
      return;
    }
    setDeletingId(app.id);
    try {
      const res = await adminFetch(`/api/admin/careers/${app.id}`, { method: 'DELETE' });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(payload.error || 'Failed to delete');
      setApplications((prev) => prev.filter((item) => item.id !== app.id));
      setTotal((prev) => Math.max(0, prev - 1));
      if (editing?.id === app.id) {
        setEditing(null);
        setEditCv(null);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete application');
    } finally {
      setDeletingId(null);
    }
  };

  const handleDownloadCv = async (app: Application) => {
    if (!app.cvUrl && !app.cvPath) return;
    setDownloadingId(app.id);
    try {
      const res = await adminFetch(`/api/admin/careers/${app.id}/cv`);
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error || 'Failed to download CV');
      }
      const blob = await res.blob();
      const disposition = res.headers.get('Content-Disposition') || '';
      const match = disposition.match(/filename="([^"]+)"/);
      const filename = match?.[1] || app.cvFileName || 'cv.pdf';
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to download CV');
    } finally {
      setDownloadingId(null);
    }
  };

  const inputClass =
    'w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#062516]/10 text-black text-sm';
  const labelClass = 'block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5';

  return (
    <div className="p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-[#062516]">Career Applications</h1>
        <p className="text-gray-500 text-sm">Review, edit, and download job applications</p>
      </header>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center gap-4">
          <form onSubmit={handleSearch} className="flex-1 max-w-lg relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search applicant name, email, or position..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#062516] outline-none text-black"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          <div className="text-gray-600 font-medium whitespace-nowrap">
            Total Applications: <span className="text-[#062516] font-bold text-xl">{total}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
                <tr>
                  <th className="p-4 border-b border-gray-100">Date</th>
                  <th className="p-4 border-b border-gray-100">Name</th>
                  <th className="p-4 border-b border-gray-100">Position</th>
                  <th className="p-4 border-b border-gray-100">Contact Info</th>
                  <th className="p-4 border-b border-gray-100">Cover Letter</th>
                  <th className="p-4 border-b border-gray-100 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      Loading applications...
                    </td>
                  </tr>
                ) : applications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      No applications found.
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 whitespace-nowrap text-gray-500">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 font-medium text-[#062516]">{app.fullName}</td>
                      <td className="p-4">
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                          {app.position}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span>{app.email}</span>
                          <span className="text-gray-500 text-xs mt-0.5">
                            {app.countryCode ? `${app.countryCode} ` : ''}
                            {app.phone}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 max-w-xs truncate text-gray-500" title={app.description}>
                        {app.description || '-'}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEdit(app)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit application"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          {app.cvUrl || app.cvPath ? (
                            <button
                              type="button"
                              onClick={() => handleDownloadCv(app)}
                              disabled={downloadingId === app.id}
                              className="p-2 text-[#062516] hover:bg-emerald-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Download CV"
                            >
                              {downloadingId === app.id ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                              ) : (
                                <Download className="w-5 h-5" />
                              )}
                            </button>
                          ) : (
                            <span className="px-2 py-2 text-gray-400 text-xs">No CV</span>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDelete(app)}
                            disabled={deletingId === app.id}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete application"
                          >
                            {deletingId === app.id ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <Trash2 className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
            <span className="text-sm text-gray-500">Showing {applications.length} applications</span>
            <div className="flex gap-2">
              <button
                onClick={handlePrevPage}
                disabled={pageHistory.length === 0}
                className="p-2 border border-gray-300 rounded hover:bg-white disabled:opacity-50"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNextPage}
                disabled={applications.length < limit}
                className="p-2 border border-gray-300 rounded hover:bg-white disabled:opacity-50"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={closeEdit} />
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold text-[#062516]">Edit application</h2>
                <p className="text-xs text-gray-500 mt-0.5">Update applicant details or replace the CV</p>
              </div>
              <button
                type="button"
                onClick={closeEdit}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-lg"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full name</label>
                  <input
                    required
                    className={inputClass}
                    value={editForm.fullName}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, fullName: e.target.value }))}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    type="email"
                    required
                    className={inputClass}
                    value={editForm.email}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className={labelClass}>Country code</label>
                  <select
                    className={inputClass}
                    value={editForm.countryCode}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, countryCode: e.target.value }))}
                  >
                    {countries.map((country) => (
                      <option key={`${country.code}-${country.dial_code}`} value={country.dial_code}>
                        {country.code} ({country.dial_code})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input
                    required
                    className={inputClass}
                    value={editForm.phone}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Position</label>
                  <input
                    required
                    className={inputClass}
                    value={editForm.position}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, position: e.target.value }))}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Cover letter / description</label>
                  <textarea
                    required
                    rows={4}
                    className={`${inputClass} resize-y`}
                    value={editForm.description}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>CV</label>
                  <div className="flex flex-wrap items-center gap-3">
                    {(editing.cvUrl || editing.cvPath) && (
                      <button
                        type="button"
                        onClick={() => handleDownloadCv(editing)}
                        disabled={downloadingId === editing.id}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-[#062516] hover:bg-gray-50 disabled:opacity-50"
                      >
                        {downloadingId === editing.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Download className="w-4 h-4" />
                        )}
                        Download current CV
                      </button>
                    )}
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setEditCv(e.target.files?.[0] || null)}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#062516] file:text-[#FFFA84]"
                    />
                  </div>
                  {editCv && (
                    <p className="text-xs text-blue-600 mt-2 font-medium">New file selected: {editCv.name}</p>
                  )}
                  {!editCv && (editing.cvFileName || editing.cvUrl) && (
                    <p className="text-xs text-gray-400 mt-2">
                      Current file: {editing.cvFileName || 'Uploaded CV'}
                    </p>
                  )}
                </div>
              </div>

              {editError && (
                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{editError}</p>
              )}

              <div className="flex justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleDelete(editing)}
                  disabled={saving || deletingId === editing.id}
                  className="px-5 py-2.5 rounded-lg border border-red-200 text-red-600 font-medium hover:bg-red-50 disabled:opacity-50"
                >
                  {deletingId === editing.id ? 'Deleting...' : 'Delete'}
                </button>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={closeEdit}
                    disabled={saving}
                    className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2.5 rounded-lg bg-[#062516] text-[#FFFA84] font-semibold hover:bg-[#08301d] disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save changes'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareersPage;
