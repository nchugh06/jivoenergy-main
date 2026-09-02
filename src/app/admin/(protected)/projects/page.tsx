"use client";

import React, { useEffect, useState } from 'react';
import { getProjects, deleteProject, restoreProject, reorderProjects } from '@/lib/projects';
import { Project } from '@/types/project';
import Image from 'next/image';
import { Plus, Trash2, Database, Search, Filter, Edit, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { OrderGrip, useAdminReorder } from '@/components/admin/useAdminReorder';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleted, setShowDeleted] = useState(false);

  useEffect(() => {
    fetchProjects(showDeleted);
  }, [showDeleted]);

  const fetchProjects = async (deletedOnly = showDeleted) => {
    setLoading(true);
    try {
      const data = await getProjects({ deletedOnly });
      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Move this project to deleted? You can restore it later.")) return;
    try {
      await deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await restoreProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error restoring project:", error);
      alert("Failed to restore project");
    }
  };

  const filteredProjects = projects
    .filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.technology?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
      (p.client?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
      (p.sub_title?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
      (p.detailProjectName?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
      (p.detailPageTechnology?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
      (p.completionYear ?? '').toString().includes(searchTerm)
    )
    // Keep list ordered by display order (lower first); missing order at end
    .sort((a, b) => (Number(a.order ?? 9999)) - (Number(b.order ?? 9999)));

  const { canDrag, rowProps } = useAdminReorder({
    visibleItems: filteredProjects,
    setItems: setProjects,
    enabled: !showDeleted && !searchTerm.trim(),
    persist: async (ordered) => {
      await reorderProjects(
        ordered
          .filter((item) => item.id)
          .map((item, index) => ({ id: item.id as string, order: index }))
      );
    },
    onPersistError: () => fetchProjects(showDeleted),
  });

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="section-title-spl text-gray-800">Projects Management</h1>
          <p className="text-gray-500 mt-1">
            {showDeleted
              ? 'Deleted projects stay in the database until restored'
              : canDrag
                ? 'Drag rows to change the order on the projects pages'
                : 'Manage and monitor all energy projects'}
          </p>
        </div>
        <div className="flex gap-4">
            <Link
              href="/admin/projects/settings"
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all shadow-sm"
            >
              <Filter className="w-5 h-5" />
              Settings
            </Link>
            <Link
              href="/admin/projects/add-projects"
              className="flex items-center gap-2 px-6 py-3 bg-[#062516] text-[#FFFA84] rounded-full font-semibold hover:bg-[#08301d] transition-all shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Add Project
            </Link>
        </div>
      </div>

      {/* Filters/Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search projects by name, country or technology..." 
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
                  <th className="px-4 py-4 text-sm font-semibold text-gray-600 w-24 text-center">Order</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Project</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Country</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Power</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Category</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Year of Completion</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredProjects.map((project) => (
                  <tr key={project.id} {...(project.id ? rowProps(project.id) : {})}>
                    <td className="px-4 py-4 text-center">
                      <OrderGrip order={project.order} canDrag={canDrag} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-16 relative flex-shrink-0 bg-gray-100 rounded overflow-hidden border border-gray-100">
                          {project.imageUrl ? (
                            <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-400 text-[10px]">No Image</div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">{project.title}</div>
                          {project.sub_title && (
                            <div className="text-xs text-gray-500 line-clamp-1">{project.sub_title}</div>
                          )}
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span>{project.status}</span>
                            {project.planned && (
                              <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold">
                                Planned
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{project.country}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{project.capacity}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                        {project.technology}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 tabular-nums">
                      {project.completionYear || '—'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2  transition-opacity">
                        {showDeleted ? (
                          <button
                            onClick={() => handleRestore(project.id!)}
                            className="inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold text-[#062516] hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Restore"
                          >
                            <RotateCcw className="w-4 h-4" />
                            Restore
                          </button>
                        ) : (
                          <>
                            <Link
                              href={`/admin/projects/edit-project/${project.id}`}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-5 h-5" />
                            </Link>
                            <button
                              onClick={() => handleDelete(project.id!)}
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
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 text-lg">
                {showDeleted ? 'No deleted projects.' : 'No projects found.'}
              </p>
              <button 
                onClick={() => setSearchTerm('')}
                className="text-[#062516] font-semibold mt-2 hover:underline"
              >
                Clear search filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
