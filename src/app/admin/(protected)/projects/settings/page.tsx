"use client";

import React, { useEffect, useState } from 'react';
import { getProjectSettings, addSettingOption, removeSettingOption, seedAfricanCountries, ProjectSettings } from '@/lib/projectSettings';
import { Plus, Trash2, Globe, Cpu, Activity, Map, ArrowLeft, Loader2, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function ProjectSettingsPage() {
  const [settings, setSettings] = useState<ProjectSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [newValues, setNewValues] = useState({
    countries: '',
    regions: '',
    technologies: '',
    statuses: '',
    locations: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const data = await getProjectSettings();
    setSettings(data);
    setLoading(false);
  };

  const handleAdd = async (category: keyof ProjectSettings) => {
    const value = newValues[category].trim();
    if (!value) return;
    
    try {
      await addSettingOption(category, value);
      setNewValues(prev => ({ ...prev, [category]: '' }));
      await fetchSettings();
    } catch (error) {
      console.error("Error adding option:", error);
    }
  };

  const handleRemove = async (category: keyof ProjectSettings, value: string) => {
    if (!confirm(`Remove "${value}" from ${category}?`)) return;
    
    try {
      await removeSettingOption(category, value);
      await fetchSettings();
    } catch (error) {
      console.error("Error removing option:", error);
    }
  };

  const handleSeed = async () => {
    if (!confirm("This will overwrite existing countries with all African countries. Continue?")) return;
    setLoading(true);
    await seedAfricanCountries();
    await fetchSettings();
  };

  if (loading && !settings) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#062516]" />
      </div>
    );
  }

  const sections = [
    { key: 'regions' as const, label: 'Regions', icon: Map, color: 'text-blue-600', bg: 'bg-blue-50' },
    { key: 'countries' as const, label: 'Countries', icon: Globe, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { key: 'locations' as const, label: 'Specific Sites', icon: MapPin, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { key: 'technologies' as const, label: 'Technologies', icon: Cpu, color: 'text-purple-600', bg: 'bg-purple-50' },
    { key: 'statuses' as const, label: 'Project Statuses', icon: Activity, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <Link 
            href="/admin/projects" 
            className="flex items-center gap-2 text-gray-500 hover:text-[#062516] transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Project Configurator</h1>
          <p className="text-gray-500 mt-1">Manage dynamic dropdown options for project creation</p>
        </div>
        
        <button 
          onClick={handleSeed}
          className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2"
        >
          <Globe className="w-4 h-4" />
          Seed African Countries
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map((section) => (
          <div key={section.key} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className={`p-6 border-b border-gray-50 flex items-center gap-4 ${section.bg}`}>
                <div className={`p-2 rounded-lg bg-white shadow-sm ${section.color}`}>
                    <section.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg">{section.label}</h3>
            </div>
            
            <div className="p-6 flex-grow flex flex-col">
                <div className="flex gap-2 mb-6">
                    <input 
                        type="text" 
                        value={newValues[section.key]}
                        onChange={(e) => setNewValues(prev => ({ ...prev, [section.key]: e.target.value }))}
                        onKeyDown={(e) => e.key === 'Enter' && handleAdd(section.key)}
                        placeholder={`Add ${section.label.toLowerCase()}...`}
                        className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#062516]/10 text-sm !text-black placeholder:text-gray-400 font-medium"
                    />
                    <button 
                        onClick={() => handleAdd(section.key)}
                        className={`p-2.5 text-white rounded-xl transition-colors ${section.color.replace('text', 'bg').replace('-600', '-700')} hover:opacity-90`}
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto pr-2">
                    {settings?.[section.key]?.map((item) => (
                        <div key={item} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-full group hover:border-red-100 hover:bg-red-50 transition-all">
                            <span className="text-sm font-bold !text-black group-hover:text-red-700">{item}</span>
                            <button 
                                onClick={() => handleRemove(section.key, item)}
                                className="text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                    {(!settings?.[section.key] || settings?.[section.key].length === 0) && (
                        <p className="text-gray-400 text-sm italic">No options added yet.</p>
                    )}
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
