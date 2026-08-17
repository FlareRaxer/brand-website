"use client";
import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import styles from './styles/page.module.css';
import ProjectModal from './components/ProjectModal';
import StoreLinks, { StoreLinksData } from './components/StoreLinks';
import storeStyles from './components/storeLinks.module.css';

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
  status?: string; // Optional status badge
  featured?: boolean;
  previewImages?: string[];
  storeLinks?: StoreLinksData;
  content: ContentSection[]; // Array of content sections for the modal
}

const HAIRPLANT_STORES: StoreLinksData = {
  website: 'https://www.hairplant.dk/da',
  ios: 'https://apps.apple.com/dk/app/hairplant/id6749389229?l=da',
  android: 'https://play.google.com/store/apps/details?id=dk.hairplant.hairplant&hl=da',
};

const IBM_CERTIFICATE_URL = 'https://coursera.org/share/a43acddb5fcf0a05d3d69efc4f23cafdv';
const IBM_COURSE_URL = 'https://www.coursera.org/professional-certificates/ibm-backend-development';
const GOOGLE_COURSE_URL = 'https://www.coursera.org/professional-certificates/google-cybersecurity';
const IBM_SKILLS = [
  'Python',
  'Django',
  'Docker',
  'Kubernetes',
  'SQL',
  'Git',
  'Microservices',
  'DevOps',
];

const FOCUS_KEYS = ['apps', 'web', 'design'] as const;
const STACK = [
  'Flutter',
  'Dart',
  'React',
  'Next.js',
  'Vue',
  'Nuxt',
  'Firebase',
  'Supabase',
  'Figma',
  'WordPress',
];

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
      id: 4,
      title: t('projects.hairplant.title'),
      description: t('projects.hairplant.description'),
      image: "/images/hairplant-logo.jpg",
      altText: t('projects.hairplant.title'),
      technologies: ["Flutter", "Dart", "Firebase", "Supabase", "iOS", "Android"],
      status: t('projects.hairplant.status'),
      featured: true,
      previewImages: [
        "/images/hairplant-ios-3.png",
        "/images/hairplant-ios-1.png",
        "/images/hairplant-ios-4.png",
      ],
      storeLinks: HAIRPLANT_STORES,
      content: [
        { type: "text", content: t('projects.hairplant.content1') },
        { type: "image", content: "/images/hairplant-ios-1.png", altText: "Hairplant redesigned home screen" },
        { type: "text", content: t('projects.hairplant.content2') },
        { type: "image", content: "/images/hairplant-ios-2.png", altText: "Hairplant daily aftercare routine" },
        { type: "text", content: t('projects.hairplant.content3') },
        { type: "image", content: "/images/hairplant-ios-3.png", altText: "Hairplant guides after the redesign" }
      ]
    },
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
      technologies: ["Next.js", "React", "TypeScript", "AI"],
      content: [
        { type: "text", content: t('projects.portfolio.content1') },
        { type: "image", content: "/images/portscroll.png", altText: "Portfolio design process" },
        { type: "text", content: t('projects.portfolio.content2') },
        { type: "image", content: "/images/mobile.png", altText: "Portfolio responsive design" },
        { type: "text", content: t('projects.portfolio.content3') }
      ]
    },
  ], [t]);

  const featuredProject = projectsData.find((project) => project.featured);
  const supportingProjects = projectsData.filter((project) => !project.featured);

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
          <article className={`${styles.projectDarkWrapper} ${styles.featuredProject} ${styles.featuredAbout}`}>
            <div className={styles.portraitStage}>
              <div className={styles.portraitFrame}>
                <Image
                  src="/images/meFace.png"
                  alt={t('about.name')}
                  width={600}
                  height={750}
                  priority
                />
              </div>
            </div>
            <div className={`${styles.projectText} ${styles.featuredText}`}>
              <p className={styles.featuredEyebrow}>
                {t('about.eyebrow')}
                <span className={styles.featuredDot} />
                {t('about.kicker')}
              </p>
              <h3>{t('about.name')}</h3>
              <p>{t('about.lead')}</p>
              <ul className={styles.projectTechnologies}>
                <li>Flutter</li>
                <li>React</li>
                <li>Vue</li>
                <li>Python</li>
              </ul>
              <div className={storeStyles.storeLinks}>
                <button
                  type="button"
                  className={storeStyles.storeBtn}
                  onClick={() => {
                    document.getElementById('aboutProjects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className={storeStyles.storeCopy}>
                    <span className={storeStyles.storeEyebrow}>{t('about.seeWorkEyebrow')}</span>
                    <span className={storeStyles.storeName}>{t('about.seeWork')}</span>
                  </span>
                </button>
              </div>
            </div>
          </article>
          <div className={styles.focusBlock}>
            <p className={styles.featuredEyebrow}>{t('about.focusTitle')}</p>
            <div className={styles.focusGrid}>
              {FOCUS_KEYS.map((key) => (
                <div key={key} className={styles.focusCard}>
                  <h3>{t(`about.focus.${key}.title`)}</h3>
                  <p>{t(`about.focus.${key}.text`)}</p>
                  <span className={styles.focusProof}>{t(`about.focus.${key}.proof`)}</span>
                </div>
              ))}
            </div>
            <ul className={styles.stackChips} aria-label={t('about.stackLabel')}>
              {STACK.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="aboutProjects" className={styles.aboutProjects}>
        <h2 className={styles.sectionTitle}>{t('projects.title')}</h2>
        <div className={styles.projectWrapper}>
          {featuredProject && (
            <article
              className={`${styles.projectDarkWrapper} ${styles.featuredProject}`}
              onClick={() => openProjectModal(featuredProject)}
            >
              <div className={styles.phoneStage} aria-hidden="true">
                {(featuredProject.previewImages ?? [featuredProject.image]).map((src, index) => {
                  const phoneClass =
                    index === 0
                      ? styles.phoneLeft
                      : index === 2
                        ? styles.phoneRight
                        : styles.phoneCenter;
                  return (
                    <div key={src} className={`${styles.phone} ${phoneClass}`}>
                      <Image
                        src={src}
                        alt=""
                        width={390}
                        height={844}
                      />
                    </div>
                  );
                })}
              </div>
              <div className={`${styles.projectText} ${styles.featuredText}`}>
                <p className={styles.featuredEyebrow}>
                  {t('projects.featuredLabel')}
                  <span className={styles.featuredDot} />
                  {t('projects.availableOnStores')}
                </p>
                <div className={styles.featuredTitleRow}>
                  <Image
                    src={featuredProject.image}
                    alt=""
                    width={44}
                    height={44}
                    className={styles.featuredLogo}
                  />
                  <h3>{featuredProject.title}</h3>
                </div>
                <p>{featuredProject.description}</p>
                <ul className={styles.projectTechnologies}>
                  {featuredProject.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                  {featuredProject.status && (
                    <li className={styles.projectStatus}>{featuredProject.status}</li>
                  )}
                </ul>
                {featuredProject.storeLinks && (
                  <StoreLinks links={featuredProject.storeLinks} />
                )}
                <button
                  type="button"
                  className={styles.readStory}
                  onClick={(event) => {
                    event.stopPropagation();
                    openProjectModal(featuredProject);
                  }}
                >
                  {t('projects.readStory')}
                </button>
              </div>
            </article>
          )}
          {supportingProjects.map((project) => (
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
                  {project.status && (
                    <li className={styles.projectStatus}>{project.status}</li>
                  )}
                </ul>
              </div>
            </div>
          ))}
          <article className={`${styles.projectDarkWrapper} ${styles.featuredProject} ${styles.featuredNow}`}>
            <div className={styles.certStage} aria-hidden="true">
              <div className={`${styles.certPlaque} ${styles.nowPlaque}`}>
                <span className={styles.certKind}>{t('projects.now.eyebrow')}</span>
                <strong>Hairplant</strong>
                <span className={styles.certComplete}>Live</span>
                <span className={styles.certMeta}>iOS · Android</span>
              </div>
            </div>
            <div className={`${styles.projectText} ${styles.featuredText}`}>
              <p className={styles.featuredEyebrow}>
                {t('projects.now.eyebrow')}
                <span className={styles.featuredDot} />
                {t('projects.now.kicker')}
              </p>
              <h3>{t('projects.now.title')}</h3>
              <p>{t('projects.now.description')}</p>
              <ul className={styles.projectTechnologies}>
                <li>Flutter</li>
                <li>iOS</li>
                <li>Android</li>
                <li className={styles.projectStatus}>{t('projects.now.status')}</li>
              </ul>
              <div className={storeStyles.storeLinks}>
                <button
                  type="button"
                  className={storeStyles.storeBtn}
                  onClick={(event) => {
                    event.stopPropagation();
                    if (featuredProject) openProjectModal(featuredProject);
                  }}
                >
                  <span className={storeStyles.storeCopy}>
                    <span className={storeStyles.storeEyebrow}>{t('projects.now.readHairplantEyebrow')}</span>
                    <span className={storeStyles.storeName}>{t('projects.now.readHairplant')}</span>
                  </span>
                </button>
                <button
                  type="button"
                  className={storeStyles.storeBtn}
                  onClick={(event) => {
                    event.stopPropagation();
                    document.getElementById('endingFooter')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className={storeStyles.storeCopy}>
                    <span className={storeStyles.storeEyebrow}>{t('projects.now.contactCtaEyebrow')}</span>
                    <span className={storeStyles.storeName}>{t('projects.now.contactCta')}</span>
                  </span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="myCertificates" className={styles.myCertificates}>
        <h2 className={styles.sectionTitle}>{t('certificates.title')}</h2>
        <div className={styles.certificatesWrapper}>
          <article className={`${styles.projectDarkWrapper} ${styles.featuredProject} ${styles.featuredCertificate}`}>
            <div className={styles.certStage} aria-hidden="true">
              <div className={styles.certPlaque}>
                <span className={styles.certIssuer}>IBM</span>
                <strong>Backend Professional</strong>
                <span className={styles.certKind}>Certificate</span>
                <span className={styles.certComplete}>100%</span>
                <span className={styles.certMeta}>Coursera</span>
              </div>
            </div>
            <div className={`${styles.projectText} ${styles.featuredText}`}>
              <p className={styles.featuredEyebrow}>
                {t('certificates.featuredLabel')}
                <span className={styles.featuredDot} />
                {t('certificates.ibm.progress')}
              </p>
              <h3>{t('certificates.ibm.title')}</h3>
              <p>{t('certificates.ibm.description')}</p>
              <ul className={styles.projectTechnologies}>
                {IBM_SKILLS.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
                <li className={styles.projectStatus}>{t('certificates.completedBadge')}</li>
              </ul>
              <div className={storeStyles.storeLinks}>
                <a
                  href={IBM_CERTIFICATE_URL}
                  className={storeStyles.storeBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('certificates.viewCertificateAria')}
                >
                  <span className={storeStyles.storeCopy}>
                    <span className={storeStyles.storeEyebrow}>{t('certificates.viewCertificateEyebrow')}</span>
                    <span className={storeStyles.storeName}>{t('certificates.viewCertificate')}</span>
                  </span>
                </a>
                <a
                  href={IBM_COURSE_URL}
                  className={storeStyles.storeBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={storeStyles.storeCopy}>
                    <span className={storeStyles.storeEyebrow}>{t('certificates.aboutCourseEyebrow')}</span>
                    <span className={storeStyles.storeName}>{t('certificates.aboutCourse')}</span>
                  </span>
                </a>
              </div>
            </div>
          </article>

          <div className={`${styles.projectDarkWrapper} ${styles.certificateSupport}`}>
            <div className={styles.featuredText}>
              <p className={styles.featuredEyebrow}>
                {t('certificates.inProgressLabel')}
                <span className={styles.featuredDot} />
                {t('certificates.google.progress')}
              </p>
              <h3>{t('certificates.google.title')}</h3>
              <p>{t('certificates.google.description')}</p>
              <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{width: '90%'}}></div>
                </div>
              </div>
              <div className={storeStyles.storeLinks}>
                <a
                  href={GOOGLE_COURSE_URL}
                  className={storeStyles.storeBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('certificates.google.aboutCourseAria')}
                >
                  <span className={storeStyles.storeCopy}>
                    <span className={storeStyles.storeEyebrow}>{t('certificates.aboutCourseEyebrow')}</span>
                    <span className={storeStyles.storeName}>{t('certificates.aboutCourse')}</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="endingFooter" className={styles.endingFooter}>
        <h2 className={styles.sectionTitle}>{t('contact.title')}</h2>
        <div className={styles.endingWrapper}>
          <article className={`${styles.projectDarkWrapper} ${styles.featuredProject} ${styles.featuredContact}`}>
            <div className={styles.certStage} aria-hidden="true">
              <div className={`${styles.certPlaque} ${styles.contactPlaque}`}>
                <span className={styles.certIssuer}>{t('contact.plaqueName')}</span>
                <strong>{t('contact.plaqueRole')}</strong>
                <span className={styles.certKind}>{t('contact.plaquePlace')}</span>
                <span className={styles.certMeta}>{t('contact.kicker')}</span>
              </div>
            </div>
            <div className={`${styles.projectText} ${styles.featuredText}`}>
              <p className={styles.featuredEyebrow}>
                {t('contact.eyebrow')}
                <span className={styles.featuredDot} />
                {t('contact.kicker')}
              </p>
              <h3>{t('contact.headline')}</h3>
              <p>{t('contact.description')}</p>
              <div className={storeStyles.storeLinks}>
                <a
                  href="mailto:jonaskruse123@gmail.com"
                  className={storeStyles.storeBtn}
                  aria-label="Email"
                >
                  <span className={storeStyles.storeCopy}>
                    <span className={storeStyles.storeEyebrow}>{t('contact.emailEyebrow')}</span>
                    <span className={storeStyles.storeName}>{t('contact.email')}</span>
                  </span>
                </a>
                <a
                  href="https://github.com/FlareRaxer"
                  className={storeStyles.storeBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <span className={storeStyles.storeCopy}>
                    <span className={storeStyles.storeEyebrow}>{t('contact.githubEyebrow')}</span>
                    <span className={storeStyles.storeName}>{t('contact.github')}</span>
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/jonas-jensen-82860663"
                  className={storeStyles.storeBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <span className={storeStyles.storeCopy}>
                    <span className={storeStyles.storeEyebrow}>{t('contact.linkedinEyebrow')}</span>
                    <span className={storeStyles.storeName}>{t('contact.linkedin')}</span>
                  </span>
                </a>
                <a
                  href="/cv.pdf"
                  className={storeStyles.storeBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download CV"
                >
                  <span className={storeStyles.storeCopy}>
                    <span className={storeStyles.storeEyebrow}>{t('contact.cvEyebrow')}</span>
                    <span className={storeStyles.storeName}>{t('contact.downloadCv')}</span>
                  </span>
                </a>
              </div>
            </div>
          </article>
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