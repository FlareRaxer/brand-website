"use client";
import React, { useEffect, useState } from 'react';
import styles from './styles/page.module.css';

function randPercent() {
  return Math.floor(Math.random() * 90);
}

function inHeroBox(top: number, left: number) {
  return top >= 30 && top <= 60 && left >= 25 && left <= 75;
}

function getRandomPosOutsideHero() {
  let top: number, left: number;
  do {
    top = randPercent();
    left = randPercent();
  } while (inHeroBox(top, left));
  return {
    top: top + '%',
    left: left + '%',
  };
}

function Particles() {
  const [smallParticles] = useState(() =>
    Array.from({ length: 50 }, () => getRandomPosOutsideHero())
  );
  const [mediumParticles] = useState(() =>
    Array.from({ length: 35 }, () => getRandomPosOutsideHero())
  );
  const [largeParticles] = useState(() =>
    Array.from({ length: 20 }, () => getRandomPosOutsideHero())
  );

  return (
    <>
      {smallParticles.map((pos, i) => (
        <div key={'sm-' + i} className={`${styles.particle} ${styles.sm}`} style={pos} />
      ))}
      {mediumParticles.map((pos, i) => (
        <div key={'md-' + i} className={`${styles.particle} ${styles.md}`} style={pos} />
      ))}
      {largeParticles.map((pos, i) => (
        <div key={'lg-' + i} className={`${styles.particle} ${styles.lg}`} style={pos} />
      ))}
    </>
  );
}

export default function Home() {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const fullText = 'Scharling Studio';
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
        <Particles />
        <div className={styles.hero}>
          <h1 className={styles.heroText}>
            {typedText}
            {showCursor && <span className={styles.blinkingCursor}>_</span>}
          </h1>
        </div>
      </div>

      <section className={styles.aboutMe}>
        <h2>Section 1</h2>
        <p>Content for section 1</p>
        <div className={styles.aboutMeContainer}>
          <img src="/images/me_forside.jpg" alt="Profilbillede" />
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