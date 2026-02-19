import Head from 'next/head';
import Link from 'next/link';

export default function Blog() {
    const posts = [
        {
            title: "Düşük GPA ile nasıl proje geliştirilir?",
            excerpt: "1.42 ortalamayla mühendis olunur mu? Olunur, hem de kralı olunur. İşte yol haritası.",
            date: "19 Şubat 2026",
            slug: "dusuk-gpa-ile-proje"
        },
        {
            title: "Gümüşhane'de yazılım okumak",
            excerpt: "Coğrafya kaderdir derler, ama internet her yerde. Dağların arasında kod yazmanın avantajları.",
            date: "15 Ocak 2026",
            slug: "gumushane-yazilim"
        },
        {
            title: "Veritabanı optimizasyonu nedir?",
            excerpt: "SELECT * FROM users demekle olmuyor bu işler. Indexleme, sharding ve cache stratejileri.",
            date: "10 Aralık 2025",
            slug: "veritabani-optimizasyonu"
        }
    ];

    return (
        <>
            <Head>
                <title>Blog | Ufuk Kartal</title>
            </Head>
            <section style={{ padding: '4rem 0', maxWidth: '800px', margin: '0 auto' }}>
                <h1 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center' }}>
                    Mühendislik Günlüğü
                </h1>
                <p style={{ textAlign: 'center', color: '#aaaaaa', marginBottom: '4rem' }}>
                    Tecrübeler, hatalar ve arada sırada teknik detaylar.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    {posts.map((post, i) => (
                        <article key={i} className="glass" style={{ padding: '2rem', borderRadius: '16px', background: 'rgba(255,255,255,0.02)' }}>
                            <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600 }}>{post.date}</span>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0.5rem 0 1rem 0' }}>
                                <Link href={`#`} style={{ color: 'var(--foreground)' }}>
                                    {post.title}
                                </Link>
                            </h2>
                            <p style={{ color: '#aaa', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                                {post.excerpt}
                            </p>
                            <Link href={`#`} style={{ fontWeight: 600, color: 'var(--secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                Devamını Oku &rarr;
                            </Link>
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
}
