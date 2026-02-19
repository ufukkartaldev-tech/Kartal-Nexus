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
            description: "Kendi programlama dilim ve IDE projem. Derleyici mantığı üzerine bir çalışma.",
            stack: ["C++", "C#", "Electron"],
            github: "https://github.com/ufukkartal/gumusdil"
        },
        {
            title: "Fabula Evreni",
            description: "Node.js/React tabanlı ortaklaşa hikaye yazma platformu.",
            stack: ["Node.js", "React", "MongoDB"],
            github: "https://github.com/ufukkartal/fabula"
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
                <title>Projeler | Ufuk Kartal</title>
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
