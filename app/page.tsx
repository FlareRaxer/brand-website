"use client";
import React, { useEffect, useState } from 'react';
import styles from './styles/page.module.css';

export default function Home() {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const fullText = 'SCHARLING STUDIO';
  const typingSpeed = 100;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length -1) {
        setTypedText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(interval);
        setShowCursor(true);
      }
    }, typingSpeed);
    return () => clearInterval(interval);
  }, [fullText, typingSpeed]);

  return (
    <>
      <div className={styles.frontContainer}>
        <div className={styles.hero}>
          <h1 className={styles.heroText}>
            {typedText}
            {showCursor && <span className={styles.blinkingCursor}>_</span>}
          </h1>
          <p className={styles.heroSubText}>Frontendudvikling & Flutter</p>
        </div>
      </div>

      <section className={styles.aboutMe}>
        <div className={styles.aboutMeWrapper}>
          <div className={styles.aboutMePic}>
            <img src="/images/meFace.png" alt="Profilbillede" />
          </div>
          <div className={styles.aboutMeText}>
            <h2>Jonas Jensen</h2>
            <p>Jeg er uddannet multimediedesigner fra UCL Odense. Jeg er en frontendudvikler og Flutter udvikler, der elsker at skabe brugervenlige og intuitive brugergrænseflader. Jeg har erfaring med React, Next.js, Vue, Figma, Firebase og meget mere.</p>
          </div>
        </div>
      </section>

      <section className={styles.proLang}>
        <h2>Section 2</h2>
        <p>Content for section 2</p>
      </section>

      <section className={styles.contactMe}>
        <h2>Section 3</h2>
        <p>Content for section 3</p>
      </section>

      <section className={styles.endingFooter}>
        <h2>Section 4</h2>
        <p>Content for section 4</p>
      </section>
    </>
  );
}