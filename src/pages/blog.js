import Head from 'next/head';
import Link from 'next/link';

export default function Blog() {
    const posts = [
        {
            title: "Düşük GPA, Yüksek Motivasyon: Diplomadan Fazlası",
            excerpt: "1.42 ortalamayla mühendis olunur mu? Gümüşhane'nin dağlarından kod yazarken öğrendiğim en büyük ders: Mesele not dökümünde değil, o derleyiciyi nasıl zorladığında.",
            date: "20 Şubat 2026",
            slug: "dusuk-gpa-muhendislik"
        },
        {
            title: "GümüşDil: Yerli Bir Dil İnşa Etmek",
            excerpt: "Neden kendi programlama dilimizi yazmalıyız? C++ tabanlı bir derleyici ve Türkçe sözdizimi ile yazılımda tam bağımsızlık yolculuğu.",
            date: "15 Şubat 2026",
            slug: "gumusdil-insa-sureci"
        },
        {
            title: "Fabula Evreni'nde Node.js ve Ölçeklenebilirlik",
            excerpt: "İnteraktif bir dünyada dallanan hikayeleri yönetmek. Firebase ve Next.js ikilisinin gücü sayesinde binlerce seçeneği nasıl yönetiyoruz?",
            date: "10 Şubat 2026",
            slug: "fabula-mimari"
        }
    ];

    return (
        <>
            <Head>
                <title>Blog | Ufuk Kartal - Mühendislik Günlüğü ve Teknik İncelemeler</title>
                <meta name="description" content="Yazılım dünyasına dair tecrübeler, GümüşDil'in inşa süreci ve düşük GPA ile mühendislik serüvenim." />
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
                            <Link href={`/blog/${post.slug}`} style={{ fontWeight: 600, color: 'var(--secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                Devamını Oku &rarr;
                            </Link>
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
}
