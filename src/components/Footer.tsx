'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="block">
              <Image
                src="/translogo.png"
                alt="JIVO ENERGY"
                width={150}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm">
              Empowering sustainable energy solutions for a brighter future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaInstagram size={20} />
              </a>
            </div>
            <div className="mt-4">
               <a href="mailto:africa@jivoenergy.com" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                 <span className="font-semibold text-white">Email:</span> africa@jivoenergy.com
               </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/media" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Media
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Column 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>
                <span className="block text-white font-medium">India</span>
                108 to 111, First Floor, Tower B, Spaze Business Park, Sector-66, Gurgaon, Haryana
              </li>
              <li>
                <span className="block text-white font-medium">Dubai</span>
                Meydan Grandstand, 6th Floor, Meydan Road, NadEl Sheba, Dubai, U.A.E
              </li>
              <li>
                <span className="block text-white font-medium">Uganda</span>
                Plot 40, Wanainchi Road, Ministers' Village, Ntinda, Kampala, PO Box 11580
              </li>
            </ul>
          </div>

          {/* Contact Info Column 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 opacity-0 md:opacity-100 select-none">&nbsp;</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>
                <span className="block text-white font-medium">Mauritius</span>
                4th Floor Ebene Skies, Rue De L'Institut, Ebene, Mauritius
              </li>
              <li>
                <span className="block text-white font-medium">Ethiopia</span>
                Office no-1203, Eldasol Building, Mike Leyland Street, Bole Sub-City, Woreda 4, House no. New, Addis Ababa, Ethiopia
              </li>
              <li>
                <span className="block text-white font-medium">Portugal</span>
                Rua, Joaquim Brandao, 13, Floor 1, Setubal, Portugal
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} JIVO ENERGY. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 