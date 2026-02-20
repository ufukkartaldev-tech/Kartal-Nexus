import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Timer, Play, RotateCcw, Zap, Share2 } from 'lucide-react';

const BUGS = ['🐛', '🦗', '🐞', '🦟', '🪲', '🦠'];
const GAME_DURATION = 30;
const GAME_HEIGHT = 460;
const FRAME_MS = 30;
const DEV_MSGS = ['Fixed! ✓', 'git rm 🐛', 'Merged!', 'PR Closed', 'Bug #404', '-1 Error', 'Resolved!', 'Deployed!', 'npm fix ✓', 'Patched!', 'LGTM! 🚀', 'Ship it!', '// TODO: removed'];

let _bugCount = 0;

function makeBug(level) {
    _bugCount++;
    const isBoss = _bugCount % 15 === 0 && _bugCount > 0;
    const spd = isBoss ? 1.0 + Math.random() * 0.3 : Math.max(0.8, 3.5 - level * 0.35 + Math.random() * 0.5);
    return {
        id: _bugCount,
        emoji: isBoss ? '🕷️' : BUGS[Math.floor(Math.random() * BUGS.length)],
        x: Math.random() * 82 + 2,
        y: -70,
        speed: spd,
        size: isBoss ? 68 : Math.random() * 18 + 36,
        points: isBoss ? 50 : Math.round(15 / spd),
        isBoss,
    };
}

function makePowerup(idRef) {
    idRef.current++;
    return { id: idRef.current, type: Math.random() > 0.5 ? 'freeze' : 'nuke', x: Math.random() * 80 + 5, y: -50, speed: 1.1 };
}

export default function BugCrusher() {
    const [phase, setPhase] = useState('idle');
    const [bugs, setBugs] = useState([]);
    const [powerups, setPowerups] = useState([]);
    const [particles, setParticles] = useState([]);
    const [pops, setPops] = useState([]);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [highScore, setHighScore] = useState(0);
    const [combo, setCombo] = useState(0);
    const [frozen, setFrozen] = useState(false);
    const [frozenTL, setFrozenTL] = useState(0);
    const [shaking, setShaking] = useState(false);

    const scoreRef = useRef(0);
    const livesRef = useRef(3);
    const comboRef = useRef(0);
    const comboTimer = useRef(null);
    const frozenRef = useRef(false);
    const frozenTimer = useRef(null);
    const moveInterval = useRef(null);
    const spawnInterval = useRef(null);
    const pwrTimeout = useRef(null);
    const clockInterval = useRef(null);
    const popId = useRef(0);
    const partId = useRef(0);
    const pwrId = useRef(0);
    const phaseRef = useRef('idle');

    useEffect(() => {
        const s = localStorage.getItem('bugcrusher_hs');
        if (s) setHighScore(Number(s));
    }, []);

    const endGame = useCallback((finalScore) => {
        if (phaseRef.current === 'gameover') return;
        phaseRef.current = 'gameover';
        setPhase('gameover');
        [moveInterval, spawnInterval, clockInterval].forEach(r => clearInterval(r.current));
        clearTimeout(pwrTimeout.current);
        clearTimeout(frozenTimer.current);
        setBugs([]); setPowerups([]);
        const prev = Number(localStorage.getItem('bugcrusher_hs') || 0);
        if (finalScore > prev) { localStorage.setItem('bugcrusher_hs', finalScore); setHighScore(finalScore); }
    }, []);

    const startGame = () => {
        phaseRef.current = 'playing';
        setPhase('playing');
        setScore(0); scoreRef.current = 0;
        setLives(3); livesRef.current = 3;
        setCombo(0); comboRef.current = 0;
        setTimeLeft(GAME_DURATION);
        setBugs([]); setPowerups([]); setParticles([]); setPops([]);
        setFrozen(false); frozenRef.current = false;
        _bugCount = 0;

        // movement loop
        moveInterval.current = setInterval(() => {
            if (frozenRef.current) return;
            setBugs(prev => {
                const gone = [];
                const alive = prev.map(b => ({ ...b, y: b.y + b.speed })).filter(b => {
                    if (b.y > GAME_HEIGHT + 20) { gone.push(b.id); return false; }
                    return true;
                });
                if (gone.length) {
                    livesRef.current = Math.max(0, livesRef.current - gone.length);
                    setLives(livesRef.current);
                    if (livesRef.current <= 0 && phaseRef.current === 'playing') {
                        setTimeout(() => endGame(scoreRef.current), 50);
                    }
                }
                return alive;
            });
            setPowerups(prev => prev.map(p => ({ ...p, y: p.y + p.speed })).filter(p => p.y <= GAME_HEIGHT + 20));
        }, FRAME_MS);

        // bug spawn
        const spawnBug = () => {
            const lvl = Math.floor(scoreRef.current / 100) + 1;
            setBugs(prev => [...prev, makeBug(lvl)]);
        };
        spawnBug();
        spawnInterval.current = setInterval(spawnBug, 880);

        // power-up spawn
        const schedulePwr = () => {
            pwrTimeout.current = setTimeout(() => {
                if (phaseRef.current === 'playing') {
                    setPowerups(prev => [...prev, makePowerup(pwrId)]);
                    schedulePwr();
                }
            }, 8000 + Math.random() * 7000);
        };
        schedulePwr();

        // timer
        clockInterval.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) { clearInterval(clockInterval.current); endGame(scoreRef.current); return 0; }
                return prev - 1;
            });
        }, 1000);
    };

    const crushBug = useCallback((bug, e) => {
        e.stopPropagation();
        comboRef.current++;
        const c = comboRef.current;
        setCombo(c);
        clearTimeout(comboTimer.current);
        comboTimer.current = setTimeout(() => { comboRef.current = 0; setCombo(0); }, 1200);

        const mult = c >= 5 ? 3 : c >= 3 ? 2 : 1;
        const earned = bug.points * mult;
        scoreRef.current += earned;
        setScore(s => s + earned);

        if (c >= 5) { console.log(`%c🔥 ULTRA COMBO x3! +${earned}pts`, 'color:#fbbf24;font-weight:bold;font-size:14px;'); setShaking(true); setTimeout(() => setShaking(false), 400); }
        else if (c >= 3) console.log(`%c⚡ COMBO x2! +${earned}pts`, 'color:#fb923c;font-weight:bold;');

        const useDevMsg = !bug.isBoss && Math.random() > 0.45;
        const label = bug.isBoss ? `🕷️ BOSS +${earned}!` : useDevMsg ? DEV_MSGS[Math.floor(Math.random() * DEV_MSGS.length)] : `+${earned}${mult > 1 ? ` ×${mult}` : ''}`;

        popId.current++;
        const pid = popId.current;
        setPops(p => [...p, { id: pid, x: bug.x, y: bug.y, label, mult, isDevMsg: useDevMsg, isBoss: bug.isBoss }]);
        setTimeout(() => setPops(p => p.filter(x => x.id !== pid)), 800);

        // particles
        const count = bug.isBoss ? 10 : 6;
        const newP = Array.from({ length: count }, (_, i) => {
            partId.current++;
            const angle = (i / count) * 2 * Math.PI;
            return { id: partId.current, x: bug.x, y: bug.y, dx: Math.cos(angle) * 55, dy: Math.sin(angle) * 55, emoji: bug.isBoss ? '💥' : ['💥', '✨', '⭐', '🌟'][Math.floor(Math.random() * 4)] };
        });
        setParticles(p => [...p, ...newP]);
        setTimeout(() => setParticles(p => p.filter(x => !newP.find(np => np.id === x.id))), 600);

        setBugs(prev => prev.filter(b => b.id !== bug.id));
    }, []);

    const collectPwr = useCallback((pwr, e) => {
        e.stopPropagation();
        setPowerups(prev => prev.filter(p => p.id !== pwr.id));
        if (pwr.type === 'freeze') {
            frozenRef.current = true; setFrozen(true); setFrozenTL(3);
            clearTimeout(frozenTimer.current);
            let t = 3;
            const countdown = setInterval(() => {
                t--;
                if (t <= 0) { clearInterval(countdown); frozenRef.current = false; setFrozen(false); setFrozenTL(0); }
                else setFrozenTL(t);
            }, 1000);
        } else {
            setBugs(prev => {
                const bonus = prev.reduce((s, b) => s + b.points, 0);
                scoreRef.current += bonus; setScore(s => s + bonus);
                return [];
            });
        }
    }, []);

    const shareScore = () => {
        const txt = `Bug Crusher'da ${score} puan yaptım! 🐛 Ufuk Kartal'ın portfolyosundaki hataları temizleyebilir misin?`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(txt)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
    };

    const isPlaying = phase === 'playing';
    const timerColor = timeLeft <= 10 ? '#ef4444' : timeLeft <= 20 ? '#f59e0b' : '#22c55e';
    const currentLevel = Math.floor(score / 100) + 1;
    const isNewRecord = score >= highScore && score > 0;

    return (
        <div>
            {/* Stats bar */}
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.55rem', maxWidth: '700px', margin: '0 auto 1rem' }}>
                {[
                    { icon: <Zap size={14} style={{ color: 'var(--primary)' }} />, val: score, color: 'var(--glass-border)' },
                    { icon: <span style={{ fontSize: '0.9rem' }}>{[1, 2, 3].map(i => <span key={i} style={{ opacity: i <= lives ? 1 : 0.2 }}>❤️</span>)}</span>, val: null, color: 'rgba(239,68,68,0.2)' },
                    { icon: <Timer size={14} style={{ color: timerColor }} />, val: `${timeLeft}s`, color: `${timerColor}44`, valColor: timerColor },
                    { icon: <span style={{ color: '#60a5fa', fontSize: '0.68rem', fontWeight: 700, fontFamily: 'monospace' }}>LVL</span>, val: currentLevel, color: 'rgba(37,99,235,0.3)', valColor: '#60a5fa' },
                    { icon: <Trophy size={14} style={{ color: '#fbbf24' }} />, val: highScore, color: 'rgba(251,191,36,0.2)', valColor: '#fbbf24' },
                ].map((s, i) => (
                    <div key={i} className="glass" style={{ padding: '0.45rem 1rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.35rem', border: `1px solid ${s.color}` }}>
                        {s.icon}
                        {s.val !== null && <span style={{ fontWeight: 700, fontSize: '1.15rem', color: s.valColor || 'inherit' }}>{s.val}</span>}
                    </div>
                ))}
            </div>

            {/* Frozen / Combo indicator */}
            <div style={{ textAlign: 'center', minHeight: '2rem', marginBottom: '0.4rem' }}>
                <AnimatePresence mode="wait">
                    {frozen ? (
                        <motion.div key="frozen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            style={{ fontWeight: 800, fontSize: '1.05rem', color: '#7dd3fc', fontFamily: 'monospace' }}>
                            ❄️ FREEZE! {frozenTL}s
                        </motion.div>
                    ) : combo >= 2 && isPlaying ? (
                        <motion.div key={combo} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                            style={{ fontWeight: 800, fontFamily: 'monospace', fontSize: combo >= 5 ? '1.2rem' : '0.95rem', color: combo >= 5 ? '#fbbf24' : combo >= 3 ? '#fb923c' : '#a78bfa', textShadow: combo >= 5 ? '0 0 18px #fbbf24' : 'none' }}>
                            {combo >= 5 ? 'console.log("🔥 ULTRA COMBO x3!")' : combo >= 3 ? 'console.log("⚡ COMBO x2!")' : `// ${combo}x combo`}
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>

            {/* Game area */}
            <motion.div
                animate={shaking ? { x: [-7, 7, -5, 5, -3, 3, 0] } : { x: 0 }}
                transition={{ duration: 0.35 }}
                style={{
                    position: 'relative', width: '100%', maxWidth: '700px',
                    height: 'min(460px, 70vh)', margin: '0 auto',
                    background: frozen ? 'rgba(10,20,45,0.92)' : 'rgba(10,10,10,0.88)',
                    border: `2px solid ${frozen ? 'rgba(125,211,252,0.45)' : isPlaying ? 'rgba(124,58,237,0.35)' : 'var(--glass-border)'}`,
                    borderRadius: '24px', overflow: 'hidden',
                    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                    cursor: isPlaying ? 'crosshair' : 'default',
                    transition: 'background 0.5s, border-color 0.3s',
                    touchAction: 'none', userSelect: 'none',
                }}
            >
                {/* Deco blobs */}
                <div style={{ position: 'absolute', top: '-80px', left: '20%', width: '280px', height: '280px', background: frozen ? '#7dd3fc' : 'var(--primary)', filter: 'blur(110px)', opacity: 0.06, pointerEvents: 'none', transition: 'all 0.5s', zIndex: 0 }} />
                <div style={{ position: 'absolute', bottom: '-60px', right: '15%', width: '180px', height: '180px', background: 'var(--secondary)', filter: 'blur(90px)', opacity: 0.05, pointerEvents: 'none', zIndex: 0 }} />

                {/* IDLE */}
                {phase === 'idle' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', padding: '1.5rem', zIndex: 2 }}>
                        <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} style={{ fontSize: '4rem' }}>🐛</motion.div>
                        <p style={{ color: '#aaa', fontSize: '0.95rem', textAlign: 'center' }}>30 saniyede maksimum böcek ez! Can biterse oyun biter.</p>
                        <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {[['❤️×3', 'Can'], ['🕷️', 'Boss (+50)'], ['❄️', 'Dondur'], ['💣', 'Nuke']].map(([ic, lb]) => (
                                <div key={lb} style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.4rem' }}>{ic}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#555', fontFamily: 'monospace' }}>{lb}</div>
                                </div>
                            ))}
                        </div>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={startGame}
                            className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', padding: '0.85rem 2.5rem' }}>
                            <Play size={20} /> Başla
                        </motion.button>
                    </motion.div>
                )}

                {/* GAME OVER */}
                {phase === 'gameover' && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '1rem', zIndex: 2 }}>
                        <div style={{ fontSize: '3.5rem' }}>{isNewRecord ? '🏆' : lives === 0 ? '💔' : '⏰'}</div>
                        <h2 style={{ fontWeight: 800, fontSize: '1.8rem' }}>{isNewRecord ? 'Yeni Rekor!' : lives === 0 ? 'Can Bitti!' : 'Süre Doldu!'}</h2>
                        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {[['// score', score, 'var(--primary)'], ['// highScore', highScore, '#fbbf24'], ['// level', currentLevel, '#60a5fa']].map(([lbl, val, col]) => (
                                <div key={lbl} style={{ textAlign: 'center' }}>
                                    <p style={{ color: '#444', fontSize: '0.7rem', fontFamily: 'monospace', marginBottom: '0.2rem' }}>{lbl}</p>
                                    <p style={{ fontWeight: 800, fontSize: '2.2rem', color: col }}>{val}</p>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={startGame}
                                className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', padding: '0.65rem 1.5rem' }}>
                                <RotateCcw size={16} /> Tekrar
                            </motion.button>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={shareScore}
                                className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', padding: '0.65rem 1.5rem' }}>
                                <Share2 size={16} /> X'te Paylaş
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* Bugs */}
                {isPlaying && bugs.map(bug => (
                    <div key={bug.id} onClick={e => crushBug(bug, e)}
                        style={{
                            position: 'absolute', left: `${bug.x}%`, top: `${bug.y}px`,
                            fontSize: `${bug.size}px`, cursor: 'pointer', userSelect: 'none', zIndex: 10, lineHeight: 1,
                            filter: bug.isBoss
                                ? `drop-shadow(0 0 14px rgba(239,68,68,0.9))${frozen ? ' hue-rotate(180deg) brightness(0.65)' : ''}`
                                : `drop-shadow(0 0 6px rgba(124,58,237,0.4))${frozen ? ' hue-rotate(180deg) brightness(0.65)' : ''}`,
                            transition: 'filter 0.3s',
                            transform: frozen ? 'scale(0.9)' : 'scale(1)',
                        }}
                    >{bug.emoji}</div>
                ))}

                {/* Power-ups */}
                {isPlaying && powerups.map(pwr => (
                    <motion.div key={pwr.id} animate={{ rotate: [0, 12, -12, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}
                        onClick={e => collectPwr(pwr, e)}
                        style={{
                            position: 'absolute', left: `${pwr.x}%`, top: `${pwr.y}px`,
                            fontSize: '2.2rem', cursor: 'pointer', zIndex: 11,
                            filter: pwr.type === 'freeze' ? 'drop-shadow(0 0 12px #7dd3fc)' : 'drop-shadow(0 0 12px #f97316)',
                        }}
                    >{pwr.type === 'freeze' ? '❄️' : '💣'}</motion.div>
                ))}

                {/* Pop labels */}
                <AnimatePresence>
                    {pops.map(p => (
                        <motion.div key={p.id}
                            initial={{ opacity: 1, scale: 0.7, y: 0 }} animate={{ opacity: 0, scale: 1.3, y: -55 }}
                            exit={{ opacity: 0 }} transition={{ duration: 0.7 }}
                            style={{
                                position: 'absolute', left: `${p.x}%`, top: `${p.y}px`,
                                pointerEvents: 'none', zIndex: 20, fontWeight: 800, whiteSpace: 'nowrap',
                                fontFamily: p.isDevMsg ? '"Courier New", monospace' : 'inherit',
                                fontSize: p.isBoss ? '1.15rem' : p.isDevMsg ? '0.76rem' : p.mult > 1 ? '1.3rem' : '1rem',
                                color: p.isBoss ? '#ef4444' : p.mult >= 3 ? '#fbbf24' : p.mult === 2 ? '#fb923c' : p.isDevMsg ? '#86efac' : '#a78bfa',
                                textShadow: '0 0 8px currentColor',
                            }}>{p.label}</motion.div>
                    ))}
                </AnimatePresence>

                {/* Particles */}
                <AnimatePresence>
                    {particles.map(p => (
                        <motion.div key={p.id}
                            initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                            animate={{ opacity: 0, scale: 0.3, x: p.dx, y: p.dy }}
                            transition={{ duration: 0.55, ease: 'easeOut' }}
                            style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}px`, fontSize: '1rem', pointerEvents: 'none', zIndex: 15 }}
                        >{p.emoji}</motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            <p style={{ textAlign: 'center', color: '#2a2a2a', fontSize: '0.74rem', marginTop: '0.75rem', fontFamily: 'monospace' }}>
                {'// F12 → Console → combo logları seni bekliyor 👀'}
            </p>
        </div>
    );
}
