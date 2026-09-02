"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Trash2, Search, Edit, Newspaper, RotateCcw } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { MediaItem } from '@/types/media';
import { OrderGrip, useAdminReorder } from '@/components/admin/useAdminReorder';

async function adminFetch(url: string, init?: RequestInit) {
  if (!auth.currentUser) throw new Error('Not signed in');
  const token = await auth.currentUser.getIdToken();
  const headers = new Headers(init?.headers);
  headers.set('Authorization', `Bearer ${token}`);
  if (init?.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  return fetch(url, { ...init, headers });
}

export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleted, setShowDeleted] = useState(false);

  const fetchItems = async (search = searchTerm, deleted = showDeleted) => {
    try {
      if (!auth.currentUser) return;
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (deleted) params.set('includeDeleted', 'true');
      const res = await adminFetch(`/api/admin/media?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to load media');
      const data = await res.json();
      setItems(data.items || []);
    } catch (error) {
      console.error('Failed to load media', error);
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
    if (!confirm('Move this item to deleted? You can restore it later.')) return;
    try {
      const res = await adminFetch(`/api/admin/media/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting media:', error);
      alert('Failed to delete media item');
    }
  };

  const handleRestore = async (id: string) => {
    try {
      const res = await adminFetch(`/api/admin/media/${id}/restore`, { method: 'POST', body: '{}' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Restore failed');
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error restoring media:', error);
      alert(error instanceof Error ? error.message : 'Failed to restore media item');
    }
  };

  const filteredItems = items.filter((item) => {
    const q = searchTerm.toLowerCase();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.country.toLowerCase().includes(q) ||
      item.slug.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const { canDrag, rowProps } = useAdminReorder({
    visibleItems: filteredItems,
    setItems,
    enabled: !showDeleted && !searchTerm.trim(),
    persist: async (ordered) => {
      const res = await adminFetch('/api/admin/media/reorder', {
        method: 'PUT',
        body: JSON.stringify({
          items: ordered.map((item, index) => ({ id: item.id, order: index })),
        }),
      });
      if (!res.ok) throw new Error('Failed to save order');
    },
    onPersistError: () => fetchItems(searchTerm, showDeleted),
  });

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="section-title-spl text-gray-800">Media Management</h1>
          <p className="text-gray-500 mt-1">
            {showDeleted
              ? 'Deleted items stay in the database until restored'
              : canDrag
                ? 'Drag rows to change the order on the media page'
                : 'Manage newsroom items for the media page and homepage'}
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/admin/media/add"
            className="flex items-center gap-2 px-6 py-3 bg-[#062516] text-[#FFFA84] rounded-full font-semibold hover:bg-[#08301d] transition-all shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Add item
          </Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by title, country or slug..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#062516]/10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          <button
            type="button"
            onClick={() => setShowDeleted(false)}
            className={`px-4 py-2 text-sm font-semibold ${!showDeleted ? 'bg-[#062516] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            Live
          </button>
          <button
            type="button"
            onClick={() => setShowDeleted(true)}
            className={`px-4 py-2 text-sm font-semibold ${showDeleted ? 'bg-[#062516] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
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
                  <th className="px-4 py-4 text-sm font-semibold text-gray-600 w-24 text-center">Order</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Item</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Country</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Featured</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Published</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredItems.map((item) => (
                  <tr key={item.id} {...rowProps(item.id)}>
                    <td className="px-4 py-4 text-center">
                      <OrderGrip order={item.order} canDrag={canDrag} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-16 relative flex-shrink-0 bg-gray-100 rounded overflow-hidden border border-gray-100">
                          {item.image ? (
                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-400 text-[10px]">No Image</div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">{item.title}</div>
                          <div className="text-xs text-gray-400">{item.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.country || '—'}</td>
                    <td className="px-6 py-4 text-sm">
                      {item.featured ? (
                        <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold">Yes</span>
                      ) : (
                        <span className="text-gray-400 text-xs">No</span>
                      )}
                    </td>
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
                              href={`/admin/media/edit/${item.id}`}
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
                <Newspaper className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 text-lg">
                {showDeleted ? 'No deleted media items.' : 'No media items found.'}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                {showDeleted ? 'Deleted items will appear here until restored.' : 'Add an item to get started.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
