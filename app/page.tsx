"use client";
import React, { useEffect, useState } from 'react';
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

  const projectsData: Project[] = [
    {
      id: 1,
      title: t('projects.internship.title'),
      description: t('projects.internship.description'),
      image: "/images/efterskoleLogin.png",
      altText: t('projects.internship.title'),
      content: [
        {
          type: "text" as const,
          content: "Under min praktik hos Ligthouse Digital udviklede jeg en omfattende webapplikation ved hjælp af Flutter og Firebase. Projektet omfattede udvikling af en brugervenlig grænseflade, implementering af autentifikation med Firebase Auth, realtidsdatabase integration og cloud storage funktionalitet."
        },
        {
          type: "image" as const,
          content: "/images/efterskole.jpg",
          altText: "Firebase authentication implementation"
        },
        {
          type: "text" as const,
          content: "Projektet gik ud på at lave en Admin side baseret på en allerede eksisterende app. Hver skole skulle kunne administrere mest muligt selv, og se relevant data i et enkelt og simpelt format, der læner sig op af den eksisterende app.<br/><br/> Da den eksisterende app var skrevet i Flutter 2.X var det nødvendigt at skrive den nye app fra bunden i Flutter 3.26+. Da al data og backend lå på en eksisterende Firbase/Firestore, så kunne meget nemt importeres og implementeres. <br/><br/>Den største udfordring var at implementere og lave graferne som ses på billedet ovenover. Databasen hvor brugerne ligger skulle opdateres for at graferne ville virke efter hensigten. Herunder udvide brugardatabasen med flere kategorier.<br/><br/> Herefter blev Mentor siden lavet. På denne side kan den enkelte skole nemt acceptere nye mentoranmodninger, se eksisterende godkendte mentorer og fjerne dem igen. Endvidere kan man se hvornår hver mentor sidst har været logget på."
        },
        {
          type: "image" as const,
          content: "/images/efmentor.png",
          altText: "Mentor admin side"
        },
        {
          type: "text" as const,
          content: "Denne praktikopgave har været enorm spændende og udfordrende. Først og fremmest har det givet mig en god forståelse og en solid base omkring Flutter/Dart. Det har opgså givet mig en god forståelse for, hvordan Flutter bruger dependencies. Ydermere har jeg lært meget om, hvad og hvordan Firebase og dets muligheder kan bruges i samspil mellem apps og web. <br/><br/> Da tiden var knap var der flere ting jeg ikke nåede at kaste mig ud i, blandt andet CORE i Firebase. <br/><br/> Baseret på en 3 måneders praktik, hvor den første måned gik med at lære Flutter. 1 måned på selvvalgt projekt og 1 måned på praktikopgaven, så er jeg ganske tilfreds med resultatet. Og dette projekt har givet mig en solid forståelse og et godt fundamnet til at arbejde mere i Flutter/Dart"
        }
      ]
    },
    {
      id: 2,
      title: t('projects.exam.title'),
      description: t('projects.exam.description'),
      image: "/images/metteMunk.png",
      altText: t('projects.exam.title'),
      content: [
        {
          type: "text" as const,
          content: "Min eksamensopgave på multimediedesigneruddannelsen fokuserede på at opdatere fra Nuxt 2 til Nuxt 3 på en allerede eksisterende hjemmeside. Et redesign af den eksisterende hjemmeside blev også udført. <br/><br/> Det var sjovt og udfordrende at tage en side som er live,og opdatere frameworken. Særdeles udfordrende, men utrolig lærerigt"
        },
        {
          type: "image" as const,
          content: "/images/data.png",
          altText: "Eksamensopgave wireframes"
        },
        {
          type: "text" as const,
          content: "Projektet krævede research, wireframing, prototyping og testing for at sikre en optimal brugeroplevelse. Det var også udfordrende at der på den eksisterende side ikke eksisterede noget data omkring brugerne. Derfor skulle vi starte fra bunden, selvom hjemmesiden var live. Dette var en sjov og anderledes udfordring.<br/><br/> "
        },
        {
          type: "image" as const,
          content: "/images/redesign.png",
          altText: "Eksamensopgave redesign"
        },
        {
          type: "text" as const,
          content: "Projektet fik stor ros for brugervenlighed og teknisk implementering. Derudover gav projektet mig en god forståelse for hvad Vue er og hvilke muligheder Vue & Nuxt giver. Ligeledes gav det en bred forståelse for, hvrodan komplekse sider er sat sammen"
        }
      ]
    },
    {
      id: 3,
      title: t('projects.portfolio.title'),
      description: t('projects.portfolio.description'),
      image: "/images/scharling.png",
      altText: t('projects.portfolio.title'),
      content: [
        {
          type: "text" as const,
          content: "Dette portfolio website er inspireret af havet. Fra du rammer vandet, til du dykker længere ned, hvor lyset langsomt forsvinder og en ny verden åbner sig. Bygget med Next.js og React for at skabe en hurtig, responsiv og moderne præsentation af mine projekter og kompetencer."
        },
        {
          type: "image" as const,
          content: "/images/portscroll.png",
          altText: "Portfolio design process"
        },
        {
          type: "text" as const,
          content: "Siden anvender CSS Modules for styling, custom animations for interaktivitet, og er fuldt responsive på tværs af alle enheder. Som en særlig udfordring implementerede jeg en custom scroll progress bar og en dynamisk navigation der fremhæver den aktuelle sektion."
        },
        {
          type: "image" as const,
          content: "/images/mobile.png",
          altText: "Portfolio responsive design"
        },
        {
          type: "text" as const,
          content: "Siden er min første hjemmeside i React, og har derfor også lagt grundlaget for min forståelse af React og Next.js."
        }
      ]
    },
  ];

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
              </div>
            </div>
          ))}
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
                  <div className={styles.progressFill} style={{width: '25%'}}></div>
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