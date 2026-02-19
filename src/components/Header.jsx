import Link from 'next/link';

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
          <span style={{ background: 'var(--primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>UK</span> | LOGO
        </Link>
      </div>
      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
        <li><Link href="/" style={{ fontWeight: 500 }}>Ana Sayfa</Link></li>
        <li><Link href="/projects" style={{ fontWeight: 500 }}>Projeler</Link></li>
        <li><Link href="/blog" style={{ fontWeight: 500 }}>Blog</Link></li>
        <li><Link href="#contact" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>İletişim</Link></li>
      </ul>
    </nav>
  );
}
