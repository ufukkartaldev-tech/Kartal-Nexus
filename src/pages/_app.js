import '@/styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Outfit } from 'next/font/google'
import Head from 'next/head'

const outfit = Outfit({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
    return (
        <div className={outfit.className}>
            <Head>
                <title>Ufuk Kartal | Portfolio</title>
                <meta name="description" content="Yazılım Mühendisi Adayı & Full-Stack Geliştirici Portaoliosu" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Header />
            <main className="container" style={{ minHeight: '80vh', paddingTop: '2rem' }}>
                <Component {...pageProps} />
            </main>
            <Footer />
        </div>
    )
}
