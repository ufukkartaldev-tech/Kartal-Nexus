import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <nav className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem'
    }}>
      <div style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.05em' }}>
        <Link href="/">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ display: 'inline-block', background: 'var(--primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', cursor: 'pointer' }}
          >
            UK | LOGO
          </motion.span>
        </Link>
      </div>
      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center' }}>
        <motion.li whileHover={{ y: -2 }}><Link href="/" style={{ fontWeight: 500 }}>Ana Sayfa</Link></motion.li>
        <motion.li whileHover={{ y: -2 }}><Link href="/projects" style={{ fontWeight: 500 }}>Projeler</Link></motion.li>
        <motion.li whileHover={{ y: -2 }}><Link href="/blog" style={{ fontWeight: 500 }}>Blog</Link></motion.li>
        <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/#contact" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>İletişim</Link>
        </motion.li>
      </ul>
    </nav>
  );
}
