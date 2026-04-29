// Splash + Onboarding screens — Figma-aligned

function Splash({ onDone }) {
  React.useEffect(() => { const id = setTimeout(onDone, 2000); return () => clearTimeout(id); }, []);
  return (
    <div style={{ position: 'absolute', inset: 0, background: T.RED, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar light/>
      <div className="splash-mark" style={{ width: 88, height: 88, borderRadius: 22, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: '0 12px 40px rgba(0,0,0,0.2)' }}>
        <svg width="46" height="46" viewBox="0 0 46 46"><path d="M23 6c-8 0-14 6-14 14 0 10 14 20 14 20s14-10 14-20c0-8-6-14-14-14z" fill={T.RED}/><path d="M23 14c-3 0-5 2-5 5 0 4 5 8 5 8s5-4 5-8c0-3-2-5-5-5z" fill="#fff"/></svg>
      </div>
      <div className="splash-word">
        <H1 color="#fff" style={{ fontSize: 48, letterSpacing: 4, textAlign: 'center' }}>shelfed</H1>
      </div>
      <div className="splash-tag" style={{ fontFamily: T.DISPLAY, fontStyle: 'italic', fontSize: 16, color: 'rgba(255,255,255,0.85)', marginTop: 10 }}>Good food. Going fast.</div>
      <HomeIndicator light/>
    </div>
  );
}

function OnboardingA({ onAllow }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <StatusBar/>
      <div style={{ flex: 1, padding: '80px 28px 24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ width: 100, height: 100, borderRadius: 30, background: T.RED_TINT, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
            <svg width="48" height="48" viewBox="0 0 48 48"><path d="M24 4c-8 0-14 6-14 14 0 10 14 26 14 26s14-16 14-26c0-8-6-14-14-14z" stroke={T.RED} strokeWidth="2.5" fill="none"/><circle cx="24" cy="18" r="6" stroke={T.RED} strokeWidth="2.5" fill="none"/></svg>
          </div>
          <H1 style={{ marginBottom: 12 }}>Find rescues<br/><span style={{ fontStyle: 'italic', color: T.RED }}>near you.</span></H1>
          <Body size={15} color={T.MUTED}>Allow location so we can show shelves closing tonight within walking distance.</Body>
        </div>
        <button onClick={onAllow} style={{ width: '100%', height: 52, background: T.RED, color: '#fff', border: 0, borderRadius: 100, fontFamily: T.SANS, fontWeight: 600, fontSize: 15, cursor: 'pointer', marginBottom: 10 }}>Allow location</button>
        <button onClick={onAllow} style={{ background: 'transparent', border: 0, color: T.MUTED, fontFamily: T.SANS, fontSize: 13, cursor: 'pointer', padding: 12 }}>Use Koramangala instead</button>
      </div>
      <HomeIndicator/>
    </div>
  );
}

function OnboardingB({ onStart }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <StatusBar/>
      <div style={{ flex: 1, padding: '80px 28px 24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Eyebrow color={T.RED} style={{ marginBottom: 14 }}>HOW IT WORKS</Eyebrow>
          <H1 style={{ marginBottom: 24 }}>Rescue meals<br/>at <span style={{ fontStyle: 'italic', color: T.RED }}>up to 70% off.</span></H1>
          {[
            { n: 1, t: 'Find a closing shelf', d: 'See cafés winding down nearby — every minute, prices drop.' },
            { n: 2, t: 'Reserve in seconds', d: 'Pay at pickup. No card needed.' },
            { n: 3, t: 'Pick up & save the planet', d: 'You stop perfectly good food from going to landfill.' },
          ].map(s => (
            <div key={s.n} style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
              <div style={{ width: 32, height: 32, borderRadius: 16, background: T.RED, color: '#fff', fontFamily: T.DISPLAY, fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.n}</div>
              <div>
                <Title>{s.t}</Title>
                <Body color={T.MUTED} style={{ marginTop: 3 }}>{s.d}</Body>
              </div>
            </div>
          ))}
        </div>
        <button onClick={onStart} style={{ width: '100%', height: 52, background: T.RED, color: '#fff', border: 0, borderRadius: 100, fontFamily: T.SANS, fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Let's rescue</button>
      </div>
      <HomeIndicator/>
    </div>
  );
}

Object.assign(window, { Splash, OnboardingA, OnboardingB });
