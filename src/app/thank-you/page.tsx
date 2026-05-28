'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaCheckCircle } from 'react-icons/fa';

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="flex justify-center">
             <FaCheckCircle className="text-[#062516] w-24 h-24" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-[#062516]">
            Thank You!
          </h1>
          
          <div className="space-y-4">
            <p className="text-xl text-gray-700">
              We have received your enquiry.
            </p>
            <p className="text-gray-600">
              Our team will review your message and get back to you shortly.
            </p>
          </div>

          <div className="pt-8">
            <Link 
              href="/"
              className="inline-block px-8 py-4 bg-[#062516] text-white rounded-lg font-medium transition-all duration-300 hover:bg-[#051e12] hover:shadow-lg hover:-translate-y-1"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
