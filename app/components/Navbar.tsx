"use client";

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import './navbar.css';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const { t, i18n } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  // Section highlight logic
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Scroll progress and navbar show/hide logic
  useEffect(() => {
    const handleScroll = () => {
      // Progress bar calculation
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);

      // Navbar hide/show on scroll direction
      if (window.scrollY < 10) {
        setShowNavbar(true);
        lastScrollY.current = window.scrollY;
        return;
      }
      if (window.scrollY > lastScrollY.current && window.scrollY > 80) {
        // Scrolling down
        setShowNavbar(false);
      } else if (window.scrollY < lastScrollY.current) {
        // Scrolling up
        setShowNavbar(true);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Client-side mount check
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false); // Close menu on mobile after click
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setMenuOpen(false); // Close menu on mobile after language change
  };

  // Close menu on window resize if above 1300px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1300 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  return (
    <>
      {/* Progress bar always visible at the top */}
      <div className="navbar-progress-bar" style={{ width: `${scrollProgress}%` }} />
      <nav className={`navbar${showNavbar ? '' : ' navbar--hidden'}`}>
        <div className="navbar-brand">
          <Image
            src="/images/NewLogo.png"
            alt="Logo"
            className="navbar-logo"
            width={48}
            height={48}
            priority
            draggable={false}
          />
        </div>
        <ul className={`navbar-menu${menuOpen ? ' open' : ''}`}>
          <li
            className={activeSection === 'aboutMe' ? 'active' : ''}
            onClick={() => scrollToSection('aboutMe')}
            data-text={t('nav.about')}
          >
            {t('nav.about')}
          </li>
          <li
            className={activeSection === 'aboutProjects' ? 'active' : ''}
            onClick={() => scrollToSection('aboutProjects')}
            data-text={t('nav.projects')}
          >
            {t('nav.projects')}
          </li>
          <li
            className={activeSection === 'myCertificates' ? 'active' : ''}
            onClick={() => scrollToSection('myCertificates')}
            data-text={t('nav.certificates')}
          >
            {t('nav.certificates')}
          </li>

          <li
            className={activeSection === 'endingFooter' ? 'active' : ''}
            onClick={() => scrollToSection('endingFooter')}
            data-text={t('nav.contact')}
          >
            {t('nav.contact')}
          </li>

          {/* Language Switcher */}
          {isMounted && (
            <li className="navbar-language">
              <button
                className={`language-btn ${i18n.language === 'da' ? 'active' : ''}`}
                onClick={() => changeLanguage('da')}
                aria-label="Switch to Danish"
              >
                DA
              </button>
              <span className="language-separator">|</span>
              <button
                className={`language-btn ${i18n.language === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
                aria-label="Switch to English"
              >
                EN
              </button>
            </li>
          )}
        </ul>
        <button
          className={`navbar-hamburger${menuOpen ? ' open' : ''}`}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        {/* Optional: overlay for mobile menu */}
        {menuOpen && <div className="navbar-overlay" onClick={() => setMenuOpen(false)} />}
      </nav>
    </>
  );
};

export default Navbar;
