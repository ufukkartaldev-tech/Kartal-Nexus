import Head from 'next/head';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';

export default function Projects() {
    const projects = [
        {
            title: "GümüşNot",
            description: "Flutter ile geliştirilmiş, kullanıcı dostu not alma asistanı.",
            stack: ["Flutter", "Dart", "Firebase"],
            github: "https://github.com/ufukkartal/gumusnot"
        },
        {
            title: "GümüşDil & Gümüşİde",
            description: "Türkiye'nin Başmühendis Yazılım Ekosistemi. %100 Türkçe sözdizimi, C++ tabanlı Gümüş Compiler ve modern Glassmorphism IDE.",
            stack: ["C++", "C#", "Electron", "Pardus Entegrasyonu"],
            github: "https://github.com/ufukkartaldev-tech/Gumus_Dil"
        },
        {
            title: "Fabula Evreni",
            description: "Okuyucuların seçimleriyle şekillenen, dallanan ağaç yapısına sahip interaktif hikaye platformu. Oyunlaştırma (XP, Rozet) ve sosyal özellikler içerir.",
            stack: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"],
            link: "https://fabula-evreni.vercel.app/",
            github: "https://github.com/ufukkartaldev-tech/fabula_evreni"
        },
        {
            title: "PQC Araştırması",
            description: "Kyber ve Dilithium algoritmaları üzerine teorik ve pratik çalışmalar. ESP32 gibi gömülü sistemlerde post-kuantum şifreleme implementasyonu.",
            stack: ["Cryptography", "Python", "C", "ESP32"],
            github: "https://github.com/ufukkartal/pqc-research"
        }
    ];

    return (
        <>
            <Head>
                <title>Projeler | Ufuk Kartal - Full-Stack Geliştirici & GümüşDil Yaratıcısı</title>
                <meta name="description" content="Ufuk Kartal'ın kişisel portfolyosu. GümüşDil programlama dili yaratıcısı, sistem programlama ve modern web teknolojileri uzmanı." />
                <meta name="keywords" content="Ufuk Kartal, yazılım mühendisi, GümüşDil, Gümüşİde, Full-stack geliştirici, Gümüşhane yazılım" />
                <meta property="og:title" content="Projeler | Ufuk Kartal" />
                <meta property="og:description" content="GitHub commit geçmişi diplomadan daha anlamlı konuşur." />
            </Head>

            <section style={{ padding: '4rem 0' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h1 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>
                        Projeler
                    </h1>
                    <p style={{ color: '#aaaaaa', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7 }}>
                        Mesele diplomada değil, GitHub commit geçmişinde. <br />İşte üzerinde çalıştığım bazı işler.
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {projects.map((proj, i) => (
                        <ProjectCard key={i} project={proj} index={i} />
                    ))}
                </div>
            </section>
        </>
    );
}
