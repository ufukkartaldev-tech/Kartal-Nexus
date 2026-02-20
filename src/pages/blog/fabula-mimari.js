import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FabulaPost() {
    return (
        <>
            <Head>
                <title>Fabula Evreni: İnteraktif Hikaye Anlatıcılığının Geleceği | Ufuk Kartal</title>
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
                        Fabula Evreni: Kodla Yazılan İnteraktif Bir Dünya
                    </h1>

                    <div style={{ display: 'flex', gap: '1rem', color: '#888', marginBottom: '3rem', fontSize: '0.9rem' }}>
                        <span>20 Şubat 2026</span>
                        <span>•</span>
                        <span>10 Dakika Okuma</span>
                    </div>

                    <div className="blog-content" style={{ fontSize: '1.15rem', color: '#ddd' }}>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Okuduğunuz bir kitabın sonunu beğenmediğiniz oldu mu? Ya da kahramanın yaptığı seçime kızıp "ben olsam böyle yapmazdım" dediğiniz? <strong>Fabula Evreni</strong>, tam olarak bu pasif okuma deneyimini aktif bir maceraya dönüştürmek için doğdu. Next.js ve Firebase'in gücünü arkasına alan bu platform, hikaye anlatıcılığını bir "ağaç yapısı" haline getiriyor.
                        </p>

                        <h2 style={{ color: '#fff', fontSize: '2rem', marginTop: '3rem', marginBottom: '1.5rem' }}>1. Dallanan Hikaye Yapısı: Tree Data Structure</h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Fabula'nın kalbinde karmaşık bir veri yapısı yatıyor. Her hikaye, binlerce farklı sona gidebilen devasa bir karar ağacıdır. Bir yazar hikayeye başladığında, okuyucular sadece okumakla kalmaz; her yol ayrımında yeni dallar önerebilirler. Bu, teknik olarak NoSQL veritabanı (Firestore) üzerinde her bir bölümün bir <code>node</code>, her bir seçimin ise bir <code>edge</code> olduğu dinamik bir grafik (graph) yapısıdır.
                        </p>

                        <div className="glass" style={{ padding: '2rem', borderRadius: '16px', margin: '2rem 0', background: 'rgba(255,255,255,0.02)', borderLeft: '4px solid var(--secondary)' }}>
                            <h3 style={{ marginTop: 0 }}>Mimarinin Temeli:</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ marginBottom: '0.5rem' }}>✅ <strong>Frontend:</strong> Next.js (App Router) & Framer Motion</li>
                                <li style={{ marginBottom: '0.5rem' }}>✅ <strong>Backend:</strong> Firebase Firestore (Real-time updates)</li>
                                <li style={{ marginBottom: '0.5rem' }}>✅ <strong>Auth:</strong> Firebase Authentication (Social Login)</li>
                                <li style={{ marginBottom: '0.5rem' }}>✅ <strong>Styling:</strong> Tailwind CSS & Cloudinary</li>
                            </ul>
                        </div>

                        <h2 style={{ color: '#fff', fontSize: '2rem', marginTop: '3rem', marginBottom: '1.5rem' }}>2. Oyunlaştırma: XP ve Rozet Sistemi</h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            İnsanları yazmaya ve okumaya teşvik etmek için Fabula'yı bir oyun gibi kurguladık. Okuduğunuz her bölüm, yaptığınız her seçim ve topluluk tarafından beğenilen her yeni dal size XP (Deneyim Puanı) kazandırır. 10 farklı seviye ve kazanılabilecek onlarca nadir rozet ile Fabula, sadece bir kütüphane değil, bir sosyal platformdur.
                        </p>

                        <h2 style={{ color: '#fff', fontSize: '2rem', marginTop: '3rem', marginBottom: '1.5rem' }}>3. Topluluk Katkısı ve Oylama</h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Fabula'yı diğer platformlardan ayıran en büyük özellik "Demokratik Hikaye Yazımı"dır. Eğer bir hikaye dalını topluluk beğenmezse, o dalın görünürlüğü azalır. En çok oylanan ve en kaliteli dallar hikaye ağacında üst sıralara çıkar. Bu algoritma sayesinde, hikayenin kalitesi organik olarak artar.
                        </p>

                        <h2 style={{ color: '#fff', fontSize: '2rem', marginTop: '3rem', marginBottom: '1.5rem' }}>4. Teknik Zorluklar: Real-time Senkronizasyon</h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Aynı anda binlerce kişinin farklı dallarda gezindiği bir sistemde verinin güncelliği kritiktir. Firebase'in <code>onSnapshot</code> özelliğini kullanarak, hikayeye eklenen yeni bölümlerin okuyucunun ekranına anında (sayfa yenilemeden) düşmesini sağladık. Next.js'in ISR (Incremental Static Regeneration) özelliğini ise popüler hikayelerin hızla yüklenmesi için optimize ettik.
                        </p>

                        <h2 style={{ color: '#fff', fontSize: '2rem', marginTop: '3rem', marginBottom: '1.5rem' }}>Sonuç: Edebiyatın Dijital Devrimi</h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Fabula Evreni, sadece bir projenin ötesinde; edebiyatın statik yapısını kıran bir dijital devrimdir. TypeScript'in tip güvenliği ve React'in bileşen yapısı sayesinde, karmaşık hikaye ağaçlarını yönetmek bizim için bir keyfe dönüştü. Biz sadece bir platform kurmadık; binlerce insanın hayal gücünü birleştirebileceği interaktif bir evren inşa ettik.
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
