'use client';

import React, { useState, useRef, useEffect, type CSSProperties, type ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, type Variants } from 'framer-motion';
import {
  Briefcase,
  Users,
  TrendingUp,
  Award,
  Heart,
  Shield,
  Globe,
  Zap,
  CheckCircle2,
  ArrowRight,
  Mail,
  Upload,
  X,
  Lightbulb,
} from 'lucide-react';

import { countries } from '@/lib/countries';
import { JobOpening } from '@/types/job';
import './careers.css';

const MOBILE_QUERY = '(max-width: 767px)';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return isMobile;
}

const CULTURE_VALUES = [
  { icon: Shield, title: 'Integrity', desc: 'Doing what’s right, consistently and transparently.' },
  { icon: Users, title: 'Collaboration', desc: 'Working together to achieve shared goals.' },
  { icon: CheckCircle2, title: 'Accountability', desc: 'Taking ownership of our responsibilities and outcomes.' },
  { icon: TrendingUp, title: <>Continuous<br />Improvement</>, desc: 'Embracing learning, growth, and innovation.' },
  { icon: Heart, title: 'Customer-Focused', desc: 'Placing our customers at the heart of everything we do.' },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  position: string;
  description: string;
  cv: File | null;
}

const Careers = () => {
  const isMobile = useIsMobile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+91',
    position: '',
    description: '',
    cv: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const loadJobs = async () => {
      try {
        const res = await fetch('/api/jobs', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load jobs');
        const data = await res.json();
        if (!cancelled) setJobs(data.items || []);
      } catch (error) {
        console.error('Error loading job openings:', error);
        if (!cancelled) setJobs([]);
      } finally {
        if (!cancelled) setJobsLoading(false);
      }
    };
    loadJobs();
    return () => {
      cancelled = true;
    };
  }, []);

  const emptyForm: FormData = {
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+91',
    position: '',
    description: '',
    cv: null,
  };

  const applyForJob = (title: string) => {
    setFormData((prev) => ({ ...prev, position: title }));
    setSubmitStatus('idle');
    document.getElementById('careers-apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.cv) {
      setSubmitStatus('error');
      setSubmitMessage('Please attach your CV (PDF, DOC, or DOCX, max 5MB).');
      return;
    }

    const data = new FormData();
    data.append('fullName', formData.fullName.trim());
    data.append('email', formData.email.trim());
    data.append('phone', formData.phone.trim());
    data.append('countryCode', formData.countryCode);
    data.append('position', formData.position.trim());
    data.append('description', formData.description.trim());
    data.append('cv', formData.cv);

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/careers', {
        method: 'POST',
        body: data,
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || 'Failed to submit application');
      }

      setSubmitStatus('success');
      setSubmitMessage('Application submitted successfully. We will be in touch.');
      setFormData(emptyForm);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : 'There was an error submitting your application. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const applyCv = (file: File | undefined) => {
    if (!file) return;
    const name = file.name.toLowerCase();
    const allowed = name.endsWith('.pdf') || name.endsWith('.doc') || name.endsWith('.docx');
    if (!allowed) {
      setSubmitStatus('error');
      setSubmitMessage('CV must be a PDF, DOC, or DOCX file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setSubmitStatus('error');
      setSubmitMessage('CV must be 5MB or smaller.');
      return;
    }
    setSubmitStatus('idle');
    setSubmitMessage('');
    setFormData((prev) => ({ ...prev, cv: file }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    applyCv(e.target.files?.[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    applyCv(e.dataTransfer.files?.[0]);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setFormData({ ...formData, fullName: value });
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/\s/.test(value)) {
      setFormData({ ...formData, email: value });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, phone: value });
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const clearCv = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFormData((prev) => ({ ...prev, cv: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* <div className="min-h-screen bg-white font-sans text-gray-800"> */}
      <Navbar />

      {/* Hero Section */}
      <div className="page-hero bg-[#062516]">
        <div
          className="absolute inset-0 z-0 opacity-120"
          style={{
            // backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80")',
            backgroundImage: 'url("/assets/banners/Career.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-[#062516]/60 to-[#062516] z-0" /> */}

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-up">
          {/* <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            CAREERS
          </h1> */}
          {/* <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto text-center">
            Build your future with a company committed to excellence, integrity, and sustainable growth.
          </p> */}
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-5 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-7xl mx-auto mb-16">
          <h1 className="section-title-spl section-title-lock text-center text-[#062516] mb-10">Careers</h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="text-lg text-gray-600 leading-relaxed">
              At <strong>JIVO Energy</strong>, we are committed to building a highly skilled, diverse, and performance-driven workforce.
              As we broaden our portfolio and expand our presence across the region, we continue to seek professionals
              who demonstrate excellence, integrity, and a commitment to delivering results. If you aspire to be part
              of a reputable and future-focused organisation, we welcome you to explore career opportunities with us.
            </p>
          </motion.div>
        </div>

        {/* Why Work With Us */}
        <motion.div
          className="careers-why"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <article className="careers-why__cell careers-why__inclusive">
            <Users className="careers-why__icon" />
            <h3 className="careers-why__name">Inclusive Environment</h3>
            <p className="careers-why__desc">
              Fostering a supportive, inclusive, and collaborative work environment.
            </p>
          </article>

          <div className="careers-why__photo">
            <img
              className="careers-why__photo-img"
              src="/assets/cell-center-image.png"
              alt="Growth & Stability"
            />
          </div>

          <div className="careers-why__cell careers-why__title">
            <p className="careers-why__kicker">Growth &amp; Stability</p>
            <h2 className="careers-why__heading">
              <span>Why</span>
              <span>Work</span>
              <span>With Us?</span>
            </h2>
            <p className="careers-why__lede">
              Working with JIVO Energy means becoming part of a stable, growth-oriented company that values
              professionalism and long-term career development. We are committed to promoting work-life balance
              and offering a competitive compensation package.
            </p>
          </div>

          <article className="careers-why__cell careers-why__growth">
            <TrendingUp className="careers-why__icon" />
            <h3 className="careers-why__name">Professional Growth</h3>
            <p className="careers-why__desc">
              Providing opportunities for continuous professional growth and skills development.
            </p>
          </article>

          <article className="careers-why__cell careers-why__innovation">
            <Lightbulb className="careers-why__icon" />
            <h3 className="careers-why__name">Innovation &amp; Ownership</h3>
            <p className="careers-why__desc">
              Encouraging innovation, ownership, and creativity.
            </p>
          </article>

          <article className="careers-why__cell careers-why__recognition">
            <Award className="careers-why__icon" />
            <h3 className="careers-why__name">Recognition &amp; Rewards</h3>
            <p className="careers-why__desc">
              Recognising and rewarding strong performance and dedication.
            </p>
          </article>
        </motion.div>

        {/* Our Culture & Values */}
        <div className="careers-values mb-24">
          <h2 className="section-title section-title-lock text-center text-[#062516]">Our Culture & Values</h2>
          <div className="careers-values__grid">
            {CULTURE_VALUES.map((value, index) => {
              const isEven = index % 2 === 0;
              const itemStyle: CSSProperties = {
                backgroundColor: isEven ? '#85c54a' : '#1c4832',
                color: isEven ? '#125d36' : '#ffffff',
              };
              const Icon = value.icon;
              const card: ReactNode = (
                <div className="careers-values__content">
                  <span className="careers-values__icon">
                    <Icon />
                  </span>
                  <h3 className="careers-values__name">{value.title}</h3>
                  <p className="careers-values__desc">{value.desc}</p>
                </div>
              );

              if (isMobile) {
                return (
                  <div key={index} className="careers-values__item" style={itemStyle}>
                    {card}
                  </div>
                );
              }

              return (
                <ScrollReveal
                  key={index}
                  className="careers-values__item"
                  delay={(index + 1) * 0.15}
                  from="right"
                  distance={90}
                  style={itemStyle}
                >
                  {card}
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Life at JIVO & Benefits */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="bg-[#F5FBF5] text-white p-10 rounded-2xl relative overflow-hidden">
            <div className="relative z-10 text-[#062516]">
              <h2 className="section-title section-title-lock mb-6 flex items-center">
                Life at JIVO Energy
              </h2>
              <ul className="space-y-4">
                {[
                  "Collaborative culture",
                  "Project-driven environment",
                  "Safety-first philosophy",
                  "Professional development focus",
                  "Cross-country or multi-site exposure"
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3 opacity-90">
                    <div className="w-1.5 h-1.5 bg-[#062516] rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#FFFA84]/10 rounded-full blur-3xl" />
          </div>

          <div className="bg-[#062516] text-white p-10 rounded-2xl relative overflow-hidden">
            <h2 className="section-title section-title-lock mb-6 flex items-center">
              Employee Benefits
            </h2>
            <ul className="space-y-4">
              {[
                "Health insurance / medical coverage",
                "Annual performance bonuses",
                "Training sponsorships (technical certifications, PMP, HSE, etc.)",
                "Travel opportunities for site or project work",
                "Team outings, learning sessions, mentorship programs"
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-3 text-white">
                  <div className="w-1.5 h-1.5 bg-[#ffffff] mt-2.5 rounded-full" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      {/* Job Openings */}
      <section className="careers-jobs">
        <div className="careers-jobs__inner">
          <motion.div
            className="careers-jobs__head"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="section-title section-title-lock text-center text-[#062516]">Current Job Openings</h2>
            <p className="careers-jobs__note">
              Be part of a future-focused team where innovation, collaboration, and purpose come together to create exceptional work.
              Ready to take the next step in your career?
            </p>
          </motion.div>

          {jobsLoading ? (
            <div className="careers-jobs__loading">
              <div className="careers-jobs__spinner" />
            </div>
          ) : jobs.length === 0 ? (
            <p className="careers-jobs__empty">
              There are no current openings. You can still send us your CV below.
            </p>
          ) : (
          <motion.div
            className="careers-jobs__list"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            {jobs.map((job) => (
              <motion.article
                key={job.id}
                variants={fadeUp}
                className="careers-job-card"
              >
                <span className="careers-job-card__accent" aria-hidden="true" />
                <div className="careers-job-card__body">
                  <h3>{job.title}</h3>
                  <div className="careers-job-card__meta">
                    <div className="careers-job-card__meta-item">
                      <span className="careers-job-card__meta-icon">
                        <Briefcase className="w-4 h-4" />
                      </span>
                      <span>
                        <span className="careers-job-card__meta-label">Experience</span>
                        <span className="careers-job-card__meta-value">{job.experience}</span>
                      </span>
                    </div>
                    <div className="careers-job-card__meta-item">
                      <span className="careers-job-card__meta-icon">
                        <Globe className="w-4 h-4" />
                      </span>
                      <span>
                        <span className="careers-job-card__meta-label">Location</span>
                        <span className="careers-job-card__meta-value">{job.location}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="careers-job-card__actions">
                  {job.pdfUrl && (
                    <a
                      href={job.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="careers-job-card__cta careers-job-card__cta--ghost"
                    >
                      View Details
                    </a>
                  )}
                  <button
                    type="button"
                    className="careers-job-card__cta"
                    onClick={() => applyForJob(job.title)}
                  >
                    Apply
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>
          )}

        </div>
      </section>

      <section className="careers-apply" id="careers-apply">
        <div className="careers-apply__inner">
          <motion.div
            className="careers-apply__intro"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="careers-apply__title">
              Be Part of Our
              <span>Growth Story</span>
            </h2>
            <div className="careers-apply__rule" aria-hidden="true">
              <span />
              <i />
              <i />
            </div>
            <p>
              We are always looking for passionate, hardworking, and talented individuals who want to grow with us.
              Even if the role listed here doesn’t match your profile, feel free to send us CV. We’re always open to great talent!
            </p>
          </motion.div>

          <motion.div
            className="careers-apply__form-wrap"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <form onSubmit={handleSubmit} className="careers-apply__form">
              <div className="careers-apply__form-head">
                <h3>Submit Your Application</h3>
              </div>

              <div className="careers-apply__row careers-apply__row--2">
                <div className="careers-apply__field">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="John Doe"
                    required
                    value={formData.fullName}
                    onChange={handleNameChange}
                  />
                </div>
                <div className="careers-apply__field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>

              <div className="careers-apply__field">
                <label htmlFor="phone">Phone Number</label>
                <div className="careers-apply__phone">
                  <select
                    aria-label="Country code"
                    value={formData.countryCode}
                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                  >
                    {countries.map((country) => (
                      <option key={`${country.code}-${country.dial_code}`} value={country.dial_code}>
                        {country.code} ({country.dial_code})
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Enter phone number"
                    required
                    value={formData.phone}
                    onChange={handlePhoneChange}
                  />
                </div>
              </div>

              <div className="careers-apply__field">
                <label htmlFor="position">Position Applied For</label>
                <input
                  type="text"
                  id="position"
                  placeholder="e.g. Project Manager"
                  required
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                />
              </div>

              <div className="careers-apply__field">
                <label htmlFor="description">Brief Profile Description</label>
                <textarea
                  id="description"
                  rows={3}
                  placeholder="Tell us a bit about yourself and why you'd be a great fit..."
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="careers-apply__field careers-apply__field--cv">
                <div className="careers-apply__cv-label">
                  <label htmlFor="cv">Attach CV</label>
                  <span>PDF, DOC, DOCX · Max 5MB · Required</span>
                </div>
                <div
                  className={`careers-apply__dropzone${isDragging ? ' is-dragging' : ''}${formData.cv ? ' has-file' : ''}`}
                  onClick={handleFileButtonClick}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleFileButtonClick();
                    }
                  }}
                >
                  <input
                    type="file"
                    id="cv"
                    ref={fileInputRef}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <span className="careers-apply__drop-icon">
                    <Upload className="w-4 h-4" />
                  </span>
                  <span className="careers-apply__drop-title">
                    {formData.cv ? formData.cv.name : 'Upload file or drag and drop'}
                  </span>
                  {formData.cv && (
                    <button
                      type="button"
                      className="careers-apply__drop-clear"
                      aria-label="Remove CV"
                      onClick={clearCv}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {submitStatus === 'success' && (
                <p className="careers-apply__status careers-apply__status--success" role="status">
                  {submitMessage}
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="careers-apply__status careers-apply__status--error" role="alert">
                  {submitMessage}
                </p>
              )}

              <button type="submit" className="careers-apply__submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </button>

              <p className="careers-apply__secure">
                <Shield className="w-3.5 h-3.5" />
                Your information is kept confidential and secure.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
      {/* </div> */}
    </div>
  );
};

export default Careers;
