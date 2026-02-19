import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProjectCard({ project, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
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
                background: 'rgba(20, 20, 20, 0.6)'
            }}
        >
            {/* Decorative gradient blob */}
            <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '150px',
                height: '150px',
                background: 'var(--primary)',
                filter: 'blur(80px)',
                opacity: 0.2,
                zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1, marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', background: 'linear-gradient(to right, #fff, #bbb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {project.title}
                </h3>
                <p style={{ color: '#aaa', fontSize: '1rem', lineHeight: '1.6' }}>
                    {project.description}
                </p>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {project.stack.map((tech) => (
                        <span key={tech} style={{
                            fontSize: '0.8rem',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '20px',
                            background: 'rgba(255,255,255,0.05)',
                            color: '#ddd',
                            border: '1px solid rgba(255,255,255,0.1)'
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
