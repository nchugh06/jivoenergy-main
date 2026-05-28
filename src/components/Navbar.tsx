import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openDropdown = () => {
    setIsDropdownOpen(true);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <style jsx>{`
        .nav {
          display: flex;
          align-items: center;
          justify-content: center;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 15px 0;
          background: transparent;
        }

        .nav__container {
          position: relative;
          width: 100%;
          height: 60px;
          padding: 0;
          margin: 0 80px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          border: none;
        }

        .nav__container::after {
          content: "";
          position: absolute;
          right: -45px;
          top: 0;
          width: 80px;
          height: 100%;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-top-right-radius: 20px;
          border-bottom-right-radius: 16px;
          z-index: -1;
          transform: skewX(-36deg);
          box-shadow: 7px 6px 10px rgba(0, 0, 0, 0.1);
          border: none;
        }

        .nav__container::before {
          content: "";
          position: absolute;
          left: -45px;
          top: 0;
          width: 80px;
          height: 100%;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-top-left-radius: 20px;
          border-bottom-left-radius: 16px;
          z-index: -1;
          transform: skewX(36deg);
          box-shadow: -7px 8px 10px rgba(0, 0, 0, 0.1);
          border: none;
        }

        .nav__logo {
          padding: 0 15px;
        }

        .nav__logo a {
          display: flex;
          align-items: center;
        }
        
        .logo-desktop {
          display: flex !important;
        }
        
        .logo-mobile {
          display: none !important;
        }

        .nav__menu {
          display: flex;
          list-style: none;
          gap: 15px;
          margin: 0;
          padding: 0;
        }

        .nav__item {
          margin: 0;
          position: relative;
        }

        .nav__link {
          text-decoration: none;
          color: #333;
          font-size: 14px;
          font-weight: 500;
          padding: 6px 10px;
          border-radius: 6px;
          transition: all 0.3s ease;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
        }

        .nav__link:hover {
          background-color: rgba(245, 245, 245, 0.8);
          color: #062516;
        }

        .dropdown-arrow {
          width: 12px;
          height: 12px;
          transition: transform 0.3s ease;
        }

        .dropdown-arrow.open {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          min-width: 180px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          z-index: 1001;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .dropdown-menu.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-item {
          list-style: none;
        }

        .dropdown-link {
          display: block;
          padding: 10px 15px;
          color: #333;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .dropdown-link:last-child {
          border-bottom: none;
        }

        .dropdown-link:hover {
          background-color: rgba(8, 93, 54, 0.1);
          color: #085D36;
        }

        .nav__toggle {
          display: none;
          flex-direction: column;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          margin-right: 15px;
        }

        .nav__toggle span {
          width: 25px;
          height: 3px;
          background-color: #333;
          margin: 3px 0;
          transition: 0.3s;
          border-radius: 2px;
        }

        .nav__cta {
          background: #085D36;
          color: #fff;
          border: none;
          padding: 10px 25px;
          border-radius: 8px 8px 32px 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-right: -10px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 1;
          white-space: nowrap;
          font-family: inherit;
        }

        .nav__cta::after {
          content: "";
          position: absolute;
          right: -22px;
          top: 0;
          width: 50px;
          height: 100%;
          background: #085D36;
          border-top-right-radius: 1rem;
          border-bottom-right-radius: 1rem;
          z-index: -1;
          transform: skewX(-36deg);
        }

        .nav__cta:hover {
          background-color: #051e12;
          transform: translateY(-1px);
        }

        .nav__cta svg {
          transition: transform 0.3s ease;
        }

        .nav__cta:hover svg {
          transform: translateX(2px);
        }

        .onlymobile {
          display: none;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          @keyframes liquid {
            0% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(10px, -5px) rotate(180deg); }
            100% { transform: translate(0, 0) rotate(360deg); }
          }
          
          @keyframes blob {
            0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
            50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
            100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          }

          .nav {
            padding: 0;
            background: transparent;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .nav__container {
            margin: 0;
            width: 100%;
            height: 70px;
            border-radius: 0;
            background: rgba(255, 255, 255, 0.65); /* Extremely liquid/transparent */
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border: none;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05); /* Soft shadow for liquid feel */
            justify-content: space-between;
            padding: 0 20px;
            max-width: 100%;
            overflow: visible !important; /* Allow menu expansion! */
          }
          
          /* Amoeba Effects - contained within a pseudo-clipped area via logic or just let flow? 
             Letting them flow might be weird if they go over main content.
             Ideally we want them BEHIND the blur.
             Since container has overflow:visible, the 'before'/'after' will be visible outside.
             This might actually look cool for "liquid", but lets verify they don't block interactions.
             z-index: -1 ensures they are behind.
          */
          .nav__container::before {
             content: '';
             position: absolute;
             top: -50%;
             left: -20%;
             width: 200px;
             height: 200px;
             background: rgba(8, 93, 54, 0.15); /* Primary green trace */
             border-radius: 40%;
             filter: blur(30px);
             z-index: -1;
             display: block;
             animation: liquid 15s infinite linear, blob 10s infinite ease-in-out alternate;
          }
          
          .nav__container::after {
             content: '';
             position: absolute;
             bottom: -50%;
             right: -20%;
             width: 180px;
             height: 180px;
             background: rgba(255, 250, 132, 0.2); /* Accent yellow trace */
             border-radius: 45%;
             filter: blur(30px);
             z-index: -1;
             display: block;
             animation: liquid 20s infinite reverse linear, blob 12s infinite ease-in-out alternate;
          }

          .logo-desktop {
            display: none !important;
          }
          
          .logo-mobile {
            display: flex !important;
          }

          .nav__logo {
            padding: 0;
            flex-shrink: 0;
            z-index: 10;
          }

          .nav__menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(24px) saturate(180%);
            -webkit-backdrop-filter: blur(24px) saturate(180%);
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            flex-direction: column;
            padding: 10px 20px 30px 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            gap: 0;
            transform: translateY(-20px);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            min-width: unset;
            z-index: 999;
          }

          .nav__menu.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }
          
          /* Add amoeba to menu too */
          .nav__menu::before {
             content: '';
             position: absolute;
             top: 20%;
             right: -10%;
             width: 150px;
             height: 150px;
             background: rgba(8, 93, 54, 0.08);
             border-radius: 50%;
             filter: blur(40px);
             z-index: -1;
          }

          .nav__item {
            width: 100%;
            border-bottom: 1px solid rgba(0,0,0,0.05);
          }
          
          .nav__item:last-child {
            border-bottom: none;
          }

          .nav__link {
            padding: 15px 5px;
            width: 100%;
            justify-content: space-between;
            font-size: 16px;
            font-weight: 600;
            position: relative;
            z-index: 1;
          }

          .dropdown-menu {
            position: static;
            background: rgba(0, 0, 0, 0.03);
            box-shadow: none;
            border: none;
            width: 100%;
            border-radius: 8px;
            opacity: 1;
            visibility: visible;
            transform: none;
            display: none;
            margin-bottom: 10px;
          }

          .dropdown-menu.open {
            display: block;
          }

          .dropdown-link {
            padding: 12px 25px;
            border-bottom: 1px solid rgba(0,0,0,0.05);
            font-size: 14px;
            background-color: transparent;
            color: #555;
          }

          .nav__toggle {
            display: flex;
            order: 2;
            margin-right: 0;
            padding: 10px;
            background: transparent;
            border-radius: 12px;
            transition: background 0.3s;
            z-index: 10;
          }
          
          .nav__toggle:hover {
             background: rgba(0, 0, 0, 0.05);
          }

          .nav__toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
          }

          .nav__toggle.active span:nth-child(2) {
            opacity: 0;
            width: 0;
          }

          .nav__toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
          }

          .nav__cta {
            display: none;
          }

          .onlymobile {
            display: flex;
          }
        }
      `}</style>

      <nav className="nav">
        <div className="nav__container">
          <div className="nav__logo">
           
            <Link href="/" className="logo-mobile">
              <Image
                src="/translogo.png"
                alt="JIVO ENERGY"
                width={150}
                height={50}
                className="h-12 w-auto object-contain"
              />
            </Link>
          </div>
          
          <ul className={`nav__menu ${isMenuOpen ? 'active' : ''}`}>
            <li className="nav__item">
              <a 
                className="nav__link" 
                onClick={toggleDropdown}
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
                style={{ cursor: 'pointer' }}
              >
                JIVO Energy
                <svg 
                  className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}
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
                className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <li className="dropdown-item">
                  <a className="dropdown-link" href="/about">About Us</a>
                </li>
                <li className="dropdown-item">
                  <a className="dropdown-link" href="/partners">Partners</a>
                </li>
                <li className="dropdown-item">
                  <a className="dropdown-link" href="/certificate">Certifications</a>
                </li>
                <li className="dropdown-item">
                  <a className="dropdown-link" href="/esg">ESG</a>
                </li>
                <li className="dropdown-item">
                  <a className="dropdown-link" href="/team">Team</a>
                </li>
              </ul>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="/business-areas">Business Areas</a>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="/projects">Projects</a>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="/capabilities">Capabilities</a>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="/media">Media</a>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="/careers">Careers</a>
            </li>
            <li className="nav__item">
              <a className="nav__link onlymobile" href="/contact">Contact Us</a>
            </li>
          </ul>

          <button 
            className={`nav__toggle ${isMenuOpen ? 'active' : ''}`}
            aria-label="Toggle menu"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <Link href="/contact">
             <button className="nav__cta">
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