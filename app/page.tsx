"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import styles from './styles/page.module.css';

export default function Home() {
  const boxRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const [visibleBoxes, setVisibleBoxes] = useState([false, false, false]);

  useEffect(() => {
    const observers = boxRefs.map((ref, index) => {
      return new IntersectionObserver(
        ([entry]) => {
          console.log(`Box ${index} intersection:`, entry.isIntersecting); // Debug log
          if (entry.isIntersecting) {
            setVisibleBoxes(prev => {
              const newVisibleBoxes = [...prev];
              newVisibleBoxes[index] = true;
              console.log(`Setting box ${index} to visible`); // Debug log
              return newVisibleBoxes;
            });
          }
        },
        {
          threshold: 0.1, // Reduce threshold to make it easier to trigger
          rootMargin: '0px' // Remove negative margin
        }
      );
    });

    // Log initial setup
    console.log('Setting up observers');
    
    boxRefs.forEach((ref, index) => {
      if (ref.current) {
        observers[index].observe(ref.current);
        console.log(`Observing box ${index}`); // Debug log
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <div>
      <div style={{ height: '100vh', position: 'relative' }}>
        <Image 
          src="/images/me_forside.jpg" 
          alt="Description" 
          layout="fill" 
          objectFit="cover" 
          quality={100}
        />
      </div>
      <div className={styles.content}>
        <h1>Header Text</h1>
        <p>Some normal text goes here.</p>
        <div className={styles.glassBox}>
          <div className={styles.row}>
            <div className={styles.sideImage}>
              <Image src="/images/react.png" alt="Side 1" width={150} height={150} />
            </div>
            <div className={styles.mainImage}>
              <Image src="/images/flutter.png" alt="Main 1" width={300} height={300} />
            </div>
            <div className={styles.sideImage}>
              <Image src="/images/tailwind.png" alt="Side 2" width={150} height={150} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.sideImage}>
              <Image src="/images/htmlcssjs.png" alt="Side 3" width={150} height={150} />
            </div>
            <div className={styles.mainImage}>
              <Image src="/images/vue.png" alt="Main 2" width={300} height={300} />
            </div>
            <div className={styles.sideImage}>
              <Image src="/images/figma.png" alt="Side 4" width={150} height={150} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.boxContainer}>
        <div 
          className={`${styles.box} ${visibleBoxes[0] ? styles.visible : ''}`} 
          ref={boxRefs[0]}
        >
          <div className={styles.overlay}></div>
          <h2>Frontend Development</h2>
          <Image 
            src="/images/htmlcssjs.png" 
            alt="Frontend Skills" 
            width={300} 
            height={300} 
            priority
          />
        </div>

        <div 
          className={`${styles.box} ${visibleBoxes[1] ? styles.visible : ''}`} 
          ref={boxRefs[1]}
        >
          <div className={styles.overlay}></div>
          <h2>Framework Expertise</h2>
          <Image 
            src="/images/vue.png" 
            alt="Framework Skills" 
            width={300} 
            height={300}
          />
        </div>

        <div 
          className={`${styles.box} ${visibleBoxes[2] ? styles.visible : ''}`} 
          ref={boxRefs[2]}
        >
          <div className={styles.overlay}></div>
          <h2>UI/UX Design</h2>
          <Image 
            src="/images/figma.png" 
            alt="Design Skills" 
            width={300} 
            height={300}
          />
        </div>
      </div>
    </div>
  );
}

