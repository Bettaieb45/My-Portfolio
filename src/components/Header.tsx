'use client';

import React, { useState, useEffect } from 'react';
import CtaButton from './CtaButton';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`container-1120 border-b-2 bg-white border-gray-400 fixed top-0 w-full z-50 transition-shadow duration-300 ${
        isScrolled ? 'shadow-md bg-white' : 'shadow-none'
      }`}
    >
      <div className="flex justify-between items-center p-4">
        {/* Logo */}
        <div className="logo text-4xl lg:text-5xl">
          <a
            href="#hero"
            className="text-black hover:text-transparent bg-clip-text bg-gradient-to-r from-black to-slate-400 transition-all duration-300"
          >
            Aziz Portfolio
          </a>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-black focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Menu */}
        <div
          className={`fixed inset-0 z-50 bg-white p-6 flex flex-col items-center justify-center gap-6 transition-transform transform ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:relative lg:translate-x-0 lg:flex-row lg:gap-6 lg:bg-transparent lg:p-0 lg:justify-between`}
        >
          {/* Exit Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 lg:hidden text-black text-4xl focus:outline-none"
          >
            &times;
          </button>

          <nav>
            <ul className="flex flex-col items-center gap-6 lg:flex-row lg:gap-6 text-3xl font-jura">
              <li className="relative group">
                <a
                  href="#hero"
                  onClick={() => setIsMenuOpen(false)} // Close menu on link click
                  className="text-black hover:text-gray-600 transition-colors duration-300"
                >
                  Home
                </a>
                <span className="absolute left-0 -bottom-1 w-0 h-1 bg-black transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li className="relative group">
                <a
                  href="#about"
                  onClick={() => setIsMenuOpen(false)} // Close menu on link click
                  className="text-black hover:text-gray-600 transition-colors duration-300"
                >
                  About
                </a>
                <span className="absolute left-0 -bottom-1 w-0 h-1 bg-black transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li className="relative group">
                <a
                  href="#portfolio"
                  onClick={() => setIsMenuOpen(false)} // Close menu on link click
                  className="text-black hover:text-gray-600 transition-colors duration-300"
                >
                  Portfolio
                </a>
                <span className="absolute left-0 -bottom-1 w-0 h-1 bg-black transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li className="relative group">
                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)} // Close menu on link click
                  className="text-black hover:text-gray-600 transition-colors duration-300"
                >
                  Contact
                </a>
                <span className="absolute left-0 -bottom-1 w-0 h-1 bg-black transition-all duration-300 group-hover:w-full"></span>
              </li>
            </ul>
          </nav>
          <CtaButton text="Hire Me" href="#contact" />
        </div>
      </div>
    </header>
  );
};

export default Header;
