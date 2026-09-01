"use client";

import React, { useState } from 'react';
import { TeamMember, TeamWritePayload, TEAM_SECTIONS } from '@/types/team';
import { Loader2 } from 'lucide-react';

interface TeamFormProps {
  initialData?: Partial<TeamMember>;
  onSubmit: (data: TeamWritePayload, imageFile: File | null) => Promise<void>;
  isLoading: boolean;
  submitLabel?: string;
}

const TeamForm: React.FC<TeamFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
  submitLabel = 'Save member',
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    role: initialData?.role || '',
    image: initialData?.image || '',
    linkedin: initialData?.linkedin || '',
    section: initialData?.section || 'corporate',
    order: initialData?.order ?? 0,
    published: initialData?.published !== false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const inputClass =
    'w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#062516]/10 focus:border-[#062516]/20 transition-all !text-[#062516] placeholder:text-gray-400 text-sm appearance-none bg-white font-medium';
  const labelClass = 'block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      const checked = e.target.checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'order' ? (value === '' ? 0 : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    await onSubmit(
      {
        name: formData.name.trim(),
        role: formData.role.trim(),
        image: formData.image,
        linkedin: formData.linkedin.trim(),
        section: formData.section,
        order: Number(formData.order ?? 0),
        published: Boolean(formData.published),
      },
      imageFile
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto p-10 bg-white rounded-3xl shadow-sm border border-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={labelClass}>Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="e.g. Rajesh Chugh"
          />
        </div>
        <div>
          <label className={labelClass}>Role</label>
          <input
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g. CEO (used for Leadership)"
          />
        </div>
        <div>
          <label className={labelClass}>Section</label>
          <select name="section" value={formData.section} onChange={handleChange} className={inputClass}>
            {TEAM_SECTIONS.map((section) => (
              <option key={section.id} value={section.id}>
                {section.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>LinkedIn URL</label>
          <input
            name="linkedin"
            type="url"
            value={formData.linkedin}
            onChange={handleChange}
            className={inputClass}
            placeholder="https://www.linkedin.com/in/..."
          />
        </div>
        <div>
          <label className={labelClass}>Display order</label>
          <input
            name="order"
            type="number"
            value={formData.order}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-gray-200 bg-white cursor-pointer w-full">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-[#062516] focus:ring-[#062516]/20 accent-[#062516]"
            />
            <span>
              <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">Published</span>
              <span className="text-sm font-medium text-[#062516]">Show on the team page</span>
            </span>
          </label>
        </div>
        <div className="col-span-2">
          <label className={labelClass}>Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) setImageFile(e.target.files[0]);
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#062516] file:text-[#FFFA84] hover:file:bg-[#08301d] transition-all cursor-pointer bg-gray-50 p-2 rounded-2xl border border-dashed border-gray-200"
          />
          {formData.image && !imageFile && (
            <div className="relative mt-3 inline-block">
              <img src={formData.image} alt="Current photo" className="h-20 w-20 rounded-full object-cover border border-gray-200" />
            </div>
          )}
          {imageFile && (
            <p className="text-[10px] text-blue-600 mt-2 font-bold px-1 uppercase tracking-wider">
              New file selected: {imageFile.name}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-10 border-t border-gray-50">
        <button
          type="submit"
          disabled={isLoading}
          className={`px-12 py-4 rounded-full bg-[#062516] text-[#FFFA84] font-bold tracking-widest uppercase text-xs shadow-xl shadow-[#062516]/20 hover:shadow-[#062516]/30 hover:-translate-y-0.5 transition-all active:translate-y-0 ${isLoading ? 'opacity-70 cursor-not-allowed scale-95' : ''}`}
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </span>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
};

export default TeamForm;
