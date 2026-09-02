"use client";

import React, { useState } from 'react';
import { SeoOgType, SeoPage, SeoTwitterCard, SeoWritePayload, SEO_OG_TYPES, SEO_TWITTER_CARDS } from '@/types/seo';
import { Loader2 } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { slugifySeo } from '@/lib/seo';

interface SeoFormProps {
  initialData?: Partial<SeoPage>;
  onSubmit: (data: SeoWritePayload, files: { ogImageFile: File | null; twitterImageFile: File | null }) => Promise<void>;
  isLoading: boolean;
  submitLabel?: string;
}

const SeoForm: React.FC<SeoFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
  submitLabel = 'Save SEO',
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    path: initialData?.path || '',
    metaTitle: initialData?.metaTitle || '',
    metaDescription: initialData?.metaDescription || '',
    keywords: initialData?.keywords || '',
    canonicalUrl: initialData?.canonicalUrl || '',
    robotsIndex: initialData?.robotsIndex !== false,
    robotsFollow: initialData?.robotsFollow !== false,
    ogTitle: initialData?.ogTitle || '',
    ogDescription: initialData?.ogDescription || '',
    ogImage: initialData?.ogImage || '',
    ogType: (initialData?.ogType || 'website') as SeoOgType,
    twitterCard: (initialData?.twitterCard || 'summary_large_image') as SeoTwitterCard,
    twitterTitle: initialData?.twitterTitle || '',
    twitterDescription: initialData?.twitterDescription || '',
    twitterImage: initialData?.twitterImage || '',
    published: initialData?.published !== false,
  });
  const [ogImageFile, setOgImageFile] = useState<File | null>(null);
  const [twitterImageFile, setTwitterImageFile] = useState<File | null>(null);
  const [slugError, setSlugError] = useState('');

  const inputClass =
    'w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#062516]/10 focus:border-[#062516]/20 transition-all !text-[#062516] placeholder:text-gray-400 text-sm appearance-none bg-white font-medium';
  const labelClass = 'block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1';
  const sectionClass = 'text-sm font-bold text-[#062516] tracking-wide';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: e.target.checked }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'slug') setSlugError('');
  };

  const ensureUniqueSlug = async (rawSlug: string) => {
    const slug = slugifySeo(rawSlug);
    if (!slug) {
      setSlugError('Slug is required and must be unique');
      return '';
    }
    if (!auth.currentUser) return slug;
    const token = await auth.currentUser.getIdToken();
    const params = new URLSearchParams({ slug, checkUnique: 'true' });
    if (initialData?.id) params.set('excludeId', initialData.id);
    const res = await fetch(`/api/admin/seo?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!data.available) {
      setSlugError(`Slug "${slug}" is already in use`);
      return '';
    }
    setSlugError('');
    return slug;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.path.trim() || !formData.name.trim() || !formData.metaTitle.trim() || !formData.metaDescription.trim()) return;
    const uniqueSlug = await ensureUniqueSlug(formData.slug || formData.path);
    if (!uniqueSlug) return;
    await onSubmit(
      {
        name: formData.name.trim(),
        slug: uniqueSlug,
        path: formData.path.trim(),
        metaTitle: formData.metaTitle.trim(),
        metaDescription: formData.metaDescription.trim(),
        keywords: formData.keywords.trim(),
        canonicalUrl: formData.canonicalUrl.trim(),
        robotsIndex: Boolean(formData.robotsIndex),
        robotsFollow: Boolean(formData.robotsFollow),
        ogTitle: formData.ogTitle.trim(),
        ogDescription: formData.ogDescription.trim(),
        ogImage: formData.ogImage,
        ogType: formData.ogType as SeoOgType,
        twitterCard: formData.twitterCard as SeoTwitterCard,
        twitterTitle: formData.twitterTitle.trim(),
        twitterDescription: formData.twitterDescription.trim(),
        twitterImage: formData.twitterImage,
        published: Boolean(formData.published),
      },
      { ogImageFile, twitterImageFile }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 max-w-4xl mx-auto p-10 bg-white rounded-3xl shadow-sm border border-gray-50">
      <section className="space-y-6">
        <h2 className={sectionClass}>Page</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Page name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`${inputClass} text-lg py-3`}
              placeholder="About"
            />
          </div>
          <div>
            <label className={labelClass}>Slug</label>
            <input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              onBlur={async () => {
                const next = slugifySeo(formData.slug || formData.path);
                if (next !== formData.slug) setFormData((prev) => ({ ...prev, slug: next }));
                if (next) await ensureUniqueSlug(next);
              }}
              required
              pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
              title="Lowercase letters, numbers and hyphens only. Must be unique."
              className={`${inputClass} text-lg py-3`}
              placeholder="about"
            />
            <p className={`text-xs mt-1 ml-1 ${slugError ? 'text-red-600' : 'text-gray-400'}`}>
              {slugError || 'Must be unique. Used as /api/seo?slug=about'}
            </p>
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Page URL</label>
            <input
              name="path"
              value={formData.path}
              onChange={handleChange}
              required
              className={`${inputClass} text-lg py-3`}
              placeholder="/about"
            />
            <p className="text-xs text-gray-400 mt-1 ml-1">Use the site path, e.g. / or /business-areas/solar-pv</p>
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-gray-200 bg-white cursor-pointer w-full">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 accent-[#062516]"
              />
              <span>
                <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">Published</span>
                <span className="text-sm font-medium text-[#062516]">Use this SEO record</span>
              </span>
            </label>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className={sectionClass}>Search listing</h2>
        <div>
          <label className={labelClass}>Meta title</label>
          <input
            name="metaTitle"
            value={formData.metaTitle}
            onChange={handleChange}
            required
            maxLength={70}
            className={inputClass}
            placeholder="Page title shown in Google"
          />
          <p className={`text-xs mt-1 ml-1 ${formData.metaTitle.length > 60 ? 'text-amber-600' : 'text-gray-400'}`}>
            {formData.metaTitle.length}/60 characters
          </p>
        </div>
        <div>
          <label className={labelClass}>Meta description</label>
          <textarea
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            required
            rows={3}
            maxLength={180}
            className={`${inputClass} min-h-[88px]`}
            placeholder="Short summary shown under the title in search results"
          />
          <p className={`text-xs mt-1 ml-1 ${formData.metaDescription.length > 160 ? 'text-amber-600' : 'text-gray-400'}`}>
            {formData.metaDescription.length}/160 characters
          </p>
        </div>
        <div>
          <label className={labelClass}>Keywords</label>
          <input
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
            className={inputClass}
            placeholder="renewable energy, solar PV, Africa"
          />
        </div>
        <div>
          <label className={labelClass}>Canonical URL</label>
          <input
            name="canonicalUrl"
            type="url"
            value={formData.canonicalUrl}
            onChange={handleChange}
            className={inputClass}
            placeholder="https://www.jivoenergy.com/about"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-gray-200 bg-white cursor-pointer">
            <input
              type="checkbox"
              name="robotsIndex"
              checked={formData.robotsIndex}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 accent-[#062516]"
            />
            <span className="text-sm font-medium text-[#062516]">Allow indexing</span>
          </label>
          <label className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-gray-200 bg-white cursor-pointer">
            <input
              type="checkbox"
              name="robotsFollow"
              checked={formData.robotsFollow}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 accent-[#062516]"
            />
            <span className="text-sm font-medium text-[#062516]">Follow links</span>
          </label>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className={sectionClass}>Open Graph</h2>
        <div>
          <label className={labelClass}>OG title</label>
          <input
            name="ogTitle"
            value={formData.ogTitle}
            onChange={handleChange}
            className={inputClass}
            placeholder="Defaults to meta title"
          />
        </div>
        <div>
          <label className={labelClass}>OG description</label>
          <textarea
            name="ogDescription"
            value={formData.ogDescription}
            onChange={handleChange}
            rows={3}
            className={`${inputClass} min-h-[88px]`}
            placeholder="Defaults to meta description"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>OG type</label>
            <select name="ogType" value={formData.ogType} onChange={handleChange} className={inputClass}>
              {SEO_OG_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>OG image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) setOgImageFile(e.target.files[0]);
              }}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#062516] file:text-[#FFFA84] hover:file:bg-[#08301d] transition-all cursor-pointer bg-gray-50 p-2 rounded-2xl border border-dashed border-gray-200"
            />
            {formData.ogImage && !ogImageFile && (
              <img src={formData.ogImage} alt="Current OG image" className="mt-3 h-20 rounded-lg object-cover border border-gray-200" />
            )}
            {ogImageFile && (
              <p className="text-[10px] text-blue-600 mt-2 font-bold uppercase tracking-wider">
                New file: {ogImageFile.name}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className={sectionClass}>Twitter / X</h2>
        <div>
          <label className={labelClass}>Twitter card</label>
          <select name="twitterCard" value={formData.twitterCard} onChange={handleChange} className={inputClass}>
            {SEO_TWITTER_CARDS.map((card) => (
              <option key={card} value={card}>
                {card}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Twitter title</label>
          <input
            name="twitterTitle"
            value={formData.twitterTitle}
            onChange={handleChange}
            className={inputClass}
            placeholder="Defaults to OG / meta title"
          />
        </div>
        <div>
          <label className={labelClass}>Twitter description</label>
          <textarea
            name="twitterDescription"
            value={formData.twitterDescription}
            onChange={handleChange}
            rows={3}
            className={`${inputClass} min-h-[88px]`}
            placeholder="Defaults to OG / meta description"
          />
        </div>
        <div>
          <label className={labelClass}>Twitter image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) setTwitterImageFile(e.target.files[0]);
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#062516] file:text-[#FFFA84] hover:file:bg-[#08301d] transition-all cursor-pointer bg-gray-50 p-2 rounded-2xl border border-dashed border-gray-200"
          />
          {formData.twitterImage && !twitterImageFile && (
            <img src={formData.twitterImage} alt="Current Twitter image" className="mt-3 h-20 rounded-lg object-cover border border-gray-200" />
          )}
          {twitterImageFile && (
            <p className="text-[10px] text-blue-600 mt-2 font-bold uppercase tracking-wider">
              New file: {twitterImageFile.name}
            </p>
          )}
        </div>
      </section>

      <div className="flex justify-end pt-6 border-t border-gray-50">
        <button
          type="submit"
          disabled={isLoading || Boolean(slugError)}
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

export default SeoForm;
