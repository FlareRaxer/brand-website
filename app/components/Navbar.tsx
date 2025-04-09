"use client";

import React, { useEffect, useState } from 'react';
import './navbar.css';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

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
      { threshold: 0.6 } // Adjust threshold to detect when 60% of the section is visible
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav>
      <ul>
        <li
          className={activeSection === 'aboutMe' ? 'active' : ''}
          onClick={() => scrollToSection('aboutMe')}
        >
          Hvem er jeg?
        </li>
        <li
          className={activeSection === 'aboutProjects' ? 'active' : ''}
          onClick={() => scrollToSection('aboutProjects')}
        >
          Projekter
        </li>
        <li
          className={activeSection === 'proLang' ? 'active' : ''}
          onClick={() => scrollToSection('proLang')}
        >
          Teknologier
        </li>
        <li
          className={activeSection === 'myCertificates' ? 'active' : ''}
          onClick={() => scrollToSection('myCertificates')}
        >
          Certificates
        </li>
        <li
          className={activeSection === 'endingFooter' ? 'active' : ''}
          onClick={() => scrollToSection('endingFooter')}
        >
          Kontakt
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
