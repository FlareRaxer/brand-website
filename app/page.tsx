"use client";
import React, { useEffect, useState } from 'react';
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

export default function Home() {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const fullText = 'Sccharling';
  const typingSpeed = 100;

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
      title: "Praktikopgave",
      description: "Under min praktik lavede jeg en afsluttende opgave, hvor den eksisterende app skulle automatiseres mest muligt. App'en er lavet i Flutter og Firebase.",
      image: "/images/efterskoleLogin.png",
      altText: "Praktikopgave",
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
          content: "Gennem projektet erhvervede jeg praktisk erfaring med state management, UI-design principper og sikkerhedsimplementering. Dette projekt har ikke kun styrket mine tekniske færdigheder inden for frontend-udvikling og databasehåndtering, men også givet mig værdifuld indsigt i agile udviklingsprocesser."
        },
        {
          type: "image" as const,
          content: "/images/praktik-screenshot2.jpg",
          altText: "Application UI design"
        },
        {
          type: "text" as const,
          content: "En af de større udfordringer var at implementere realtids-synkronisering mellem forskellige enheder, hvilket jeg løste ved at bruge Firebase Realtime Database og omhyggelig state management."
        }
      ]
    },
    {
      id: 2,
      title: "Eksamensopgave",
      description: "Min eksamensopgave fokuserede på at udvikle en innovativ løsning med Vue.js, Node.js og MongoDB.",
      image: "/images/efterskole.jpg",
      altText: "Eksamensopgave",
      content: [
        {
          type: "text" as const,
          content: "Min eksamensopgave fokuserede på at udvikle en innovativ løsning til online undervisning. Jeg anvendte moderne teknologier som Vue.js, Node.js og MongoDB for at skabe et komplet produkt."
        },
        {
          type: "image" as const,
          content: "/images/praktik-screenshot1.jpg",
          altText: "Eksamensopgave wireframes"
        },
        {
          type: "text" as const,
          content: "Projektet krævede omfattende research, wireframing, prototyping og testing for at sikre en optimal brugeroplevelse. Særligt udfordrende var implementeringen af realtidskommunikation mellem brugere, som krævede kreativ problemløsning og fordybelse i websockets."
        },
        {
          type: "image" as const,
          content: "/images/praktik-screenshot2.jpg",
          altText: "Eksamensopgave interface"
        },
        {
          type: "text" as const,
          content: "Jeg er især stolt af det intuitive brugerinterface som demonstrerer min evne til at kombinere teknisk kunnen med brugervenligt design. Projektet fik stor ros for brugervenlighed og teknisk implementering."
        }
      ]
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "Dette portfolio website er bygget med Next.js og React for at skabe en moderne og responsiv præsentation.",
      image: "/images/scharling.png",
      altText: "Portfolio Website",
      content: [
        {
          type: "text" as const,
          content: "Dette portfolio website er bygget med Next.js og React for at skabe en hurtig, responsiv og moderne præsentation af mine projekter og kompetencer. Jeg har lagt særlig vægt på performance, tilgængelighed og brugervenligt design."
        },
        {
          type: "image" as const,
          content: "/images/praktik-screenshot1.jpg",
          altText: "Portfolio design process"
        },
        {
          type: "text" as const,
          content: "Siden anvender CSS Modules for styling, custom animations for interaktivitet, og er fuldt responsive på tværs af alle enheder. Som en særlig udfordring implementerede jeg en custom scroll progress bar og en dynamisk navigation der fremhæver den aktuelle sektion."
        },
        {
          type: "image" as const,
          content: "/images/praktik-screenshot2.jpg",
          altText: "Portfolio responsive design"
        },
        {
          type: "text" as const,
          content: "Siden er hosted på Vercel for optimal performance og pålidelighed. Udviklingsprocessen fokuserede på moderne web-standarder, SEO-optimering og en brugervenlig oplevelse."
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
          <p className={styles.heroSubText}>Velkommen til min Portfolio</p>
        </div>
      </div>

      <section id="aboutMe" className={styles.aboutMe}>
        <h2 className={styles.sectionTitle}>Hvem er jeg?</h2>
        <div className={styles.aboutMeWrapper}>
          <div className={styles.aboutDarkWrapper}>
            <div className={styles.aboutMePic}>
              <img src="/images/meFace.png" alt="Profilbillede" />
            </div>
            <div className={styles.aboutMeText}>
              <h3>Jeg er Jonas Jensen</h3>
              <p>Jeg er uddannet multimediedesigner fra UCL Odense. Jeg er en frontendudvikler og Flutter udvikler, der elsker at skabe brugervenlige og intuitive brugergrænseflader. Jeg har erfaring med React, Vue, Figma, Firebase og meget mere. 
                <br/>
                <br/>
                Derudover er jeg igang med at tage IBM Backend Professional Certificate & Google Cybersecurity Professional Certificate på Coursera</p>
            </div>
          </div>
        </div>
      </section>

      <section id="aboutProjects" className={styles.aboutProjects}>
        <h2 className={styles.sectionTitle}>Udvalgte projekter</h2>
        <div className={styles.projectWrapper}>
          {projectsData.map((project) => (
            <div 
              key={project.id} 
              className={`${styles.projectDarkWrapper} ${styles.clickable}`}
              onClick={() => openProjectModal(project)}
            >
              <div className={styles.projectPic}>
                <img src={project.image} alt={project.altText} />
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
        <h2 className={styles.sectionTitle}>Certifikater</h2>
        <div className={styles.certificatesWrapper}>
          <div className={styles.certificateDarkWrapper}>
            <div className={styles.certificateContent}>
              <h3>IBM Backend Professional Certificate</h3>
              <p>Comprehensive training in backend development including server-side programming, APIs, databases, and cloud deployment with IBM&apos;s best practices.</p>
              <div className={styles.progressContainer}>
                <div className={styles.progressLabel}>50% Gennemført</div>
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

      <section id="proLang" className={styles.proLang}>
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
            <h3>Kubernetes </h3>
            <p>Utility-first CSS framework til hurtig UI-udvikling.</p>
          </div>
          <div className={styles.techBox}>
            <h3>Flask</h3>
            <p>Utility-first CSS framework til hurtig UI-udvikling.</p>
          </div>
        </div>
      </section>

      <section id="endingFooter" className={styles.endingFooter}>
        <h2 className={styles.sectionTitle}>Kontakt mig</h2>
        <div className={styles.endingWrapper}>
          <div className={styles.endingDarkWrapper}>
            <p className={styles.endingText}>
              Du er meget velkommen til at kontakte mig, hvis du har spørgsmål, ønsker et samarbejde, eller bare vil sige hej! Brug knapperne nedenfor for at ringe, sende en mail, eller besøge min GitHub eller LinkedIn.
            </p>
            <div className={styles.footerLink}>
              <a
                href="tel:+4528340712"
                className={styles.footerIconLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mobil"
              >
                Mobil
              </a>
              <a
                href="mailto:jonaskruse123@gmail.com"
                className={styles.footerIconLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
              >
                Email
              </a>
              <a
                href="https://github.com/FlareRaxer"
                className={styles.footerIconLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/jonas-jensen-82860663"
                className={styles.footerIconLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                LinkedIn
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