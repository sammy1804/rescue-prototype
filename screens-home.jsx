// Home / Discovery — rebuilt to Figma direction with hierarchy fixes

function HomeHero({ onStore }) {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => { const id = setInterval(() => setIdx(p => (p + 1) % 3), 4000); return () => clearInterval(id); }, []);
  return (
    <div style={{ padding: '60px 20px 14px', background: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="14" height="16" viewBox="0 0 14 16"><path d="M7 1c-3 0-5 2-5 5 0 4 5 9 5 9s5-5 5-9c0-3-2-5-5-5z" stroke={T.INK} strokeWidth="1.4" fill="none"/><circle cx="7" cy="6" r="2" stroke={T.INK} strokeWidth="1.2" fill="none"/></svg>
          <span style={{ fontFamily: T.SANS, fontWeight: 600, fontSize: 14, color: T.INK }}>Koramangala</span>
          <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke={T.INK} strokeWidth="1.6" fill="none" strokeLinecap="round"/></svg>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button style={iconBtn}><svg width="16" height="16" viewBox="0 0 16 16"><circle cx="7" cy="7" r="5" stroke={T.INK} strokeWidth="1.6" fill="none"/><path d="M11 11l3 3" stroke={T.INK} strokeWidth="1.6" strokeLinecap="round"/></svg></button>
          <button style={{ ...iconBtn, background: T.RED, position: 'relative' }}>
            <svg width="14" height="16" viewBox="0 0 14 16"><path d="M7 1c-2 0-3 1-3 3 0 2-1 3-2 5h10c-1-2-2-3-2-5 0-2-1-3-3-3z" fill="#fff"/><path d="M5 12c0 1 1 2 2 2s2-1 2-2" stroke="#fff" strokeWidth="1.4" fill="none"/></svg>
            <span style={{ position: 'absolute', top: 4, right: 4, width: 8, height: 8, borderRadius: '50%', background: T.AMBER, border: '1.5px solid #fff' }}/>
          </button>
        </div>
      </div>

      <div style={{ background: T.HAIR_2, borderRadius: 100, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
        <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="7" cy="7" r="5" stroke={T.MUTED} strokeWidth="1.6" fill="none"/><path d="M11 11l3 3" stroke={T.MUTED} strokeWidth="1.6" strokeLinecap="round"/></svg>
        <span style={{ fontFamily: T.SANS, fontSize: 13, color: T.MUTED }}>Search "Pasta Street", "Donut"...</span>
      </div>

      {/* Real H1 — Fraunces */}
      <H1 style={{ marginBottom: 14 }}>Good morning,<br/><span style={{ fontStyle: 'italic', color: T.RED }}>Rescuer.</span></H1>

      <button onClick={onStore} style={{ background: '#fff', border: `1.5px solid ${T.INK}`, color: T.INK, padding: '8px 18px', borderRadius: 100, fontFamily: T.SANS, fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
        Explore Now <span>→</span>
      </button>

      <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
        {[0, 1, 2].map(i => <div key={i} style={{ width: i === idx ? 16 : 6, height: 6, borderRadius: 3, background: i === idx ? T.INK : T.HAIR, transition: 'width 0.3s' }}/>)}
      </div>
    </div>
  );
}
const iconBtn = { width: 36, height: 36, borderRadius: 18, background: T.HAIR_2, border: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' };

function WasteBanner() {
  return (
    <div className="waste-banner" style={{ margin: '0 16px 18px', background: T.RED, borderRadius: 14, padding: '14px 16px', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 14px rgba(232,23,10,0.25)' }}>
      <div style={{ position: 'absolute', right: -10, bottom: -10, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }}/>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', position: 'relative' }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 18 18"><path d="M9 2C5 2 3 5 3 9c0 4 3 7 6 7s6-3 6-7c0-3-2-5-4-6 0 2-1 3-2 3s-1-1 0-4z" fill="#fff"/></svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: T.SANS, fontWeight: 700, fontSize: 14, color: '#fff', lineHeight: 1.25 }}>
            <span className="counter">1.2 tons</span> of food wasted today.
          </div>
          <div style={{ fontFamily: T.SANS, fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 4 }}>
            You've saved <strong>4 meals this week!</strong> 🥖
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryRow({ onStore }) {
  // Use food image thumbnails instead of emoji per audit
  const cats = [
    { id: 'again', label: 'Buy it again', img: FOOD.croissant },
    { id: 'offer', label: 'Special offer', img: FOOD.donut },
    { id: 'wedding', label: 'Wedding', img: FOOD.cake },
    { id: 'most', label: 'Most ordered', img: FOOD.muffin },
    { id: 'cafe', label: 'Cafés', img: FOOD.coffee },
  ];
  return (
    <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '0 16px 18px' }} className="no-scroll">
      {cats.map(c => (
        <button key={c.id} onClick={onStore} style={{ flexShrink: 0, background: 'transparent', border: 0, cursor: 'pointer', textAlign: 'center', padding: 0 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', overflow: 'hidden', border: `1px solid ${T.HAIR}`, marginBottom: 6 }}>
            <img src={c.img} alt={c.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
          </div>
          <div style={{ fontFamily: T.SANS, fontWeight: 500, fontSize: 11, color: T.INK }}>{c.label}</div>
        </button>
      ))}
    </div>
  );
}

function SurpriseGiftCard({ progress = 1, total = 3 }) {
  const pct = (progress / total) * 100;
  return (
    <div style={{ margin: '0 16px 18px', background: '#fff', border: `1px solid ${T.HAIR}`, borderRadius: 14, padding: '14px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: T.RED_TINT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="6" width="12" height="9" rx="1" stroke={T.RED} strokeWidth="1.5"/><path d="M2 6h14M9 6v9M6 6c0-2 1-3 2-3s1 1 1 2-1 1-3 1zM12 6c0-2-1-3-2-3s-1 1-1 2 1 1 3 1z" stroke={T.RED} strokeWidth="1.5" strokeLinecap="round"/></svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Title>Get a free surprise gift</Title>
            <div style={{ fontFamily: T.SANS, fontWeight: 700, fontSize: 12, color: T.RED }}>{progress}/{total} <span style={{ fontWeight: 500, color: T.MUTED, fontSize: 9, letterSpacing: 1, textTransform: 'uppercase' }}>orders</span></div>
          </div>
          <Body size={11} color={T.MUTED} style={{ marginTop: 2 }}>Get free food from restaurant</Body>
          <div style={{ marginTop: 10, display: 'flex', gap: 4, alignItems: 'center' }}>
            {[1, 2, 3].map(n => (
              <React.Fragment key={n}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: n <= progress ? T.RED : '#fff', border: `2px solid ${n <= progress ? T.RED : T.HAIR}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {n <= progress && <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1 4l2 2 4-4" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>}
                </div>
                {n < 3 && <div style={{ flex: 1, height: 3, background: T.HAIR, borderRadius: 2, overflow: 'hidden' }}><div style={{ height: '100%', width: n < progress ? '100%' : '0%', background: T.RED, transition: 'width 0.6s' }}/></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ dot, label, count, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px 10px' }}>
      {dot && <div style={{ width: 8, height: 8, borderRadius: '50%', background: dot, flexShrink: 0 }} className={dot === T.RED ? 'pulse' : ''}/>}
      <Eyebrow color={T.INK}>{label}</Eyebrow>
      <div style={{ flex: 1, height: 1, background: T.HAIR }}/>
      {count && <span style={{ fontFamily: T.SANS, fontSize: 10, fontWeight: 600, color: T.MUTED, letterSpacing: 1, textTransform: 'uppercase' }}>{count}</span>}
      {action && <button style={{ background: 'transparent', border: 0, color: T.RED, fontFamily: T.SANS, fontWeight: 600, fontSize: 11, cursor: 'pointer', padding: 0 }}>{action}</button>}
    </div>
  );
}

function EndingSoonRow({ onStore }) {
  const items = [
    { name: 'Bread And Co', drop: 55, time: '0:47:08', img: FOOD.cake, store: 'Strawberry' },
    { name: 'Bread And Co', drop: 55, time: '0:47:08', img: FOOD.swissroll, store: 'Swiss Roll' },
    { name: 'Bread And Co', drop: 55, time: '0:47:08', img: FOOD.matcha, store: 'Matcha' },
  ];
  return (
    <div style={{ display: 'flex', gap: 12, padding: '0 16px 20px', overflowX: 'auto' }} className="no-scroll">
      {items.map((it, i) => (
        <div key={i} onClick={onStore} style={{ flexShrink: 0, width: 150, background: '#fff', borderRadius: 12, overflow: 'hidden', border: `1px solid ${T.HAIR}`, cursor: 'pointer' }}>
          <div style={{ position: 'relative', height: 100 }}>
            <img src={it.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
            <div style={{ position: 'absolute', top: 8, left: 8, background: '#fff', padding: '3px 7px', borderRadius: 100, fontFamily: T.SANS, fontWeight: 700, fontSize: 9, color: T.RED, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>{it.drop}% DROP</div>
            <div className="pulse-bg" style={{ position: 'absolute', bottom: 8, right: 8, background: T.RED, padding: '3px 8px', borderRadius: 4, fontFamily: T.MONO, fontWeight: 700, fontSize: 10, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{it.time}</div>
          </div>
          <div style={{ padding: 10 }}>
            <Title style={{ fontSize: 13 }}>{it.name}</Title>
            <Body size={11} color={T.MUTED} style={{ marginTop: 2 }}>{it.store}</Body>
          </div>
        </div>
      ))}
    </div>
  );
}

function RestaurantCard({ r, onTap }) {
  return (
    <button onClick={onTap} style={{ width: '100%', background: '#fff', border: 0, borderRadius: 12, padding: 12, display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer', textAlign: 'left', borderBottom: `1px solid ${T.HAIR}` }}>
      <div style={{ width: 60, height: 60, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
        <img src={r.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Title>{r.name}</Title>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <span style={{ fontFamily: T.SANS, fontWeight: 700, fontSize: 12, color: T.GREEN }}>★ {r.rating}</span>
          </div>
        </div>
        <Body size={11} color={T.MUTED} style={{ marginTop: 2 }}>{r.cat} · {r.dist}</Body>
        <div style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontFamily: T.SANS, fontWeight: 700, fontSize: 11, color: T.RED, background: T.RED_TINT, padding: '3px 7px', borderRadius: 4 }}>PAY ₹{r.price}</span>
          <span style={{ fontFamily: T.MONO, fontWeight: 600, fontSize: 11, color: T.RED }}>⏰ {r.time}</span>
          <span style={{ fontFamily: T.SANS, fontSize: 10, color: T.MUTED, marginLeft: 'auto' }}>{r.left} left</span>
        </div>
      </div>
    </button>
  );
}

function NearbyList({ onStore }) {
  const list = [
    { id: 'tal1', name: 'The artisan loaf', cat: 'Cafe', dist: '0.4 miles away', rating: '4.6', price: '450', time: '06m 12s', left: 'Items' },
    { id: 'tal2', name: 'The artisan loaf', cat: 'Cafe', dist: '0.4 miles away', rating: '4.4', price: '450', time: '06m 12s', left: '3 Items' },
  ];
  return (
    <div style={{ padding: '0 16px 18px', display: 'flex', flexDirection: 'column', gap: 0 }}>
      {list.map(r => <RestaurantCard key={r.id} r={{ ...r, img: FOOD.bread }} onTap={() => onStore(r.id)}/>)}
    </div>
  );
}

function Save80Banner({ onStore }) {
  return (
    <div style={{ margin: '0 16px 18px', position: 'relative', height: 130, borderRadius: 12, overflow: 'hidden' }}>
      <img src={FOOD.restaurant} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)' }}/>
      <div style={{ position: 'absolute', inset: 0, padding: '18px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <Eyebrow color="rgba(255,227,82,1)">EXCLUSIVE OFFERS</Eyebrow>
          <H2 color="#fff" style={{ marginTop: 4 }}>Save 80%</H2>
        </div>
        <button onClick={onStore} style={{ alignSelf: 'flex-start', background: T.RED, color: '#fff', border: 0, padding: '8px 18px', borderRadius: 100, fontFamily: T.SANS, fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>Explore</button>
      </div>
    </div>
  );
}

function MostDiscountedRow({ onStore }) {
  const items = [
    { name: 'Strawberry', tag: 'Sold out', sold: true, was: 240, now: 60, time: '2H LEFT', img: FOOD.cake },
    { name: 'Swiss Roll', tag: 'Berries', sold: false, was: 240, now: 60, time: '2H LEFT', img: FOOD.swissroll },
    { name: 'Matcha', tag: 'Dessert', sold: false, was: 540, now: 120, time: '2H LEFT', img: FOOD.matcha },
  ];
  return (
    <div style={{ display: 'flex', gap: 12, padding: '0 16px 20px', overflowX: 'auto' }} className="no-scroll">
      {items.map((it, i) => (
        <div key={i} style={{ flexShrink: 0, width: 130, background: '#fff', borderRadius: 12, overflow: 'hidden', border: `1px solid ${T.HAIR}`, position: 'relative' }}>
          <div style={{ position: 'relative', height: 100 }}>
            <img src={it.img} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: it.sold ? 'grayscale(0.4)' : 'none' }}/>
            <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.7)', padding: '2px 6px', borderRadius: 100, fontFamily: T.SANS, fontWeight: 700, fontSize: 8, color: '#fff' }}>{it.time}</div>
            {it.sold && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: T.INK, color: '#fff', padding: '4px 10px', fontFamily: T.SANS, fontWeight: 700, fontSize: 11, transform: 'rotate(-6deg)', border: '1.5px solid #fff' }}>SOLD OUT</div>
              </div>
            )}
            {!it.sold && <button onClick={onStore} style={{ position: 'absolute', bottom: 8, right: 8, width: 24, height: 24, borderRadius: '50%', background: T.RED, border: 0, color: '#fff', fontFamily: T.DISPLAY, fontSize: 18, lineHeight: 1, cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>+</button>}
          </div>
          <div style={{ padding: 10 }}>
            <div style={{ background: it.sold ? T.HAIR : T.AMBER, padding: '2px 6px', borderRadius: 4, fontFamily: T.SANS, fontWeight: 600, fontSize: 9, color: it.sold ? T.MUTED : T.AMBER_INK, display: 'inline-block', marginBottom: 6 }}>{it.tag}</div>
            <Title style={{ fontSize: 12 }}>{it.name}</Title>
            <div style={{ marginTop: 4, display: 'flex', gap: 4, alignItems: 'baseline' }}>
              <span style={{ fontFamily: T.SANS, fontWeight: 400, fontSize: 10, color: T.MUTED, textDecoration: 'line-through' }}>₹{it.was}</span>
              <span style={{ fontFamily: T.SANS, fontWeight: 700, fontSize: 13, color: T.RED }}>₹{it.now}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Home({ onStore, onTab, cartCount }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: T.BG, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <StatusBar/>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <HomeHero onStore={onStore}/>
        <WasteBanner/>
        <CategoryRow onStore={onStore}/>
        <SurpriseGiftCard/>
        <SectionHeader dot={T.RED} label="Ending Soon" count="3 ALERTS"/>
        <EndingSoonRow onStore={onStore}/>
        <SectionHeader dot={T.GREEN} label="Nearby Restaurants" count="7 OUTLETS" action="Favorites"/>
        <NearbyList onStore={onStore}/>
        <Save80Banner onStore={onStore}/>
        <SectionHeader dot={T.RED} label="Most Discounted" count="7 OUTLETS"/>
        <MostDiscountedRow onStore={onStore}/>
      </div>
      <BottomNav active="home" onTab={onTab} cartCount={cartCount}/>
      <HomeIndicator/>
    </div>
  );
}

Object.assign(window, { Home });
