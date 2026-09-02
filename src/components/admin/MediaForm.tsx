"use client";

import React, { useState } from 'react';
import { MediaItem, MediaWritePayload } from '@/types/media';
import { slugify } from '@/lib/media';
import { Loader2 } from 'lucide-react';

interface MediaFormProps {
  initialData?: Partial<MediaItem>;
  onSubmit: (data: MediaWritePayload, imageFile: File | null) => Promise<void>;
  isLoading: boolean;
  submitLabel?: string;
}

const MediaForm: React.FC<MediaFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
  submitLabel = 'Save item',
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    image: initialData?.image || '',
    country: initialData?.country || '',
    slug: initialData?.slug || slugify(initialData?.title || ''),
    link: initialData?.link || '',
    open: initialData?.open === 'tab' ? 'tab' : 'iframe',
    featured: Boolean(initialData?.featured),
    category: initialData?.category || '',
    order: initialData?.order ?? 0,
    published: initialData?.published !== false,
  });
  const [slugTouched, setSlugTouched] = useState(Boolean(initialData?.slug));
  const [imageFile, setImageFile] = useState<File | null>(null);

  const inputClass =
    'w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#062516]/10 focus:border-[#062516]/20 transition-all !text-[#062516] placeholder:text-gray-400 text-sm appearance-none bg-white font-medium';
  const labelClass = 'block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      const checked = e.target.checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }
    if (name === 'slug') {
      setSlugTouched(true);
      setFormData((prev) => ({ ...prev, slug: slugify(value) }));
      return;
    }
    setFormData((prev) => {
      const next = {
        ...prev,
        [name]: name === 'order' ? (value === '' ? 0 : Number(value)) : value,
      };
      if (!slugTouched && name === 'title') {
        next.slug = slugify(value);
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    await onSubmit(
      {
        title: formData.title.trim(),
        description: formData.description.trim(),
        image: formData.image,
        country: formData.country.trim(),
        slug: slugify(formData.slug || formData.title),
        link: formData.link.trim(),
        open: formData.open === 'tab' ? 'tab' : 'iframe',
        featured: Boolean(formData.featured),
        category: formData.category.trim(),
        order: Number(formData.order ?? 0),
        published: Boolean(formData.published),
      },
      imageFile
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
            placeholder="e.g. JIVO Energy commissions solar project"
          />
        </div>

        <div className="col-span-2">
          <label className={labelClass}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className={`${inputClass} resize-y`}
            placeholder="Short summary shown on the card"
          />
        </div>

        <div>
          <label className={labelClass}>Country</label>
          <input
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g. Malawi"
          />
        </div>

        <div>
          <label className={labelClass}>Slug</label>
          <input
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className={inputClass}
            placeholder="auto-from-title"
          />
        </div>

        <div className="col-span-2">
          <label className={labelClass}>External article URL</label>
          <input
            name="link"
            type="url"
            value={formData.link}
            onChange={handleChange}
            className={inputClass}
            placeholder="https://..."
          />
        </div>

        <div>
          <label className={labelClass}>Open behaviour</label>
          <select name="open" value={formData.open} onChange={handleChange} className={inputClass}>
            <option value="iframe">Iframe modal</option>
            <option value="tab">New tab</option>
          </select>
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

        <div>
          <label className={labelClass}>Category badge</label>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={inputClass}
            placeholder='e.g. New (optional)'
          />
        </div>

        <div className="flex flex-col gap-3 justify-end">
          <label className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-gray-200 bg-white cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-[#062516] focus:ring-[#062516]/20 accent-[#062516]"
            />
            <span>
              <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">Featured</span>
              <span className="text-sm font-medium text-[#062516]">Show on homepage carousel</span>
            </span>
          </label>
          <label className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-gray-200 bg-white cursor-pointer">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-[#062516] focus:ring-[#062516]/20 accent-[#062516]"
            />
            <span>
              <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">Published</span>
              <span className="text-sm font-medium text-[#062516]">Visible on the public site</span>
            </span>
          </label>
        </div>

        <div className="col-span-2">
          <label className={labelClass}>Cover image</label>
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
              <img src={formData.image} alt="Current cover" className="h-24 w-auto rounded-lg border border-gray-200" />
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, image: '' }))}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-sm"
                title="Remove image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <p className="text-[10px] text-gray-400 mt-1 font-medium px-1">Current image</p>
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

export default MediaForm;
