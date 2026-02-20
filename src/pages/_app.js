import '@/styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Outfit } from 'next/font/google'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

const outfit = Outfit({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
    const router = useRouter();

    return (
        <div className={outfit.className}>
            <Head>
                <title>Ufuk Kartal | Portfolio</title>
                <meta name="description" content="Yazılım Mühendisi Adayı & Full-Stack Geliştirici Portfolyosu" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
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
            <Footer />
        </div>
    )
}
