import Head from 'next/head';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight, Send, MapPin } from 'lucide-react';

const CONTACT_CARDS = [
    {
        icon: Mail,
        title: 'E-posta',
        value: 'ufuk.kartal.dev@gmail.com',
        href: 'mailto:ufuk.kartal.dev@gmail.com',
        color: '#db2777',
        description: 'Proje teklifleri ve iş birlikleri için'
    },
    {
        icon: Github,
        title: 'GitHub',
        value: 'ufukkartaldev-tech',
        href: 'https://github.com/ufukkartaldev-tech',
        color: '#ffffff',
        description: 'Kaynak kodlar ve commit geçmişi'
    },
    {
        icon: Linkedin,
        title: 'LinkedIn',
        value: 'ufuk-kartal',
        href: 'https://www.linkedin.com/in/ufuk-kartal-7908a3286/',
        color: '#0a66c2',
        description: 'Profesyonel ağ ve kariyer'
    }
];

export default function Contact() {
    return (
        <>
            <Head>
                <title>İletişim | Ufuk Kartal</title>
                <meta name="description" content="Ufuk Kartal ile iletişime geç. Proje teklifleri, iş birlikleri ve sorularınız için e-posta veya LinkedIn üzerinden ulaşabilirsiniz." />
            </Head>

            <section style={{ padding: '4rem 0' }}>
                {/* Başlık */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '5rem' }}
                >
                    <span style={{
                        fontSize: '0.85rem', color: 'var(--primary)',
                        fontWeight: 600, letterSpacing: '0.15em',
                        textTransform: 'uppercase', display: 'block',
                        marginBottom: '1rem'
                    }}>
                        İletişim
                    </span>
                    <h1 className="gradient-text" style={{
                        fontSize: '3.5rem', fontWeight: 800,
                        lineHeight: 1.1, marginBottom: '1.25rem'
                    }}>
                        Seninle Çalışmak<br />İstiyorum
                    </h1>
                    <p style={{
                        color: '#888', maxWidth: '520px',
                        margin: '0 auto', fontSize: '1.05rem',
                        lineHeight: 1.75
                    }}>
                        Bir proje fikrin mi var? Bir iş birliği mi düşünüyorsun?
                        Ya da sadece merhaba mı demek istiyorsun? Her türlü mesaj için buradayım.
                    </p>
                </motion.div>

                {/* İletişim Kartları */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '4rem'
                }}>
                    {CONTACT_CARDS.map(({ icon: Icon, title, value, href, color, description }, i) => (
                        <motion.a
                            key={title}
                            href={href}
                            target={href.startsWith('mailto') ? '_self' : '_blank'}
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -6 }}
                            className="glass"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                padding: '2rem',
                                borderRadius: '20px',
                                border: '1px solid var(--glass-border)',
                                textDecoration: 'none',
                                color: 'inherit',
                                position: 'relative',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition: 'border-color 0.3s ease'
                            }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = color + '55'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--glass-border)'}
                        >
                            {/* Blob */}
                            <div style={{
                                position: 'absolute', top: '-40px', right: '-40px',
                                width: '150px', height: '150px',
                                background: color, filter: 'blur(80px)',
                                opacity: 0.12, zIndex: 0, pointerEvents: 'none'
                            }} />

                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{
                                    width: '46px', height: '46px',
                                    borderRadius: '12px',
                                    background: color + '18',
                                    border: `1px solid ${color}33`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: '1.25rem'
                                }}>
                                    <Icon size={22} style={{ color }} />
                                </div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem' }}>{title}</h3>
                                <p style={{ color, fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.5rem' }}>{value}</p>
                                <p style={{ color: '#666', fontSize: '0.85rem' }}>{description}</p>
                            </div>

                            <div style={{
                                position: 'absolute', bottom: '1.5rem', right: '1.5rem', zIndex: 1
                            }}>
                                <ArrowUpRight size={18} style={{ color: '#555' }} />
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Konum bilgisi */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="glass"
                    style={{
                        padding: '2.5rem',
                        borderRadius: '20px',
                        border: '1px solid var(--glass-border)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.5rem',
                        flexWrap: 'wrap'
                    }}
                >
                    <div style={{
                        width: '56px', height: '56px', borderRadius: '16px',
                        background: 'rgba(124,58,237,0.1)',
                        border: '1px solid rgba(124,58,237,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0
                    }}>
                        <MapPin size={26} style={{ color: 'var(--primary)' }} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                            Gümüşhane, Türkiye
                        </h3>
                        <p style={{ color: '#777', fontSize: '0.9rem' }}>
                            Dağların arasında kod yazan bir mühendis. Remote çalışmaya açık, tüm dünyayla iletişimde.
                        </p>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            fontSize: '0.8rem', color: '#22c55e',
                            background: 'rgba(34,197,94,0.1)',
                            border: '1px solid rgba(34,197,94,0.2)',
                            padding: '0.35rem 0.9rem', borderRadius: '20px', fontWeight: 600
                        }}>
                            <span style={{
                                width: '7px', height: '7px', borderRadius: '50%',
                                background: '#22c55e',
                                boxShadow: '0 0 6px #22c55e',
                                animation: 'pulse 2s infinite'
                            }} />
                            Müsait
                        </span>
                    </div>
                </motion.div>
            </section>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
            `}</style>
        </>
    );
}
