'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white">
      <div className="w-full max-w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="space-y-4 min-w-0">
            <Link href="/" className="block">
              <Image
                src="/logo-white.png"
                alt="JIVO ENERGY"
                width={150}
                height={35}
                className=""
              />
            </Link>
            {/* <p className="text-gray-400 text-sm">
              Empowering sustainable energy solutions for a brighter future.
            </p> */}
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/jivo-energy/" target="_blank" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaLinkedin size={20} />
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaFacebook size={20} />
              </a> */}
              <a href="https://www.instagram.com/jivoenergy?igsh=MTQ4MDN2bDV6NjJhNA==" target="_blank" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.youtube.com/@JIVOEnergy" target="_blank" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaYoutube size={20} />
              </a>
            </div>
            <div className="mt-4">
               <a href="mailto:info@jivoenergy.com" className="text-gray-400 hover:text-white transition-colors text-sm flex flex-wrap items-center gap-x-2 gap-y-1 break-all">
                 <span className="font-semibold text-white">Email:</span> info@jivoenergy.com
               </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:contents">
          {/* Quick Links */}
          <div>
            <p className="text-lg font-semibold mb-4">Quick Links</p>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/projects/east-africa" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/esg" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-lg font-semibold mb-4">Resources</p>
            <ul className="space-y-2">
              <li>
                <Link href="/media" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Media
                </Link>
              </li>
              {/* <li>
                <Link href="/gallery" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Gallery
                </Link>
              </li> */}
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

          </div>

          <div className="md:col-span-2 min-w-0">
            <p className="text-lg font-semibold mb-4">Contact Us</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-gray-400 text-sm items-start">
              <li>
                <span className="block text-white font-medium">India</span>
                108 to 111, First Floor, Tower B, Spaze Business Park, Sector-66, Gurgaon, Haryana
              </li>
              <li>
                <span className="block text-white font-medium">Mauritius</span>
                4th Floor Ebene Skies, Rue De L'Institut, Ebene
              </li>
              <li>
                <span className="block text-white font-medium">U.A.E.</span>
                Meydan Grandstand, 6th Floor, Meydan Road, Nad El Sheba, Dubai
              </li>
              <li>
                <span className="block text-white font-medium">Kenya</span>
                Office No-309, Third Floor, Kanha Building, 10 Lower Kabete Road, Westlands, Nairobi
              </li>
              <li>
                <span className="block text-white font-medium">Uganda</span>
                Unit 10C, The Cube 10th Floor, Plot 5/7, Cooper Road, Kampala
              </li>
              <li>
                <span className="block text-white font-medium">Portugal</span>
                Rua, Joaquim Brandao, 13 2900-422, Setubal
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2026 JIVO ENERGY. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-0">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/sitemap.xml" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
