import React from 'react';
import styles from './cv.module.css';

export default function CV() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src="/path/to/your/image.jpg" alt="Profile" className={styles.image} />
        <p>Your static text here</p>
      </div>
      <div className={styles.right}>
        <h1>Headline</h1>
        <p>Your scrollable text here...</p>
      </div>
    </div>
  );
}

