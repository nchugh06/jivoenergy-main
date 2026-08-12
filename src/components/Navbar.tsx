"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Navbar.module.css';

type DropdownId = 'about' | 'projects' | null;

/** Region filter ids in the URL (not display names). */
const projectRegions = [
  { id: 'east-africa', label: 'East Africa' },
  { id: 'west-africa', label: 'West Africa' },
  { id: 'southern-africa', label: 'Southern Africa' },
] as const;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownId>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setOpenDropdown(null);
  };

  const openMenu = (id: DropdownId) => {
    setOpenDropdown(id);
  };

  const closeMenu = () => {
    setOpenDropdown(null);
  };

  const toggleDropdown = (id: DropdownId) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const closeAll = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.nav__container}>
          <div className={styles.nav__logo}>
            <Link href="/" className={styles.logoDesktop}>
              <Image
                src="/logo.png"
                alt="JIVO ENERGY"
                width={150}
                height={50}
                className="w-auto object-contain"
              />
            </Link>
            <Link href="/" className={styles.logoMobile}>
              <Image
                src="/logo.png"
                alt="JIVO ENERGY"
                width={150}
                height={50}
                className="w-auto object-contain"
              />
            </Link>
          </div>

          <ul className={`${styles.nav__menu} ${isMenuOpen ? styles.active : ''}`}>
            <li className={styles.nav__item}>
              <a
                className={styles.nav__link}
                onClick={toggleDropdown('about')}
                onMouseEnter={() => openMenu('about')}
                onMouseLeave={closeMenu}
                style={{ cursor: 'pointer' }}
              >
                About JIVO
                <svg
                  className={`${styles.dropdownArrow} ${openDropdown === 'about' ? styles.open : ''}`}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <ul
                className={`${styles.dropdownMenu} ${openDropdown === 'about' ? styles.open : ''}`}
                onMouseEnter={() => openMenu('about')}
                onMouseLeave={closeMenu}
              >
                <li className={styles.dropdownItem}>
                  <a className={styles.dropdownLink} href="/about" onClick={closeAll}>Meet JIVO Energy</a>
                </li>
                <li className={styles.dropdownItem}>
                  <a className={styles.dropdownLink} href="/partners" onClick={closeAll}>Partner</a>
                </li>
                <li className={styles.dropdownItem}>
                  <a className={styles.dropdownLink} href="/certificate" onClick={closeAll}>Certifications</a>
                </li>
                <li className={styles.dropdownItem}>
                  <a className={styles.dropdownLink} href="/esg" onClick={closeAll}>ESG</a>
                </li>
                <li className={styles.dropdownItem}>
                  <a className={styles.dropdownLink} href="/team" onClick={closeAll}>Our Team</a>
                </li>
              </ul>
            </li>
            <li className={styles.nav__item}>
              <a className={styles.nav__link} href="/business-areas" onClick={closeAll}>Business Areas</a>
            </li>
            <li className={styles.nav__item}>
              <a
                className={styles.nav__link}
                onClick={toggleDropdown('projects')}
                onMouseEnter={() => openMenu('projects')}
                onMouseLeave={closeMenu}
                style={{ cursor: 'pointer' }}
              >
                Projects
                <svg
                  className={`${styles.dropdownArrow} ${openDropdown === 'projects' ? styles.open : ''}`}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <ul
                className={`${styles.dropdownMenu} ${openDropdown === 'projects' ? styles.open : ''}`}
                onMouseEnter={() => openMenu('projects')}
                onMouseLeave={closeMenu}
              >
                {projectRegions.map((region) => (
                  <li className={styles.dropdownItem} key={region.id}>
                    <a
                      className={styles.dropdownLink}
                      href={`/projects/${region.id}`}
                      onClick={closeAll}
                    >
                      {region.label}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li className={styles.nav__item}>
              <a className={styles.nav__link} href="/capabilities" onClick={closeAll}>Capabilities</a>
            </li>
            <li className={styles.nav__item}>
              <a className={styles.nav__link} href="/media" onClick={closeAll}>Media</a>
            </li>
            <li className={styles.nav__item}>
              <a className={styles.nav__link} href="/careers" onClick={closeAll}>Careers</a>
            </li>
            <li className={styles.nav__item}>
              <a className={`${styles.nav__link} ${styles.onlymobile}`} href="/contact" onClick={closeAll}>Contact Us</a>
            </li>
          </ul>

          <button
            className={`${styles.nav__toggle} ${isMenuOpen ? styles.active : ''}`}
            aria-label="Toggle menu"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <Link href="/contact">
            <button className={styles.nav__cta}>
              Contact us
              <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.2287 2.62989L5.86852 0.389786C5.70362 0.3456 5.53163 0.334326 5.36237 0.35661C5.19311 0.378893 5.02989 0.434296 4.88205 0.519656C4.7342 0.605016 4.60461 0.718661 4.50069 0.854102C4.39676 0.989543 4.32053 1.14413 4.27634 1.30903C4.23215 1.47393 4.22088 1.64592 4.24316 1.81518C4.26545 1.98444 4.32085 2.14766 4.40621 2.2955C4.49157 2.44335 4.60521 2.57294 4.74066 2.67686C4.8761 2.78079 5.03068 2.85702 5.19558 2.90121L9.26821 3.99247L0.726294 8.92415C0.427657 9.09656 0.209744 9.38055 0.120493 9.71364C0.0312436 10.0467 0.077968 10.4016 0.250386 10.7003C0.422804 10.9989 0.706792 11.2168 1.03988 11.3061C1.37296 11.3953 1.72786 11.3486 2.0265 11.1762L10.5684 6.24449L9.47716 10.3171C9.43247 10.482 9.42082 10.6541 9.44287 10.8236C9.46493 10.993 9.52027 11.1564 9.6057 11.3044C9.69113 11.4523 9.80496 11.5819 9.94066 11.6858C10.0764 11.7896 10.2312 11.8655 10.3964 11.9093C10.7294 11.9985 11.0843 11.9517 11.3828 11.7794C11.6814 11.607 11.8993 11.3231 11.9886 10.9901L14.2287 2.62989Z" fill="white"/>
              </svg>
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
