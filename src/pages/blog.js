import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Blog() {
    const posts = [
        {
            title: "Düşük GPA, Yüksek Motivasyon: Diplomadan Fazlası",
            excerpt: "1.42 ortalamayla mühendis olunur mu? Gümüşhane'nin dağlarından kod yazarken öğrendiğim en büyük ders: Mesele not dökümünde değil, o derleyiciyi nasıl zorladığında.",
            date: "20 Şubat 2026",
            slug: "dusuk-gpa-muhendislik",
            readTime: "5 dk okuma"
        },
        {
            title: "GümüşDil: Yerli Bir Dil İnşa Etmek",
            excerpt: "Neden kendi programlama dilimizi yazmalıyız? C++ tabanlı bir derleyici ve Türkçe sözdizimi ile yazılımda tam bağımsızlık yolculuğu.",
            date: "15 Şubat 2026",
            slug: "gumusdil-insa-sureci",
            readTime: "8 dk okuma"
        },
        {
            title: "Fabula Evreni'nde Mimari ve Ölçeklenebilirlik",
            excerpt: "İnteraktif bir dünyada dallanan hikayeleri yönetmek. Firebase ve Next.js ikilisinin gücü sayesinde binlerce seçeneği nasıl yönetiyoruz?",
            date: "10 Şubat 2026",
            slug: "fabula-mimari",
            readTime: "6 dk okuma"
        }
    ];

    return (
        <>
            <Head>
                <title>Blog | Ufuk Kartal - Mühendislik Günlüğü ve Teknik İncelemeler</title>
                <meta name="description" content="Yazılım dünyasına dair tecrübeler, GümüşDil'in inşa süreci ve düşük GPA ile mühendislik serüvenim." />
                <meta property="og:title" content="Blog | Ufuk Kartal" />
                <meta property="og:description" content="Mühendislik günlüğü — tecrübeler, hatalar ve teknik detaylar." />
            </Head>

            <section style={{ padding: '4rem 0', maxWidth: '800px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', textAlign: 'center' }}>
                        Mühendislik Günlüğü
                    </h1>
                    <p style={{ textAlign: 'center', color: '#aaaaaa', marginBottom: '4rem' }}>
                        Tecrübeler, hatalar ve arada sırada teknik detaylar.
                    </p>
                </motion.div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {posts.map((post, i) => (
                        <motion.article
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -4 }}
                            className="glass"
                            style={{
                                padding: '2rem',
                                borderRadius: '16px',
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid var(--glass-border)',
                                transition: 'border-color 0.3s ease',
                                cursor: 'default'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(219,39,119,0.4)'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--glass-border)'}
                        >
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                                <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>{post.date}</span>
                                <span style={{ fontSize: '0.8rem', color: '#555' }}>·</span>
                                <span style={{ fontSize: '0.8rem', color: '#666' }}>{post.readTime}</span>
                            </div>
                            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                                <Link href={`/blog/${post.slug}`} style={{ color: 'var(--foreground)' }}>
                                    {post.title}
                                </Link>
                            </h2>
                            <p style={{ color: '#aaa', lineHeight: '1.8', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                                {post.excerpt}
                            </p>
                            <Link href={`/blog/${post.slug}`} style={{ fontWeight: 600, color: 'var(--secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                                Devamını Oku →
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </section>
        </>
    );
}
