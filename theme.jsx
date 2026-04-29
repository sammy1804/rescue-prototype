// Design tokens — aligned to Figma (Open Runde + Fraunces hierarchy)
const T = {
  // Colors from Figma metadata
  RED: '#E8170A', RED_DARK: '#C00C29', RED_TINT: '#FFF0EF', RED_BRIGHT: '#FF4438',
  INK: '#101828', INK_2: '#364153', INK_3: '#4A5565',
  MUTED: '#6A7282', DIM: '#99A1AF',
  HAIR: '#E5E7EB', HAIR_2: '#F3F4F6',
  BG: '#F5F5F5', CARD: '#FFFFFF',
  GREEN: '#0BA63E', GREEN_TINT: '#E6F7EB',
  AMBER: '#FFE352', AMBER_INK: '#716002',
  GOLD: '#E8C87A',
  // Type — Fraunces for display, Open Runde for UI
  DISPLAY: '"Fraunces", Georgia, serif',
  SANS: '"Open Runde", "Inter", -apple-system, system-ui, sans-serif',
  MONO: '"JetBrains Mono", ui-monospace, monospace',
};

// ─── Typography helpers — strict hierarchy ──────────────────────────
function H1({ children, color = T.INK, style = {} }) {
  return <div style={{ fontFamily: T.DISPLAY, fontWeight: 600, fontSize: 32, lineHeight: 1.05, letterSpacing: -0.8, color, ...style }}>{children}</div>;
}
function H2({ children, color = T.INK, style = {} }) {
  return <div style={{ fontFamily: T.DISPLAY, fontWeight: 600, fontSize: 24, lineHeight: 1.1, letterSpacing: -0.4, color, ...style }}>{children}</div>;
}
function H3({ children, color = T.INK, style = {} }) {
  return <div style={{ fontFamily: T.SANS, fontWeight: 700, fontSize: 18, lineHeight: 1.2, letterSpacing: -0.2, color, ...style }}>{children}</div>;
}
function Title({ children, color = T.INK, style = {} }) {
  return <div style={{ fontFamily: T.SANS, fontWeight: 600, fontSize: 15, lineHeight: 1.3, color, ...style }}>{children}</div>;
}
function Body({ children, color = T.INK_3, size = 13, style = {} }) {
  return <div style={{ fontFamily: T.SANS, fontWeight: 400, fontSize: size, lineHeight: 1.45, color, ...style }}>{children}</div>;
}
function Eyebrow({ children, color = T.MUTED, style = {} }) {
  return <div style={{ fontFamily: T.SANS, fontWeight: 600, fontSize: 10, lineHeight: 1, letterSpacing: 1.5, color, textTransform: 'uppercase', ...style }}>{children}</div>;
}
function Mono({ children, color = '#fff', size = 14, style = {} }) {
  return <span style={{ fontFamily: T.MONO, fontWeight: 600, fontSize: size, fontVariantNumeric: 'tabular-nums', color, ...style }}>{children}</span>;
}

// ─── Phone frame ────────────────────────────────────────────────────
function Phone({ children }) {
  return (
    <div style={{
      width: 390, height: 844, position: 'relative',
      borderRadius: 44, overflow: 'hidden',
      background: '#fff',
      boxShadow: '0 0 0 10px #1a1a1a, 0 0 0 12px #2a2a2a, 0 30px 80px rgba(0,0,0,0.5)',
    }}>{children}</div>
  );
}

function StatusBar({ light = false, time = '11:30' }) {
  const c = light ? '#fff' : '#000';
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 47, padding: '0 26px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 50, pointerEvents: 'none' }}>
      <div style={{ fontFamily: T.SANS, fontWeight: 700, fontSize: 15, color: c }}>{time}</div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="16" height="11" viewBox="0 0 16 11"><g fill={c}>
          <rect x="0" y="7" width="3" height="4" rx="0.5"/><rect x="4.5" y="5" width="3" height="6" rx="0.5"/>
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.5"/><rect x="13.5" y="0" width="3" height="11" rx="0.5"/>
        </g></svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill={c}><path d="M7.5 2C4.5 2 2 3.3 0 5l1.4 1.4C3 5.1 5.1 4.3 7.5 4.3s4.5.8 6.1 2.1L15 5C13 3.3 10.5 2 7.5 2zm0 3c-1.6 0-3.1.5-4.3 1.4l1.4 1.4c.8-.6 1.8-.9 2.9-.9s2.1.3 2.9.9l1.4-1.4C10.6 5.5 9.1 5 7.5 5zm0 3c-.7 0-1.4.2-1.9.6L7.5 11l1.9-2.4C8.9 8.2 8.2 8 7.5 8z"/></svg>
        <div style={{ width: 24, height: 11, border: `1px solid ${c}`, borderRadius: 3, padding: 1, opacity: 0.6 }}>
          <div style={{ width: '85%', height: '100%', background: c, borderRadius: 1 }}/>
        </div>
      </div>
    </div>
  );
}

function HomeIndicator({ light = false }) {
  return <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 134, height: 5, borderRadius: 3, background: light ? '#fff' : '#000', opacity: 0.9, zIndex: 50, pointerEvents: 'none' }}/>;
}

// ─── Real food images (royalty-free Unsplash) ───────────────────────
const FOOD = {
  croissant: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80',
  sourdough: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&q=80',
  galette: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
  muffin: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&q=80',
  pancakes: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80',
  donut: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80',
  pound: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&q=80',
  cake: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80',
  swissroll: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&q=80',
  matcha: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=400&q=80',
  bread: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
  coffee: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
  restaurant: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
  cafe1: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80',
  cafe2: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&q=80',
  user: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
};

// Helpers
function useCountdown({ h = 1, m = 11, s = 4 } = {}) {
  const [t, setT] = React.useState(h * 3600 + m * 60 + s);
  React.useEffect(() => { const id = setInterval(() => setT(p => Math.max(0, p - 1)), 1000); return () => clearInterval(id); }, []);
  const hh = Math.floor(t / 3600), mm = Math.floor((t % 3600) / 60), ss = t % 60;
  const pad = n => String(n).padStart(2, '0');
  return { str: `${hh}:${pad(mm)}:${pad(ss)}`, totalMin: Math.floor(t / 60), s: t };
}

// ─── Bottom nav (sticky) ────────────────────────────────────────────
function BottomNav({ active, onTab, cartCount = 0 }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'search', label: 'Search', icon: 'search' },
    { id: 'cart', label: 'Cart', icon: 'cart' },
    { id: 'me', label: 'Me', icon: 'user' },
  ];
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 76, background: '#fff', borderTop: `1px solid ${T.HAIR}`, zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 8px 22px' }}>
      {tabs.map(t => {
        const a = active === t.id;
        return (
          <button key={t.id} onClick={() => onTab(t.id)} style={{ background: 'transparent', border: 0, cursor: 'pointer', flex: 1, padding: 8, position: 'relative' }}>
            <NavIcon name={t.icon} active={a}/>
            <div style={{ fontFamily: T.SANS, fontWeight: a ? 600 : 500, fontSize: 10, color: a ? T.RED : T.MUTED, marginTop: 4 }}>{t.label}</div>
            {t.id === 'cart' && cartCount > 0 && (
              <div style={{ position: 'absolute', top: 4, right: '50%', marginRight: -18, width: 16, height: 16, borderRadius: 8, background: T.RED, color: '#fff', fontFamily: T.SANS, fontWeight: 700, fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</div>
            )}
          </button>
        );
      })}
    </div>
  );
}

function NavIcon({ name, active }) {
  const c = active ? T.RED : T.MUTED, s = 1.6;
  if (name === 'home') return <svg width="22" height="22" viewBox="0 0 22 22" style={{ display: 'block', margin: '0 auto' }}><path d="M3 9.5L11 3l8 6.5V19a1 1 0 01-1 1h-4v-6h-6v6H4a1 1 0 01-1-1V9.5z" stroke={c} strokeWidth={s} fill="none" strokeLinejoin="round"/></svg>;
  if (name === 'search') return <svg width="22" height="22" viewBox="0 0 22 22" style={{ display: 'block', margin: '0 auto' }}><circle cx="10" cy="10" r="6" stroke={c} strokeWidth={s} fill="none"/><path d="M14.5 14.5L19 19" stroke={c} strokeWidth={s} strokeLinecap="round"/></svg>;
  if (name === 'cart') return <svg width="22" height="22" viewBox="0 0 22 22" style={{ display: 'block', margin: '0 auto' }}><path d="M3 4h2l2 11h11l2-7H6" stroke={c} strokeWidth={s} fill="none" strokeLinejoin="round" strokeLinecap="round"/><circle cx="9" cy="19" r="1.5" fill={c}/><circle cx="17" cy="19" r="1.5" fill={c}/></svg>;
  return <svg width="22" height="22" viewBox="0 0 22 22" style={{ display: 'block', margin: '0 auto' }}><circle cx="11" cy="7" r="4" stroke={c} strokeWidth={s} fill="none"/><path d="M3 19c0-4 4-6 8-6s8 2 8 6" stroke={c} strokeWidth={s} fill="none" strokeLinecap="round"/></svg>;
}

Object.assign(window, { T, H1, H2, H3, Title, Body, Eyebrow, Mono, Phone, StatusBar, HomeIndicator, FOOD, useCountdown, BottomNav, NavIcon });
