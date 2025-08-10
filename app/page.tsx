"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
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
      description: "Komplet Flutter-applikation med Firebase backend, der automatiserer skolernes administrative processer. Inkluderer dashboard med live data, mentor-system og brugeradministration.",
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
      title: "Eksamensopgave",
      description: "Framework-opdatering fra Nuxt 2 til Nuxt 3 på live hjemmeside kombineret med komplet redesign. Udfordrede både tekniske færdigheder og UX-design principper.",
      image: "/images/metteMunk.png",
      altText: "Eksamensopgave",
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
      title: "Portfolio Website",
      description: "Havsinspireret Next.js portfolio med custom animations, dynamisk navigation og scroll-progress. Demonstrerer moderne React-udvikling og kreativ CSS-styling.",
      image: "/images/scharling.png",
      altText: "Portfolio Website",
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
          <p className={styles.heroSubText}>Velkommen til min Portfolio</p>
        </div>
      </div>

      <section id="aboutMe" className={styles.aboutMe}>
        <h2 className={styles.sectionTitle}>Hvem er jeg?</h2>
        <div className={styles.aboutMeWrapper}>
          <div className={styles.aboutDarkWrapper}>
            <div className={styles.aboutMePic}>
              <Image 
                src="/images/meFace.png" 
                alt="Profilbillede" 
                priority
              />
            </div>
            <div className={styles.aboutMeText}>
              <h3>Jeg er Jonas Jensen</h3>
              <p>Som uddannet multimediedesigner fra UCL Odense kombinerer jeg kreativ tænkning med teknisk præcision i alt mit arbejde. Min passion ligger i at udvikle intuitive brugergrænseflader og skabe digitale oplevelser, der både imponerer visuelt og fungerer optimalt.
                <br/><br/>
                Jeg har specialiseret mig i frontend-udvikling med React og Vue.js samt cross-platform app-udvikling med Flutter. Min erfaring spænder fra design i Figma til implementering af Firebase-løsninger og komplekse API-integrationer. Jeg trives i krydsfeltet mellem design og kode, hvor jeg kan kombinere det æstetiske med det funktionelle.
                <br/><br/>
                For at udvide min tekniske værktøjskasse er jeg i gang med IBM Backend Professional Certificate og Google Cybersecurity Professional Certificate, hvilket giver mig en omfattende forståelse for hele den digitale værdikæde – fra brugerens første interaktion til databasens sikre forvaltning af data.
              </p>
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
                <Image 
                  src={project.image} 
                  alt={project.altText} 
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
        <h2 className={styles.sectionTitle}>Certifikater</h2>
        <div className={styles.certificatesWrapper}>
          <div className={styles.certificateDarkWrapper}>
            <div className={styles.certificateContent}>
              <h3>IBM Backend Professional Certificate</h3>
              <p>
                Dette professionelle certificeringsprogram har givet mig de nødvendige færdigheder og viden til backend-udvikling gennem praktisk erfaring med branchens mest anvendte teknologier. <br/><br/>
                
                De vigtigste kompetencer jeg har opbygget inkluderer:
              </p>
              
              <ul className={styles.certificateList}>
                <li>Praktisk erfaring med <strong>Python og Django</strong> til backend-udvikling og API-design</li>
                <li>Containerisering og orkestrering med <strong>Docker, Kubernetes og OpenShift</strong></li>
                <li>Database-administration og optimering med <strong>SQL og NoSQL</strong> systemer</li>
                <li>Implementation af <strong>mikroservices arkitektur</strong> og serverless computing</li>
                <li>Applikationssikkerhed, monitorering og <strong>DevOps best practices</strong></li>
                <li>Versionsstyring og samarbejde gennem <strong>Git, GitHub og Linux scripting</strong></li>
              </ul>
              
              <p>
                Certificeringen dækker også mikroservices, serverless arkitektur, applikationssikkerhed og monitorering - alt sammen essentielle komponenter i moderne backend-systemer. Gennem omfattende hands-on labs og projekter har jeg opbygget praktisk erfaring med at udvikle server-side systemer og services, der driver nutidens web- og mobilapplikationer. <br/><br/>
                Se mit officielle certifikat <a href="https://www.coursera.org/account/accomplishments/specialization/certificate/EFQMK8QG37XP" target="_blank" rel="noopener noreferrer" className={styles.certificateLink}>her</a> eller læs mere om kurset <a href="https://www.coursera.org/professional-certificates/ibm-backend-development" target="_blank" rel="noopener noreferrer" className={styles.certificateLink}>her</a>.
              </p>
              
              <div className={styles.progressContainer}>
                <div className={styles.progressLabel}>100% Gennemført</div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{width: '100%'}}></div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.certificateDarkWrapper}>
            <div className={styles.certificateContent}>
              <h3>Google Cybersecurity Professional Certificate</h3>
              <p>
                Dette certificeringsprogram fra Google giver mig et godt overblik og en fundamental forståelse for cybersikkerhed gennem 8 specialiserede kurser. Jeg lærer essentielle færdigheder inden for netværkssikkerhed, kryptering, trusselsdetektion og sikkerhedsprotokoller. <br/><br/>
                Kurset dækker praktiske værktøjer som Python, Linux, SQL og SIEM-systemer, der er afgørende i moderne sikkerhedsanalyse. Gennem praktiske øvelser arbejder jeg med virkelighedsnære scenarier, hvor jeg implementerer sikkerhedsforanstaltninger mod trusler som phishing, malware og uautoriseret adgang. <br/><br/>
                Hvis du ønsker at se mere omkring kurset kan du se det <a href="https://www.coursera.org/professional-certificates/google-cybersecurity" target="_blank" rel="noopener noreferrer" className={styles.certificateLink}>her</a>.
              </p>
              <div className={styles.progressContainer}>
                <div className={styles.progressLabel}>2 ud af 8 moduler</div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{width: '25%'}}></div>
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
            <p>JavaScript-frameworks med komponent-baseret arkitektur og effektiv state management. Min eksamensopgave er lavet i Vue. Min portfolio er lavet i React</p>
            <SkillLevel level="advanced" />
          </div>
          <div className={styles.techBox}>
            <h3>Flutter</h3>
            <p>Google&apos;s UI-toolkit til at udvikle native apps til Android, iOS, web og desktop fra én fælles kodebase med Dart. Blandt andet min praktikopgave er lavet i Flutter.</p>
            <SkillLevel level="advanced" />
          </div>
          <div className={styles.techBox}>
            <h3>Firebase</h3>
            <p>En komplet backend-as-a-service platform fra Google med realtidsdatabase, authentication, hosting og cloud functions til hurtig app-udvikling.</p>
            <SkillLevel level="intermediate" />
          </div>
          <div className={styles.techBox}>
            <h3>CMS</h3>
            <p>Erfaring med både Wordpress med Breakdance builder og headless CMS som DatoCMS til fleksibel og effektiv content management.</p>
            <SkillLevel level="intermediate" />
          </div>
          <div className={styles.techBox}>
            <h3>Rest API</h3>
            <p>Design og implementering af RESTful API&apos;er med ressourcebaserede endpoints, der muliggør sikker dataudveksling mellem frontend og backend.</p>
            <SkillLevel level="beginner" />
          </div>
          <div className={styles.techBox}>
            <h3>Python</h3>
            <p>Alsidig programmeringssprog til dataanalyse, automation, backend-udvikling og machine learning med et enormt økosystem af biblioteker.</p>
            <SkillLevel level="beginner" />
          </div>
          <div className={styles.techBox}>
            <h3>Kubernetes</h3>
            <p>Container-orkestreringsplatform til automatiseret deployment, skalering og administration af containeriserede applikationer i cloud miljøer.</p>
            <SkillLevel level="beginner" />
          </div>
          <div className={styles.techBox}>
            <h3>AI</h3>
            <p>Jeg har et bredt kendskab til forskellige AI modeller, både i forhold til kodning, UI/UX design og grafisk design. OpenAI, Google Gemini, Github CoPilot & Anthropic Claude er dem jeg oftest bruger.</p>
            <SkillLevel level="intermediate" />
          </div>
        </div>
      </section>

      <section id="endingFooter" className={styles.endingFooter}>
        <h2 className={styles.sectionTitle}>Kontakt mig</h2>
        <div className={styles.endingWrapper}>
          <div className={styles.endingDarkWrapper}>
            <p className={styles.endingText}>
              Leder du efter en dedikeret udvikler, der kan skabe brugervenlige digitale løsninger fra ide til implementering? Med min baggrund som multimediedesigner og specialisering inden for React, Vue, Flutter og backend-teknologier leverer jeg moderne, skalerbare applikationer der skaber værdi for både brugere og forretning.
              <br/><br/>
              Jeg behersker hele udviklingscyklen – fra design og prototyping til deployment og vedligeholdelse. Mine projekter viser, hvordan jeg kombinerer æstetik med funktionalitet for at løse konkrete forretningsudfordringer. Lad os tale om, hvordan jeg kan hjælpe dit team med at realisere jeres næste digitale vision.
            </p>
            <div className={styles.footerLink}>
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
              <a
                href="/cv.pdf"
                className={styles.footerIconLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                Download CV
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