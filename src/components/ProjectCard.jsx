import { motion } from 'framer-motion';
import Link from 'next/link';

const BLOB_COLORS = [
    { color: '#7c3aed', glow: 'rgba(124,58,237,0.15)' },   // Mor - GümüşNot
    { color: '#2563eb', glow: 'rgba(37,99,235,0.15)' },    // Mavi - GümüşDil
    { color: '#db2777', glow: 'rgba(219,39,119,0.15)' },   // Pembe - Fabula
    { color: '#059669', glow: 'rgba(5,150,105,0.15)' },    // Yeşil - PQC
];

export default function ProjectCard({ project, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="glass"
            style={{
                padding: '2rem',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid var(--glass-border)',
                background: 'rgba(20, 20, 20, 0.6)',
                cursor: 'default',
                transition: 'border-color 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = BLOB_COLORS[index % BLOB_COLORS.length].color + '66'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--glass-border)'}
        >
            {/* Decorative gradient blob - her kart için farklı renk */}
            <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '180px',
                height: '180px',
                background: BLOB_COLORS[index % BLOB_COLORS.length].color,
                filter: 'blur(90px)',
                opacity: 0.2,
                zIndex: 0,
                pointerEvents: 'none'
            }} />
            {/* İkinci küçük blob sol altta */}
            <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: '-30px',
                width: '100px',
                height: '100px',
                background: BLOB_COLORS[(index + 1) % BLOB_COLORS.length].color,
                filter: 'blur(60px)',
                opacity: 0.1,
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            <div style={{ position: 'relative', zIndex: 1, marginBottom: '1.5rem' }}>
                <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                    background: 'linear-gradient(to right, #fff, #bbb)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    {project.title}
                </h3>
                <p style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: '1.7' }}>
                    {project.description}
                </p>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {project.stack.map((tech) => (
                        <span key={tech} style={{
                            fontSize: '0.75rem',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '20px',
                            background: 'rgba(124,58,237,0.12)',
                            color: '#c4b5fd',
                            border: '1px solid rgba(124,58,237,0.25)',
                            fontWeight: 500
                        }}>
                            {tech}
                        </span>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    {project.link && (
                        <Link href={project.link} target="_blank" className="btn-primary" style={{ textDecoration: 'none', fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                            İncele
                        </Link>
                    )}
                    {project.github && (
                        <Link href={project.github} target="_blank" className="btn-secondary" style={{ textDecoration: 'none', fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                            GitHub
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
