import '@/styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Outfit } from 'next/font/google'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import GumusZeka from '@/components/GumusZeka'

// Tek kaynak: next/font/google üzerinden yükleniyor.
// globals.css'deki @import URL kaldırıldı, buradan optimize şekilde geldi.
const outfit = Outfit({
    subsets: ['latin'],
    weight: ['300', '400', '600', '700', '800'],
    display: 'swap'
})

export default function App({ Component, pageProps }) {
    const router = useRouter();

    return (
        <div className={outfit.className}>
            <Head>
                <title>Ufuk Kartal | Portfolio</title>
                <meta name="description" content="Yazılım Mühendisi Adayı & Full-Stack Geliştirici Portfolyosu" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
                {/* OG Tags */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Ufuk Kartal" />
                <meta property="og:locale" content="tr_TR" />
                {/* Favicon */}
                <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔮</text></svg>" />
            </Head>
            <Header />
            <main className="container" style={{ minHeight: '80vh', paddingTop: '2rem' }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={router.route}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <Component {...pageProps} />
                    </motion.div>
                </AnimatePresence>
            </main>
            <GumusZeka />
            <Footer />
        </div>
    )
}
