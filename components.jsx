// Rescue / Shelfed — store detail components
// Editorial market-signage aesthetic: red/black/white, Georgia + system sans

const RED = '#E8170A';
const RED_DEEP = '#A80B05';
const RED_TINT = 'rgba(232,23,10,0.12)';
const BG = '#111111';
const CARD = '#171717';
const STRIP = '#1A1A1A';
const HAIRLINE = 'rgba(255,255,255,0.08)';
const MUTED = 'rgba(255,255,255,0.55)';
const DIM = 'rgba(255,255,255,0.35)';

const SERIF = 'Georgia, "Times New Roman", serif';
const SANS = '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif';

// ─────────────────────────────────────────────────────────────
// HERO — solid red banner
// ─────────────────────────────────────────────────────────────
function Hero({ onBack, fav, setFav }) {
  return (
    <div style={{
      position: 'relative', height: 156, background: RED,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      padding: '0 18px 14px', overflow: 'hidden',
    }}>
      {/* paper-grain overlay for editorial feel */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.18, pointerEvents: 'none',
        backgroundImage: `repeating-linear-gradient(0deg, rgba(0,0,0,0.04) 0 1px, transparent 1px 3px),
                         radial-gradient(circle at 20% 30%, rgba(0,0,0,0.18), transparent 60%)`,
      }} />
      {/* tiny corner registration mark */}
      <div style={{
        position: 'absolute', top: 56, right: 14,
        fontFamily: SANS, fontSize: 8, color: 'rgba(255,255,255,0.5)',
        letterSpacing: 1.5, fontWeight: 600,
      }}>№ 042</div>

      {/* back + heart pills */}
      <div style={{
        position: 'absolute', top: 52, left: 12, right: 12,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 2,
      }}>
        <button onClick={onBack} style={{
          width: 34, height: 34, borderRadius: '50%', border: 0,
          background: 'rgba(0,0,0,0.35)', color: '#fff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(6px)',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button onClick={() => setFav(!fav)} style={{
          width: 34, height: 34, borderRadius: '50%', border: 0,
          background: 'rgba(0,0,0,0.35)', color: '#fff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(6px)',
        }}>
          <svg width="15" height="14" viewBox="0 0 15 14">
            <path d="M7.5 12.5S1.5 8.8 1.5 5a3 3 0 015.5-1.7A3 3 0 0112.5 5c0 3.8-5 7.5-5 7.5z"
              fill={fav ? '#fff' : 'none'} stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div style={{
        fontFamily: SANS, fontSize: 9, fontWeight: 700, letterSpacing: 1.4,
        color: '#fff', textTransform: 'uppercase', marginBottom: 6, opacity: 0.92,
        paddingLeft: 50,
      }}>
        SPECIALTY CAFE · 0.4 KM · OPEN
      </div>
      <div style={{
        fontFamily: SERIF, fontWeight: 700, fontSize: 30, lineHeight: 0.95,
        color: '#fff', textTransform: 'uppercase', letterSpacing: -0.5,
      }}>
        BREAD &<br/>BUTTER CO.
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ALARM BAR — blinking dot + countdown
// ─────────────────────────────────────────────────────────────
function AlarmBar({ countdown }) {
  return (
    <div style={{
      background: BG, borderTop: `1px solid ${HAIRLINE}`,
      borderBottom: `1px solid ${HAIRLINE}`,
      padding: '9px 14px', display: 'flex', alignItems: 'center',
      gap: 10,
    }}>
      <span className="blink-dot" style={{
        width: 6, height: 6, borderRadius: '50%', background: RED,
        flexShrink: 0, boxShadow: `0 0 6px ${RED}`,
      }} />
      <div style={{
        flex: 1, fontFamily: SANS, fontSize: 11, color: '#fff',
        letterSpacing: 0.1, lineHeight: 1.25,
      }}>
        Shelf closes tonight. <span style={{ color: MUTED }}>Whatever's left bins at 9 PM.</span>
      </div>
      <div style={{
        fontFamily: SERIF, fontWeight: 700, fontSize: 15, color: RED,
        letterSpacing: 0.5, fontVariantNumeric: 'tabular-nums',
      }}>{countdown}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STATS STRIP — 4 columns
// ─────────────────────────────────────────────────────────────
function StatsStrip({ itemsLeft }) {
  const stats = [
    { v: itemsLeft, vc: RED, label: 'ITEMS LEFT' },
    { v: '↓60%', vc: '#fff', label: 'ALREADY DROPPED' },
    { v: '4.8★', vc: '#fff', label: 'RATING' },
    { v: '~15m', vc: '#fff', label: 'PICKUP' },
  ];
  return (
    <div style={{
      background: STRIP, display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)', padding: '14px 0',
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          padding: '0 8px', textAlign: 'center', position: 'relative',
          borderRight: i < 3 ? `1px solid ${HAIRLINE}` : 'none',
        }}>
          <div style={{
            fontFamily: SERIF, fontWeight: 700, fontSize: 18,
            color: s.vc, letterSpacing: -0.2, marginBottom: 4,
          }}>{s.v}</div>
          <div style={{
            fontFamily: SANS, fontSize: 8, color: MUTED,
            letterSpacing: 1.1, fontWeight: 600, textTransform: 'uppercase',
          }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SHELF — skeuomorphic red shelf with items
// ─────────────────────────────────────────────────────────────
function Starburst({ price, original }) {
  return (
    <div style={{
      position: 'absolute', top: -10, right: -8,
      width: 50, height: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transform: 'rotate(-8deg)', zIndex: 3,
    }}>
      {/* starburst svg */}
      <svg width="50" height="50" viewBox="0 0 50 50" style={{ position: 'absolute', inset: 0 }}>
        <polygon points="25,1 28,8 35,4 35,12 43,12 39,18 47,22 40,26 47,32 39,35 43,42 35,42 35,49 28,45 25,52 22,45 15,49 15,42 7,42 11,35 3,32 10,26 3,22 11,18 7,12 15,12 15,4 22,8"
          fill={RED} stroke="#fff" strokeWidth="1"/>
      </svg>
      <div style={{
        position: 'relative', textAlign: 'center', lineHeight: 1,
        fontFamily: SERIF, color: '#fff',
      }}>
        <div style={{
          fontSize: 6.5, fontWeight: 600, letterSpacing: 0.5,
          textTransform: 'uppercase', opacity: 0.9, fontFamily: SANS,
        }}>ONLY</div>
        <div style={{ fontSize: 14, fontWeight: 700, marginTop: 1 }}>₹{price}</div>
        <div style={{ fontSize: 7, textDecoration: 'line-through', opacity: 0.7, marginTop: 1 }}>₹{original}</div>
      </div>
    </div>
  );
}

function ShelfItem({ item, onTap, selected }) {
  const sold = item.sold;
  return (
    <button onClick={() => !sold && onTap(item)} style={{
      flex: 1, background: 'transparent', border: 0, padding: 0,
      cursor: sold ? 'default' : 'pointer', position: 'relative',
      height: '100%', display: 'flex', alignItems: 'flex-end',
      justifyContent: 'center',
      opacity: sold ? 0.32 : 1,
      filter: sold ? 'grayscale(0.6)' : 'none',
      outline: selected ? `2px solid ${RED}` : 'none',
      outlineOffset: -2,
      transition: 'transform 0.2s',
      transform: selected ? 'translateY(-2px)' : 'none',
    }}>
      {/* item visual — placeholder shape unique per item */}
      <ItemShape kind={item.shape} sold={sold} />
      {!sold && <Starburst price={item.price} original={item.original} />}
      {sold && (
        <div style={{
          position: 'absolute', top: '40%', left: '50%',
          transform: 'translate(-50%, -50%) rotate(-6deg)',
          fontFamily: SERIF, fontSize: 10, fontWeight: 700,
          color: '#fff', background: '#000', padding: '3px 6px',
          letterSpacing: 1, textTransform: 'uppercase',
          border: '1px solid #fff',
        }}>SOLD OUT</div>
      )}
    </button>
  );
}

function ItemShape({ kind, sold }) {
  // each item is a stylized monochrome silhouette in cream/butter tones
  const cream = sold ? '#555' : '#E8D8B5';
  const dark = sold ? '#333' : '#8B5A2B';
  const med = sold ? '#444' : '#C9A76A';
  if (kind === 'croissant') {
    return (
      <svg width="62" height="46" viewBox="0 0 62 46" style={{ marginBottom: 6 }}>
        <path d="M6 32 Q12 18 22 16 Q32 14 42 16 Q52 18 56 30 Q56 36 50 36 Q44 30 36 30 Q28 30 22 32 Q16 34 12 36 Q6 36 6 32Z"
          fill={cream} stroke={dark} strokeWidth="1.2"/>
        <path d="M16 28 Q22 24 28 24 M30 24 Q36 24 42 26" stroke={dark} strokeWidth="0.8" fill="none"/>
        <path d="M14 32 L18 30 M22 30 L26 28 M32 28 L36 28 M40 28 L44 30" stroke={med} strokeWidth="0.7"/>
      </svg>
    );
  }
  if (kind === 'loaf') {
    return (
      <svg width="58" height="50" viewBox="0 0 58 50" style={{ marginBottom: 6 }}>
        <ellipse cx="29" cy="32" rx="24" ry="14" fill={cream} stroke={dark} strokeWidth="1.2"/>
        <ellipse cx="29" cy="28" rx="22" ry="11" fill={cream} stroke={dark} strokeWidth="1"/>
        <path d="M14 26 Q20 22 29 22 Q38 22 44 26" stroke={dark} strokeWidth="0.8" fill="none"/>
        <path d="M18 22 L20 16 M26 20 L27 14 M34 20 L35 14 M40 22 L42 16" stroke={dark} strokeWidth="1" strokeLinecap="round"/>
      </svg>
    );
  }
  if (kind === 'tart') {
    return (
      <svg width="54" height="44" viewBox="0 0 54 44" style={{ marginBottom: 8 }}>
        <ellipse cx="27" cy="32" rx="22" ry="8" fill={dark}/>
        <ellipse cx="27" cy="28" rx="22" ry="8" fill={cream} stroke={dark} strokeWidth="1.2"/>
        <ellipse cx="27" cy="26" rx="17" ry="5" fill={med}/>
        <circle cx="20" cy="25" r="2" fill={RED}/>
        <circle cx="27" cy="24" r="2" fill={RED}/>
        <circle cx="34" cy="25" r="2" fill={RED}/>
        <circle cx="24" cy="27" r="1.5" fill={RED}/>
        <circle cx="31" cy="27" r="1.5" fill={RED}/>
      </svg>
    );
  }
  // muffin
  return (
    <svg width="50" height="48" viewBox="0 0 50 48" style={{ marginBottom: 6 }}>
      <path d="M8 22 Q8 4 25 4 Q42 4 42 22 Q42 24 40 24 L10 24 Q8 24 8 22Z" fill={cream} stroke={dark} strokeWidth="1.2"/>
      <circle cx="18" cy="14" r="1.5" fill={dark}/>
      <circle cx="28" cy="10" r="1.5" fill={dark}/>
      <circle cx="34" cy="16" r="1.5" fill={dark}/>
      <circle cx="22" cy="20" r="1.5" fill={dark}/>
      <path d="M8 24 L10 44 L40 44 L42 24Z" fill={sold ? '#444' : '#9B6B3D'} stroke={dark} strokeWidth="1.2"/>
      <path d="M14 24 L13 44 M20 24 L20 44 M26 24 L26 44 M32 24 L33 44 M38 24 L38 44" stroke={dark} strokeWidth="0.5" opacity="0.5"/>
    </svg>
  );
}

function Shelf({ items, onTap, selectedId }) {
  return (
    <div style={{ padding: '20px 14px 8px' }}>
      <div style={{
        fontFamily: SANS, fontSize: 9, fontWeight: 700, letterSpacing: 1.6,
        color: '#fff', textTransform: 'uppercase', marginBottom: 12,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        BAKED TODAY — GOING FAST
        <div style={{ flex: 1, height: 1, background: HAIRLINE }} />
        <span style={{ color: MUTED, fontWeight: 500 }}>4 LEFT</span>
      </div>

      {/* shelf body */}
      <div style={{ position: 'relative' }}>
        {/* shelf surface (where items sit) */}
        <div style={{
          position: 'relative', height: 110,
          background: `linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 18%, transparent 100%)`,
          paddingTop: 4,
        }}>
          <div style={{
            display: 'flex', height: '100%', gap: 0,
            paddingBottom: 0,
          }}>
            {items.map(it => (
              <ShelfItem key={it.id} item={it} onTap={onTap} selected={selectedId === it.id} />
            ))}
          </div>
        </div>

        {/* shelf board — skeuomorphic red plank */}
        <div style={{
          height: 14, position: 'relative',
          background: `linear-gradient(180deg, ${RED} 0%, ${RED_DEEP} 100%)`,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 0 #6E0703, 0 8px 14px rgba(0,0,0,0.5)`,
        }}>
          {/* nails */}
          {[10, 50, 90].map(p => (
            <div key={p} style={{
              position: 'absolute', top: 4, left: `${p}%`,
              width: 4, height: 4, borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #fff 0%, #888 40%, #222 100%)',
              boxShadow: '0 1px 0 rgba(0,0,0,0.5)',
            }} />
          ))}
        </div>

        {/* price label strip below shelf */}
        <div style={{
          marginTop: 16, display: 'grid',
          gridTemplateColumns: `repeat(${items.length}, 1fr)`,
          gap: 4,
        }}>
          {items.map(it => (
            <div key={it.id} style={{
              textAlign: 'center', padding: '0 2px',
              opacity: it.sold ? 0.4 : 1,
            }}>
              <div style={{
                fontFamily: SERIF, fontWeight: 700, fontSize: 9.5,
                color: '#fff', textTransform: 'uppercase',
                letterSpacing: 0.3, lineHeight: 1.15,
                textDecoration: it.sold ? 'line-through' : 'none',
              }}>{it.name}</div>
              {!it.sold ? (
                <div style={{ marginTop: 3, fontFamily: SERIF, fontSize: 11 }}>
                  <span style={{ color: RED, fontWeight: 700 }}>₹{it.price}</span>
                  <span style={{ color: DIM, textDecoration: 'line-through', marginLeft: 4, fontSize: 9 }}>
                    ₹{it.original}
                  </span>
                </div>
              ) : (
                <div style={{ marginTop: 3, fontFamily: SANS, fontSize: 8.5, color: DIM, letterSpacing: 1, fontWeight: 600 }}>
                  GONE
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ITEM DETAIL PANEL
// ─────────────────────────────────────────────────────────────
function LifeMeter({ hours, label, tone }) {
  const tones = {
    fresh: { bar: '#3DB371', text: '#7DD3A1' },
    closing: { bar: '#E8B30A', text: '#F0C84A' },
    critical: { bar: RED, text: '#FF7B6F' },
  };
  const t = tones[tone];
  const pct = Math.min(100, (hours / 12) * 100);
  return (
    <div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: 6,
      }}>
        <div style={{
          fontFamily: SANS, fontSize: 8.5, fontWeight: 700, letterSpacing: 1.4,
          color: MUTED, textTransform: 'uppercase',
        }}>SHELF LIFE LEFT</div>
        <div style={{
          fontFamily: SERIF, fontSize: 11, color: t.text, fontWeight: 700,
        }}>{hours} hrs · <span style={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</span></div>
      </div>
      <div style={{
        height: 6, background: 'rgba(255,255,255,0.06)',
        position: 'relative', overflow: 'hidden',
        borderRadius: 1,
      }}>
        <div style={{
          height: '100%', width: `${pct}%`, background: t.bar,
          boxShadow: `0 0 8px ${t.bar}`,
          transition: 'width 0.4s ease',
        }} />
        {/* tick marks */}
        {[25, 50, 75].map(p => (
          <div key={p} style={{
            position: 'absolute', top: 0, bottom: 0, left: `${p}%`,
            width: 1, background: 'rgba(0,0,0,0.4)',
          }} />
        ))}
      </div>
    </div>
  );
}

function ItemDetail({ item, qty, setQty, onAdd }) {
  if (!item) {
    return (
      <div style={{
        margin: '0 14px 16px', padding: '24px 18px',
        background: CARD, border: `1px dashed ${HAIRLINE}`,
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: SANS, fontSize: 10, color: MUTED, letterSpacing: 1.4,
          textTransform: 'uppercase', fontWeight: 600,
        }}>↑ TAP A SHELF ITEM TO INSPECT</div>
      </div>
    );
  }
  const save = item.original - item.price;
  return (
    <div style={{
      margin: '0 14px 16px', background: CARD,
      borderTop: `2px solid ${RED}`,
      padding: '18px 18px 16px',
    }}>
      {/* top row: name + tag */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        gap: 10, marginBottom: 4,
      }}>
        <div style={{
          fontFamily: SERIF, fontWeight: 700, fontSize: 15,
          color: '#fff', textTransform: 'uppercase', letterSpacing: -0.1,
          lineHeight: 1.1,
        }}>{item.name}</div>
        <div style={{
          fontFamily: SANS, fontSize: 8, fontWeight: 700, letterSpacing: 1.2,
          color: RED, textTransform: 'uppercase',
          border: `1px solid ${RED}`, padding: '3px 5px', flexShrink: 0,
        }}>LOT №{item.lot}</div>
      </div>

      <div style={{
        fontFamily: SANS, fontSize: 11, color: MUTED, lineHeight: 1.4,
        marginBottom: 16,
      }}>{item.desc}</div>

      <div style={{ marginBottom: 16 }}>
        <LifeMeter hours={item.hours} label={item.lifeLabel} tone={item.lifeTone} />
      </div>

      {/* price breakdown — 3 boxes */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: 6,
        marginBottom: 14,
      }}>
        <PriceBox label="WAS" value={`₹${item.original}`} muted strike />
        <PriceBox label="NOW" value={`₹${item.price}`} highlight />
        <PriceBox label="YOU SAVE" value={`₹${save}`} muted />
      </div>

      {/* why card */}
      <div style={{
        background: RED_TINT, border: `1px solid rgba(232,23,10,0.3)`,
        padding: '10px 12px', display: 'flex', gap: 10, alignItems: 'center',
        marginBottom: 16,
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
          <path d="M8 14c-3-1-5-4-5-7 0-2 1-4 3-5 0 2 1 3 3 3 1 0 2-1 2-2 2 1 4 3 4 6 0 4-3 5-7 5z"
            fill="none" stroke={RED} strokeWidth="1.4" strokeLinejoin="round"/>
          <path d="M8 11c-1 0-2-1-2-2.5" stroke={RED} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        </svg>
        <div style={{
          fontFamily: SANS, fontSize: 10.5, color: '#fff', lineHeight: 1.35,
        }}>
          <span style={{ color: RED, fontWeight: 700 }}>{item.whyHead}</span>
          {' '}{item.whyBody}
        </div>
      </div>

      {/* qty + add to cart */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'stretch' }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          border: `1px solid ${HAIRLINE}`, background: '#0C0C0C',
        }}>
          <QtyBtn onClick={() => setQty(Math.max(1, qty - 1))}>−</QtyBtn>
          <div style={{
            width: 26, textAlign: 'center', fontFamily: SERIF,
            fontWeight: 700, fontSize: 14, color: '#fff',
          }}>{qty}</div>
          <QtyBtn onClick={() => setQty(qty + 1)}>+</QtyBtn>
        </div>
        <button onClick={onAdd} style={{
          flex: 1, border: 0, background: RED, color: '#fff', cursor: 'pointer',
          fontFamily: SERIF, fontWeight: 700, fontSize: 13,
          letterSpacing: 1.5, textTransform: 'uppercase',
          boxShadow: `0 3px 0 ${RED_DEEP}`,
        }}>
          ADD TO CART · ₹{item.price * qty}
        </button>
      </div>
    </div>
  );
}

function QtyBtn({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 30, height: 36, border: 0, background: 'transparent',
      color: '#fff', fontFamily: SERIF, fontSize: 16, cursor: 'pointer',
    }}>{children}</button>
  );
}

function PriceBox({ label, value, muted, strike, highlight }) {
  const bg = highlight ? RED_TINT : 'rgba(255,255,255,0.03)';
  const border = highlight ? `1px solid rgba(232,23,10,0.5)` : `1px solid ${HAIRLINE}`;
  const valueColor = highlight ? RED : (muted ? DIM : '#fff');
  return (
    <div style={{
      background: bg, border, padding: '8px 6px', textAlign: 'center',
    }}>
      <div style={{
        fontFamily: SANS, fontSize: 7.5, fontWeight: 700, letterSpacing: 1.3,
        color: highlight ? RED : MUTED, textTransform: 'uppercase',
        marginBottom: 4,
      }}>{label}</div>
      <div style={{
        fontFamily: SERIF, fontWeight: 700, fontSize: 14,
        color: valueColor,
        textDecoration: strike ? 'line-through' : 'none',
        letterSpacing: -0.2,
      }}>{value}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STICKY BOTTOM CART BAR
// ─────────────────────────────────────────────────────────────
function CartBar({ count, total, onView, pulse }) {
  if (count === 0) return null;
  return (
    <div style={{
      position: 'absolute', bottom: 18, left: 12, right: 12, zIndex: 30,
    }}>
      <button onClick={onView} className={pulse ? 'cart-pulse' : ''} style={{
        width: '100%', height: 52, border: 0,
        background: RED, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 14px', cursor: 'pointer',
        boxShadow: `0 4px 0 ${RED_DEEP}, 0 8px 24px rgba(232,23,10,0.4)`,
        fontFamily: SERIF,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 26, height: 26, borderRadius: '50%', background: '#000',
            color: '#fff', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontFamily: SERIF, fontWeight: 700,
            fontSize: 13,
          }}>{count}</div>
          <span style={{
            fontFamily: SERIF, fontWeight: 700, fontSize: 13,
            letterSpacing: 1.4, textTransform: 'uppercase',
          }}>VIEW CART</span>
        </div>
        <span style={{
          fontFamily: SERIF, fontWeight: 700, fontSize: 17,
          letterSpacing: -0.2,
        }}>₹{total}</span>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CART OVERLAY (lightweight modal)
// ─────────────────────────────────────────────────────────────
function CartOverlay({ cart, onClose, onClear }) {
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(4px)', zIndex: 100,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: BG, borderTop: `2px solid ${RED}`,
        padding: '20px 18px 28px',
        animation: 'slideup 0.3s ease',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 16,
        }}>
          <div style={{
            fontFamily: SERIF, fontWeight: 700, fontSize: 18, color: '#fff',
            textTransform: 'uppercase', letterSpacing: -0.2,
          }}>YOUR RESCUE</div>
          <button onClick={onClose} style={{
            background: 'transparent', border: 0, color: MUTED,
            fontSize: 22, cursor: 'pointer', padding: 0, lineHeight: 1,
          }}>×</button>
        </div>
        {cart.map((c, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '10px 0', borderBottom: `1px solid ${HAIRLINE}`,
            alignItems: 'center',
          }}>
            <div>
              <div style={{
                fontFamily: SERIF, fontWeight: 700, fontSize: 13, color: '#fff',
                textTransform: 'uppercase',
              }}>{c.name}</div>
              <div style={{ fontFamily: SANS, fontSize: 10, color: MUTED, marginTop: 2 }}>
                Qty {c.qty} · saved ₹{(c.original - c.price) * c.qty}
              </div>
            </div>
            <div style={{
              fontFamily: SERIF, fontWeight: 700, fontSize: 15, color: RED,
            }}>₹{c.price * c.qty}</div>
          </div>
        ))}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginTop: 18, marginBottom: 14,
        }}>
          <div style={{
            fontFamily: SANS, fontSize: 9, fontWeight: 700, letterSpacing: 1.4,
            color: MUTED, textTransform: 'uppercase',
          }}>TOTAL</div>
          <div style={{
            fontFamily: SERIF, fontWeight: 700, fontSize: 26, color: '#fff',
            letterSpacing: -0.5,
          }}>₹{total}</div>
        </div>
        <button style={{
          width: '100%', height: 50, border: 0, background: RED, color: '#fff',
          fontFamily: SERIF, fontWeight: 700, fontSize: 14,
          letterSpacing: 1.5, textTransform: 'uppercase',
          boxShadow: `0 4px 0 ${RED_DEEP}`, cursor: 'pointer',
        }}>RESERVE FOR PICKUP →</button>
        <button onClick={onClear} style={{
          width: '100%', marginTop: 10, background: 'transparent', border: 0,
          color: MUTED, fontFamily: SANS, fontSize: 10, fontWeight: 600,
          letterSpacing: 1.4, textTransform: 'uppercase', cursor: 'pointer',
          padding: 8,
        }}>Clear cart</button>
      </div>
    </div>
  );
}

Object.assign(window, {
  Hero, AlarmBar, StatsStrip, Shelf, ItemDetail, CartBar, CartOverlay,
  RED, BG, CARD, SERIF, SANS,
});
