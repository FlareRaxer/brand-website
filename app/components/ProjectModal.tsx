"use client";
import React from 'react';
import styles from './projectModal.module.css';

interface ContentSection {
  type: 'text' | 'image';
  content: string;
  altText?: string;
}

interface ProjectModalProps {
  project: {
    title: string;
    description?: string;
    image: string;
    altText: string;
    content: ContentSection[];
  };
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        
        {/* Hero image */}
        <div className={styles.modalImageContainer}>
          <img src={project.image} alt={project.altText} />
        </div>
        
        <div className={styles.modalTextContent}>
          <h3>{project.title}</h3>
          
          {/* Render content sections */}
          {project.content.map((section, index) => (
            <React.Fragment key={index}>
              {section.type === 'text' ? (
                <p className={styles.contentText}>{section.content}</p>
              ) : (
                <div className={styles.contentImageContainer}>
                  <img 
                    src={section.content} 
                    alt={section.altText || 'Project image'} 
                    className={styles.contentImage}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;