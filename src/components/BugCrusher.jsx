import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Timer, Play, RotateCcw, Zap, Share2 } from 'lucide-react';

const BUGS = ['🐛', '🦗', '🐞', '🦟', '🪲', '🦠'];
const GAME_DURATION = 30;

const DEV_MESSAGES = [
    'Fixed! ✓', 'git rm 🐛', 'Merged!', 'PR Closed',
    'Bug #404', '-1 Error', 'Resolved!', 'Deployed!',
    'npm fix ✓', 'Patched!', 'git commit', 'Closed Issue',
    'LGTM! 🚀', 'Ship it!', '// TODO: removed'
];

function getRandomDevMsg() {
    return DEV_MESSAGES[Math.floor(Math.random() * DEV_MESSAGES.length)];
}

function generateBug(id, score) {
    const speed = Math.max(1.2, 3.5 - score * 0.04);
    return {
        id,
        emoji: BUGS[Math.floor(Math.random() * BUGS.length)],
        x: Math.random() * 82 + 2,
        speed,
        size: Math.random() * 20 + 36,
        points: Math.round(10 / speed),
    };
}

export default function BugCrusher() {
    const [phase, setPhase] = useState('idle');
    const [bugs, setBugs] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [highScore, setHighScore] = useState(0);
    const [pops, setPops] = useState([]);
    const [combo, setCombo] = useState(0);

    const bugIdRef = useRef(0);
    const scoreRef = useRef(0);
    const spawnRef = useRef(null);
    const timerRef = useRef(null);
    const comboRef = useRef(0);
    const comboTimerRef = useRef(null);
    const popIdRef = useRef(0);

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
        setPops([]);
        bugIdRef.current = 0;

        const spawn = () => {
            bugIdRef.current += 1;
            setBugs(prev => [...prev, generateBug(bugIdRef.current, scoreRef.current)]);
        };
        spawn();
        spawnRef.current = setInterval(spawn, 850);

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
        setScore(s => s + earned);

        // Combo konsol çıktısı (yazılımcı easter egg 😄)
        if (currentCombo >= 5) {
            console.log(`%c🔥 ULTRA COMBO x3! +${earned}pts`, 'color: #fbbf24; font-weight: bold; font-size: 14px;');
        } else if (currentCombo >= 3) {
            console.log(`%c⚡ COMBO x2! +${earned}pts`, 'color: #fb923c; font-weight: bold;');
        }

        // Pop etiketi: rastgele dev mesajı ya da puan
        const useDevMsg = Math.random() > 0.45;
        const label = useDevMsg ? getRandomDevMsg() : `+${earned}${multiplier > 1 ? ` ×${multiplier}` : ''}`;

        popIdRef.current += 1;
        const popId = popIdRef.current;
        setPops(prev => [...prev, { id: popId, x, y, label, multiplier, isDevMsg: useDevMsg }]);
        setTimeout(() => setPops(prev => prev.filter(p => p.id !== popId)), 750);

        setBugs(prev => prev.filter(b => b.id !== bugId));
    }, []);

    const bugEscaped = useCallback((bugId) => {
        setBugs(prev => prev.filter(b => b.id !== bugId));
    }, []);

    const shareScore = () => {
        const text = `Bug Crusher'da ${score} puan yaptım! 🐛 Ufuk Kartal'ın portfolyosundaki hataları temizleyebilir misin?`;
        const url = typeof window !== 'undefined' ? window.location.href : '';
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    const isPlaying = phase === 'playing';
    const timerColor = timeLeft <= 10 ? '#ef4444' : timeLeft <= 20 ? '#f59e0b' : '#22c55e';
    const isNewRecord = score >= highScore && score > 0;

    return (
        <div>
            {/* Üst bar */}
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                maxWidth: '700px', margin: '0 auto 1.25rem',
                flexWrap: 'wrap', gap: '0.75rem'
            }}>
                <div className="glass" style={{
                    padding: '0.6rem 1.4rem', borderRadius: '12px',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    border: '1px solid var(--glass-border)'
                }}>
                    <Zap size={16} style={{ color: 'var(--primary)' }} />
                    <span style={{ fontWeight: 700, fontSize: '1.3rem' }}>{score}</span>
                </div>

                <div className="glass" style={{
                    padding: '0.6rem 1.4rem', borderRadius: '12px',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    border: `1px solid ${timerColor}44`, transition: 'border-color 0.3s'
                }}>
                    <Timer size={16} style={{ color: timerColor }} />
                    <span style={{ fontWeight: 700, fontSize: '1.3rem', color: timerColor }}>{timeLeft}s</span>
                </div>

                <div className="glass" style={{
                    padding: '0.6rem 1.4rem', borderRadius: '12px',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    border: '1px solid rgba(251,191,36,0.2)'
                }}>
                    <Trophy size={16} style={{ color: '#fbbf24' }} />
                    <span style={{ fontWeight: 700, fontSize: '1.3rem', color: '#fbbf24' }}>{highScore}</span>
                </div>
            </div>

            {/* Combo göstergesi — console.log formatında 😄 */}
            <AnimatePresence>
                {combo >= 2 && isPlaying && (
                    <motion.div
                        key={combo}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            textAlign: 'center', marginBottom: '0.75rem',
                            fontFamily: '"Courier New", Courier, monospace',
                            fontWeight: 800,
                            fontSize: combo >= 5 ? '1.4rem' : '1.1rem',
                            color: combo >= 5 ? '#fbbf24' : combo >= 3 ? '#fb923c' : '#a78bfa',
                            textShadow: combo >= 5 ? '0 0 20px #fbbf24' : 'none'
                        }}
                    >
                        {combo >= 5
                            ? `console.log("🔥 ULTRA COMBO x3!")`
                            : combo >= 3
                                ? `console.log("⚡ COMBO x2!")`
                                : `// ${combo}x combo`
                        }
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Oyun Alanı */}
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '700px',
                    height: 'min(480px, 70vh)',
                    margin: '0 auto',
                    background: 'rgba(10,10,10,0.85)',
                    border: `2px solid ${isPlaying ? 'rgba(124,58,237,0.35)' : 'var(--glass-border)'}`,
                    borderRadius: '24px',
                    overflow: 'hidden',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    cursor: isPlaying ? 'crosshair' : 'default',
                    transition: 'border-color 0.3s',
                    touchAction: 'none',
                    WebkitTouchCallout: 'none',
                    userSelect: 'none',
                }}
            >
                {/* Arka plan bloblar */}
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

                {/* IDLE */}
                {phase === 'idle' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            position: 'absolute', inset: 0,
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center', gap: '1.5rem',
                            padding: '1rem'
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
                            <p style={{ color: '#555', fontSize: '0.82rem', fontFamily: 'monospace' }}>
                                // 3 combo = ×2 · 5 combo = ×3 🔥
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

                {/* GAME OVER */}
                {phase === 'gameover' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            position: 'absolute', inset: 0,
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center', gap: '1.1rem',
                            padding: '1rem'
                        }}
                    >
                        <div style={{ fontSize: '3.5rem' }}>{isNewRecord ? '🏆' : '💀'}</div>
                        <h2 style={{ fontWeight: 800, fontSize: '1.8rem' }}>
                            {isNewRecord ? 'Yeni Rekor!' : 'Oyun Bitti'}
                        </h2>

                        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ color: '#555', fontSize: '0.75rem', fontFamily: 'monospace', marginBottom: '0.2rem' }}>// score</p>
                                <p style={{ fontWeight: 800, fontSize: '2.4rem', color: 'var(--primary)' }}>{score}</p>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ color: '#555', fontSize: '0.75rem', fontFamily: 'monospace', marginBottom: '0.2rem' }}>// highScore</p>
                                <p style={{ fontWeight: 800, fontSize: '2.4rem', color: '#fbbf24' }}>{highScore}</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={startGame}
                                className="btn-primary"
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', padding: '0.7rem 1.6rem' }}
                            >
                                <RotateCcw size={17} />
                                Tekrar
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={shareScore}
                                className="btn-secondary"
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', padding: '0.7rem 1.6rem' }}
                            >
                                <Share2 size={17} />
                                X'te Paylaş
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* Düşen böcekler */}
                {isPlaying && bugs.map(bug => (
                    <FallingBug
                        key={bug.id}
                        bug={bug}
                        onCrush={(x, y, e) => crushBug(bug.id, x, y, bug.points, e)}
                        onEscape={() => bugEscaped(bug.id)}
                    />
                ))}

                {/* Pop etiketleri */}
                <AnimatePresence>
                    {pops.map(p => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 1, scale: 0.6, y: 0 }}
                            animate={{ opacity: 0, scale: 1.2, y: -45 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.65 }}
                            style={{
                                position: 'absolute',
                                left: `${p.x}%`,
                                top: `${p.y}px`,
                                pointerEvents: 'none',
                                zIndex: 20,
                                fontWeight: 800,
                                fontFamily: p.isDevMsg ? '"Courier New", monospace' : 'inherit',
                                fontSize: p.isDevMsg ? '0.78rem' : p.multiplier > 1 ? '1.35rem' : '1.05rem',
                                color: p.multiplier >= 3 ? '#fbbf24' : p.multiplier === 2 ? '#fb923c' : p.isDevMsg ? '#86efac' : '#a78bfa',
                                textShadow: '0 0 8px currentColor',
                                whiteSpace: 'nowrap',
                                maxWidth: '160px'
                            }}
                        >
                            {p.label}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <p style={{ textAlign: 'center', color: '#3a3a3a', fontSize: '0.78rem', marginTop: '1rem', fontFamily: 'monospace' }}>
                {'// Konsolu aç (F12) — combo mesajları bekliyorsun 👀'}
            </p>
        </div>
    );
}

// Düşen böcek
function FallingBug({ bug, onCrush, onEscape }) {
    const ref = useRef(null);

    return (
        <motion.div
            ref={ref}
            initial={{ y: -60 }}
            animate={{ y: '100%' }}
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
                filter: 'drop-shadow(0 0 6px rgba(124,58,237,0.35))',
            }}
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.4, rotate: 180 }}
        >
            {bug.emoji}
        </motion.div>
    );
}
