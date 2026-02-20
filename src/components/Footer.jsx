import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="glass" style={{
            marginTop: '6rem',
            padding: '4rem 2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderTop: '1px solid var(--glass-border)'
        }}>
            <h4 style={{
                fontWeight: 800,
                fontSize: '1.2rem',
                letterSpacing: '0.1em',
                marginBottom: '1rem',
                opacity: 0.8
            }}>
                UFUK KARTAL
            </h4>
            <p style={{
                color: '#888',
                marginBottom: '2rem',
                fontSize: '0.9rem',
                maxWidth: '400px'
            }}>
                Yazılım geliştirmek sadece kod yazmak değil, geleceği inşa etmektir.
                Gümüşhane'den dünyaya açılan bir kapı.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                <a href="https://github.com/ufukkartaldev-tech" target="_blank" rel="noopener noreferrer" style={{ padding: '0.5rem', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/ufuk-kartal-7908a3286/" target="_blank" rel="noopener noreferrer" style={{ padding: '0.5rem', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <Linkedin size={24} />
                </a>
                <a href="mailto:ufuk.kartal.dev@gmail.com" style={{ padding: '0.5rem', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <Mail size={24} />
                </a>
            </div>

            <div className="text-secondary" style={{ fontSize: '0.8rem', opacity: 0.5 }}>
                &copy; {new Date().getFullYear()} - Tüm Hakları Kopyalanabilir.
            </div>
        </footer>
    );
}
