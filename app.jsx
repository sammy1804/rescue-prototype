// App shell

const { useState } = React;
const STORE = { id: 'bnb', name: 'BREAD & BUTTER CO.', cat: 'SPECIALTY CAFE', dist: '0.4 KM', area: 'Koramangala' };
const USER = { name: 'Aanya Sharma', level: 4, xp: 320, toNext: 80, meals: 12, streak: 3, saved: 960 };

function App() {
  const [screen, setScreen] = useState('splash');
  const [cart, setCart] = useState([]);
  const [confirmedTotal, setConfirmedTotal] = useState(0);
  const [pickup, setPickup] = useState('8:00');
  const [mode, setMode] = useState('pickup');

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const saved = cart.reduce((s, c) => s + (c.original - c.price) * c.qty, 0);

  const addToCart = (item, qty) => {
    setCart(prev => {
      const f = prev.find(p => p.id === item.id);
      if (f) return prev.map(p => p.id === item.id ? { ...p, qty: p.qty + qty } : p);
      return [...prev, { ...item, qty }];
    });
  };
  const setItemQty = (id, qty) => setCart(prev => qty === 0 ? prev.filter(p => p.id !== id) : prev.map(p => p.id === id ? { ...p, qty } : p));
  const goTab = t => setScreen(t === 'home' ? 'home' : t === 'cart' ? (cart.length ? 'cart' : 'home') : t === 'me' ? 'passport' : 'home');

  let view;
  if (screen === 'splash') view = <Splash onDone={() => setScreen('onb-a')}/>;
  else if (screen === 'onb-a') view = <OnboardingA onAllow={() => setScreen('onb-b')}/>;
  else if (screen === 'onb-b') view = <OnboardingB onStart={() => setScreen('home')}/>;
  else if (screen === 'home') view = <Home cartCount={cartCount} onStore={() => setScreen('store')} onTab={goTab}/>;
  else if (screen === 'store') view = <StoreDetail store={STORE} cart={cart} onBack={() => setScreen('home')} onAdd={addToCart} onViewCart={() => setScreen('cart')}/>;
  else if (screen === 'cart') view = <Cart cart={cart} store={STORE} setQty={setItemQty} onConfirm={(t, p, m) => { setConfirmedTotal(t); setPickup(p); setMode(m); setScreen('checkout'); }} onBack={() => setScreen('store')}/>;
  else if (screen === 'checkout') view = <Checkout cart={cart} total={confirmedTotal} pickup={pickup} mode={mode} store={STORE} onPlace={() => setScreen('confirm')} onBack={() => setScreen('cart')}/>;
  else if (screen === 'confirm') view = <Confirmation store={STORE} pickup={pickup} mode={mode} code="BT-4829" total={confirmedTotal} saved={saved} onPassport={() => setScreen('passport')} onDone={() => { setCart([]); setScreen('home'); }}/>;
  else if (screen === 'passport') view = <Passport user={USER} cartCount={cartCount} onBack={() => setScreen('home')} onTab={goTab}/>;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: 20 }}>
      <Phone>
        <div key={screen} className="screen-anim">{view}</div>
      </Phone>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
