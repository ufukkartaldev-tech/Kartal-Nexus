import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// SSR kapalı + lazy load — ana sayfanın LCP'sini etkilemiyor
const BugCrusher = dynamic(() => import('@/components/BugCrusher'), {
    ssr: false,
    loading: () => (
        <div style={{
            maxWidth: '700px', margin: '0 auto',
            height: 'min(480px, 70vh)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(10,10,10,0.8)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.06)',
            flexDirection: 'column', gap: '1rem'
        }}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                style={{ fontSize: '2.5rem' }}
            >🐛</motion.div>
            <p style={{ color: '#555', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                // Loading Bug Crusher...
            </p>
        </div>
    )
});

export default function GamePage() {
    return (
        <>
            <Head>
                <title>Bug Crusher 🐛 | Ufuk Kartal</title>
                <meta name="description" content="Düşen böceklere tıkla, puan kazan! Combo yap, rekor kır. Ufuk Kartal portfolyo mini oyunu." />
                <meta property="og:title" content="Bug Crusher | Ufuk Kartal" />
                <meta property="og:description" content="Yazılımcı portfolyosunun gizli mini oyunu. Kaç bug ezebilirsin?" />
            </Head>

            <section style={{ padding: '3rem 0' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ textAlign: 'center', marginBottom: '2rem' }}
                >
                    <h1 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800 }}>
                        Bug Crusher 🐛
                    </h1>
                    <p style={{ color: '#666', marginTop: '0.5rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                        {'// Düşen böceklere tıkla · Combo yap · Highscore kır'}
                    </p>
                </motion.div>

                <BugCrusher />
            </section>
        </>
    );
}
