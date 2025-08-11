'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Theme = () => {
  const colors = [
    { name: 'Primary Green', hex: '#062516', usage: 'Main brand color, buttons, headings' },
    { name: 'Dark Green', hex: '#051e12', usage: 'Hover states, secondary elements' },
    { name: 'Light Green', hex: '#06251610', usage: 'Backgrounds, subtle highlights' },
    { name: 'White', hex: '#FFFFFF', usage: 'Background, text on dark surfaces' },
    { name: 'Gray', hex: '#6B7280', usage: 'Secondary text, borders' },
  ];

  const typography = [
    { name: 'Headings', example: 'The Quick Brown Fox', size: 'text-4xl font-bold' },
    { name: 'Subheadings', example: 'The Quick Brown Fox', size: 'text-2xl font-semibold' },
    { name: 'Body Text', example: 'The quick brown fox jumps over the lazy dog', size: 'text-base' },
    { name: 'Small Text', example: 'The quick brown fox', size: 'text-sm' },
  ];

  const buttons = [
    { name: 'Primary Button', style: 'bg-[#062516] text-white px-6 py-3 rounded-lg' },
    { name: 'Secondary Button', style: 'border-2 border-[#062516] text-[#062516] px-6 py-3 rounded-lg' },
    { name: 'Text Button', style: 'text-[#062516] underline' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] bg-[#062516]">
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-6xl font-bold text-white text-center px-4">
            Design System
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Colors Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#062516] mb-8">Color Palette</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colors.map((color, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div 
                  className="w-full h-24 rounded-lg mb-4"
                  style={{ backgroundColor: color.hex }}
                />
                <h3 className="text-lg font-semibold text-gray-900">{color.name}</h3>
                <p className="text-gray-600 mb-2">{color.hex}</p>
                <p className="text-sm text-gray-500">{color.usage}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#062516] mb-8">Typography</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            {typography.map((type, index) => (
              <div key={index} className="mb-8 last:mb-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.name}</h3>
                <p className={`${type.size} text-[#062516]`}>{type.example}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Buttons Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#062516] mb-8">Buttons</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex flex-wrap gap-6">
              {buttons.map((button, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{button.name}</h3>
                  <button className={button.style}>
                    Button Text
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Elements Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#062516] mb-8">Form Elements</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="max-w-md space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Input Field
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#062516] focus:border-[#062516] outline-none"
                  placeholder="Enter text here"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Field
                </label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#062516] focus:border-[#062516] outline-none">
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Theme;
