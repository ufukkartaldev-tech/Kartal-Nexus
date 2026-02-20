import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

const PREDEFINED_QUESTIONS = [
    { q: "GümüşDil nedir?", a: "GümüşDil, Türkiye'nin yazılım hamlesi için geliştirdiğim, %100 Türkçe sözdizimine sahip, C++ tabanlı bir programlama dili ve ekosistemidir." },
    { q: "Neden 1.42 GPA?", a: "Not dökümleri sadece sınıfta geçirilen zamanı ölçer. 1.42 GPA benim için uykusuz geceler, bitirilen projeler ve diplomadan daha fazlasını inşa etme sürecinin sembolüdür." },
    { q: "Fabula Evreni nedir?", a: "Okuyucuların seçimleriyle şekillenen, dallanan hikaye ağaçlarına sahip interaktif bir anlatıcılık platformudur. Next.js ve Firebase kullanılarak geliştirilmiştir." },
    { q: "Hangi teknolojileri kullanıyorsun?", a: "Sistem programlamada C++ ve C#, mobil geliştirmede Flutter, web dünyasında ise Next.js, TypeScript ve Firebase favori alet çantamdır." }
];

export default function GumusZeka() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Selam! Ben Gümüş Zeka. Ufuk ve projeleri hakkında merak ettiğin bir şey var mı?' }
    ]);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleQuestion = (question) => {
        const answer = PREDEFINED_QUESTIONS.find(pq => pq.q === question).a;
        setMessages(prev => [...prev, { type: 'user', text: question }]);

        // Simulating bot typing
        setTimeout(() => {
            setMessages(prev => [...prev, { type: 'bot', text: answer }]);
        }, 600);
    };

    return (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="glass"
                        style={{
                            width: '350px',
                            height: '500px',
                            borderRadius: '24px',
                            marginBottom: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            border: '1px solid var(--glass-border)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '1.5rem',
                            background: 'linear-gradient(to right, var(--primary), var(--secondary))',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            color: '#fff'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Bot size={24} />
                                <span style={{ fontWeight: 700 }}>Gümüş Zeka</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            style={{
                                flex: 1,
                                padding: '1.5rem',
                                overflowY: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem'
                            }}
                        >
                            {messages.map((msg, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: msg.type === 'bot' ? -10 : 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={i}
                                    style={{
                                        alignSelf: msg.type === 'bot' ? 'flex-start' : 'flex-end',
                                        background: msg.type === 'bot' ? 'rgba(255,255,255,0.05)' : 'var(--primary)',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '16px',
                                        borderTopLeftRadius: msg.type === 'bot' ? '4px' : '16px',
                                        borderTopRightRadius: msg.type === 'user' ? '4px' : '16px',
                                        maxWidth: '85%',
                                        fontSize: '0.9rem',
                                        color: '#fff',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}
                                >
                                    {msg.text}
                                </motion.div>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <div style={{ padding: '1rem', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)' }}>
                            <p style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.75rem', textAlign: 'center' }}>Sıkça Sorulanlar</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {PREDEFINED_QUESTIONS.map((pq, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleQuestion(pq.q)}
                                        style={{
                                            fontSize: '0.8rem',
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '20px',
                                            background: 'rgba(255,255,255,0.05)',
                                            color: '#ddd',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.target.style.borderColor = 'var(--primary)'}
                                        onMouseLeave={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                    >
                                        {pq.q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    border: 'none',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 10px 20px rgba(124, 58, 237, 0.4)'
                }}
            >
                {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
            </motion.button>
        </div>
    );
}
