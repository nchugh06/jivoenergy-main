'use client';

import React, { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { 
  Search, 
  ChevronLeft,
  ChevronRight,
  FileText,
  Download
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
  createdAt: string;
}

const CareersPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination
  const [total, setTotal] = useState(0);
  const [limit] = useState(50);
  const [lastCreatedAt, setLastCreatedAt] = useState<string | null>(null);
  const [pageHistory, setPageHistory] = useState<string[]>([]);
  
  // Search
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
        setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Trigger fetch when search changes
  useEffect(() => {
     if (auth.currentUser) {
        setPageHistory([]); 
        fetchApplications(null);
     }
  }, [debouncedSearch]);

  // Initial fetch
  useEffect(() => {
      const checkAuthAndFetch = async () => {
          let attempts = 0;
          while (!auth.currentUser && attempts < 5) {
              await new Promise(r => setTimeout(r, 200));
              attempts++;
          }
          if (auth.currentUser && applications.length === 0) {
            fetchApplications(null);
          }
      }
      checkAuthAndFetch();
  }, []);

  const fetchApplications = async (cursor: string | null = null) => {
    setLoading(true);
    try {
      if (!auth.currentUser) return;
      const token = await auth.currentUser.getIdToken();
      
      const params = new URLSearchParams();
      params.append('limit', limit.toString());
      if (cursor) params.append('lastCreatedAt', cursor);
      if (debouncedSearch) params.append('search', debouncedSearch);

      const res = await fetch(`/api/admin/careers?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!res.ok) throw new Error('Failed to fetch');

      const data = await res.json();
      setApplications(data.applications || []);
      setTotal(data.total || 0);
      setLastCreatedAt(data.lastVisible);
    } catch (error) {
      console.error("Failed to fetch applications", error);
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
      window.location.reload(); // Simple reload for prev for now
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-[#062516]">Career Applications</h1>
        <p className="text-gray-500 text-sm">Review job applications and resumes</p>
      </header>

      <div className="space-y-6">
        
        {/* Search */}
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

        {/* Table */}
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
                            <th className="p-4 border-b border-gray-100 text-center">Resume</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-gray-500">Loading applications...</td>
                            </tr>
                        ) : applications.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-gray-500">No applications found.</td>
                            </tr>
                        ) : (
                            applications.map((app) => (
                                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 whitespace-nowrap text-gray-500">
                                        {new Date(app.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 font-medium text-[#062516]">
                                        {app.fullName}
                                    </td>
                                    <td className="p-4">
                                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                                            {app.position}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span>{app.email}</span>
                                            <span className="text-gray-500 text-xs mt-0.5">
                                                {app.countryCode ? `${app.countryCode} ` : ''}{app.phone}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4 max-w-xs truncate text-gray-500" title={app.description}>
                                        {app.description || '-'}
                                    </td>
                                    <td className="p-4 text-center">
                                        {app.cvUrl ? (
                                            <a 
                                                href={app.cvUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-[#062516] hover:underline font-medium"
                                            >
                                                <FileText size={16} />
                                                View CV
                                            </a>
                                        ) : (
                                            <span className="text-gray-400 text-xs">No CV</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination Controls */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                 <span className="text-sm text-gray-500">
                     Showing {applications.length} applications
                 </span>
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
    </div>
  );
};

export default CareersPage;
