import { useEffect, useState } from 'react';
import {
  AppWindow,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BadgeCheck,
  Blocks,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Code2,
  Headphones,
  HeartHandshake,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  MessagesSquare,
  MonitorSmartphone,
  Palette,
  PenTool,
  Phone,
  Rocket,
  ScanSearch,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  Wrench,
} from 'lucide-react';
import {
  ABOUT_POINTS,
  BUSINESS,
  NAV_LINKS,
  PROJECT_CATEGORIES,
  SERVICES,
  WHY_CHOOSE_US,
} from './data';
import Header from './components/Header';
import Logo from './components/Logo';
import Portrait from './components/Portrait';
import SectionHeading from './components/SectionHeading';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import LegalDialog from './components/LegalDialog';

const serviceIcons = {
  code: Code2,
  cart: ShoppingCart,
  smartphone: Smartphone,
  marketing: TrendingUp,
  support: Headphones,
  branding: Palette,
  maintenance: Wrench,
  custom: Blocks,
};

const whyIcons = {
  design: PenTool,
  responsive: MonitorSmartphone,
  detail: ScanSearch,
  communication: MessagesSquare,
  practical: Lightbulb,
  satisfaction: HeartHandshake,
};

const projectIcons = {
  business: Briefcase,
  cart: ShoppingCart,
  portfolio: UserRound,
  branding: Palette,
  landing: Rocket,
  application: AppWindow,
};

const workingPrinciples = [
  { title: 'Responsive by design', text: 'Made for every screen', icon: MonitorSmartphone },
  { title: 'Clear communication', text: 'Straightforward and focused', icon: MessagesSquare },
  { title: 'Tailored to your needs', text: 'Built around your goals', icon: Target },
  { title: 'Reliable support', text: 'Practical help when needed', icon: Headphones },
];

function ProjectVisual({ project }) {
  const Icon = projectIcons[project.icon];
  return (
    <div
      className="project-visual"
      style={{ '--project-accent': project.accent, '--project-soft': project.soft }}
      role="img"
      aria-label={`${project.title} example category concept illustration`}
    >
      <span className="project-visual__badge">Concept preview</span>
      <div className="project-browser" aria-hidden="true">
        <div className="project-browser__bar">
          <span /><span /><span />
          <div />
        </div>
        <div className="project-browser__body">
          <div className="project-browser__icon"><Icon size={28} /></div>
          <div className="project-browser__copy">
            <span /><span /><span />
          </div>
          <div className="project-browser__button" />
        </div>
      </div>
      <div className="project-visual__orb project-visual__orb--one" aria-hidden="true" />
      <div className="project-visual__orb project-visual__orb--two" aria-hidden="true" />
    </div>
  );
}

export default function App() {
  const [showAllServices, setShowAllServices] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [legalDocument, setLegalDocument] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.href.slice(1))).filter(Boolean);
    if (!('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]:not(.is-visible)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -35px' },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [showAllServices]);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 750);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const visibleServices = showAllServices ? SERVICES : SERVICES.slice(0, 4);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header activeSection={activeSection} />

      <main id="main-content">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero__glow" aria-hidden="true" />
          <div className="container hero__grid">
            <div className="hero__content" data-reveal>
              <div className="hero__eyebrow">
                <span aria-hidden="true" /> INFORMATION TECHNOLOGY <i aria-hidden="true">•</i> DIGITAL SOLUTIONS
              </div>
              <h1 id="hero-title">
                Smart Technology.<br />
                Powerful <span>Digital Solutions.</span>
              </h1>
              <p className="hero__intro">
                Welcome to AdFah Tech, your trusted technology partner for modern websites, digital
                solutions, and innovative IT services. We help businesses and individuals build a strong
                online presence and achieve their digital goals.
              </p>
              <div className="hero__actions">
                <a href="#services" className="button button--primary button--large">
                  Explore Our Services <ArrowRight size={19} aria-hidden="true" />
                </a>
                <a href="#contact" className="button button--ghost button--large">
                  Contact Us <ArrowUpRight size={19} aria-hidden="true" />
                </a>
              </div>
              <ul className="hero__trust" aria-label="Our service commitments">
                <li><BadgeCheck size={18} aria-hidden="true" /> Quality Digital Solutions</li>
                <li><Headphones size={18} aria-hidden="true" /> Reliable Support</li>
                <li><HeartHandshake size={18} aria-hidden="true" /> Customer-Focused Service</li>
              </ul>
            </div>

            <div className="hero__visual" data-reveal style={{ '--delay': '120ms' }}>
              <div className="hero__portrait-frame">
                <Portrait className="portrait--hero" eager />
              </div>
              <div className="hero__floating-card hero__floating-card--top">
                <span><Sparkles size={18} aria-hidden="true" /></span>
                <div><strong>Ideas into experiences</strong><small>Creative. Practical. Digital.</small></div>
              </div>
              <div className="hero__floating-card hero__floating-card--bottom">
                <span><MapPin size={18} aria-hidden="true" /></span>
                <div><strong>Maiduguri, Nigeria</strong><small>Technology with purpose</small></div>
              </div>
            </div>
          </div>
          <a href="#services" className="hero__scroll-cue">
            <span>Scroll to discover</span><ArrowDown size={17} aria-hidden="true" />
          </a>
        </section>

        <section className="section services" id="services" aria-labelledby="services-title">
          <div className="container">
            <SectionHeading
              eyebrow="WHAT WE DO"
              id="services-title"
              title={<>Our IT <span>Services</span></>}
              subtitle="Digital solutions designed to help you grow."
            />
            <div className="services__grid" id="services-grid">
              {visibleServices.map((service, index) => {
                const Icon = serviceIcons[service.icon];
                return (
                  <article
                    className="service-card"
                    key={service.title}
                    data-reveal
                    style={{ '--delay': `${(index % 4) * 70}ms` }}
                  >
                    <div className="service-card__top">
                      <div className="service-card__icon"><Icon size={27} strokeWidth={1.7} aria-hidden="true" /></div>
                      <span className="service-card__number">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <a href="#contact" onClick={() => setSelectedService(service.title)} className="service-card__link">
                      Discuss this service <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </article>
                );
              })}
            </div>
            <div className="services__more" data-reveal>
              <button
                type="button"
                className="button button--outline"
                onClick={() => setShowAllServices((show) => !show)}
                aria-expanded={showAllServices}
                aria-controls="services-grid"
              >
                {showAllServices ? 'Show Fewer Services' : 'View All Services'}
                <ChevronDown size={18} className={showAllServices ? 'is-rotated' : ''} aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        <section className="section about" id="about" aria-labelledby="about-title">
          <div className="container about__grid">
            <div className="about__visual" data-reveal>
              <div className="about__image">
                <Portrait className="portrait--about" />
              </div>
              <div className="about__badge">
                <span><Target size={25} aria-hidden="true" /></span>
                <div><strong>Technology with purpose</strong><small>Built around your goals</small></div>
              </div>
            </div>
            <div className="about__content" data-reveal style={{ '--delay': '100ms' }}>
              <span className="section-heading__eyebrow">ABOUT ADFAH TECH</span>
              <h2 id="about-title">We Help Your Business Grow <span>with Technology</span></h2>
              <p>
                AdFah Tech is a technology-focused business committed to helping individuals,
                entrepreneurs, and organizations succeed in the digital world. We focus on creating
                useful, modern, and user-friendly digital experiences that solve real problems and help
                our clients build their online presence.
              </p>
              <ul className="about__points">
                {ABOUT_POINTS.map((point) => (
                  <li key={point}><CheckCircle2 size={18} aria-hidden="true" /> {point}</li>
                ))}
              </ul>
              <a href="#why-us" className="button button--primary">
                Learn More About Us <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="principles" aria-label="AdFah Tech working principles">
          <div className="container principles__grid">
            {workingPrinciples.map((principle) => {
              const Icon = principle.icon;
              return (
                <div className="principle" key={principle.title} data-reveal>
                  <div className="principle__icon"><Icon size={25} strokeWidth={1.6} aria-hidden="true" /></div>
                  <div><strong>{principle.title}</strong><span>{principle.text}</span></div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="section why-us" id="why-us" aria-labelledby="why-title">
          <div className="container">
            <SectionHeading
              eyebrow="THE ADFAH TECH APPROACH"
              id="why-title"
              title={<>Why Choose <span>AdFah Tech?</span></>}
              subtitle="A thoughtful, customer-focused approach to every digital solution."
            />
            <div className="why-us__grid">
              {WHY_CHOOSE_US.map((item, index) => {
                const Icon = whyIcons[item.icon];
                return (
                  <article className="why-card" key={item.title} data-reveal style={{ '--delay': `${(index % 3) * 70}ms` }}>
                    <div className="why-card__icon"><Icon size={25} strokeWidth={1.7} aria-hidden="true" /></div>
                    <div><h3>{item.title}</h3><p>{item.description}</p></div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section portfolio" id="portfolio" aria-labelledby="portfolio-title">
          <div className="container">
            <SectionHeading
              eyebrow="OUR PORTFOLIO"
              id="portfolio-title"
              title={<>Our Recent <span>Work</span></>}
              subtitle="Explore example project categories that can be tailored to your goals."
            />
            <p className="portfolio__disclosure" data-reveal>
              <ShieldCheck size={18} aria-hidden="true" />
              These are concept previews and example categories only—not completed client projects.
            </p>
            <div className="portfolio__grid">
              {PROJECT_CATEGORIES.map((project, index) => (
                <article className="project-card" key={project.title} data-reveal style={{ '--delay': `${(index % 3) * 70}ms` }}>
                  <ProjectVisual project={project} />
                  <div className="project-card__body">
                    <span className="project-card__category">EXAMPLE PROJECT CATEGORY</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <a href="#contact" onClick={() => setSelectedService(project.service)} className="project-card__link">
                      Plan a similar project <ArrowRight size={17} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section testimonials" id="testimonials" aria-labelledby="testimonials-title">
          <div className="container">
            <SectionHeading
              eyebrow="TESTIMONIALS"
              id="testimonials-title"
              title={<>A Space for <span>Genuine Feedback</span></>}
              subtitle="This carousel contains clearly marked placeholders—not fabricated customer experiences."
            />
            <Testimonials />
          </div>
        </section>

        <section className="section contact" id="contact" aria-labelledby="contact-title">
          <div className="container">
            <SectionHeading
              eyebrow="LET’S WORK TOGETHER"
              id="contact-title"
              title={<>Let&apos;s Build Something <span>Great Together</span></>}
              subtitle="Have a project in mind? Contact AdFah Tech today to discuss your ideas and find the right digital solution for your needs."
            />
            <div className="contact__grid" data-reveal>
              <div className="contact__details">
                <div className="contact__details-heading">
                  <span>CONTACT ADFAH TECH</span>
                  <h3>Let’s talk about your next digital step.</h3>
                  <p>Choose whichever contact option works best for you.</p>
                </div>
                <address className="contact-list">
                  <a href={`tel:${BUSINESS.phone}`} className="contact-list__item">
                    <span><Phone size={21} aria-hidden="true" /></span>
                    <div><small>Phone</small><strong>{BUSINESS.phone}</strong></div>
                  </a>
                  <a href={`mailto:${BUSINESS.email}`} className="contact-list__item">
                    <span><Mail size={21} aria-hidden="true" /></span>
                    <div><small>Email</small><strong>{BUSINESS.email}</strong></div>
                  </a>
                  <div className="contact-list__item">
                    <span><MapPin size={21} aria-hidden="true" /></span>
                    <div><small>Location</small><strong>{BUSINESS.location}</strong></div>
                  </div>
                </address>
                <div className="contact__actions">
                  <a href={`tel:${BUSINESS.phone}`} className="button button--primary">
                    <Phone size={18} aria-hidden="true" /> Call Now
                  </a>
                  <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer" className="button button--whatsapp">
                    <MessageCircle size={18} aria-hidden="true" /> WhatsApp <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                  <a href={`mailto:${BUSINESS.email}`} className="button button--ghost">
                    <Mail size={18} aria-hidden="true" /> Email
                  </a>
                </div>
                <div className="contact__promise">
                  <ShieldCheck size={20} aria-hidden="true" />
                  <span>Your ideas are welcome. Let’s find a practical solution together.</span>
                </div>
              </div>
              <ContactForm selectedService={selectedService} />
            </div>
          </div>
        </section>

        <section className="cta-banner" aria-labelledby="cta-title">
          <div className="container cta-banner__inner" data-reveal>
            <div className="cta-banner__icon" aria-hidden="true"><Rocket size={34} /></div>
            <div className="cta-banner__copy">
              <h2 id="cta-title">Have a Project in Mind?</h2>
              <p>Let&apos;s turn your ideas into powerful digital experiences.</p>
            </div>
            <div className="cta-banner__actions">
              <a href="#contact" className="button button--primary">Get a Free Quote <ArrowRight size={18} aria-hidden="true" /></a>
              <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer" className="button button--ghost">
                <MessageCircle size={18} aria-hidden="true" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__grid">
          <div className="site-footer__brand">
            <Logo />
            <p>Building modern digital experiences through technology, creativity, and practical solutions.</p>
          </div>
          <div className="site-footer__column">
            <h2>Quick Links</h2>
            <ul>
              {NAV_LINKS.map((link) => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}
            </ul>
          </div>
          <div className="site-footer__column">
            <h2>Services</h2>
            <ul>
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.title}>
                  <a href="#services" onClick={() => setShowAllServices(true)}>{service.shortTitle}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="site-footer__column site-footer__contact">
            <h2>Contact Information</h2>
            <ul>
              <li><Phone size={16} aria-hidden="true" /><a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phone}</a></li>
              <li><Mail size={16} aria-hidden="true" /><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></li>
              <li><MapPin size={16} aria-hidden="true" /><span>{BUSINESS.location}</span></li>
            </ul>
          </div>
        </div>
        <div className="container site-footer__bottom">
          <p>© {new Date().getFullYear()} AdFah Tech. All rights reserved.</p>
          <div>
            <button type="button" onClick={() => setLegalDocument('privacy')}>Privacy Policy</button>
            <button type="button" onClick={() => setLegalDocument('terms')}>Terms &amp; Conditions</button>
          </div>
        </div>
      </footer>

      <a href="#home" className={`back-to-top ${showBackToTop ? 'is-visible' : ''}`} aria-label="Back to top">
        <ArrowUp size={20} aria-hidden="true" />
      </a>

      {legalDocument && <LegalDialog type={legalDocument} onClose={() => setLegalDocument(null)} />}
    </>
  );
}
