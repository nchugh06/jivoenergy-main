"use client";

import React, { useState, useEffect } from 'react';
import { Project } from '@/types/project';
import { getProjectSettings, ProjectSettings } from '@/lib/projectSettings';
import TiptapEditor from './TiptapEditor';
import { Loader2, ChevronDown } from 'lucide-react';

interface ProjectFormProps {
  initialData?: Partial<Project>;
  onSubmit: (data: Omit<Project, 'id'>, coverImage: File | null, galleryImages: File[]) => Promise<void>;
  isLoading: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const [settings, setSettings] = useState<ProjectSettings | null>(null);
  const [fetchingSettings, setFetchingSettings] = useState(true);

  const [formData, setFormData] = useState<Partial<Project>>({
    title: initialData?.title || '',
    sub_title: initialData?.sub_title || '',
    order: initialData?.order ?? 0,
    country: initialData?.country || '',
    region: initialData?.region || '',
    status: initialData?.status || 'Planned',
    capacity: initialData?.capacity || '',
    technology: initialData?.technology || '',
    description: initialData?.description || '',
    location: initialData?.location || '',
    beneficiary: initialData?.beneficiary || '',
    financing: initialData?.financing || '',
    ...initialData
  });

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);

  useEffect(() => {
    const loadSettings = async () => {
      const data = await getProjectSettings();
      setSettings(data);
      setFetchingSettings(false);
      if (!formData.region && data.regions.length > 0) setFormData(prev => ({ ...prev, region: data.regions[0] }));
    };
    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.country) return;
    // Ensure order is always a number in Firestore (inputs can leave it as string)
    const payload = {
      ...formData,
      order: Number(formData.order ?? 0),
    } as Omit<Project, 'id'>;
    await onSubmit(payload, coverImage, galleryImages);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'order' ? (value === '' ? 0 : Number(value)) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setCoverImage(e.target.files[0]);
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setGalleryImages(Array.from(e.target.files));
  };

  const inputClass = "w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#062516]/10 focus:border-[#062516]/20 transition-all !text-[#062516] placeholder:text-gray-400 text-sm appearance-none bg-white font-medium";
  const labelClass = "block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1";

  if (fetchingSettings) {
    return (
      <div className="flex flex-col items-center justify-center p-20 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-[#062516]" />
        <p className="text-gray-500 text-sm font-medium">Initializing form settings...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto p-10 bg-white rounded-3xl shadow-sm border border-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-2">
          <label className={labelClass}>Project Name</label>
          <input name="title" value={formData.title} onChange={handleChange} required className={`${inputClass} text-lg py-3`} placeholder="e.g. Kleibrok Solar Project" />
        </div>
        <div className="col-span-2">
          <label className={labelClass}>Project Subtitle</label>
          <input
            name="sub_title"
            value={formData.sub_title || ''}
            onChange={handleChange}
            className={`${inputClass} text-lg py-3`}
            placeholder="e.g. 38 MWp Solar PV plant"
          />
        </div>
         <div>
          <label className={labelClass}>Display Order</label>
          <input
            name="order"
            type="number"
            min={0}
            value={formData.order ?? 0}
            onChange={handleChange}
            className={inputClass}
            placeholder="0"
          />
          <p className="text-[10px] text-gray-400 mt-1 ml-1">Lower numbers appear first</p>
        </div>

        <div className="relative">
          <label className={labelClass}>Operating Region</label>
          <select name="region" value={formData.region} onChange={handleChange} className={inputClass}>
            <option value="">Select Region</option>
            {settings?.regions.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
          <ChevronDown className="absolute right-4 top-9 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative">
          <label className={labelClass}>Project Country</label>
          <select name="country" value={formData.country} onChange={handleChange} required className={inputClass}>
            <option value="">Select Country</option>
            {[...(settings?.countries || [])].sort().map(v => <option key={v} value={v}>{v}</option>)}
          </select>
          <ChevronDown className="absolute right-4 top-9 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative">
          <label className={labelClass}>Detailed Site Location</label>
          {settings?.locations && settings.locations.length > 0 ? (
            <select name="location" value={formData.location} onChange={handleChange} className={inputClass}>
              <option value="">Select Site</option>
              {[...(settings.locations)].sort().map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          ) : (
            <input name="location" value={formData.location} onChange={handleChange} className={inputClass} placeholder="Enter site name..." />
          )}
          {settings?.locations && settings.locations.length > 0 && <ChevronDown className="absolute right-4 top-9 w-4 h-4 text-gray-400 pointer-events-none" />}
        </div>

        <div className="relative">
          <label className={labelClass}>Development Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
            {settings?.statuses.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
          <ChevronDown className="absolute right-4 top-9 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <div>
          <label className={labelClass}>System Capacity</label>
          <input name="capacity" value={formData.capacity} onChange={handleChange} placeholder="e.g. 38.5 MWp" className={inputClass} />
        </div>

        <div className="relative">
          <label className={labelClass}>Infrastructure Technology</label>
          <select name="technology" value={formData.technology} onChange={handleChange} className={inputClass}>
            <option value="">Select Tech</option>
            {(settings?.technologies || []).map(v => <option key={v} value={v}>{v}</option>)}
          </select>
          <ChevronDown className="absolute right-4 top-9 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <div>
          <label className={labelClass}>Primary Beneficiary</label>
          <input name="beneficiary" value={formData.beneficiary} onChange={handleChange} placeholder="e.g. Local Municipality" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Financing Entity</label>
          <input name="financing" value={formData.financing} onChange={handleChange} placeholder="e.g. Infrastructure Fund" className={inputClass} />
        </div>

        <div className="col-span-2">
          <label className={labelClass}>Detailed Case Study / Description</label>
          <TiptapEditor content={formData.description || ''} onChange={(newContent) => setFormData(prev => ({ ...prev, description: newContent }))} className="w-full rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#062516]/10 focus:border-[#062516]/20 transition-all min-h-[400px] shadow-sm overflow-hidden" />
        </div>

       

        <div className="col-span-1">
          <label className={labelClass}>Primary Cover Image</label>
          <div className="relative group">
            <input type="file" onChange={handleFileChange} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#062516] file:text-[#FFFA84] hover:file:bg-[#08301d] transition-all cursor-pointer bg-gray-50 p-2 rounded-2xl border border-dashed border-gray-200" />
          </div>
          {formData.imageUrl && !coverImage && (
            <div className="relative mt-2 inline-block">
              <img src={formData.imageUrl} alt="Current Cover" className="h-20 w-auto rounded-lg border border-gray-200" />
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-sm"
                title="Remove Image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <p className="text-[10px] text-gray-400 mt-1 font-medium px-1">Current Image</p>
            </div>
          )}
        </div>

        <div className="col-span-1">
          <label className={labelClass}>Image Gallery (Multiple Allowed)</label>
          <div className="relative group">
            <input type="file" onChange={handleGalleryChange} accept="image/*" multiple className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all cursor-pointer bg-gray-50 p-2 rounded-2xl border border-dashed border-gray-200" />
          </div>

          {formData.galleryUrls && formData.galleryUrls.length > 0 && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {formData.galleryUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img src={url} alt={`Gallery ${index}`} className="h-16 w-full object-cover rounded-lg border border-gray-200" />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, galleryUrls: prev.galleryUrls?.filter((_, i) => i !== index) }))}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-sm opacity-0 group-hover:opacity-100"
                    title="Remove Image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {galleryImages.length > 0 && <p className="text-[10px] text-blue-600 mt-2 font-bold px-1 uppercase tracking-wider">{galleryImages.length} new items selected</p>}
        </div>
      </div>

      <div className="flex justify-end pt-10 border-t border-gray-50">
        <button type="submit" disabled={isLoading} className={`px-12 py-4 rounded-full bg-[#062516] text-[#FFFA84] font-bold tracking-widest uppercase text-xs shadow-xl shadow-[#062516]/20 hover:shadow-[#062516]/30 hover:-translate-y-0.5 transition-all active:translate-y-0 ${isLoading ? 'opacity-70 cursor-not-allowed scale-95' : ''}`}>
          {isLoading ? 'Processing...' : 'Deploy Project'}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
