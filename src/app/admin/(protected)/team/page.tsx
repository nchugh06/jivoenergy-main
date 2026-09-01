"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Trash2, Search, Edit, Users, RotateCcw } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { TeamMember, TeamSection, TEAM_SECTIONS } from '@/types/team';
import { OrderGrip, useAdminReorder } from '@/components/admin/useAdminReorder';

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

function sectionLabel(section: TeamSection) {
  return TEAM_SECTIONS.find((item) => item.id === section)?.label || section;
}

export default function AdminTeamPage() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleted, setShowDeleted] = useState(false);
  const [sectionFilter, setSectionFilter] = useState<TeamSection>(TEAM_SECTIONS[0].id);

  const fetchItems = async (
    search = searchTerm,
    deleted = showDeleted,
    section = sectionFilter
  ) => {
    try {
      if (!auth.currentUser) return;
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (deleted) params.set('includeDeleted', 'true');
      if (section) params.set('section', section);
      const res = await adminFetch(`/api/admin/team?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to load team');
      const data = await res.json();
      setItems(data.items || []);
    } catch (error) {
      console.error('Failed to load team', error);
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
      await fetchItems(searchTerm, showDeleted, sectionFilter);
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [showDeleted, sectionFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm('Move this team member to deleted? You can restore them later.')) return;
    try {
      const res = await adminFetch(`/api/admin/team/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting team member:', error);
      alert('Failed to delete team member');
    }
  };

  const handleRestore = async (id: string) => {
    try {
      const res = await adminFetch(`/api/admin/team/${id}/restore`, { method: 'POST', body: '{}' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Restore failed');
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error restoring team member:', error);
      alert(error instanceof Error ? error.message : 'Failed to restore team member');
    }
  };

  const filteredItems = items.filter((item) => {
    const q = searchTerm.toLowerCase();
    if (!q) return true;
    return (
      item.name.toLowerCase().includes(q) ||
      item.role.toLowerCase().includes(q) ||
      item.section.toLowerCase().includes(q)
    );
  });

  const { canDrag, rowProps } = useAdminReorder({
    visibleItems: filteredItems,
    setItems,
    enabled: !showDeleted && !searchTerm.trim(),
    persist: async (ordered) => {
      const res = await adminFetch('/api/admin/team/reorder', {
        method: 'PUT',
        body: JSON.stringify({
          items: ordered.map((item, index) => ({ id: item.id, order: index })),
        }),
      });
      if (!res.ok) throw new Error('Failed to save order');
    },
    onPersistError: () => fetchItems(searchTerm, showDeleted, sectionFilter),
  });

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="section-title-spl text-gray-800">Team</h1>
          <p className="text-gray-500 mt-1">
            {showDeleted
              ? 'Deleted members stay in the database until restored'
              : canDrag
                ? 'Drag rows to change the order on the team page'
                : 'Manage people shown on the team page'}
          </p>
        </div>
        <Link
          href="/admin/team/add"
          className="flex items-center gap-2 px-6 py-3 bg-[#062516] text-[#FFFA84] rounded-full font-semibold hover:bg-[#08301d] transition-all shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Add member
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, role or section..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#062516]/10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex rounded-lg border border-gray-200 overflow-hidden w-full lg:w-auto flex-wrap">
          {TEAM_SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setSectionFilter(section.id)}
              className={`px-3 py-2 text-sm font-semibold ${sectionFilter === section.id ? 'bg-[#062516] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              {section.label}
            </button>
          ))}
        </div>
        <div className="flex rounded-lg border border-gray-200 overflow-hidden w-full lg:w-auto">
          <button
            type="button"
            onClick={() => setShowDeleted(false)}
            className={`px-4 py-2 text-sm font-semibold flex-1 ${!showDeleted ? 'bg-[#062516] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            Live
          </button>
          <button
            type="button"
            onClick={() => setShowDeleted(true)}
            className={`px-4 py-2 text-sm font-semibold flex-1 ${showDeleted ? 'bg-[#062516] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
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
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Member</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Section</th>
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
                        <div className="h-12 w-12 relative flex-shrink-0 bg-gray-100 rounded-full overflow-hidden border border-gray-100">
                          {item.image ? (
                            <Image src={item.image} alt={item.name} fill className="object-cover object-top" />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-400 text-sm font-bold">
                              {item.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">{item.name}</div>
                          <div className="text-xs text-gray-400">{item.role || '—'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{sectionLabel(item.section)}</td>
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
                              href={`/admin/team/edit/${item.id}`}
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
                <Users className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 text-lg">
                {showDeleted ? 'No deleted members.' : 'No team members found.'}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                {showDeleted
                  ? 'Deleted members will appear here until restored.'
                  : 'Add a member to get started.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
