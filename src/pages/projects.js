import Head from 'next/head';
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
            github: "https://github.com/ufukkartaldev-tech/fabula_evreni"
        },
        {
            title: "PQC Araştırması",
            description: "Kyber ve Dilithium algoritmaları üzerine teorik ve pratik çalışmalar.",
            stack: ["Cryptography", "Python", "C"],
            github: "https://github.com/ufukkartal/pqc-research"
        }
    ];

    return (
        <>
            <Head>
                <title>Ufuk Kartal | Full-Stack Geliştirici & GümüşDil Yaratıcısı</title>
                <meta name="description" content="Ufuk Kartal'ın kişisel portfolyosu. GümüşDil programlama dili yaratıcısı, sistem programlama ve modern web teknolojileri uzmanı." />
                <meta name="keywords" content="Ufuk Kartal, yazılım mühendisi, GümüşDil, Gümüşİde, Full-stack geliştirici, Gümüşhane yazılım" />
            </Head>
            <section style={{ padding: '4rem 0' }}>
                <h1 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center' }}>
                    Projeler
                </h1>
                <p style={{ textAlign: 'center', color: '#aaaaaa', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem auto' }}>
                    Mesele diplomada değil, GitHub commit geçmişinde. <br />İşte üzerinde çalıştığım bazı işler.
                </p>

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
