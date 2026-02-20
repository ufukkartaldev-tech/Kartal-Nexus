import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/projects', label: 'Projeler' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'İletişim' },
  ];

  return (
    <>
      <nav className="glass" style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem'
      }}>
        {/* Logo */}
        <div style={{ fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.04em' }}>
          <Link href="/">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer'
              }}
            >
              <span style={{
                background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                UK
              </span>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 400, fontSize: '1rem' }}>
                /dev
              </span>
            </motion.span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <ul style={{
          display: 'flex',
          gap: '2rem',
          listStyle: 'none',
          alignItems: 'center',
          margin: 0,
          padding: 0
        }}
          className="desktop-nav"
        >
          {navLinks.map(({ href, label }) => (
            <motion.li key={href} whileHover={{ y: -2 }}>
              <Link href={href} style={{ fontWeight: 500, fontSize: '0.95rem' }}>{label}</Link>
            </motion.li>
          ))}
          <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/contact" className="btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
              İletişim
            </Link>
          </motion.li>
        </ul>

        {/* Mobile Hamburger */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{
            background: 'none',
            border: '1px solid var(--glass-border)',
            borderRadius: '8px',
            padding: '0.4rem',
            color: '#fff',
            cursor: 'pointer',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Menüyü Aç/Kapat"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass mobile-menu"
            style={{
              position: 'sticky',
              top: '65px',
              zIndex: 99,
              padding: '1.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.2rem',
              borderTop: '1px solid var(--glass-border)',
              overflow: 'hidden'
            }}
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--foreground)' }}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="btn-primary"
              style={{ textAlign: 'center', marginTop: '0.5rem' }}
            >
              İletişim
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 640px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
        @media (min-width: 641px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
