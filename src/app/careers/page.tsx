'use client';

import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
  ArrowRight
} from 'lucide-react';

import { countries } from '@/lib/countries';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+91',
    position: '',
    description: '',
    cv: null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create FormData object
    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('countryCode', formData.countryCode);
    data.append('position', formData.position);
    data.append('description', formData.description);
    if (formData.cv) {
      data.append('cv', formData.cv);
    }

    try {
      const response = await fetch('/api/careers', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      alert('Application submitted successfully!');
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        countryCode: '+91',
        position: '',
        description: '',
        cv: null
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('There was an error submitting your application. Please try again.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, cv: e.target.files[0] });
    }
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

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] bg-[#062516] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-120"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#062516]/60 to-[#062516] z-0" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Careers at <span className="text-[#FFFA84]">JIVO Energy</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto">
            Build your future with a company committed to excellence, integrity, and sustainable growth.
          </p>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#062516] mb-8">
            Join Our Vision
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            At JIVO Energy, we are committed to building a highly skilled, diverse, and performance-driven workforce. 
            As we broaden our portfolio and expand our presence across the region, we continue to seek professionals 
            who demonstrate excellence, integrity, and a commitment to delivering results. If you aspire to be part 
            of a reputable and future-focused organisation, we welcome you to explore career opportunities with us.
          </p>
        </div>

        {/* Why Work With Us */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-[#062516] border-l-4 border-[#FFFA84] pl-4">
              Why Work With Us?
            </h3>
            <p className="text-gray-600 mb-6">
              Working with JIVO Energy means becoming part of a stable, growth-oriented company that values 
              professionalism and long-term career development. We are committed to:
            </p>
            <ul className="space-y-4">
              {[
                "Fostering a supportive, inclusive, and collaborative work environment.",
                "Providing opportunities for continuous professional growth and skills development.",
                "Encouraging innovation, ownership, and creativity.",
                "Recognising and rewarding strong performance and dedication.",
                "Promoting work-life balance and offering a competitive compensation package."
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-[#062516] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl group">
             <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#062516]/80 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-2xl font-bold">Growth & Stability</p>
              <p className="opacity-90">Building the future together</p>
            </div>
          </div>
        </div>

        {/* Our Culture & Values */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold text-[#062516] text-center mb-12">Our Culture & Values</h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: Shield, title: "Integrity", desc: "Doing what’s right, consistently and transparently." },
              { icon: Users, title: "Collaboration", desc: "Working together to achieve shared goals." },
              { icon: CheckCircle2, title: "Accountability", desc: "Taking ownership of our responsibilities and outcomes." },
              { icon: TrendingUp, title: "Continuous Improvement", desc: "Embracing learning, growth, and innovation." },
              { icon: Heart, title: "Customer-Focused", desc: "Placing our customers at the heart of everything we do." }
            ].map((value, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#062516]/20 group">
                <div className="w-12 h-12 bg-[#062516]/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#062516] transition-colors duration-300">
                  <value.icon className="w-6 h-6 text-[#062516] group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="text-lg font-bold text-[#062516] mb-2">{value.title}</h4>
                <p className="text-sm text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Life at JIVO & Benefits */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="bg-[#062516] text-white p-10 rounded-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Globe className="mr-3" /> Life at JIVO Energy
              </h3>
              <ul className="space-y-4">
                {[
                  "Collaborative culture",
                  "Project-driven environment",
                  "Safety-first philosophy",
                  "Professional development focus",
                  "Cross-country or multi-site exposure"
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3 opacity-90">
                    <div className="w-1.5 h-1.5 bg-[#FFFA84] rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#FFFA84]/10 rounded-full blur-3xl" />
          </div>

          <div className="bg-[#062516] text-white p-10 rounded-2xl relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Award className="mr-3" /> Employee Benefits
            </h3>
            <ul className="space-y-4">
              {[
                "Health insurance / medical coverage",
                "Annual performance bonuses",
                "Training sponsorships (technical certifications, PMP, HSE, etc.)",
                "Travel opportunities for site or project work",
                "Team outings, learning sessions, mentorship programs"
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-3 text-white">
                  <Zap className="w-5 h-5 text-[#062516] mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Job Openings */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold text-[#062516] mb-4">Current Job Openings</h3>
          <p className="text-gray-600 mb-8">
            Be part of a future-focused team where innovation, collaboration, and purpose come together to create exceptional work. 
            Ready to take the next step in your career? <span className="font-semibold text-[#062516]">Apply Now!</span>
          </p>
          
          <div className="grid gap-6">
            {[
              {
                title: "Technical Manager - Electrical",
                experience: "5 to 10 years",
                location: "Africa (travel required)",
                pdf: "/careers/Technical Manager JD for Careers Page.pdf"
              },
              {
                title: "Logistics Manager",
                experience: "4 to 7 years",
                location: "Gurgaon, India (travel required)",
                pdf: "/careers/Logistics Manager JD for Careers Page.pdf"
              },
              {
                title: "HSES Manager",
                experience: "5 to 7 years",
                location: "Gurgaon, India (travel required)",
                pdf: "/careers/HSES Manager JD for Careers Page.pdf"
              }
            ].map((job, index) => (
              <div key={index} className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between group">
                <div>
                  <h4 className="text-xl font-bold text-[#062516] group-hover:text-[#062516]/80 transition-colors">
                    {job.title}
                  </h4>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1" /> {job.experience}</span>
                    <span className="flex items-center"><Globe className="w-4 h-4 mr-1" /> {job.location}</span>
                  </div>
                </div>
                <a 
                  href={job.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 md:mt-0 px-6 py-2 border border-[#062516] text-[#062516] rounded-full hover:bg-[#062516] hover:text-white transition-all duration-300 text-sm font-medium inline-block text-center"
                >
                  View Details
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form Section */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-16 shadow-sm border border-gray-100">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl font-bold text-[#062516] mb-6">
                Be Part of Our Growth Story
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We are always looking for passionate, hardworking, and talented individuals who want to grow with us. 
                Even if the role listed here doesn’t match your profile, feel free to send us CV. We’re always open to great talent!
              </p>
              
             
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg">
              <h4 className="text-xl font-bold text-[#062516] mb-4">Submit Your Application</h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#062516] focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                    required
                    value={formData.fullName}
                    onChange={handleNameChange} // Strict alpha + space validation
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#062516] focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={handleEmailChange} // Strict no-space validation
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="flex gap-2">
                    <div className="w-1/3 min-w-[120px]">
                      <select
                        value={formData.countryCode}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                        className="w-full h-full px-2 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#062516] focus:border-transparent outline-none transition-all text-sm"
                      >
                        {countries.map((country) => (
                          <option key={`${country.code}-${country.dial_code}`} value={country.dial_code}>
                             {country.code} ({country.dial_code})
                          </option>
                        ))}
                      </select>
                    </div>
                     <input
                       type="tel"
                       id="phone"
                       className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#062516] focus:border-transparent outline-none transition-all"
                       placeholder="5550000000"
                       required
                       value={formData.phone}
                       onChange={handlePhoneChange} // Strict numeric validation
                     />
                   </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">Position Applied For</label>
                  <input
                    type="text"
                    id="position"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#062516] focus:border-transparent outline-none transition-all"
                    placeholder="e.g. Project Manager"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Brief Profile Description</label>
                <textarea
                  id="description"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#062516] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell us a bit about yourself and why you'd be a great fit..."
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attach CV</label>
                <div 
                  onClick={handleFileButtonClick}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#062516] hover:bg-gray-50 transition-all group"
                >
                  <input
                    type="file"
                    id="cv"
                    ref={fileInputRef}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#062516]/10 transition-colors">
                      <Briefcase className="w-5 h-5 text-gray-500 group-hover:text-[#062516]" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {formData.cv ? formData.cv.name : 'Click to upload or drag and drop'}
                    </span>
                    <span className="text-xs text-gray-500">PDF, DOC, DOCX (Max 5MB)</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#062516] text-white py-4 px-6 rounded-lg hover:bg-[#051e12] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Submit Application
              </button>
              
              <p className="text-center text-xs text-gray-500 mt-4">
                Thank you for considering a career with JIVO Energy!
              </p>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Careers;