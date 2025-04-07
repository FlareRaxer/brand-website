import React, { useEffect, useState } from 'react';
import styles from './styles/page.module.css';

export default function Home() {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const fullText = 'Sccharling';
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
          <p className={styles.heroSubText}>Velkommen til min Portfolio</p>
        </div>
      </div>

      <section className={styles.aboutMe}>
      <h2 className={styles.sectionTitle}>Hvem er jeg, Jonas Jensen?</h2>
        <div className={styles.aboutMeWrapper}>
          <div className={styles.aboutDarkWrapper}>
            <div className={styles.aboutMePic}>
              <img src="/images/meFace.png" alt="Profilbillede" />
            </div>
            <div className={styles.aboutMeText}>
              <h3>Jonas Jensen</h3>
              <p>Jeg er uddannet multimediedesigner fra UCL Odense. Jeg er en frontendudvikler og Flutter udvikler, der elsker at skabe brugervenlige og intuitive brugergrænseflader. Jeg har erfaring med React, Vue, Figma, Firebase og meget mere. 
                <br/>
                <br/>
                Derudover er jeg igang med at tage IBM Backend Professional Certificate & Google Cybersecurity Professional Certificate på Coursera</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.aboutProjects}>
      <h2 className={styles.sectionTitle}>Udvalgte projekter</h2>
        <div className={styles.projectWrapper}>
          <div className={styles.projectDarkWrapper}>
            <div className={styles.projectPic}>
              <img src="/images/efterskole.jpg" alt="Praktik opagve" />
            </div>
            <div className={styles.projectText}>
              <h3>Praktikopgave</h3>
              <p>Jeg har arbejdet på en praktikopgave, hvor jeg udviklede en webapplikation ved hjælp af Flutter og Firebase. Dette projekt har givet mig værdifuld erfaring i frontend-udvikling og databaser.</p>
            </div>
          </div>
          <div className={styles.projectDarkWrapper}>
            <div className={styles.projectPic}>
              <img src="/images/efterskole.jpg" alt="Praktik opagve" />
            </div>
            <div className={styles.projectText}>
              <h3>Praktikopgave</h3>
              <p>Jeg har arbejdet på en praktikopgave, hvor jeg udviklede en webapplikation ved hjælp af Flutter og Firebase. Dette projekt har givet mig værdifuld erfaring i frontend-udvikling og databaser.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.proLang}>
        <h2 className={styles.sectionTitle}>Teknologier & Værktøjer</h2>
        
        <div className={styles.proLangWrapper}>
          <div className={styles.techBox}>
            <h3>Vue & React</h3>
            <p>Frontend JavaScript-bibliotek til udvikling af brugergrænseflader.</p>
          </div>
          
          <div className={styles.techBox}>
            <h3>Flutter</h3>
            <p>React framework til produktion med server-side rendering.</p>
          </div>

          <div className={styles.techBox}>
            <h3>Firebase</h3>
            <p>Google&apos;s UI toolkit til at bygge native apps fra én kodebase.</p>
          </div>
          
          <div className={styles.techBox}>
            <h3>Wordpress</h3>
            <p>Design værktøj til prototyping og samarbejde.</p>
          </div>
          
          <div className={styles.techBox}>
            <h3>Rest API</h3>
            <p>Googles platform til mobil- og webapplikationsudvikling.</p>
          </div>
          
          <div className={styles.techBox}>
            <h3>Python</h3>
            <p>Utility-first CSS framework til hurtig UI-udvikling.</p>
          </div>

          <div className={styles.techBox}>
            <h3>Kubernetes & Docker</h3>
            <p>Utility-first CSS framework til hurtig UI-udvikling.</p>
          </div>

          <div className={styles.techBox}>
            <h3>Cybersecurity</h3>
            <p>Utility-first CSS framework til hurtig UI-udvikling.</p>
          </div>

        </div>
      </section>

      <section className={styles.myCertificates}>
        <h2 className={styles.sectionTitle}>Certificates</h2>
        <div className={styles.certificatesWrapper}>
          <div className={styles.certificateDarkWrapper}>
            <div className={styles.certificateContent}>
              <h3>IBM Backend Professional Certificate</h3>
              <p>Comprehensive training in backend development including server-side programming, APIs, databases, and cloud deployment with IBM&apos;s best practices.</p>
              <div className={styles.progressContainer}>
                <div className={styles.progressLabel}>50% Complete</div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{width: '50%'}}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.certificateDarkWrapper}>
            <div className={styles.certificateContent}>
              <h3>Google Cybersecurity Professional Certificate</h3>
              <p>Training in cybersecurity fundamentals including network security, encryption, threat detection, and security protocols.</p>
              <div className={styles.progressContainer}>
                <div className={styles.progressLabel}>Lige begyndt</div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{width: '0%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.endingFooter}>
        <h2>Kontakt mig</h2>
        <p>Content for section 4</p>
      </section>
    </>
  );
}