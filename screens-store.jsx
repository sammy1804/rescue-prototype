// Restaurant Deal screen — Figma-faithful with shelf + starbursts

function StoreHero({ store, onBack, fav, setFav, cdStr }) {
  return (
    <div style={{ position: 'relative', background: T.RED, padding: '60px 20px 28px', borderRadius: '0 0 18px 18px' }}>
      <div style={{ position: 'absolute', top: 56, left: 16, right: 16, display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onBack} style={circleBtn}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button onClick={() => setFav(!fav)} style={circleBtn}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 12.5S1.5 9 1.5 5.5a3 3 0 015.5-1.5A3 3 0 0112.5 5.5C12.5 9 7 12.5 7 12.5z" fill={fav ? '#fff' : 'none'} stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/></svg>
        </button>
      </div>
      <div style={{ marginTop: 36 }}>
        <H1 color="#fff" style={{ fontFamily: T.SANS, fontWeight: 700, fontSize: 32, lineHeight: 1.05, letterSpacing: -0.5, textTransform: 'uppercase' }}>BREAD &<br/>BUTTER CO.</H1>
        <div style={{ fontFamily: T.SANS, fontWeight: 500, fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 12, letterSpacing: 0.8, textTransform: 'uppercase' }}>SPECIALTY CAFE · Koramangala</div>
      </div>
    </div>
  );
}
const circleBtn = { width: 36, height: 36, borderRadius: 18, background: 'rgba(255,255,255,0.2)', border: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' };

function AlarmBar({ cdStr, totalMin }) {
  // Audit fix: more urgent visual treatment with red dot + bold typography
  const critical = totalMin < 30;
  return (
    <div style={{ background: critical ? '#FFE4E2' : T.RED_TINT, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${T.HAIR}` }}>
      <span className="blink-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: T.RED, flexShrink: 0, boxShadow: `0 0 0 3px rgba(232,23,10,0.2)` }}/>
      <div style={{ flex: 1, fontFamily: T.SANS, fontSize: 12, color: T.INK, lineHeight: 1.3 }}>
        <strong>Shelf Closes Tonight.</strong> <span style={{ color: T.MUTED }}>Whatever's Left Bins At 9 PM.</span>
      </div>
      <Mono color={T.RED} size={14}>{cdStr}</Mono>
    </div>
  );
}

function StatsStrip() {
  const stats = [
    { v: '3', l: 'ITEMS LEFT' },
    { v: '0.4 KM', l: 'DISTANCE' },
    { v: <span>60 <span style={{ color: T.RED }}>↓</span></span>, c: T.RED, l: 'DROPPED' },
    { v: '4.8 ★', l: 'RATING' },
  ];
  return (
    <div style={{ background: '#fff', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: `1px solid ${T.HAIR}` }}>
      {stats.map((s, i) => (
        <div key={i} style={{ padding: '14px 8px', textAlign: 'center', borderRight: i < 3 ? `1px solid ${T.HAIR}` : 'none' }}>
          <div style={{ fontFamily: T.DISPLAY, fontWeight: 600, fontSize: 18, color: s.c || T.INK }}>{s.v}</div>
          <Eyebrow style={{ marginTop: 4, fontSize: 9 }}>{s.l}</Eyebrow>
        </div>
      ))}
    </div>
  );
}

function Starburst({ price, original }) {
  return (
    <div style={{ position: 'absolute', top: -8, right: -10, zIndex: 3 }}>
      <svg width="60" height="60" viewBox="0 0 60 60">
        <path d="M30 4l3 5 5-3 1 5 6 0-2 5 5 3-4 4 4 4-5 3 2 5-6 0-1 5-5-3-3 5-3-5-5 3-1-5-6 0 2-5-5-3 4-4-4-4 5-3-2-5 6 0 1-5 5 3z" fill="#fff" stroke={T.RED} strokeWidth="1" strokeDasharray="2 2"/>
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: T.SANS, fontWeight: 700, fontSize: 11, color: T.INK, lineHeight: 1 }}>₹{price}/-</div>
        <div style={{ fontFamily: T.SANS, fontWeight: 400, fontSize: 8, color: T.MUTED, textDecoration: 'line-through', marginTop: 1 }}>₹{original}/-</div>
      </div>
    </div>
  );
}

function ShelfRow({ items, onAdd, addedIds }) {
  return (
    <div style={{ position: 'relative', marginBottom: 28 }}>
      {/* food images sitting above shelf */}
      <div style={{ position: 'relative', height: 70, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, padding: '0 16px' }}>
        {items.map((it, i) => (
          <div key={it.id} style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <img src={it.img} alt={it.name} style={{ width: 80, height: 70, objectFit: 'contain', filter: it.sold ? 'grayscale(0.7)' : 'none', opacity: it.sold ? 0.5 : 1 }}/>
            {!it.sold && <Starburst price={it.price} original={it.original}/>}
          </div>
        ))}
      </div>
      {/* shelf ledge */}
      <div style={{ height: 8, background: T.RED, margin: '0 16px', boxShadow: '0 3px 0 rgba(232,23,10,0.2)' }}/>
      {/* product cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, padding: '8px 16px 0' }}>
        {items.map(it => (
          <div key={it.id} style={{ background: T.RED_TINT, border: `1px solid rgba(232,23,10,0.2)`, borderRadius: 10, padding: 12, opacity: it.sold ? 0.6 : 1 }}>
            <Title style={{ fontSize: 14, marginBottom: 4 }}>{it.name}</Title>
            <Body size={11} color={T.MUTED} style={{ marginBottom: 10, minHeight: 32 }}>{it.tagline}</Body>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <div style={{ fontFamily: T.SANS, fontSize: 11, color: T.MUTED, textDecoration: 'line-through' }}>₹{it.original}</div>
                <div style={{ fontFamily: T.SANS, fontWeight: 700, fontSize: 18, color: T.INK }}>₹{it.price}</div>
              </div>
              {it.sold ? (
                <button style={{ background: '#fff', border: `1px solid ${T.HAIR}`, padding: '6px 14px', borderRadius: 6, fontFamily: T.SANS, fontWeight: 600, fontSize: 11, color: T.MUTED, cursor: 'pointer' }}>Notify</button>
              ) : (
                <button onClick={() => onAdd(it)} style={{ background: '#fff', border: `1px solid ${T.RED}`, color: T.RED, padding: '6px 16px', borderRadius: 6, fontFamily: T.SANS, fontWeight: 700, fontSize: 12, cursor: 'pointer', transition: 'all 0.2s' }}>{addedIds[it.id] ? '✓' : 'ADD'}</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StoreDetail({ store, onBack, onAdd, onViewCart, cart }) {
  const [fav, setFav] = React.useState(false);
  const [addedIds, setAdded] = React.useState({});
  const cd = useCountdown({ h: 1, m: 11, s: 4 });
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  const items = [
    [
      { id: 'sd1', name: 'Artisan Sourdough', tagline: 'Whole wheat, long fermented loaf.', price: 60, original: 240, img: FOOD.sourdough, shape: 'sourdough' },
      { id: 'sd2', name: 'Artisan Sourdough', tagline: 'Whole wheat, long fermented loaf.', price: 60, original: 240, img: FOOD.bread, shape: 'sourdough' },
    ],
    [
      { id: 'cr1', name: 'Butter Croissant', tagline: 'Hand-laminated, 27 layers. Best today.', price: 60, original: 150, img: FOOD.croissant, shape: 'croissant' },
      { id: 'gl1', name: 'Berry Galette', tagline: 'Last of the strawberries. Eat tonight.', price: 90, original: 220, img: FOOD.galette, shape: 'galette' },
    ],
    [
      { id: 'mf1', name: 'Blueberry Muffin', tagline: 'Sold out — try again tomorrow.', price: 45, original: 90, img: FOOD.muffin, sold: true, shape: 'muffin' },
      { id: 'pn1', name: 'Pancake Stack', tagline: 'Fluffy stack with fresh berries.', price: 99, original: 260, img: FOOD.pancakes, shape: 'pancake' },
    ],
  ];

  const handleAdd = (item) => {
    onAdd(item, 1);
    setAdded(p => ({ ...p, [item.id]: true }));
    setTimeout(() => setAdded(p => ({ ...p, [item.id]: false })), 1200);
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: T.BG, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <StatusBar light/>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: cartCount > 0 ? 100 : 30 }}>
        <StoreHero store={store} onBack={onBack} fav={fav} setFav={setFav}/>
        <AlarmBar cdStr={cd.str} totalMin={cd.totalMin}/>
        <StatsStrip/>
        <div style={{ paddingTop: 28 }}>
          {items.map((row, i) => <ShelfRow key={i} items={row} onAdd={handleAdd} addedIds={addedIds}/>)}
        </div>
      </div>

      {cartCount > 0 && (
        <div style={{ position: 'absolute', bottom: 18, left: 16, right: 16, zIndex: 30 }}>
          <button onClick={onViewCart} className="cart-bar" style={{ width: '100%', height: 50, border: 0, background: T.RED, color: '#fff', borderRadius: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', boxShadow: '0 8px 24px rgba(232,23,10,0.4)' }}>
            <svg width="18" height="18" viewBox="0 0 18 18"><path d="M3 3h2l1 9h9l2-7H7" stroke="#fff" strokeWidth="1.6" fill="none"/></svg>
            <span style={{ fontFamily: T.SANS, fontWeight: 600, fontSize: 14 }}>GO TO CART ({cartCount})</span>
          </button>
        </div>
      )}
      <HomeIndicator/>
    </div>
  );
}

Object.assign(window, { StoreDetail });
