// Cart, Checkout, Confirmation — Figma-faithful

function Cart({ cart, store, setQty, onConfirm, onBack }) {
  const [mode, setMode] = React.useState('pickup');
  const [pickup, setPickup] = React.useState('8:00');
  const times = ['7:30', '8:00', '8:30'];
  const [donation, setDonation] = React.useState('skip');
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const fee = 5;
  const delivery = mode === 'delivery' ? 29 : 0;
  const don = donation === 'skip' ? 0 : Number(donation);
  const total = subtotal + fee + delivery + don;
  const saved = cart.reduce((s, c) => s + (c.original - c.price) * c.qty, 0);

  const peopleAlsoAdd = [
    { id: 'gal', name: 'Berry Galette', price: 90, original: 220, img: FOOD.galette },
    { id: 'pnd', name: 'Pound Cake', price: 75, original: 180, img: FOOD.pound },
    { id: 'dnt', name: 'Donut', price: 45, original: 110, img: FOOD.donut },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: T.BG, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <StatusBar/>
      <div style={{ flex: 1, overflowY: 'auto', paddingTop: 50, paddingBottom: 100 }}>
        {/* Header */}
        <div style={{ background: '#fff', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${T.HAIR}` }}>
          <button onClick={onBack} style={{ ...iconBtn2, background: T.HAIR_2 }}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" stroke={T.INK} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div>
            <H2 style={{ fontSize: 22 }}>Your Cart</H2>
            <Eyebrow color={T.MUTED} style={{ marginTop: 4, fontSize: 9 }}>{store.name.toUpperCase()}</Eyebrow>
          </div>
        </div>

        {/* Mode toggle (Pickup / Delivery) */}
        <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 10, padding: 4, display: 'grid', gridTemplateColumns: '1fr 1fr', border: `1px solid ${T.HAIR}` }}>
          {[{ id: 'pickup', l: 'Pickup', s: 'Free · 15 min' }, { id: 'delivery', l: 'Delivery', s: '₹29 · 25 min' }].map(o => {
            const a = mode === o.id;
            return (
              <button key={o.id} onClick={() => setMode(o.id)} style={{ padding: '10px 8px', borderRadius: 8, border: 0, background: a ? T.RED : 'transparent', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ fontFamily: T.SANS, fontWeight: 600, fontSize: 13, color: a ? '#fff' : T.INK }}>{o.l}</div>
                <div style={{ fontFamily: T.SANS, fontWeight: 400, fontSize: 10, color: a ? 'rgba(255,255,255,0.85)' : T.MUTED, marginTop: 2 }}>{o.s}</div>
              </button>
            );
          })}
        </div>

        {/* Pickup info card */}
        <div style={{ margin: '12px 16px', background: T.GREEN_TINT, borderRadius: 10, padding: 12, border: `1px solid rgba(11,166,62,0.2)` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" stroke={T.GREEN} strokeWidth="1.5" fill="none"/><path d="M8 5v3l2 1" stroke={T.GREEN} strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
            <Body size={13} color={T.INK}>{mode === 'pickup' ? 'Pickup in 45-55 mins' : 'Delivery in 25-35 mins'}</Body>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <svg width="14" height="16" viewBox="0 0 14 16"><path d="M7 1c-3 0-5 2-5 5 0 4 5 9 5 9s5-5 5-9c0-3-2-5-5-5z" stroke={T.GREEN} strokeWidth="1.4" fill="none"/></svg>
            <Body size={13} color={T.INK}>{mode === 'pickup' ? 'Pickup from Koramangala' : 'Deliver to Home · 1.4 km'}</Body>
          </div>
          <button style={{ background: 'transparent', border: 0, color: T.RED, fontFamily: T.SANS, fontWeight: 600, fontSize: 12, cursor: 'pointer', padding: 0 }}>
            {mode === 'pickup' ? 'Add instructions for pickup partner' : 'Add delivery instructions'}
          </button>
        </div>

        {/* Saved banner */}
        <div style={{ margin: '0 16px 12px', background: T.RED, borderRadius: 8, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: T.SANS, fontWeight: 600, fontSize: 13, color: '#fff' }}>You saved ₹{saved}</span>
          <span style={{ fontFamily: T.SANS, fontWeight: 500, fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>on this order ✓</span>
        </div>

        {/* Coupon */}
        <button style={{ margin: '0 16px 12px', width: 'calc(100% - 32px)', background: '#fff', border: `1px solid ${T.HAIR}`, borderRadius: 10, padding: '14px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 20 20"><path d="M2 8L8 2h10v10L12 18 2 8z" stroke={T.RED} strokeWidth="1.5" fill="none" strokeLinejoin="round"/><circle cx="13" cy="7" r="1.5" fill={T.RED}/></svg>
          <Title style={{ flex: 1, textAlign: 'left' }}>Apply Coupon</Title>
          <span style={{ color: T.MUTED, fontSize: 18 }}>›</span>
        </button>

        {/* Items */}
        <div style={{ margin: '0 16px 12px', background: '#fff', borderRadius: 10, border: `1px solid ${T.HAIR}` }}>
          {cart.map((item, i) => (
            <div key={item.id} style={{ padding: 14, borderBottom: i < cart.length - 1 ? `1px solid ${T.HAIR}` : 0, display: 'flex', gap: 12 }}>
              <img src={item.img} style={{ width: 70, height: 70, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Title style={{ textTransform: 'uppercase', letterSpacing: 0.3 }}>{item.name}</Title>
                  <button onClick={() => setQty(item.id, 0)} style={{ background: 'transparent', border: 0, cursor: 'pointer', padding: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16"><path d="M5 3v1H2v1h1l1 9h8l1-9h1V4h-3V3z" fill={T.MUTED}/></svg>
                  </button>
                </div>
                <Body size={11} color={T.MUTED} style={{ marginTop: 4 }}>{item.tagline || 'Hand-laminated, 27 layers. Best today.'}</Body>
                <Body size={10} color={T.MUTED} style={{ marginTop: 4 }}>Lot #{item.lot || (item.id.toUpperCase())}</Body>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'baseline' }}>
                    <span style={{ fontFamily: T.SANS, fontWeight: 700, fontSize: 16, color: T.INK }}>₹{item.price}</span>
                    <span style={{ fontFamily: T.SANS, fontSize: 12, color: T.MUTED, textDecoration: 'line-through' }}>₹{item.original}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', background: T.HAIR_2, borderRadius: 100, padding: 2 }}>
                    <button onClick={() => setQty(item.id, Math.max(0, item.qty - 1))} style={qBtn}>−</button>
                    <div style={{ width: 26, textAlign: 'center', fontFamily: T.SANS, fontWeight: 600, fontSize: 13 }}>{item.qty}</div>
                    <button onClick={() => setQty(item.id, item.qty + 1)} style={qBtn}>+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div style={{ padding: 14, borderTop: `1px dashed ${T.HAIR}` }}>
            <input placeholder="Add a note for the restaurant..." style={{ width: '100%', border: 0, outline: 0, background: 'transparent', fontFamily: T.SANS, fontSize: 12, color: T.INK }}/>
          </div>
        </div>

        {/* People also added */}
        <div style={{ padding: '0 16px 12px' }}>
          <Title style={{ marginBottom: 10 }}>People also added</Title>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto' }} className="no-scroll">
            {peopleAlsoAdd.map(it => (
              <div key={it.id} style={{ flexShrink: 0, width: 100, background: '#fff', border: `1px solid ${T.HAIR}`, borderRadius: 10, padding: 8 }}>
                <img src={it.img} style={{ width: '100%', height: 60, borderRadius: 6, objectFit: 'cover' }}/>
                <Body size={11} color={T.INK} style={{ marginTop: 6, fontWeight: 600 }}>{it.name}</Body>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                  <span style={{ fontFamily: T.SANS, fontWeight: 700, fontSize: 12, color: T.INK }}>₹{it.price}</span>
                  <button style={{ background: 'transparent', border: `1px solid ${T.RED}`, color: T.RED, padding: '2px 8px', borderRadius: 4, fontFamily: T.SANS, fontWeight: 600, fontSize: 9, cursor: 'pointer' }}>ADD</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bill Details */}
        <div style={{ margin: '0 16px 12px', background: '#fff', borderRadius: 10, border: `1px solid ${T.HAIR}`, padding: 14 }}>
          <Title style={{ marginBottom: 10 }}>Bill Details</Title>
          {[['Items', `₹${subtotal}`], ['Service Fee', `₹${fee}`], ...(mode === 'delivery' ? [['Delivery (1.4 km)', `₹${delivery}`]] : []), ...(don > 0 ? [['Donation', `₹${don}`]] : [])].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
              <Body size={12} color={T.MUTED}>{l}</Body>
              <Body size={12} color={T.INK}>{v}</Body>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${T.HAIR}`, marginTop: 10, paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Title>Total</Title>
            <span style={{ fontFamily: T.SANS, fontWeight: 700, fontSize: 18, color: T.INK }}>₹{total}</span>
          </div>
        </div>

        {/* Donation — moved AFTER bill per audit (closer to confirmation) */}
        <div style={{ margin: '0 16px 12px', background: 'linear-gradient(135deg, #FFE4E2 0%, #FFF0EF 100%)', borderRadius: 10, padding: 14 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: T.RED, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 18 18"><path d="M9 15s-6-3.5-6-8a3.5 3.5 0 016-2.5A3.5 3.5 0 0115 7c0 4.5-6 8-6 8z" fill="#fff"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <Title>Support a cause</Title>
              <Body size={11} color={T.MUTED} style={{ marginTop: 2 }}>Help feed those in need</Body>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['5', '10', '15', 'skip'].map(v => {
              const a = donation === v;
              return (
                <button key={v} onClick={() => setDonation(v)} style={{ flex: 1, padding: '8px 0', border: a ? 'none' : `1px solid ${T.HAIR}`, background: a ? (v === 'skip' ? T.HAIR : T.RED) : '#fff', color: a ? (v === 'skip' ? T.INK : '#fff') : T.INK, borderRadius: 100, fontFamily: T.SANS, fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>
                  {v === 'skip' ? 'Skip' : `₹${v}`}
                </button>
              );
            })}
          </div>
        </div>

        <button style={{ margin: '0 16px 18px', width: 'calc(100% - 32px)', background: '#fff', border: `1px solid ${T.HAIR}`, borderRadius: 10, padding: 14, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <Title style={{ flex: 1, textAlign: 'left' }}>Cancellation Policy</Title>
          <span style={{ color: T.MUTED, fontSize: 18 }}>›</span>
        </button>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 14, background: 'linear-gradient(180deg, transparent, #F5F5F5 30%)' }}>
        <button onClick={() => onConfirm(total, pickup, mode)} style={{ width: '100%', height: 52, border: 0, background: T.RED, color: '#fff', borderRadius: 100, fontFamily: T.SANS, fontWeight: 600, fontSize: 15, cursor: 'pointer', boxShadow: '0 4px 14px rgba(232,23,10,0.3)' }}>
          Rescue This Food &nbsp;·&nbsp; ₹{total}
        </button>
      </div>
      <HomeIndicator/>
    </div>
  );
}
const iconBtn2 = { width: 36, height: 36, borderRadius: 18, border: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const qBtn = { width: 28, height: 28, borderRadius: '50%', border: 0, background: '#fff', color: T.INK, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.SANS };

// ─── Checkout (Figma-faithful with proper payment icons) ─────────────
function Checkout({ cart, total, pickup, mode, store, onPlace, onBack }) {
  const [pickT, setPickT] = React.useState(pickup || '8:00');
  const times = ['7:30', '8:00', '8:30'];
  const [pay, setPay] = React.useState('upi');
  const [loading, setLoading] = React.useState(false);
  const isDelivery = mode === 'delivery';
  const fee = 5;
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);

  const place = () => { setLoading(true); setTimeout(onPlace, 800); };

  const PayIcon = ({ kind }) => {
    if (kind === 'upi') return <svg width="22" height="22" viewBox="0 0 22 22"><rect x="3" y="6" width="16" height="11" rx="2" stroke={T.INK} strokeWidth="1.5" fill="none"/><path d="M7 6V4M15 6V4" stroke={T.INK} strokeWidth="1.5" strokeLinecap="round"/><circle cx="15" cy="11.5" r="1.5" fill={T.RED}/></svg>;
    if (kind === 'card') return <svg width="22" height="22" viewBox="0 0 22 22"><rect x="2" y="6" width="18" height="12" rx="2" stroke={T.INK} strokeWidth="1.5" fill="none"/><path d="M2 10h18" stroke={T.INK} strokeWidth="1.5"/></svg>;
    if (kind === 'phone') return <svg width="22" height="22" viewBox="0 0 22 22"><rect x="6" y="2" width="10" height="18" rx="2" stroke={T.INK} strokeWidth="1.5" fill="none"/><circle cx="11" cy="17" r="1" fill={T.INK}/></svg>;
    if (kind === 'paytm') return <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="9" stroke={T.INK} strokeWidth="1.5" fill="none"/><path d="M7 8h8M7 11h8M7 14h5" stroke={T.INK} strokeWidth="1.5" strokeLinecap="round"/></svg>;
    return <svg width="22" height="22" viewBox="0 0 22 22"><rect x="3" y="4" width="16" height="14" rx="1.5" stroke={T.INK} strokeWidth="1.5" fill="none"/><path d="M3 8h16M7 13h2M7 15h6" stroke={T.INK} strokeWidth="1.5"/></svg>;
  };

  const methods = [
    { id: 'upi', name: 'UPI', desc: 'Google Pay, PhonePe, Paytm', icon: 'upi' },
    { id: 'phone', name: 'PhonePe', desc: 'Pay via PhonePe', icon: 'phone' },
    { id: 'gpay', name: 'Google Pay', desc: 'Pay via GPay', icon: 'phone' },
    { id: 'paytm', name: 'Paytm', desc: 'Pay via Paytm', icon: 'paytm' },
    { id: 'card', name: 'Card', desc: 'Credit or Debit Card', icon: 'card' },
    { id: 'net', name: 'Net Banking', desc: 'Pay via your bank', icon: 'bank' },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: T.BG, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <StatusBar/>
      <div style={{ flex: 1, overflowY: 'auto', paddingTop: 50, paddingBottom: 100 }}>
        <div style={{ background: '#fff', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${T.HAIR}` }}>
          <button onClick={onBack} style={{ ...iconBtn2, background: T.HAIR_2 }}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" stroke={T.INK} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <H2 style={{ fontSize: 22 }}>Checkout</H2>
        </div>

        <div style={{ padding: '14px 16px' }}>
          <Eyebrow style={{ marginBottom: 8 }}>{isDelivery ? 'DELIVERY TIME' : 'PICKUP TIME'}</Eyebrow>
          <div style={{ background: '#fff', borderRadius: 10, padding: 14, border: `1px solid ${T.HAIR}` }}>
            <Title style={{ marginBottom: 4 }}>{store.name}</Title>
            <Body size={12} color={T.MUTED} style={{ marginBottom: 12 }}>Koramangala · 0.4 KM</Body>
            <div style={{ display: 'flex', gap: 8 }}>
              {times.map(t => {
                const a = pickT === t;
                return <button key={t} onClick={() => setPickT(t)} style={{ flex: 1, padding: '10px 0', border: a ? 0 : `1px solid ${T.HAIR}`, background: a ? T.RED : '#fff', color: a ? '#fff' : T.INK, borderRadius: 100, fontFamily: T.SANS, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>{t} PM</button>;
              })}
            </div>
          </div>
        </div>

        <div style={{ padding: '0 16px 14px' }}>
          <Eyebrow style={{ marginBottom: 8 }}>PAYMENT METHOD</Eyebrow>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {methods.map(m => {
              const a = pay === m.id;
              return (
                <button key={m.id} onClick={() => setPay(m.id)} style={{ width: '100%', background: '#fff', border: a ? `1.5px solid ${T.RED}` : `1px solid ${T.HAIR}`, borderRadius: 10, padding: 14, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: T.HAIR_2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <PayIcon kind={m.icon}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Title>{m.name}</Title>
                    <Body size={11} color={T.MUTED} style={{ marginTop: 2 }}>{m.desc}</Body>
                  </div>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: a ? T.RED : 'transparent', border: a ? 0 : `1.5px solid ${T.HAIR}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {a && <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l3 3 5-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ padding: '0 16px 14px' }}>
          <div style={{ background: '#fff', borderRadius: 10, padding: 14, border: `1px solid ${T.HAIR}` }}>
            <Title style={{ marginBottom: 12 }}>Order Summary</Title>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}><Body size={12} color={T.MUTED}>Items ({cart.length})</Body><Body size={12} color={T.INK}>₹{subtotal}</Body></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}><Body size={12} color={T.MUTED}>Service Fee</Body><Body size={12} color={T.INK}>₹{fee}</Body></div>
            <div style={{ borderTop: `1px solid ${T.HAIR}`, marginTop: 8, paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <Title>Total</Title>
              <span style={{ fontFamily: T.SANS, fontWeight: 700, fontSize: 20, color: T.INK }}>₹{total}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 14, background: 'linear-gradient(180deg, transparent, #F5F5F5 30%)' }}>
        <button onClick={place} disabled={loading} className={loading ? 'pulse-btn' : ''} style={{ width: '100%', height: 52, border: 0, background: T.RED, color: '#fff', borderRadius: 100, fontFamily: T.SANS, fontWeight: 600, fontSize: 15, cursor: 'pointer', boxShadow: '0 4px 14px rgba(232,23,10,0.3)' }}>
          {loading ? 'Rescuing…' : `Place Order  ·  ₹${total}`}
        </button>
      </div>
      <HomeIndicator/>
    </div>
  );
}

function Confirmation({ store, pickup, mode, code, total, saved, onPassport, onDone }) {
  const isDelivery = mode === 'delivery';
  return (
    <div style={{ position: 'absolute', inset: 0, background: T.BG, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <StatusBar/>
      <div style={{ flex: 1, overflowY: 'auto', paddingTop: 60, paddingBottom: 100 }}>
        <div style={{ textAlign: 'center', padding: '0 24px 16px' }}>
          <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 16px' }}>
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="36" fill={T.GREEN} className="check-bg"/>
              <path d="M24 40l12 12 22-22" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="60" strokeDashoffset="60" className="check-mark"/>
            </svg>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="confetti" style={{ position: 'absolute', top: '50%', left: '50%', width: 6, height: 6, background: [T.RED, T.AMBER, T.GREEN, T.GOLD][i % 4], ['--tx']: `${Math.cos(i / 8 * Math.PI * 2) * 70}px`, ['--ty']: `${Math.sin(i / 8 * Math.PI * 2) * 70}px`, animationDelay: `${0.3 + i * 0.04}s` }}/>
            ))}
          </div>
          <H1 className="fade-up delay1" style={{ marginBottom: 8 }}>Order Rescued!</H1>
          <Body size={14} color={T.MUTED} className="fade-up delay2">Your rescue order has been confirmed</Body>
          <div className="fade-up delay2" style={{ display: 'inline-block', background: T.HAIR_2, padding: '6px 14px', borderRadius: 100, marginTop: 12 }}>
            <Eyebrow color={T.MUTED}>ORDER #{code.replace('BT-', '8165')}48</Eyebrow>
          </div>
        </div>

        {/* Map mock */}
        <div className="slide-up delay3" style={{ margin: '12px 16px', background: '#fff', borderRadius: 12, overflow: 'hidden', border: `1px solid ${T.HAIR}` }}>
          <div style={{ position: 'relative', height: 160, background: 'linear-gradient(135deg, #E8F0F5 0%, #F0E5E5 100%)' }}>
            {/* grid lines */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)`, backgroundSize: '20px 20px' }}/>
            {/* you */}
            <div style={{ position: 'absolute', left: 50, top: 90 }}>
              <div className="ping" style={{ position: 'absolute', inset: 0, width: 20, height: 20, borderRadius: '50%', background: '#3B82F6', opacity: 0.3 }}/>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#3B82F6', border: '3px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}/>
              <div style={{ position: 'absolute', top: 26, left: -10, background: '#fff', borderRadius: 100, padding: '2px 10px', fontFamily: T.SANS, fontWeight: 600, fontSize: 10, color: T.INK, boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>YOU</div>
            </div>
            {/* dashed line */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}><line x1="60" y1="100" x2="220" y2="50" stroke={T.RED} strokeWidth="2" strokeDasharray="4 4" opacity="0.5"/></svg>
            {/* distance pill */}
            <div style={{ position: 'absolute', top: 12, left: 12, background: '#fff', borderRadius: 8, padding: '6px 10px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
              <div style={{ fontFamily: T.SANS, fontWeight: 700, fontSize: 13, color: T.INK }}>0.4 KM</div>
              <div style={{ fontFamily: T.SANS, fontSize: 9, color: T.MUTED, letterSpacing: 1 }}>AWAY</div>
            </div>
            {/* store */}
            <div style={{ position: 'absolute', right: 30, top: 30 }}>
              <div style={{ background: T.RED, borderRadius: 8, padding: '4px 10px', color: '#fff', boxShadow: '0 4px 10px rgba(232,23,10,0.3)' }}>
                <div style={{ fontFamily: T.SANS, fontWeight: 700, fontSize: 13 }}>6 min</div>
                <div style={{ fontFamily: T.SANS, fontSize: 9, letterSpacing: 1 }}>WALK</div>
              </div>
              <div style={{ marginTop: 4, background: '#fff', borderRadius: 100, padding: '2px 10px', fontFamily: T.SANS, fontWeight: 600, fontSize: 10, color: T.INK, boxShadow: '0 2px 6px rgba(0,0,0,0.1)', textAlign: 'center' }}>BREAD</div>
            </div>
          </div>
          <div style={{ padding: 14 }}>
            <H3 style={{ fontFamily: T.SANS, fontWeight: 700, textTransform: 'uppercase' }}>BREAD & BUTTER CO.</H3>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1c-3 0-5 2-5 5 0 4 5 8 5 8s5-4 5-8c0-3-2-5-5-5z" stroke={T.MUTED} strokeWidth="1.4" fill="none"/></svg>
                <Body size={12} color={T.INK_3}>Koramangala — 0.4 KM from your location</Body>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.5" stroke={T.MUTED} strokeWidth="1.4" fill="none"/><path d="M7 4v3l2 1" stroke={T.MUTED} strokeWidth="1.4" fill="none" strokeLinecap="round"/></svg>
                <Body size={12} color={T.INK_3}>{isDelivery ? `Delivery by ${pickup} PM` : `Pickup by ${pickup} PM`}</Body>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 3l2-1 2 3-1 1c1 2 2 3 4 4l1-1 3 2-1 2c-5 1-12-6-10-10z" stroke={T.MUTED} strokeWidth="1.4" fill="none"/></svg>
                <Body size={12} color={T.INK_3}>+91 98765 43210</Body>
              </div>
            </div>
            <button style={{ width: '100%', background: T.RED, color: '#fff', border: 0, padding: '12px 16px', borderRadius: 100, fontFamily: T.SANS, fontWeight: 600, fontSize: 13, cursor: 'pointer', marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7l10-5-3 12-2-5z" fill="#fff"/></svg>
              Get Directions
            </button>
          </div>
        </div>

        {/* Order details */}
        <div className="fade-up delay4" style={{ margin: '12px 16px', background: '#fff', borderRadius: 12, padding: 14, border: `1px solid ${T.HAIR}` }}>
          <Title style={{ marginBottom: 12 }}>Order Details</Title>
          {[
            ['Order Number', `#${code.replace('BT-', '8165')}48`],
            ['Pickup Time', `${pickup} PM`],
            ['Total Paid', `₹${total}`],
            ['Payment Status', <span style={{ color: T.GREEN, fontWeight: 600 }}>Completed</span>],
          ].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${T.HAIR_2}` }}>
              <Body size={12} color={T.MUTED}>{l}</Body>
              <Body size={12} color={T.INK} style={{ fontWeight: 600 }}>{v}</Body>
            </div>
          ))}
        </div>

        {/* What's Next */}
        <div className="fade-up delay5" style={{ margin: '12px 16px', background: T.RED_TINT, borderRadius: 12, padding: 14 }}>
          <Title style={{ marginBottom: 10 }}>What's Next?</Title>
          {[
            `Head to the restaurant by ${pickup} PM`,
            'Show order #816548 at the counter',
            'Collect your rescue bag and enjoy!',
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '4px 0' }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: T.RED, color: '#fff', fontFamily: T.SANS, fontWeight: 700, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
              <Body size={12} color={T.INK}>{s}</Body>
            </div>
          ))}
        </div>

        {/* Scratch card teaser */}
        <div className="fade-up delay5" onClick={onPassport} style={{ margin: '12px 16px', background: `linear-gradient(135deg, ${T.GOLD} 0%, #B68A3A 100%)`, borderRadius: 12, padding: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 28 }}>🎰</div>
          <div style={{ flex: 1 }}>
            <Title color="#1A0A09">You earned a scratch card!</Title>
            <Body size={11} color="rgba(0,0,0,0.7)" style={{ marginTop: 2 }}>+50 XP · 3-day rescue streak</Body>
          </div>
          <span style={{ fontFamily: T.SANS, fontWeight: 700, fontSize: 11, color: '#1A0A09' }}>VIEW →</span>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 14, background: 'linear-gradient(180deg, transparent, #F5F5F5 30%)' }}>
        <button onClick={onDone} style={{ width: '100%', height: 52, border: 0, background: T.RED, color: '#fff', borderRadius: 100, fontFamily: T.SANS, fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Back to Home</button>
      </div>
      <HomeIndicator/>
    </div>
  );
}

function Passport({ user, onBack, onTab, cartCount }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: T.BG, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <StatusBar/>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ background: '#fff', padding: '60px 20px 24px', borderBottom: `1px solid ${T.HAIR}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={FOOD.user} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }}/>
            <div>
              <H2>{user.name}</H2>
              <Body size={12} color={T.MUTED} style={{ marginTop: 2 }}>Member since Apr 2026 · Bengaluru</Body>
            </div>
          </div>
        </div>
        <div style={{ padding: 16 }}>
          <div style={{ background: T.RED, borderRadius: 14, padding: 16, color: '#fff', marginBottom: 14 }}>
            <Eyebrow color="rgba(255,255,255,0.7)">LEVEL {user.level}</Eyebrow>
            <H2 color="#fff" style={{ marginTop: 6 }}>Rescue Hero</H2>
            <Body size={12} color="rgba(255,255,255,0.85)" style={{ marginTop: 4 }}>{user.xp} XP · {user.toNext} to next level</Body>
            <div style={{ marginTop: 12, height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden' }}>
              <div className="xp-fill" style={{ height: '100%', background: '#fff', width: `${user.xp / (user.xp + user.toNext) * 100}%`, borderRadius: 3 }}/>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[{ v: user.meals, l: 'MEALS' }, { v: `${user.streak}d`, l: 'STREAK' }, { v: `₹${user.saved}`, l: 'SAVED' }].map((s, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 10, padding: 14, textAlign: 'center', border: `1px solid ${T.HAIR}` }}>
                <H2>{s.v}</H2>
                <Eyebrow style={{ marginTop: 6 }}>{s.l}</Eyebrow>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav active="me" onTab={onTab} cartCount={cartCount}/>
      <HomeIndicator/>
    </div>
  );
}

Object.assign(window, { Cart, Checkout, Confirmation, Passport });
