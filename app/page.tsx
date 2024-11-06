"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import styles from './styles/page.module.css';

export default function Home() {
  const boxRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const [visibleBoxes, setVisibleBoxes] = useState([false, false, false]);

  useEffect(() => {
    const handleScroll = () => {
      boxRefs.forEach((ref, index) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            setVisibleBoxes(prev => {
              const newVisibleBoxes = [...prev];
              newVisibleBoxes[index] = true;
              return newVisibleBoxes;
            });
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [boxRefs]);

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
      <div>
        <div className={`${styles.box} ${visibleBoxes[0] ? styles.visible : ''}`} ref={boxRefs[0]}>
          <div className={styles.overlay}></div>
          <h2>Box 1</h2>
          <Image src="/images/htmlcssjs.png" alt="Box 1" width={300} height={300} />
        </div>
        <div className={`${styles.box} ${visibleBoxes[1] ? styles.visible : ''}`} ref={boxRefs[1]}>
          <div className={styles.overlay}></div>
          <h2>Box 2</h2>
          <Image src="/images/flutter.png" alt="Box 2" width={300} height={300} />
        </div>
        <div className={`${styles.box} ${visibleBoxes[2] ? styles.visible : ''}`} ref={boxRefs[2]}>
          <div className={styles.overlay}></div>
          <h2>Box 3</h2>
          <Image src="/images/vue.png" alt="Box 3" width={300} height={300} />
        </div>
      </div>
    </div>
  );
}
