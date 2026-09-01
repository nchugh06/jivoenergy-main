"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Trash2, Search, Edit, Youtube, RotateCcw } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { GalleryVideo } from '@/types/gallery';

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

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleted, setShowDeleted] = useState(false);

  const fetchItems = async (search = searchTerm, deleted = showDeleted) => {
    try {
      if (!auth.currentUser) return;
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (deleted) params.set('includeDeleted', 'true');
      const res = await adminFetch(`/api/admin/gallery?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to load videos');
      const data = await res.json();
      setItems(data.items || []);
    } catch (error) {
      console.error('Failed to load gallery videos', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      let attempts = 0;
      while (!auth.currentUser && attempts < 8) {
        await new Promise((r) => setTimeout(r, 200));
        attempts += 1;
      }
      if (!auth.currentUser || cancelled) {
        if (!cancelled) setLoading(false);
        return;
      }
      setLoading(true);
      await fetchItems(searchTerm, showDeleted);
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [showDeleted]);

  const handleDelete = async (id: string) => {
    if (!confirm('Move this video to deleted? You can restore it later.')) return;
    try {
      const res = await adminFetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('Failed to delete video');
    }
  };

  const handleRestore = async (id: string) => {
    try {
      const res = await adminFetch(`/api/admin/gallery/${id}/restore`, { method: 'POST', body: '{}' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Restore failed');
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error restoring video:', error);
      alert(error instanceof Error ? error.message : 'Failed to restore video');
    }
  };

  const filteredItems = items.filter((item) => {
    const q = searchTerm.toLowerCase();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.country.toLowerCase().includes(q) ||
      item.youtubeId.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="section-title-spl text-gray-800">Project Gallery</h1>
          <p className="text-gray-500 mt-1">
            {showDeleted
              ? 'Deleted videos stay in the database until restored'
              : 'YouTube videos shown on the homepage Project Gallery'}
          </p>
        </div>
        <Link
          href="/admin/gallery/add"
          className="flex items-center gap-2 px-6 py-3 bg-[#062516] text-[#FFFA84] rounded-full font-semibold hover:bg-[#08301d] transition-all shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Add video
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by title, country or video ID..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#062516]/10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex rounded-lg border border-gray-200 overflow-hidden w-full md:w-auto">
          <button
            type="button"
            onClick={() => setShowDeleted(false)}
            className={`px-4 py-2 text-sm font-semibold flex-1 md:flex-none ${!showDeleted ? 'bg-[#062516] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            Live
          </button>
          <button
            type="button"
            onClick={() => setShowDeleted(true)}
            className={`px-4 py-2 text-sm font-semibold flex-1 md:flex-none ${showDeleted ? 'bg-[#062516] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            Deleted
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#062516]"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-4 py-4 text-sm font-semibold text-gray-600 w-20 text-center">Order</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Video</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Country</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Duration</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Published</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center justify-center min-w-[2rem] h-8 px-2 rounded-lg bg-[#062516]/5 text-[#062516] text-sm font-bold tabular-nums">
                        {item.order}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-20 relative flex-shrink-0 bg-gray-100 rounded overflow-hidden border border-gray-100">
                          {item.thumbnail ? (
                            <Image src={item.thumbnail} alt={item.title} fill className="object-cover" />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-400 text-[10px]">No Image</div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-gray-800 line-clamp-2">{item.title}</div>
                          <div className="text-xs text-gray-400">{item.youtubeId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.country || '—'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.duration || '—'}</td>
                    <td className="px-6 py-4 text-sm">
                      {item.published ? (
                        <span className="px-2 py-1 rounded bg-green-50 text-green-700 text-xs font-semibold">Live</span>
                      ) : (
                        <span className="px-2 py-1 rounded bg-amber-50 text-amber-700 text-xs font-semibold">Draft</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {showDeleted ? (
                          <button
                            onClick={() => handleRestore(item.id)}
                            className="inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold text-[#062516] hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Restore"
                          >
                            <RotateCcw className="w-4 h-4" />
                            Restore
                          </button>
                        ) : (
                          <>
                            <Link
                              href={`/admin/gallery/edit/${item.id}`}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-5 h-5" />
                            </Link>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Youtube className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 text-lg">
                {showDeleted ? 'No deleted videos.' : 'No gallery videos found.'}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                {showDeleted
                  ? 'Deleted videos will appear here until restored.'
                  : 'Add a video to get started.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
