'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  interest: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    interest: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically make an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        interest: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const offices = [
    {
      country: "Spain",
      address: "Calle de Orense, 34, Torre Norte, Piso 10, 28020 Madrid, Spain",
      tel: ""
    },
    {
      country: "India",
      address: "108 to 111, First Floor, Tower B, Spaze Business Park, Sector-66, Gurgaon, Haryana",
      tel: "+91 99920 06899"
    },
    {
      country: "Mauritius",
      address: "4th Floor Ebene Skies, Rue De L'Institut, Ebene, Mauritius",
      tel: ""
    },
    {
      country: "Uganda",
      address: "6th Floor Trust Tower, Plot 4, Kyadondo Road, Kampala, Uganda",
      tel: "+256 763 804483"
    },
    {
      country: "Dubai",
      address: "Meydan Grandstand, 6th Floor, Meydan Road, Nad El Sheba, Dubai, U.A.E",
      tel: "+971 52 530 8095"
    },
    {
      country: "Ethiopia",
      address: "Office no-1203, Eldasol Building, Mike Leyland Street, Bole Sub-City, Woreda 4, House no. New, Addis Ababa, Ethiopia",
      tel: "+251 9347 97090"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section - Reduced height */}
      <div className="relative w-full h-[65vh] bg-[#062516] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        >
          <source src="/power.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-7xl font-bold text-white text-center px-4">
            CONTACT US
          </h1>
        </div>
      </div>

      {/* Main Content - Optimized spacing */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Office Locations & Social */}
          <div className="space-y-6">
            {/* Office Locations - More compact grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {offices.map((office, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow duration-300"
                >
                  <h3 className="text-lg font-bold text-[#062516] mb-2">{office.country}</h3>
                  <p className="text-sm text-gray-700 mb-2 whitespace-pre-line">{office.address}</p>
                  {office.tel && (
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Tel:</span> {office.tel}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Social Connect Section - More compact */}
            <div className="bg-[#062516]/10 rounded-lg p-4">
              <h2 className="text-lg font-bold text-[#062516] mb-4">Connect with us</h2>
              <div className="flex justify-center space-x-6">
                <a 
                  href="mailto:info@jivoenergy.com" 
                  className="flex items-center text-[#062516] hover:text-[#051e12] transition-colors duration-300"
                >
                  <FaEnvelope size={20} />
                  <span className="ml-2">Email</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center text-[#062516] hover:text-[#051e12] transition-colors duration-300"
                >
                  <FaInstagram size={20} />
                  <span className="ml-2">Instagram</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center text-[#062516] hover:text-[#051e12] transition-colors duration-300"
                >
                  <FaLinkedin size={20} />
                  <span className="ml-2">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#062516] mb-4">Have an Enquiry?</h2>
            <p className="text-gray-600 mb-6">
              Send us your enquiry and our team will respond to you shortly.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#062516] focus:border-[#062516] outline-none transition-colors text-black"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#062516] focus:border-[#062516] outline-none transition-colors text-black"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#062516] focus:border-[#062516] outline-none transition-colors text-black"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#062516] focus:border-[#062516] outline-none transition-colors text-black"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
                  Area of Interest *
                </label>
                <select
                  id="interest"
                  required
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#062516] focus:border-[#062516] outline-none transition-colors text-black"
                >
                  <option value="">Select an option</option>
                  <option value="solar">Solar Energy</option>
                  <option value="wind">Wind Power</option>
                  <option value="smart-grid">Smart Grid Technology</option>
                  <option value="consulting">Energy Consulting</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#062516] focus:border-[#062516] outline-none transition-colors resize-none text-black"
                  placeholder="Tell us about your project or inquiry..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 text-green-700 rounded-lg">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                  Sorry, there was an error submitting your message. Please try again.
                </div>
              )}

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-4 bg-[#062516] text-white rounded-lg font-medium transition-all duration-300 ${
                    isSubmitting
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-[#051e12] hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
