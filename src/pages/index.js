import Link from 'next/link';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';

export default function Home() {
    const projects = [
        {
            title: "GümüşNot",
            description: "Flutter ile geliştirilmiş, kullanıcı dostu not alma asistanı.",
            stack: ["Flutter", "Dart", "Firebase"],
            github: "https://github.com/ufukkartal/gumusnot"
        },
        {
            title: "GümüşDil & Gümüşİde",
            description: "Kendi programlama dilim ve IDE projem. Derleyici mantığı üzerine bir çalışma.",
            stack: ["C++", "C#", "Electron"],
            github: "https://github.com/ufukkartal/gumusdil"
        },
        {
            title: "Fabula Evreni",
            description: "Node.js/React tabanlı ortaklaşa hikaye yazma platformu.",
            stack: ["Node.js", "React", "MongoDB"],
            github: "https://github.com/ufukkartal/fabula"
        }
    ];

    return (
        <>
            <section style={{
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                position: 'relative'
            }}>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        Merhaba, Ben Ufuk
                    </span>
                    <h1 className="gradient-text" style={{
                        fontSize: '4rem',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        marginTop: '0.5rem',
                        marginBottom: '1rem',
                        maxWidth: '1200px'
                    }}>
                        Yazılım Mühendisi Adayı <br /> & Full-Stack Geliştirici
                    </h1>
                    <p style={{
                        fontSize: '1.5rem',
                        color: '#a3a3a3',
                        maxWidth: '600px',
                        marginBottom: '2rem'
                    }}>
                        Kod yazarım, sistem kurarım, veriyle oynarım. Zayıf ortalamalar sadece birer sayıdır; asıl mevzu ortaya koyduğun iştir.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link href="/projects" className="btn-primary">
                            Projelerime Göz At
                        </Link>
                        <a href="/cv.pdf" download className="btn-secondary">
                            CV'mi İndir
                        </a>
                    </div>
                </motion.div>

                {/* Decorative Background Blob */}
                <div style={{
                    position: 'absolute',
                    top: '30%',
                    right: '50%',
                    transform: 'translate(50%, -50%)',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, rgba(10,10,10,0) 70%)',
                    zIndex: -1,
                    filter: 'blur(80px)'
                }} />
            </section>

            <section id="projects" style={{ padding: '6rem 0' }}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center' }}>
                        Asıl Mevzu Burası <span style={{ color: 'var(--primary)' }}>//</span> Projeler
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        {projects.map((proj, i) => (
                            <ProjectCard key={i} project={proj} index={i} />
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <Link href="/projects" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--primary)', textDecoration: 'underline' }}>
                            Tüm Projeleri Gör &rarr;
                        </Link>
                    </div>
                </motion.div>
            </section>

            <section id="skills" style={{ padding: '6rem 0', background: 'rgba(255,255,255,0.02)', borderRadius: '24px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="container"
                >
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '3rem', textAlign: 'center' }}>
                        Alet Çantası <span style={{ color: 'var(--secondary)' }}>//</span> Yetenekler
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem', display: 'inline-block' }}>Diller</h3>
                            <ul style={{ listStyle: 'none', fontSize: '1.1rem', color: '#ccc' }}>
                                <li style={{ marginBottom: '0.5rem' }}>C++ <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>(Sistem)</span></li>
                                <li style={{ marginBottom: '0.5rem' }}>Java <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>(Android/Backend)</span></li>
                                <li style={{ marginBottom: '0.5rem' }}>Dart <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>(Flutter)</span></li>
                                <li style={{ marginBottom: '0.5rem' }}>Python <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>(AI/Scripting)</span></li>
                                <li style={{ marginBottom: '0.5rem' }}>C# <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>(Unity/.NET)</span></li>
                            </ul>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', borderBottom: '2px solid var(--secondary)', paddingBottom: '0.5rem', display: 'inline-block' }}>Teknolojiler</h3>
                            <ul style={{ listStyle: 'none', fontSize: '1.1rem', color: '#ccc' }}>
                                <li style={{ marginBottom: '0.5rem' }}>Flutter <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>(Mobil/Web)</span></li>
                                <li style={{ marginBottom: '0.5rem' }}>Node.js <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>(Backend)</span></li>
                                <li style={{ marginBottom: '0.5rem' }}>SQL <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>(PostgreSQL/MySQL)</span></li>
                                <li style={{ marginBottom: '0.5rem' }}>Arduino/ESP32 <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>(IoT)</span></li>
                            </ul>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', borderBottom: '2px solid var(--accent)', paddingBottom: '0.5rem', display: 'inline-block' }}>Araçlar</h3>
                            <ul style={{ listStyle: 'none', fontSize: '1.1rem', color: '#ccc' }}>
                                <li style={{ marginBottom: '0.5rem' }}>Git <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>(Version Control)</span></li>
                                <li style={{ marginBottom: '0.5rem' }}>VS Code <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>(IDE)</span></li>
                                <li style={{ marginBottom: '0.5rem' }}>Linux <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>(OS)</span></li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </section>
        </>
    );
}
