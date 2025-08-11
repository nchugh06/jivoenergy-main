'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
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
    position: '',
    description: '',
    cv: null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, cv: e.target.files[0] });
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-white">
        <Navbar />
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] bg-[#062516]">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.97,
          }}
        />
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
            Careers at JIVO Energy
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#062516]">Career at JIVO Energy</h2>
            <p className="text-lg text-gray-700">
              At JIVO Energy, we take pride in building a team that is diverse, skilled, and driven by purpose.
              As we expand and take on new challenges, we are always looking to welcome talented professionals 
              who share our vision and values. If you're looking to be part of a dynamic and forward-thinking 
              environment, we invite you to explore opportunities with us and grow your career.
            </p>
            <div className="bg-[#062516]/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#062516] mb-4">Why Join Us?</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Innovative and sustainable work environment
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Opportunities for professional growth
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Competitive compensation and benefits
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Work-life balance
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Application Form */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h3 className="text-2xl font-bold text-[#062516] mb-6">BE A PART OF OUR GROWTH STORY</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#062516] focus:border-[#062516]"
                  required
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#062516] focus:border-[#062516]"
                  required
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#062516] focus:border-[#062516]"
                  required
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                  Position Applied For
                </label>
                <input
                  type="text"
                  id="position"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#062516] focus:border-[#062516]"
                  required
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Brief Profile Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#062516] focus:border-[#062516]"
                  required
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="cv" className="block text-sm font-medium text-gray-700 mb-1">
                  Attach CV
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    id="cv"
                    ref={fileInputRef}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    required
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    onClick={handleFileButtonClick}
                    className="px-4 py-2 bg-[#062516] text-white rounded-md hover:bg-[#051e12] transition-colors duration-300"
                  >
                    Choose File
                  </button>
                  <span className="text-sm text-gray-600">
                    {formData.cv ? formData.cv.name : 'No file chosen'}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Accepted formats: PDF, DOC, DOCX (Max size: 5MB)
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#062516] text-white py-3 px-6 rounded-md hover:bg-[#051e12] transition-colors duration-300"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Careers;
