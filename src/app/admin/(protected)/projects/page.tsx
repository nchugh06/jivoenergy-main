"use client";

import React, { useEffect, useState } from 'react';
import { getProjects, deleteProject } from '@/lib/projects';
import { Project } from '@/types/project';
import Image from 'next/image';
import { Plus, Trash2, Database, Search, Filter, Edit } from 'lucide-react';
import Link from 'next/link';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const filteredProjects = projects
    .filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.technology?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
      (p.sub_title?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
      (p.detailProjectName?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
      (p.completionYear ?? '').toString().includes(searchTerm)
    )
    // Keep list ordered by display order (lower first); missing order at end
    .sort((a, b) => (Number(a.order ?? 9999)) - (Number(b.order ?? 9999)));

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="section-title-spl text-gray-800">Projects Management</h1>
          <p className="text-gray-500 mt-1">Manage and monitor all energy projects</p>
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
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors w-full md:w-auto justify-center">
            <Filter className="w-4 h-4" />
            Filter
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
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Project</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Country</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Power</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Category</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center justify-center min-w-[2rem] h-8 px-2 rounded-lg bg-[#062516]/5 text-[#062516] text-sm font-bold tabular-nums">
                        {project.order != null && !Number.isNaN(Number(project.order))
                          ? Number(project.order)
                          : '—'}
                      </span>
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
                          <div className="text-xs text-gray-400">{project.status}</div>
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
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2  transition-opacity">
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
              <p className="text-gray-500 text-lg">No projects found.</p>
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
