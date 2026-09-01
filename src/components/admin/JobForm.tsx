"use client";

import React, { useState } from 'react';
import { JobOpening, JobWritePayload } from '@/types/job';
import { Loader2 } from 'lucide-react';

interface JobFormProps {
  initialData?: Partial<JobOpening>;
  onSubmit: (data: JobWritePayload, pdfFile: File | null) => Promise<void>;
  isLoading: boolean;
  submitLabel?: string;
}

const JobForm: React.FC<JobFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
  submitLabel = 'Save job',
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    experience: initialData?.experience || '',
    location: initialData?.location || '',
    pdfUrl: initialData?.pdfUrl || '',
    order: initialData?.order ?? 0,
    published: initialData?.published !== false,
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const inputClass =
    'w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#062516]/10 focus:border-[#062516]/20 transition-all !text-[#062516] placeholder:text-gray-400 text-sm appearance-none bg-white font-medium';
  const labelClass = 'block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    if (!formData.title.trim()) return;
    await onSubmit(
      {
        title: formData.title.trim(),
        experience: formData.experience.trim(),
        location: formData.location.trim(),
        pdfUrl: formData.pdfUrl,
        order: Number(formData.order ?? 0),
        published: Boolean(formData.published),
      },
      pdfFile
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto p-10 bg-white rounded-3xl shadow-sm border border-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-2">
          <label className={labelClass}>Job title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={`${inputClass} text-lg py-3`}
            placeholder="e.g. Technical Manager - Electrical"
          />
        </div>
        <div>
          <label className={labelClass}>Experience</label>
          <input
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="e.g. 5 to 10 years"
          />
        </div>
        <div>
          <label className={labelClass}>Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="e.g. Africa (travel required)"
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
              <span className="text-sm font-medium text-[#062516]">Show on the careers page</span>
            </span>
          </label>
        </div>
        <div className="col-span-2">
          <label className={labelClass}>Job description PDF</label>
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) setPdfFile(e.target.files[0]);
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#062516] file:text-[#FFFA84] hover:file:bg-[#08301d] transition-all cursor-pointer bg-gray-50 p-2 rounded-2xl border border-dashed border-gray-200"
          />
          {formData.pdfUrl && !pdfFile && (
            <p className="text-xs text-gray-500 mt-2">
              Current file:{' '}
              <a href={formData.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-[#062516] font-semibold underline">
                View PDF
              </a>
            </p>
          )}
          {pdfFile && (
            <p className="text-[10px] text-blue-600 mt-2 font-bold px-1 uppercase tracking-wider">
              New file selected: {pdfFile.name}
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

export default JobForm;
