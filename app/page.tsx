"use client";
import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import styles from './styles/page.module.css';
import ProjectModal from './components/ProjectModal';

interface ContentSection {
  type: 'text' | 'image';
  content: string;
  altText?: string; // Only needed for images
}

interface Project {
  id: number;
  title: string;
  description: string; // Short description for the card
  image: string; // Main preview image
  altText: string;
  technologies: string[];
  content: ContentSection[]; // Array of content sections for the modal
}

const SkillLevel = ({ level }: { level: 'beginner' | 'intermediate' | 'advanced' }) => {
  return (
    <div className={styles.skillLevelContainer}>
      {/* Always active */}
      <div className={`${styles.skillLevel} ${styles.skillBeginner} ${styles.skillActive}`}></div>
      
      {/* Active for intermediate and advanced */}
      <div className={`${styles.skillLevel} ${styles.skillIntermediate} ${
        level === 'beginner' ? styles.skillInactive : styles.skillActive
      }`}></div>
      
      {/* Active only for advanced */}
      <div className={`${styles.skillLevel} ${styles.skillAdvanced} ${
        level === 'advanced' ? styles.skillActive : styles.skillInactive
      }`}></div>
    </div>
  );
};

export default function Home() {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const fullText = 'Sccharling';
  const typingSpeed = 100;
  const { t } = useTranslation();

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length - 1) {
        setTypedText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(interval);
        setShowCursor(true);
      }
    }, typingSpeed);
    return () => clearInterval(interval);
  }, [fullText, typingSpeed]);

  const projectsData: Project[] = useMemo(() => [
    {
      id: 1,
      title: t('projects.internship.title'),
      description: t('projects.internship.description'),
      image: "/images/efterskoleLogin.png",
      altText: t('projects.internship.title'),
      technologies: ["Flutter", "Dart", "Firebase", "Firestore", "Cloud Storage"],
      content: [
        { type: "text", content: t('projects.internship.content1') },
        { type: "image", content: "/images/efterskole.jpg", altText: "Firebase authentication implementation" },
        { type: "text", content: t('projects.internship.content2') },
        { type: "image", content: "/images/efmentor.png", altText: "Mentor admin side" },
        { type: "text", content: t('projects.internship.content3') }
      ]
    },
    {
      id: 2,
      title: t('projects.exam.title'),
      description: t('projects.exam.description'),
      image: "/images/metteMunk.png",
      altText: t('projects.exam.title'),
      technologies: ["Vue.js", "Nuxt.js", "JavaScript", "HTML", "CSS"],
      content: [
        { type: "text", content: t('projects.exam.content1') },
        { type: "image", content: "/images/data.png", altText: "Eksamensopgave wireframes" },
        { type: "text", content: t('projects.exam.content2') },
        { type: "image", content: "/images/redesign.png", altText: "Eksamensopgave redesign" },
        { type: "text", content: t('projects.exam.content3') }
      ]
    },
    {
      id: 3,
      title: t('projects.portfolio.title'),
      description: t('projects.portfolio.description'),
      image: "/images/scharling.png",
      altText: t('projects.portfolio.title'),
      technologies: ["Next.js", "React", "TypeScript", "CSS Modules", "JavaScript"],
      content: [
        { type: "text", content: t('projects.portfolio.content1') },
        { type: "image", content: "/images/portscroll.png", altText: "Portfolio design process" },
        { type: "text", content: t('projects.portfolio.content2') },
        { type: "image", content: "/images/mobile.png", altText: "Portfolio responsive design" },
        { type: "text", content: t('projects.portfolio.content3') }
      ]
    },
  ], [t]);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div className={styles.frontContainer}>
        <div className={styles.hero}>
          <h1 className={styles.heroText}>
            {typedText}
            {showCursor && <span className={styles.blinkingCursor}>_</span>}
          </h1>
          <p className={styles.heroSubText}>{t('hero.subtitle')}</p>
        </div>
      </div>

      <section id="aboutMe" className={styles.aboutMe}>
        <h2 className={styles.sectionTitle}>{t('about.title')}</h2>
        <div className={styles.aboutMeWrapper}>
          <div className={styles.aboutDarkWrapper}>
            <div className={styles.aboutMePic}>
              <Image 
                src="/images/meFace.png" 
                alt="Profilbillede" 
                width={600}
                height={450}
                priority
              />
            </div>
            <div className={styles.aboutMeText}>
              <h3>{t('about.name')}</h3>
              <p>{t('about.description')}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="aboutProjects" className={styles.aboutProjects}>
        <h2 className={styles.sectionTitle}>{t('projects.title')}</h2>
        <div className={styles.projectWrapper}>
          {projectsData.map((project) => (
            <div 
              key={project.id} 
              className={`${styles.projectDarkWrapper} ${styles.clickable}`}
              onClick={() => openProjectModal(project)}
              data-read-more={t('projects.readMore')}
            >
              <div className={styles.projectPic}>
                <Image 
                  src={project.image} 
                  alt={project.altText}
                  width={600}
                  height={400}
                />
              </div>
              <div className={styles.projectText}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className={styles.projectTechnologies}>
                  {project.technologies.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <div className={`${styles.projectDarkWrapper} ${styles.currentWorkContainer}`}>
            <p dangerouslySetInnerHTML={{ __html: t('projects.currentWork') }}></p>
          </div>
        </div>
      </section>

      <section id="myCertificates" className={styles.myCertificates}>
        <h2 className={styles.sectionTitle}>{t('certificates.title')}</h2>
        <div className={styles.certificatesWrapper}>
          <div className={styles.certificateDarkWrapper}>
            <div className={styles.certificateContent}>
              <h3>{t('certificates.ibm.title')}</h3>
              <p>
                {t('certificates.ibm.description')} <br/><br/>
                
                {t('certificates.ibm.skills')}
              </p>
              
              <ul className={styles.certificateList}>
                <li dangerouslySetInnerHTML={{ __html: t('certificates.ibm.skill1') }}></li>
                <li dangerouslySetInnerHTML={{ __html: t('certificates.ibm.skill2') }}></li>
                <li dangerouslySetInnerHTML={{ __html: t('certificates.ibm.skill3') }}></li>
                <li dangerouslySetInnerHTML={{ __html: t('certificates.ibm.skill4') }}></li>
                <li dangerouslySetInnerHTML={{ __html: t('certificates.ibm.skill5') }}></li>
                <li dangerouslySetInnerHTML={{ __html: t('certificates.ibm.skill6') }}></li>
              </ul>
              
              <p dangerouslySetInnerHTML={{ __html: t('certificates.ibm.details') + t('certificates.ibm.links') }}>
              </p>
              
              <div className={styles.progressContainer}>
                <div className={styles.progressLabel}>{t('certificates.ibm.progress')}</div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{width: '100%'}}></div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.certificateDarkWrapper}>
            <div className={styles.certificateContent}>
              <h3>{t('certificates.google.title')}</h3>
              <p>
                {t('certificates.google.description')} <br/><br/>
                {t('certificates.google.details')} <br/><br/>
                <span dangerouslySetInnerHTML={{ __html: t('certificates.google.link') }}></span>
              </p>
              <div className={styles.progressContainer}>
                <div className={styles.progressLabel}>{t('certificates.google.progress')}</div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{width: '50%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="proLang" className={styles.proLang}>
        <h2 className={styles.sectionTitle}>{t('technologies.title')}</h2>
        <div className={styles.proLangWrapper}>
          <div className={styles.techBox}>
            <h3>{t('technologies.vueReact.title')}</h3>
            <p>{t('technologies.vueReact.description')}</p>
            <SkillLevel level="advanced" />
          </div>
          <div className={styles.techBox}>
            <h3>{t('technologies.flutter.title')}</h3>
            <p>{t('technologies.flutter.description')}</p>
            <SkillLevel level="advanced" />
          </div>
          <div className={styles.techBox}>
            <h3>{t('technologies.firebase.title')}</h3>
            <p>{t('technologies.firebase.description')}</p>
            <SkillLevel level="intermediate" />
          </div>
          <div className={styles.techBox}>
            <h3>{t('technologies.cms.title')}</h3>
            <p>{t('technologies.cms.description')}</p>
            <SkillLevel level="intermediate" />
          </div>
          <div className={styles.techBox}>
            <h3>{t('technologies.restApi.title')}</h3>
            <p>{t('technologies.restApi.description')}</p>
            <SkillLevel level="beginner" />
          </div>
          <div className={styles.techBox}>
            <h3>{t('technologies.python.title')}</h3>
            <p>{t('technologies.python.description')}</p>
            <SkillLevel level="beginner" />
          </div>
          <div className={styles.techBox}>
            <h3>{t('technologies.kubernetes.title')}</h3>
            <p>{t('technologies.kubernetes.description')}</p>
            <SkillLevel level="beginner" />
          </div>
          <div className={styles.techBox}>
            <h3>{t('technologies.ai.title')}</h3>
            <p>{t('technologies.ai.description')}</p>
            <SkillLevel level="intermediate" />
          </div>
        </div>
      </section>

      <section id="endingFooter" className={styles.endingFooter}>
        <h2 className={styles.sectionTitle}>{t('contact.title')}</h2>
        <div className={styles.endingWrapper}>
          <div className={styles.endingDarkWrapper}>
            <p className={styles.endingText}>
              {t('contact.description')}
            </p>
            <div className={styles.footerLink}>
              <a
                href="https://github.com/FlareRaxer"
                className={styles.footerIconLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                {t('contact.github')}
              </a>
              <a
                href="https://www.linkedin.com/in/jonas-jensen-82860663"
                className={styles.footerIconLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                {t('contact.linkedin')}
              </a>
              <a
                href="/cv.pdf"
                className={styles.footerIconLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download CV"
              >
                {t('contact.downloadCv')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={closeProjectModal} 
        />
      )}
    </>
  );
}