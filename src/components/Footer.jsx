import { Github, Linkedin, Mail, ArrowUpRight, Code2, Heart } from 'lucide-react';
import Link from 'next/link';

const SOCIAL_LINKS = [
    {
        icon: Github,
        label: 'GitHub',
        href: 'https://github.com/ufukkartaldev-tech',
        color: '#ffffff'
    },
    {
        icon: Linkedin,
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/ufuk-kartal-7908a3286/',
        color: '#0a66c2'
    },
    {
        icon: Mail,
        label: 'E-posta',
        href: 'mailto:ufuk.kartal.dev@gmail.com',
        color: '#db2777'
    }
];

const NAV_LINKS = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/projects', label: 'Projeler' },
    { href: '/blog', label: 'Blog' },
    { href: '/game', label: '🎮 Oyun' },
    { href: '/contact', label: 'İletişim' },
];

export default function Footer() {
    return (
        <footer
            id="contact"
            style={{
                marginTop: '6rem',
                position: 'relative',
                overflow: 'hidden',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(10,10,10,0.8)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
            }}
        >
            {/* Dekoratif bloblar */}
            <div style={{
                position: 'absolute', top: '-60px', left: '10%',
                width: '350px', height: '350px',
                background: '#7c3aed', filter: 'blur(120px)',
                opacity: 0.07, pointerEvents: 'none', zIndex: 0
            }} />
            <div style={{
                position: 'absolute', bottom: '-40px', right: '10%',
                width: '250px', height: '250px',
                background: '#db2777', filter: 'blur(100px)',
                opacity: 0.07, pointerEvents: 'none', zIndex: 0
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1, padding: '4rem 1.5rem 2rem' }}>

                {/* Üst Alan */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '3rem',
                    marginBottom: '4rem',
                    paddingBottom: '3rem',
                    borderBottom: '1px solid rgba(255,255,255,0.06)'
                }}>
                    {/* Marka */}
                    <div>
                        <div style={{ fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.04em', marginBottom: '0.75rem' }}>
                            <span style={{
                                background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                UK
                            </span>
                            <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, fontSize: '1.1rem' }}>/dev</span>
                        </div>
                        <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '260px' }}>
                            Gümüşhane'den dünyaya açılan bir kapı.
                            Programlama dili yazan, sistem kuran, geleceği inşa eden bir yazılım mühendisi.
                        </p>
                        {/* Sosyal ikonlar */}
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                            {SOCIAL_LINKS.map(({ icon: Icon, label, href, color }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith('mailto') ? '_self' : '_blank'}
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    style={{
                                        width: '42px', height: '42px',
                                        borderRadius: '12px',
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#aaa',
                                        transition: 'all 0.25s ease',
                                        textDecoration: 'none'
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = color + '22';
                                        e.currentTarget.style.borderColor = color + '66';
                                        e.currentTarget.style.color = color;
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                        e.currentTarget.style.color = '#aaa';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Hızlı Linkler */}
                    <div>
                        <h5 style={{
                            fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em',
                            textTransform: 'uppercase', color: '#555',
                            marginBottom: '1.25rem'
                        }}>
                            Sayfalar
                        </h5>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                            {NAV_LINKS.map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        style={{
                                            color: '#888', fontSize: '0.9rem',
                                            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                                            transition: 'color 0.2s'
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                        onMouseLeave={e => e.currentTarget.style.color = '#888'}
                                    >
                                        {label} <ArrowUpRight size={13} style={{ opacity: 0.5 }} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Öne Çıkan Proje */}
                    <div>
                        <h5 style={{
                            fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em',
                            textTransform: 'uppercase', color: '#555',
                            marginBottom: '1.25rem'
                        }}>
                            Öne Çıkan
                        </h5>
                        <a
                            href="https://github.com/ufukkartaldev-tech/Gumus_Dil"
                            target="_blank" rel="noopener noreferrer"
                            style={{
                                display: 'block', padding: '1rem',
                                borderRadius: '12px',
                                background: 'rgba(124,58,237,0.06)',
                                border: '1px solid rgba(124,58,237,0.15)',
                                textDecoration: 'none',
                                transition: 'all 0.25s ease'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(124,58,237,0.12)';
                                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.35)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(124,58,237,0.06)';
                                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.15)';
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                                <Code2 size={16} style={{ color: '#c4b5fd' }} />
                                <span style={{ color: '#c4b5fd', fontWeight: 700, fontSize: '0.9rem' }}>GümüşDil</span>
                            </div>
                            <p style={{ color: '#666', fontSize: '0.8rem', lineHeight: 1.5 }}>
                                %100 Türkçe sözdizimli programlama dili & IDE ekosistemi.
                            </p>
                        </a>
                    </div>
                </div>

                {/* Alt Alan */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <span style={{ fontSize: '0.8rem', color: '#444' }}>
                        © {new Date().getFullYear()} Ufuk Kartal — Tüm Hakları Kopyalanabilir.
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#444', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        Gümüşhane'den <Heart size={12} style={{ color: '#db2777', fill: '#db2777' }} /> ile inşa edildi.
                    </span>
                </div>
            </div>
        </footer>
    );
}
