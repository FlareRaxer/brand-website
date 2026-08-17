"use client";
import React, { useEffect } from 'react';
import styles from './projectModal.module.css';
import StoreLinks, { StoreLinksData } from './StoreLinks';

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
    storeLinks?: StoreLinksData;
  };
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent} role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          ×
        </button>
        
        {/* Hero image */}
        <div className={styles.modalImageContainer}>
          <img src={project.image} alt={project.altText} />
        </div>
        
        <div className={styles.modalTextContent}>
          <h3 id="project-modal-title">{project.title}</h3>

          {project.storeLinks && (
            <StoreLinks links={project.storeLinks} className={styles.modalStoreLinks} />
          )}
          
          {/* Render content sections */}
          {project.content.map((section, index) => (
            <React.Fragment key={index}>
              {section.type === 'text' ? (
                <p 
                  className={styles.contentText}
                  dangerouslySetInnerHTML={{ __html: section.content }}
                ></p>
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
