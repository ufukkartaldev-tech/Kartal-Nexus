import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function GumusDilPost() {
    return (
        <>
            <Head>
                <title>GümüşDil: Yerli Bir Yazılım Ekosistemi İnşası | Ufuk Kartal</title>
            </Head>
            <article style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem', lineHeight: '1.8' }}>
                <Link href="/blog" style={{ color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                    &larr; Blog'a Dön
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.5rem' }}>
                        GümüşDil: Sadece Bir Programlama Dili Değil, Bir Vizyon İnşası
                    </h1>

                    <div style={{ display: 'flex', gap: '1rem', color: '#888', marginBottom: '3rem', fontSize: '0.9rem' }}>
                        <span>20 Şubat 2026</span>
                        <span>•</span>
                        <span>12 Dakika Okuma</span>
                    </div>

                    <div className="blog-content" style={{ fontSize: '1.15rem', color: '#ddd' }}>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Yazılım dünyasında "yerlileşme" dendiğinde akla genelde mevcut araçların Türkçeleştirilmesi gelir. Ancak <strong>GümüşDil</strong> projesiyle biz, bu sınırları aşarak çekirdekten uca bir ekosistem kurmaya odaklandık. Bir sabah Gümüşhane'deki evimde otururken kendime şu soruyu sordum: "Neden bir Türk genci, kendi dilinde düşünürken İngilizce sözdizimi ile boğuşmak zorunda?"
                        </p>

                        <h2 style={{ color: '#fff', fontSize: '2rem', marginTop: '3rem', marginBottom: '1.5rem' }}>1. Neden %100 Türkçe Sözdizimi?</h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            GümüşDil'in en çok dikkat çeken özelliği %100 Türkçe olması. <code>değişken</code>, <code>fonksiyon</code>, <code>eğer</code> gibi anahtar kelimeler sadece çeviri değil, bilişsel bir kolaylık devrimidir. Kod yazarken beynimiz bir yandan algoritmayı kurarken diğer yandan yabancı bir dilin kurallarıyla uğraşmamalı. GümüşDil ile kod yazmak, bir makineyle Türkçe sohbet etmek kadar doğal.
                        </p>

                        <div className="glass" style={{ padding: '2rem', borderRadius: '16px', margin: '2rem 0', background: 'rgba(255,255,255,0.02)', borderLeft: '4px solid var(--primary)' }}>
                            <h3 style={{ marginTop: 0 }}>Örnek GümüşDil Kodu:</h3>
                            <pre style={{ margin: 0, color: 'var(--secondary)', overflowX: 'auto' }}>
                                {`değişken sayı = 10;
eğer (sayı > 5) {
    yazdır("Sayı 5'ten büyük!");
} döngü (değişken i = 0; i < 3; i++) {
    yazdır(i);
}`}
                            </pre>
                        </div>

                        <h2 style={{ color: '#fff', fontSize: '2rem', marginTop: '3rem', marginBottom: '1.5rem' }}>2. Teknik Altyapı: C++'ın Gücü</h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            GümüşDil sadece bir "script" veya "çeviri katmanı" değildir. Arkasında C++ ile geliştirilmiş, kendi Lexer ve Parser modüllerine sahip <strong>Gümüş Compiler</strong> bulunur. Bu derleyici, kodu tokenize eder, soyut sözdizimi ağacı (AST) oluşturur ve en sonunda yüksek performanslı makine koduna dönüştürür. Hız konusunda C++ tabanlı olmasının getirdiği avantajları sonuna kadar kullanıyoruz.
                        </p>

                        <h2 style={{ color: '#fff', fontSize: '2rem', marginTop: '3rem', marginBottom: '1.5rem' }}>3. Pardus Entegrasyonu ve Ekosistem</h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Projemizin "Başmühendis Yazılım Ekosistemi" olarak adlandırılmasının sebebi, sadece bir dilden ibaret olmamasıdır. Milli işletim sistemimiz <strong>Pardus</strong> ile çekirdek seviyesinde konuşabilen kütüphaneler geliştirdik:
                        </p>
                        <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
                            <li><strong>pardus_sistem.tr:</strong> Sistem servislerini yönetme ve paket yönetimi.</li>
                            <li><strong>veribilimi.tr:</strong> Yerli veri setlerini kolayca işleyebilme.</li>
                            <li><strong>robotik.tr:</strong> GPIO ve donanım kontrolünü ana dilde yapabilme.</li>
                        </ul>

                        <h2 style={{ color: '#fff', fontSize: '2rem', marginTop: '3rem', marginBottom: '1.5rem' }}>4. Gümüşİde: Geleceğin Editörü</h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Gümüşİde, Glassmorphism tasarımıyla modern bir arayüz sunarken, <strong>GümüşHafıza</strong> özelliğiyle RAM'deki verileri canlı olarak görselleştiriyor. Bu, özellikle programlama öğrenen gençler için "pointer" veya "bellek yönetimi" gibi soyut kavramları somutlaştırıyor. Ayrıca içindeki <strong>Gümüş Zeka</strong> asistanı, hataları sadece bulmakla kalmıyor, nedenini Türkçe bir şekilde hikayeleştirerek anlatıyor.
                        </p>

                        <h2 style={{ color: '#fff', fontSize: '2rem', marginTop: '3rem', marginBottom: '1.5rem' }}>Sonuç: Diplomadan Öte Bir Mücadele</h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Bu projenin arkasında "tek başına bir ordu" gibi çalışan, düşük not ortalamasını bir engel değil, bir yakıt olarak kullanan bir azim var. GümüşDil, Türkiye'nin teknoloji hamlesinde (TEKNOFEST ruhuyla) gençlerin neler başarabileceğinin kanlı canlı kanıtıdır. Biz sadece kod yazmıyoruz; biz dilimizle, kültürümüzle ve azmimizle bir gelecek inşa ediyoruz.
                        </p>

                        <div style={{ marginTop: '4rem', padding: '2rem', borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>Bu yazı Ufuk Kartal tarafından kaleme alınmıştır.</p>
                            <Link href="/blog" className="btn-secondary" style={{ marginTop: '1rem', display: 'inline-block' }}>
                                Diğer Yazılara Göz At
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </article>
        </>
    );
}
