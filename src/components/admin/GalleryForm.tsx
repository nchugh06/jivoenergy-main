"use client";

import React, { useState } from 'react';
import { GalleryVideo, GalleryWritePayload } from '@/types/gallery';
import { Loader2 } from 'lucide-react';

interface GalleryFormProps {
  initialData?: Partial<GalleryVideo>;
  onSubmit: (data: GalleryWritePayload, thumbnailFile: File | null) => Promise<void>;
  isLoading: boolean;
  submitLabel?: string;
}

const GalleryForm: React.FC<GalleryFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
  submitLabel = 'Save video',
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    youtubeId: initialData?.youtubeId || '',
    country: initialData?.country || '',
    duration: initialData?.duration || '',
    thumbnail: initialData?.thumbnail || '',
    order: initialData?.order ?? 0,
    published: initialData?.published !== false,
  });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const inputClass =
    'w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#062516]/10 focus:border-[#062516]/20 transition-all !text-[#062516] placeholder:text-gray-400 text-sm appearance-none bg-white font-medium';
  const labelClass = 'block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (e.target.type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: e.target.checked }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'order' ? (value === '' ? 0 : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.youtubeId.trim()) return;
    await onSubmit(
      {
        title: formData.title.trim(),
        youtubeId: formData.youtubeId.trim(),
        country: formData.country.trim(),
        duration: formData.duration.trim(),
        thumbnail: formData.thumbnail,
        order: Number(formData.order ?? 0),
        published: Boolean(formData.published),
      },
      thumbnailFile
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto p-10 bg-white rounded-3xl shadow-sm border border-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-2">
          <label className={labelClass}>Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={`${inputClass} text-lg py-3`}
            placeholder="Video title shown on the homepage"
          />
        </div>
        <div className="col-span-2">
          <label className={labelClass}>YouTube URL or video ID</label>
          <input
            name="youtubeId"
            value={formData.youtubeId}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="https://www.youtube.com/watch?v=... or 3y1EAJ7Nrd4"
          />
        </div>
        <div>
          <label className={labelClass}>Country</label>
          <input
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g. Malawi (optional, used on project pages)"
          />
        </div>
        <div>
          <label className={labelClass}>Duration</label>
          <input
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g. 4:48"
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
              <span className="text-sm font-medium text-[#062516]">Show on the website</span>
            </span>
          </label>
        </div>
        <div className="col-span-2">
          <label className={labelClass}>Thumbnail (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) setThumbnailFile(e.target.files[0]);
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#062516] file:text-[#FFFA84] hover:file:bg-[#08301d] transition-all cursor-pointer bg-gray-50 p-2 rounded-2xl border border-dashed border-gray-200"
          />
          <p className="text-xs text-gray-400 mt-2">Leave empty to use the YouTube thumbnail.</p>
          {formData.thumbnail && !thumbnailFile && (
            <div className="relative mt-3 inline-block">
              <img src={formData.thumbnail} alt="Current thumbnail" className="h-20 w-auto rounded-lg border border-gray-200" />
            </div>
          )}
          {thumbnailFile && (
            <p className="text-[10px] text-blue-600 mt-2 font-bold px-1 uppercase tracking-wider">
              New file selected: {thumbnailFile.name}
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

export default GalleryForm;
