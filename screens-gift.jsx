// SurpriseGiftModal + ScratchCard — new components

function SurpriseGiftModal({ onScratch, onSkip }) {
  const [phase, setPhase] = React.useState(0); // 0=enter 1=shake 2=pop 3=show

  React.useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1400);
    const t3 = setTimeout(() => setPhase(3), 2000);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  const giftAnim = {
    display: 'inline-block',
    fontSize: 80,
    transition: 'transform 0.4s cubic-bezier(0.2,0.7,0.3,1.4)',
    transform: phase === 1 ? 'rotate(-8deg) scale(1.1)' : phase === 2 ? 'scale(1.25)' : phase >= 3 ? 'scale(1)' : 'scale(0.5)',
    animation: phase === 1 ? 'giftShake 0.12s ease infinite alternate' : 'none',
    filter: phase >= 2 ? 'drop-shadow(0 8px 24px rgba(232,23,10,0.4))' : 'none',
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.72)', zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, backdropFilter: 'blur(6px)' }}>
      <div style={{ background: '#fff', borderRadius: 28, padding: '36px 24px 24px', width: '100%', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.3)' }}>

        {/* Confetti burst when revealed */}
        {phase >= 3 && [...Array(14)].map((_, i) => (
          <div key={i} className="confetti" style={{
            position: 'absolute', top: '28%', left: '50%', width: 8, height: 8,
            borderRadius: i % 2 === 0 ? '50%' : 2,
            background: [T.RED,'#FFD700',T.GREEN,'#9B5DE5','#00BBF9',T.AMBER][i % 6],
            '--tx': `${Math.cos(i / 14 * Math.PI * 2) * 100}px`,
            '--ty': `${Math.sin(i / 14 * Math.PI * 2) * 80}px`,
            animationDelay: `${i * 0.025}s`,
          }}/>
        ))}

        {/* Gift box */}
        <div style={giftAnim}>{phase >= 2 ? '🎁' : '📦'}</div>

        {/* Stars around gift */}
        {phase >= 2 && (
          <div style={{ position: 'absolute', top: 20, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 60, pointerEvents: 'none' }}>
            {['✨','⭐','✨'].map((s, i) => (
              <span key={i} style={{ fontSize: 22, opacity: 0, animation: `fadeUp 0.3s ease ${0.1 + i * 0.1}s forwards` }}>{s}</span>
            ))}
          </div>
        )}

        {/* Text */}
        <div style={{ marginTop: 20, opacity: phase >= 3 ? 1 : 0, transition: 'opacity 0.5s ease', transform: phase >= 3 ? 'translateY(0)' : 'translateY(10px)' }}>
          <div style={{ fontFamily: T.DISPLAY, fontWeight: 600, fontSize: 28, color: T.INK, lineHeight: 1.1, marginBottom: 8 }}>
            You earned a<br/><span style={{ color: T.RED, fontStyle: 'italic' }}>Surprise Gift!</span>
          </div>
          <div style={{ fontFamily: T.SANS, fontSize: 13, color: T.MUTED, marginBottom: 28, lineHeight: 1.5 }}>
            Scratch the card below to<br/>reveal your exclusive reward 🎉
          </div>

          <button onClick={onScratch} style={{
            width: '100%', height: 54, background: T.RED, color: '#fff', border: 0,
            borderRadius: 100, fontFamily: T.SANS, fontWeight: 700, fontSize: 16, cursor: 'pointer',
            marginBottom: 12, boxShadow: '0 8px 24px rgba(232,23,10,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            🎰 Scratch Now!
          </button>
          <button onClick={onSkip} style={{ background: 'transparent', border: 0, color: T.MUTED, fontFamily: T.SANS, fontSize: 13, cursor: 'pointer', padding: 10 }}>
            Remind me later
          </button>
        </div>
      </div>
    </div>
  );
}

function ScratchCard({ onDone }) {
  const canvasRef = React.useRef(null);
  const [scratching, setScratching] = React.useState(false);
  const [revealed, setRevealed] = React.useState(false);
  const [pct, setPct] = React.useState(0);
  const lastPos = React.useRef(null);

  const prize = { emoji: '🎉', label: '₹50 OFF', sub: 'On your next rescue order', code: 'RESCUE50' };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    // Gold scratch layer
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, '#D4A017');
    grad.addColorStop(0.5, '#F0C040');
    grad.addColorStop(1, '#B8860B');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Dashed pattern overlay
    ctx.fillStyle = 'rgba(255,255,255,0.07)';
    for (let x = 0; x < W; x += 20) {
      for (let y = 0; y < H; y += 20) {
        ctx.fillRect(x, y, 10, 10);
      }
    }

    // Scratch hint text
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✦ SCRATCH HERE ✦', W / 2, H / 2 - 8);
    ctx.font = '11px sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fillText('Use your finger or mouse', W / 2, H / 2 + 14);

    const getPos = (e, rect) => {
      const src = e.touches ? e.touches[0] : e;
      return {
        x: (src.clientX - rect.left) * (W / rect.width),
        y: (src.clientY - rect.top) * (H / rect.height),
      };
    };

    const doScratch = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      if (lastPos.current) {
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(x, y);
        ctx.lineWidth = 44;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
      lastPos.current = { x, y };

      // Sample scratch % every 10 calls
      if (Math.random() < 0.15) {
        const data = ctx.getImageData(0, 0, W, H).data;
        let transparent = 0;
        for (let i = 3; i < data.length; i += 4) if (data[i] < 128) transparent++;
        const p = transparent / (W * H);
        setPct(p);
        if (p > 0.55) {
          ctx.clearRect(0, 0, W, H);
          setRevealed(true);
        }
      }
    };

    const onStart = (e) => { e.preventDefault(); setScratching(true); lastPos.current = null; };
    const onMove = (e) => {
      e.preventDefault();
      if (!scratching) return; // won't work — see below
      const rect = canvas.getBoundingClientRect();
      const { x, y } = getPos(e, rect);
      doScratch(x, y);
    };
    const onEnd = () => { setScratching(false); lastPos.current = null; };

    // Use ref flag because state is stale inside handler
    let isDown = false;
    const start = (e) => { e.preventDefault(); isDown = true; lastPos.current = null; setScratching(true); };
    const move = (e) => {
      e.preventDefault();
      if (!isDown) return;
      const rect = canvas.getBoundingClientRect();
      const { x, y } = getPos(e, rect);
      doScratch(x, y);
    };
    const end = () => { isDown = false; lastPos.current = null; setScratching(false); };

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    canvas.addEventListener('mouseup', end);
    canvas.addEventListener('mouseleave', end);
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', move, { passive: false });
    canvas.addEventListener('touchend', end);

    return () => {
      canvas.removeEventListener('mousedown', start);
      canvas.removeEventListener('mousemove', move);
      canvas.removeEventListener('mouseup', end);
      canvas.removeEventListener('mouseleave', end);
      canvas.removeEventListener('touchstart', start);
      canvas.removeEventListener('touchmove', move);
      canvas.removeEventListener('touchend', end);
    };
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, background: T.BG, display: 'flex', flexDirection: 'column' }}>
      <StatusBar/>

      {/* Header */}
      <div style={{ background: '#fff', padding: '56px 16px 16px', borderBottom: `1px solid ${T.HAIR}`, textAlign: 'center' }}>
        <H2>Your Scratch Card</H2>
        <Body size={12} color={T.MUTED} style={{ marginTop: 4 }}>From your last rescue order</Body>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>

        {/* Prize card background */}
        <div style={{ width: '100%', maxWidth: 320, borderRadius: 20, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.15)', position: 'relative' }}>

          {/* Prize reveal layer (shown under scratch) */}
          <div style={{ background: 'linear-gradient(135deg, #FFF0EF 0%, #fff 100%)', padding: '36px 24px', textAlign: 'center', minHeight: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {revealed ? (
              <div style={{ animation: 'checkBg 0.5s cubic-bezier(0.2,0.7,0.3,1.4)' }}>
                <div style={{ fontSize: 52, marginBottom: 12 }}>{prize.emoji}</div>
                <div style={{ fontFamily: T.DISPLAY, fontWeight: 700, fontSize: 40, color: T.RED, letterSpacing: -1, marginBottom: 6 }}>{prize.label}</div>
                <div style={{ fontFamily: T.SANS, fontSize: 13, color: T.MUTED, marginBottom: 16 }}>{prize.sub}</div>
                <div style={{ background: T.INK, color: '#fff', padding: '8px 20px', borderRadius: 8, fontFamily: T.MONO, fontWeight: 700, fontSize: 16, letterSpacing: 3, display: 'inline-block' }}>{prize.code}</div>
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="confetti" style={{
                    position: 'absolute', top: '40%', left: '50%', width: 7, height: 7,
                    borderRadius: i % 2 === 0 ? '50%' : 1,
                    background: [T.RED,'#FFD700',T.GREEN,'#9B5DE5'][i % 4],
                    '--tx': `${Math.cos(i / 10 * Math.PI * 2) * 80}px`,
                    '--ty': `${Math.sin(i / 10 * Math.PI * 2) * 80}px`,
                    animationDelay: `${i * 0.04}s`,
                  }}/>
                ))}
              </div>
            ) : (
              <div style={{ color: T.HAIR, fontFamily: T.DISPLAY, fontSize: 20, opacity: 0.3 }}>🎁</div>
            )}
          </div>

          {/* Scratch canvas overlay */}
          {!revealed && (
            <canvas
              ref={canvasRef}
              width={340}
              height={200}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'crosshair', touchAction: 'none', borderRadius: 20 }}
            />
          )}
        </div>

        {/* Progress bar */}
        {!revealed && (
          <div style={{ marginTop: 20, width: '100%', maxWidth: 320 }}>
            <div style={{ height: 4, background: T.HAIR, borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${Math.min(pct * 180, 100)}%`, background: T.RED, borderRadius: 2, transition: 'width 0.2s' }}/>
            </div>
            <div style={{ fontFamily: T.SANS, fontSize: 11, color: T.MUTED, textAlign: 'center', marginTop: 8 }}>
              {pct < 0.1 ? 'Start scratching...' : pct < 0.35 ? 'Keep going...' : 'Almost there!'}
            </div>
          </div>
        )}

        {/* Revealed actions */}
        {revealed && (
          <div style={{ marginTop: 24, width: '100%', maxWidth: 320, animation: 'fadeUp 0.4s ease' }}>
            <div style={{ background: T.GREEN_TINT, borderRadius: 10, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill={T.GREEN}/><path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <Body size={12} color={T.GREEN}>Code copied to clipboard automatically!</Body>
            </div>
            <button onClick={onDone} style={{ width: '100%', height: 52, background: T.RED, color: '#fff', border: 0, borderRadius: 100, fontFamily: T.SANS, fontWeight: 600, fontSize: 15, cursor: 'pointer', boxShadow: '0 6px 20px rgba(232,23,10,0.3)' }}>
              Claim & Go Home 🏠
            </button>
          </div>
        )}
      </div>
      <HomeIndicator/>
    </div>
  );
}

Object.assign(window, { SurpriseGiftModal, ScratchCard });
