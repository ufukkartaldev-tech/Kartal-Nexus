import Head from 'next/head';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, Trophy, Timer, Play, RotateCcw, Zap } from 'lucide-react';

const BUGS = ['🐛', '🦗', '🐞', '🦟', '🪲', '🦠'];
const GAME_DURATION = 30;

function generateBug(id, score) {
    const speed = Math.max(1.2, 3.5 - score * 0.04);
    return {
        id,
        emoji: BUGS[Math.floor(Math.random() * BUGS.length)],
        x: Math.random() * 85 + 2,   // % cinsinden
        speed,
        size: Math.random() * 20 + 36, // 36-56px
        points: Math.round(10 / speed), // hızlı böcek daha değerli
    };
}

export default function Game() {
    const [phase, setPhase] = useState('idle'); // idle | playing | gameover
    const [bugs, setBugs] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [highScore, setHighScore] = useState(0);
    const [crushed, setCrushed] = useState([]); // patlama efektleri
    const [combo, setCombo] = useState(0);
    const [comboDisplay, setComboDisplay] = useState(null);

    const bugIdRef = useRef(0);
    const scoreRef = useRef(0);
    const spawnRef = useRef(null);
    const timerRef = useRef(null);
    const comboRef = useRef(0);
    const comboTimerRef = useRef(null);

    // Highscore yükle
    useEffect(() => {
        const saved = localStorage.getItem('bugcrusher_highscore');
        if (saved) setHighScore(Number(saved));
    }, []);

    const endGame = useCallback((finalScore) => {
        setPhase('gameover');
        clearInterval(spawnRef.current);
        clearInterval(timerRef.current);
        setBugs([]);
        const saved = Number(localStorage.getItem('bugcrusher_highscore') || 0);
        if (finalScore > saved) {
            localStorage.setItem('bugcrusher_highscore', finalScore);
            setHighScore(finalScore);
        }
    }, []);

    const startGame = () => {
        setPhase('playing');
        setScore(0);
        scoreRef.current = 0;
        comboRef.current = 0;
        setCombo(0);
        setTimeLeft(GAME_DURATION);
        setBugs([]);
        setCrushed([]);
        bugIdRef.current = 0;

        // Böcek spawn
        const spawn = () => {
            bugIdRef.current += 1;
            setBugs(prev => [...prev, generateBug(bugIdRef.current, scoreRef.current)]);
        };
        spawn();
        spawnRef.current = setInterval(spawn, 900);

        // Timer
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    clearInterval(spawnRef.current);
                    endGame(scoreRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const crushBug = useCallback((bugId, x, y, points, e) => {
        e.stopPropagation();

        // Combo sistemi
        comboRef.current += 1;
        const currentCombo = comboRef.current;
        setCombo(currentCombo);

        clearTimeout(comboTimerRef.current);
        comboTimerRef.current = setTimeout(() => {
            comboRef.current = 0;
            setCombo(0);
        }, 1200);

        const multiplier = currentCombo >= 5 ? 3 : currentCombo >= 3 ? 2 : 1;
        const earned = points * multiplier;

        scoreRef.current += earned;
        setScore(prev => prev + earned);

        // Patlama efekti
        const popId = Date.now() + Math.random();
        setCrushed(prev => [...prev, { id: popId, x, y, points: earned, multiplier }]);
        setTimeout(() => setCrushed(prev => prev.filter(c => c.id !== popId)), 700);

        setBugs(prev => prev.filter(b => b.id !== bugId));
    }, []);

    // Böcek kaçtıysa (bottom'a ulaştıysa) kaldır
    const bugEscaped = useCallback((bugId) => {
        setBugs(prev => prev.filter(b => b.id !== bugId));
    }, []);

    const timerColor = timeLeft <= 10 ? '#ef4444' : timeLeft <= 20 ? '#f59e0b' : '#22c55e';
    const isPlaying = phase === 'playing';

    return (
        <>
            <Head>
                <title>Bug Crusher | Ufuk Kartal</title>
                <meta name="description" content="Düşen böceklere tıkla, puan kazan! Ufuk Kartal portfolyo mini oyunu." />
            </Head>

            <section style={{ padding: '3rem 0' }}>
                {/* Başlık */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: '2rem' }}
                >
                    <h1 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800 }}>
                        Bug Crusher 🐛
                    </h1>
                    <p style={{ color: '#777', marginTop: '0.5rem' }}>
                        Düşen böceklere tıkla · Combo yap · Highscore kır
                    </p>
                </motion.div>

                {/* Üst bar */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    maxWidth: '700px', margin: '0 auto 1.25rem',
                    flexWrap: 'wrap', gap: '0.75rem'
                }}>
                    {/* Skor */}
                    <div className="glass" style={{
                        padding: '0.6rem 1.4rem', borderRadius: '12px',
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        border: '1px solid var(--glass-border)'
                    }}>
                        <Zap size={16} style={{ color: 'var(--primary)' }} />
                        <span style={{ fontWeight: 700, fontSize: '1.3rem' }}>{score}</span>
                    </div>

                    {/* Timer */}
                    <div className="glass" style={{
                        padding: '0.6rem 1.4rem', borderRadius: '12px',
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        border: `1px solid ${timerColor}44`,
                        transition: 'border-color 0.3s'
                    }}>
                        <Timer size={16} style={{ color: timerColor }} />
                        <span style={{ fontWeight: 700, fontSize: '1.3rem', color: timerColor }}>{timeLeft}s</span>
                    </div>

                    {/* Highscore */}
                    <div className="glass" style={{
                        padding: '0.6rem 1.4rem', borderRadius: '12px',
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        border: '1px solid rgba(251,191,36,0.2)'
                    }}>
                        <Trophy size={16} style={{ color: '#fbbf24' }} />
                        <span style={{ fontWeight: 700, fontSize: '1.3rem', color: '#fbbf24' }}>{highScore}</span>
                    </div>
                </div>

                {/* Combo göstergesi */}
                <AnimatePresence>
                    {combo >= 2 && isPlaying && (
                        <motion.div
                            key={combo}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                textAlign: 'center', marginBottom: '0.75rem',
                                fontSize: combo >= 5 ? '1.6rem' : '1.2rem',
                                fontWeight: 800,
                                color: combo >= 5 ? '#fbbf24' : combo >= 3 ? '#fb923c' : 'var(--primary)',
                                textShadow: combo >= 5 ? '0 0 20px #fbbf24' : 'none'
                            }}
                        >
                            {combo >= 5 ? '🔥 ULTRA COMBO x3!' : combo >= 3 ? '⚡ COMBO x2!' : `💥 ${combo}x COMBO`}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Oyun Alanı */}
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '700px',
                        height: '480px',
                        margin: '0 auto',
                        background: 'rgba(10,10,10,0.8)',
                        border: `2px solid ${isPlaying ? 'rgba(124,58,237,0.3)' : 'var(--glass-border)'}`,
                        borderRadius: '24px',
                        overflow: 'hidden',
                        backdropFilter: 'blur(12px)',
                        cursor: isPlaying ? 'crosshair' : 'default',
                        transition: 'border-color 0.3s'
                    }}
                >
                    {/* Arka plan dekor */}
                    <div style={{
                        position: 'absolute', top: '-80px', left: '20%',
                        width: '300px', height: '300px',
                        background: 'var(--primary)', filter: 'blur(120px)',
                        opacity: 0.05, pointerEvents: 'none'
                    }} />
                    <div style={{
                        position: 'absolute', bottom: '-60px', right: '15%',
                        width: '200px', height: '200px',
                        background: 'var(--secondary)', filter: 'blur(100px)',
                        opacity: 0.05, pointerEvents: 'none'
                    }} />

                    {/* IDLE ekranı */}
                    {phase === 'idle' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{
                                position: 'absolute', inset: 0,
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center', gap: '1.5rem'
                            }}
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                style={{ fontSize: '5rem' }}
                            >🐛</motion.div>
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ color: '#aaa', fontSize: '1rem', marginBottom: '0.5rem' }}>
                                    30 saniye içinde mümkün olduğunca çok böcek ez!
                                </p>
                                <p style={{ color: '#555', fontSize: '0.85rem' }}>
                                    Hızlı böcek = daha fazla puan · Combo = çarpan bonus
                                </p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={startGame}
                                className="btn-primary"
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', padding: '0.85rem 2.5rem' }}
                            >
                                <Play size={20} />
                                Başla
                            </motion.button>
                        </motion.div>
                    )}

                    {/* GAMEOVER ekranı */}
                    {phase === 'gameover' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                                position: 'absolute', inset: 0,
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center', gap: '1.25rem'
                            }}
                        >
                            <div style={{ fontSize: '4rem' }}>
                                {score >= highScore && score > 0 ? '🏆' : '💀'}
                            </div>
                            <h2 style={{ fontWeight: 800, fontSize: '2rem' }}>
                                {score >= highScore && score > 0 ? 'Yeni Rekor!' : 'Oyun Bitti'}
                            </h2>
                            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.25rem' }}>PUAN</p>
                                    <p style={{ fontWeight: 800, fontSize: '2.5rem', color: 'var(--primary)' }}>{score}</p>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.25rem' }}>EN YÜKSEK</p>
                                    <p style={{ fontWeight: 800, fontSize: '2.5rem', color: '#fbbf24' }}>{highScore}</p>
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={startGame}
                                className="btn-primary"
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', padding: '0.75rem 2rem' }}
                            >
                                <RotateCcw size={18} />
                                Tekrar Oyna
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Böcekler */}
                    {isPlaying && bugs.map(bug => (
                        <FallingBug
                            key={bug.id}
                            bug={bug}
                            onCrush={(x, y, e) => crushBug(bug.id, x, y, bug.points, e)}
                            onEscape={() => bugEscaped(bug.id)}
                        />
                    ))}

                    {/* Patlama efektleri */}
                    <AnimatePresence>
                        {crushed.map(c => (
                            <motion.div
                                key={c.id}
                                initial={{ opacity: 1, scale: 0.5, y: 0 }}
                                animate={{ opacity: 0, scale: 1.5, y: -40 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                                style={{
                                    position: 'absolute',
                                    left: `${c.x}%`,
                                    top: `${c.y}px`,
                                    pointerEvents: 'none',
                                    zIndex: 20,
                                    fontWeight: 800,
                                    fontSize: c.multiplier > 1 ? '1.4rem' : '1.1rem',
                                    color: c.multiplier >= 3 ? '#fbbf24' : c.multiplier === 2 ? '#fb923c' : '#a78bfa',
                                    textShadow: '0 0 8px currentColor',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                +{c.points}{c.multiplier > 1 ? ` ×${c.multiplier}` : ''}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Açıklama */}
                <p style={{ textAlign: 'center', color: '#444', fontSize: '0.8rem', marginTop: '1.25rem' }}>
                    3 böcek = ×2 combo · 5 böcek = ×3 combo 🔥
                </p>
            </section>
        </>
    );
}

// Düşen böcek bileşeni
function FallingBug({ bug, onCrush, onEscape }) {
    const ref = useRef(null);

    return (
        <motion.div
            ref={ref}
            initial={{ y: -60 }}
            animate={{ y: 500 }}
            transition={{ duration: bug.speed, ease: 'linear' }}
            onAnimationComplete={onEscape}
            onClick={(e) => {
                if (!ref.current) return;
                const rect = ref.current.getBoundingClientRect();
                const parentRect = ref.current.parentElement.getBoundingClientRect();
                const relY = rect.top - parentRect.top + rect.height / 2;
                onCrush(bug.x, relY, e);
            }}
            style={{
                position: 'absolute',
                left: `${bug.x}%`,
                fontSize: `${bug.size}px`,
                cursor: 'pointer',
                userSelect: 'none',
                zIndex: 10,
                lineHeight: 1,
                filter: 'drop-shadow(0 0 6px rgba(124,58,237,0.4))',
                transition: 'transform 0.1s',
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.5 }}
        >
            {bug.emoji}
        </motion.div>
    );
}
