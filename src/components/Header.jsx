import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../data';
import Logo from './Logo';

export default function Header({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const onPointerDown = (event) => {
      if (menuOpen && headerRef.current && !headerRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header ref={headerRef} className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <Logo onClick={closeMenu} />

        <nav
          id="primary-navigation"
          className={`primary-nav ${menuOpen ? 'is-open' : ''}`}
          aria-label="Primary navigation"
        >
          <ul>
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.slice(1);
              const active = activeSection === sectionId;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={active ? 'is-active' : ''}
                    aria-current={active ? 'location' : undefined}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <a href="#contact" className="button button--primary primary-nav__quote" onClick={closeMenu}>
            Get a Free Quote <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </nav>

        <div className="site-header__actions">
          <a href="#contact" className="button button--primary site-header__quote">
            Get a Free Quote <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
