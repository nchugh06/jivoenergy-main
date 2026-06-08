'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

import { countries } from '@/lib/countries';

import { useRouter } from 'next/navigation';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  company: string;
  subject: string;
  message: string;
  interest: string;
}

const Contact = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+91',
    company: '',
    subject: '',
    message: '',
    interest: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setFormData({ ...formData, fullName: value });
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only basic strict typing prevention here (like spaces), 
    // real email structure validation happens on blur or submit usually,
    // but user asked "only email".
    // A strict regex for partial email input is hard, so we block spaces.
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        countryCode: '+91',
        company: '',
        subject: '',
        message: '',
        interest: ''
      });
      router.push('/thank-you');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const offices = [
    {
      country: "India",
      address: "108 to 111, First Floor, Tower B, Spaze Business Park, Sector-66, Gurgaon, Haryana",
      tel: ""
    },
    {
      country: "Dubai",
      address: "Meydan Grandstand, 6th Floor, Meydan Road, NadEl Sheba, Dubai, U.A.E",
      tel: ""
    },
    {
      country: "Uganda",
      address: "Plot 40, Wanainchi Road, Ministers' Village, Ntinda, Kampala, PO Box 11580",
      tel: ""
    },
    {
      country: "Mauritius",
      address: "4th Floor Ebene Skies, Rue De L'Institut, Ebene, Mauritius",
      tel: ""
    },
    {
      country: "Ethiopia",
      address: "Office no-1203, Eldasol Building, Mike Leyland Street, Bole Sub-City, Woreda 4, House no. New, Addis Ababa, Ethiopia",
      tel: ""
    },
    {
      country: "Portugal",
      address: "Rua, Joaquim Brandao, 13, Floor 1, Setubal, Portugal",
      tel: ""
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section - Reduced height */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
                    <Image
                      src="/assets/contact-banner.jpg" alt="Contact Banner"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#085D36]/25 to-[#04301C]/25"></div>
                    <div className="relative z-10 container mx-auto px-4 text-center">
                      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Contact Us
                      </h1>
                      {/* <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Creating lasting value through environmental stewardship, social responsibility, and strong governance.
                      </p> */}
                    </div>
                  </section>

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
                </div>
              ))}
            </div>

            {/* Social Connect Section - More compact */}
            <div className="bg-[#062516]/10 rounded-lg p-4">
              <h2 className="text-lg font-bold text-[#062516] mb-4">Connect with us</h2>
              <div className="flex justify-center space-x-6">
                <a 
                  href="mailto:africa@jivoenergy.com" 
                  className="flex items-center text-[#062516] hover:text-[#051e12] transition-colors duration-300"
                >
                  <FaEnvelope size={20} />
                  <span className="ml-2">Email</span>
                </a>
                <a 
                  href="https://www.instagram.com/jivoenergy?igsh=MTQ4MDN2bDV6NjJhNA==" target="_blank" className="flex items-center text-[#062516] hover:text-[#051e12] transition-colors duration-300"
                >
                  <FaInstagram size={20} />
                  <span className="ml-2">Instagram</span>
                </a>
                <a 
                  href="https://www.linkedin.com/company/jivo-energy/" target="_blank"
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
                    onChange={handleNameChange} // Strict alpha + space validation
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
                    onChange={handleEmailChange} // Strict no-space validation
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#062516] focus:border-[#062516] outline-none transition-colors text-black"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="col-span-1 sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <div className="w-1/3 min-w-[120px]">
                      <select
                        value={formData.countryCode}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                        className="w-full h-full px-2 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#062516] focus:border-[#062516] outline-none transition-colors text-black bg-white"
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
                      value={formData.phone}
                      onChange={handlePhoneChange} // Strict numeric validation
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#062516] focus:border-[#062516] outline-none transition-colors text-black"
                      placeholder="5550000000"
                    />
                  </div>
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
                  <option value="solar">Solar PV</option>
                  <option value="wind">Battery Energy Storage Systems (BESS)</option>
                  <option value="smart-grid">Transmission & Distribution</option>
                  <option value="consulting">Hybrid Energy Systems</option>
                  <option value="biogas">Biogas & Biomethane</option>
                  <option value="waste-management">Waste Management & Waste-to-Energy</option>
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
