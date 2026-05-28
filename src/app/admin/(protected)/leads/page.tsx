'use client';

import React, { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Save, 
  History, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  phone: string;
  countryCode?: string;
  company: string;
  interest: string;
  message: string;
  createdAt: string;
}

interface Remark {
  id: string;
  remark: string;
  timestamp: string;
  createdBy: string;
}

const LeadsPage = () => {
  const [currentUser, setCurrentUser] = useState<any>(null); // Keep user state for remarks logic
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination
  const [total, setTotal] = useState(0);
  const [limit] = useState(50);
  const [lastCreatedAt, setLastCreatedAt] = useState<string | null>(null);
  const [pageHistory, setPageHistory] = useState<string[]>([]); // Stack of startAfter values
  
  // Search & Filters
  const [search, setSearch] = useState('');
  const [interestMap, setInterestMap] = useState<string>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Expanded Row State
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [remarksInput, setRemarksInput] = useState('');
  const [remarksHistory, setRemarksHistory] = useState<Remark[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [savingRemark, setSavingRemark] = useState(false);

  // Debounce Search
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
        setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Set current user (assumed auth'd from layout)
  useEffect(() => {
     if (auth.currentUser) {
         setCurrentUser(auth.currentUser);
     }
  }, []);

  // Trigger fetch when filters or user changes
  useEffect(() => {
     // Trigger even if currentUser isn't set immediately if accessing directly, 
     // but since it's used for token, we wait for it or ensure the token fetch handles it.
     // Better to wait for auth state or token availability. 
     // Since layout handles waiting, we can assume auth.currentUser is available or check.
     if (auth.currentUser) {
        setPageHistory([]); 
        fetchLeads(null);
     }
  }, [debouncedSearch, interestMap, startDate, endDate]); // removed currentUser dependency to avoid loop if object ref changes

  // Initial fetch manual if dependencies haven't triggered (e.g. empty search)
  useEffect(() => {
      // Adding a small delay or ensuring it runs once if not covered above
      const checkAuthAndFetch = async () => {
          // Retry a few times if auth is initializing
          let attempts = 0;
          while (!auth.currentUser && attempts < 5) {
              await new Promise(r => setTimeout(r, 200));
              attempts++;
          }
          if (auth.currentUser) {
            setCurrentUser(auth.currentUser);
            if (leads.length === 0) fetchLeads(null);
          }
      }
      checkAuthAndFetch();
  }, []);


  const fetchLeads = async (cursor: string | null = null) => {
    setLoading(true);
    setError(null);
    try {
      if (!auth.currentUser) return;
      const token = await auth.currentUser.getIdToken();
      
      const params = new URLSearchParams();
      params.append('limit', limit.toString());
      if (cursor) params.append('lastCreatedAt', cursor);
      if (debouncedSearch) params.append('search', debouncedSearch);
      if (interestMap) params.append('interest', interestMap);
      if (startDate) params.append('from', startDate);
      if (endDate) params.append('to', endDate);

      const res = await fetch(`/api/admin/leads?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!res.ok) {
          const errText = await res.text();
          console.error("API Error:", errText);
          setError("Failed to fetch data. Check console.");
          throw new Error('API Request Failed');
      }

      const data = await res.json();
      setLeads(data.leads || []);
      setTotal(data.total || 0);
      setLastCreatedAt(data.lastVisible);
    } catch (error) {
      console.error("Failed to fetch leads", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (lastCreatedAt) {
      setPageHistory([...pageHistory, lastCreatedAt]);
      fetchLeads(lastCreatedAt);
    }
  };
  
  const handlePrevPage = () => {
      window.location.reload(); 
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const toggleRow = async (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
      setRemarksInput('');
      setRemarksHistory([]);
      setShowHistory(false);
    } else {
      setExpandedId(id);
      setRemarksInput('');
      setShowHistory(false);
    }
  };

  const fetchHistory = async (id: string) => {
    setLoadingHistory(true);
    try {
      if (!auth.currentUser) return;
      const token = await auth.currentUser.getIdToken();

      const res = await fetch(`/api/admin/leads/${id}/remarks`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setRemarksHistory(data.history || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleHistoryClick = (id: string) => {
      if (!showHistory) {
          fetchHistory(id);
      }
      setShowHistory(!showHistory);
  };

  const handleSaveRemark = async (id: string) => {
    if (!remarksInput.trim()) return;
    setSavingRemark(true);
    try {
      if (!auth.currentUser) return;
      const token = await auth.currentUser.getIdToken();

      await fetch(`/api/admin/leads/${id}/remarks`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
            remark: remarksInput,
            createdBy: currentUser?.email || 'Admin'
        })
      });
      setRemarksInput('');
      alert('Remark saved');
      if (showHistory) fetchHistory(id); 
    } catch (err) {
      console.error(err);
      alert('Failed to save');
    } finally {
      setSavingRemark(false);
    }
  };

  return (
    <div className="p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-[#062516]">Leads Management</h1>
        <p className="text-gray-500 text-sm">View and manage form submissions</p>
      </header>

      <div className="space-y-6">
        
        {/* Filters & Search */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-end">
                <form onSubmit={handleSearch} className="flex-1 w-full flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input 
                            type="text" 
                            placeholder="Search name, email, company..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#062516] outline-none text-black"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="bg-[#062516] text-white px-6 py-2 rounded-lg hover:bg-[#051e12] font-medium">
                        Search
                    </button>
                </form>
                <div className="text-gray-600 font-medium whitespace-nowrap">
                    Total Leads: <span className="text-[#062516] font-bold text-xl">{total}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2 border-t border-gray-100">
                 <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">From Date</label>
                    <input 
                        type="date" 
                        className="w-full p-2 border border-gray-200 rounded-lg text-sm text-black"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">To Date</label>
                    <input 
                        type="date" 
                        className="w-full p-2 border border-gray-200 rounded-lg text-sm text-black"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                 </div>
                 <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Interest</label>
                    <select 
                        className="w-full p-2 border border-gray-200 rounded-lg text-sm text-black"
                        value={interestMap}
                        onChange={(e) => setInterestMap(e.target.value)}
                    >
                        <option value="">All Interests</option>
                        <option value="solar">Solar Energy</option>
                        <option value="wind">Wind Power</option>
                        <option value="smart-grid">Smart Grid Technology</option>
                        <option value="consulting">Energy Consulting</option>
                        <option value="other">Other</option>
                    </select>
                 </div>
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
                            <th className="p-4 border-b border-gray-100">Contact Info</th>
                            <th className="p-4 border-b border-gray-100">Company</th>
                            <th className="p-4 border-b border-gray-100">Interest</th>
                            <th className="p-4 border-b border-gray-100">Message</th>
                            <th className="p-4 border-b border-gray-100 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
                        {loading ? (
                            <tr>
                                <td colSpan={7} className="p-8 text-center text-gray-500">Loading leads...</td>
                            </tr>
                        ) : leads.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="p-8 text-center text-gray-500">No leads found matching your criteria.</td>
                            </tr>
                        ) : (
                            leads.map((lead) => (
                                <React.Fragment key={lead.id}>
                                    <tr 
                                        onClick={() => toggleRow(lead.id)}
                                        className={`hover:bg-[#062516]/5 cursor-pointer transition-colors ${expandedId === lead.id ? 'bg-[#062516]/5' : ''}`}
                                    >
                                        <td className="p-4 whitespace-nowrap text-gray-500">
                                            {new Date(lead.createdAt).toLocaleDateString()} <br/>
                                            <span className="text-xs">{new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}</span>
                                        </td>
                                        <td className="p-4 font-medium text-[#062516]">
                                            {lead.fullName || `${lead.firstName} ${lead.lastName}`}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span>{lead.email}</span>
                                                <span className="text-gray-500 text-xs mt-0.5">
                                                    {lead.countryCode ? `${lead.countryCode} ` : ''}{lead.phone}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">{lead.company || '-'}</td>
                                        <td className="p-4">
                                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs capitalize">
                                                {lead.interest}
                                            </span>
                                        </td>
                                        <td className="p-4 max-w-xs truncate text-gray-500" title={lead.message}>
                                            {lead.message}
                                        </td>
                                        <td className="p-4 text-center">
                                            <button className="text-gray-400 hover:text-[#062516]">
                                                {expandedId === lead.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </button>
                                        </td>
                                    </tr>
                                    {/* Expanded Row for Remarks */}
                                    {expandedId === lead.id && (
                                        <tr className="bg-gray-50/50">
                                            <td colSpan={7} className="p-0">
                                                <div className="p-6 border-b border-gray-100 space-y-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                        {/* Full Message View */}
                                                        <div>
                                                            <h4 className="font-bold text-[#062516] mb-2 text-sm uppercase">Full Message</h4>
                                                            <div className="bg-white p-4 rounded-lg border border-gray-200 text-gray-700 leading-relaxed min-h-[120px]">
                                                                {lead.message}
                                                            </div>
                                                        </div>

                                                        {/* Remarks Section */}
                                                        <div>
                                                            <h4 className="font-bold text-[#062516] mb-2 text-sm uppercase">Admin Remarks</h4>
                                                            <textarea
                                                                value={remarksInput}
                                                                onChange={(e) => setRemarksInput(e.target.value)}
                                                                placeholder="Add a new remark..."
                                                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#062516] outline-none min-h-[100px] mb-3"
                                                            />
                                                            <div className="flex gap-3">
                                                                <button 
                                                                    onClick={() => handleSaveRemark(lead.id)}
                                                                    disabled={savingRemark || !remarksInput.trim()}
                                                                    className={`flex items-center px-4 py-2 bg-[#062516] text-white rounded-lg text-sm font-medium hover:bg-[#051e12] ${savingRemark ? 'opacity-50' : ''}`}
                                                                >
                                                                    <Save size={16} className="mr-2" />
                                                                    Save Remark
                                                                </button>
                                                                <button 
                                                                    onClick={() => handleHistoryClick(lead.id)}
                                                                    className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50"
                                                                >
                                                                    <History size={16} className="mr-2" />
                                                                    {showHistory ? 'Hide History' : 'View History'}
                                                                </button>
                                                            </div>

                                                            {/* Remarks History List */}
                                                            {showHistory && (
                                                                <div className="mt-4 space-y-3">
                                                                    <h5 className="font-semibold text-xs text-gray-500 uppercase">History Log</h5>
                                                                    {loadingHistory ? (
                                                                        <div className="text-sm text-gray-500">Loading history...</div>
                                                                    ) : remarksHistory.length === 0 ? (
                                                                        <div className="text-sm text-gray-500 italic">No remarks recorded yet.</div>
                                                                    ) : (
                                                                        <div className="max-h-[200px] overflow-y-auto pr-2 space-y-3">
                                                                            {remarksHistory.map((h) => (
                                                                                <div key={h.id} className="bg-white p-3 rounded border border-gray-100 text-sm">
                                                                                    <p className="text-gray-800">{h.remark}</p>
                                                                                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                                                                                        <span>{new Date(h.timestamp).toLocaleString()}</span>
                                                                                        <span>{h.createdBy}</span>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination Controls */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                 <span className="text-sm text-gray-500">
                     Showing {leads.length} leads
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
                        disabled={leads.length < limit}
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

export default LeadsPage;
