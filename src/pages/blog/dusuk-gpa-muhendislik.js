import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function GPAPost() {
    return (
        <>
            <Head>
                <title>1.42 GPA ile Mühendislik: Rakamların Ötesindeki Gerçek | Ufuk Kartal</title>
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
                        1.42 GPA Bir Engel Mi, Yoksa Bir Yakıt Mı?
                    </h1>

                    <div style={{ display: 'flex', gap: '1rem', color: '#888', marginBottom: '3rem', fontSize: '0.9rem' }}>
                        <span>20 Şubat 2026</span>
                        <span>•</span>
                        <span>8 Dakika Okuma</span>
                    </div>

                    <div className="blog-content" style={{ fontSize: '1.15rem', color: '#ddd' }}>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Üniversite yıllarının başında çoğumuza şu öğretilir: "Ortalaman ne kadar yüksekse, o kadar iyi bir mühendissin." Benim için bu tablo biraz farklıydı. Transkriptimde asılı duran <strong>1.42</strong> rakamı, akademik sistemin gözünde bir "başarısızlık" belgesiydi. Ama benim gözümde, o rakam sadece sınıfta geçirmediğim zamanın, bilgisayar başında uykusuz kalarak geliştirdiğim projelerin bir bedeliydi.
                        </p>

                        <h2 style={{ color: '#fff', fontSize: '2rem', marginTop: '3rem', marginBottom: '1.5rem' }}>Sistem vs. Pratik</h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Teorik derslerin sınav kağıtlarında kaybolmak yerine, Gümüşhane'deki o küçük odamda terminalin siyah ekranında kaybolmayı tercih ettim. Diferansiyel denklemler yerine derleyici (compiler) mantığını, ezberlenmesi gereken formüller yerine veri yapılarını (data structures) gerçek projeler üzerinde öğrenmeye çalıştım.
                        </p>

                        <div className="glass" style={{ padding: '2rem', borderRadius: '16px', margin: '2rem 0', background: 'rgba(255,255,255,0.02)', borderLeft: '4px solid var(--accent)' }}>
                            <p style={{ fontStyle: 'italic', margin: 0 }}>
                                "İş mülakatlarında kimse size final sınavında çözdüğünüz integrali sormuyor. Herkes GitHub profilinde neyi, nasıl inşa ettiğine bakıyor."
                            </p>
                        </div>

                        <h2 style={{ color: '#fff', fontSize: '2rem', marginTop: '3rem', marginBottom: '1.5rem' }}>Mülahaza Değil, Mücadele</h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Düşük bir ortalamaya sahip olmanın en zor yanı, kendinizi ispatlamak için iki kat daha fazla çalışmak zorunda olmanızdır. "Senin ortalaman düşük, bu işi yapamazsın" diyen önyargıları kırmanın tek yolu, ortaya koyduğunuz <strong>GümüşDil</strong> gibi, <strong>Fabula</strong> gibi somut işlerdir.
                        </p>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Bu süreçte öğrendiğim en önemli şey şu oldu: Eğitim sistemi genelde "uyumlu" bireyler yetiştirmek üzerine kurulu, ancak mühendislik "sorun çözen" bireyler gerektiriyor. Sorun çözmek ise ancak o sorunun içine girip ellerinizi kirleterek mümkün oluyor.
                        </p>

                        <h2 style={{ color: '#fff', fontSize: '2rem', marginTop: '3rem', marginBottom: '1.5rem' }}>Genç Arkadaşlara Tavsiyem</h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Eğer senin de transkriptin beklediğin gibi değilse, pes etme. Ancak şunu unutma: Düşük ortalamanın arkasında boş geçirilen zaman değil, <strong>somut bir üretim</strong> olmalı. Sınav haftasında uyumayıp proje bitiriyorsan, o düşük not bir gün senin madalyan olur.
                        </p>
                        <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
                            <li>🚀 Kendi dilini yaz, kendi sistemini kur.</li>
                            <li>💻 GitHub'ı senin ikinci transkriptin yap.</li>
                            <li>🤝 Topluluklara katıl, network inşa et.</li>
                            <li>📖 Akademik bilgiyi küçümseme, ama pratikle harmanla.</li>
                        </ul>

                        <h2 style={{ color: '#fff', fontSize: '2rem', marginTop: '3rem', marginBottom: '1.5rem' }}>Sonuç</h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Bugün 1.42 GPA'lı o çocuk, Türkiye'nin yerli yazılım ekosistemi için kafa yoruyor. Demek ki rakamlar zekayı veya yeteneği değil, sadece o anki öncelikleri ölçüyor. Önceliklerinizi doğru belirlediğiniz sürece, diploma sadece bir kağıt parçası olarak kalacaktır; mühendisliği ise parmak uçlarınızda hissedeceksiniz.
                        </p>

                        <div style={{ marginTop: '4rem', padding: '2rem', borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>Bu yazı Ufuk Kartal tarafından kaleme alınmıştır.</p>
                            <Link href="/blog" className="btn-secondary" style={{ marginTop: '1rem', display: 'inline-block' }}>
                                Blog Ana Sayfasına Dön
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </article>
        </>
    );
}
