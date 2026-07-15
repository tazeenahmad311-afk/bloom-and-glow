import React, { useState, useEffect, useMemo } from "react";
import {
  ShoppingBag, Search, X, Plus, Minus, Check, Star, Instagram, Facebook,
  Mail, MessageCircle, Truck, ShieldCheck, Leaf, Sparkles, ChevronRight
} from "lucide-react";

/* -----------------------------------------------------------------
   BLOOM & GLOW — a small, calm, premium skincare storefront.
   Distinct from a "Glowtion"-style build on purpose:
   - Type pairing: Cormorant Garamond (display) + Work Sans (body/UI),
     wider tracking, more whitespace, fewer visual layers.
   - Signature element: a single hand-drawn sprig divider between
     sections, and a soft "petal dot" as the product visual instead
     of illustrated bottles — quieter, in line with "keep it simple."
   - One page, anchor navigation, no logins/wishlists/quick-view —
     per brief: avoid unnecessary pages, popups, complexity.
-------------------------------------------------------------------*/

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Work+Sans:wght@400;500;600;700&display=swap');`;

const INK = "#232922";
const EMERALD = "#145C43";
const EMERALD_DARK = "#0D3F2E";
const ROSE = "#CBA093";
const ROSE_SOFT = "#F1E2DA";
const BEIGE = "#FAF7F2";
const GRAY = "#7C8480";

const AZELAIC_IMG = "data:image/jpeg;base64,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";

const PRODUCTS = [
  { id: 1, name: "Gentle Cream Cleanser", desc: "Softly lifts away the day, no tightness after.", price: 24, rating: 4.8 },
  { id: 2, name: "Azelaic Acid Serum", desc: "Calms redness and evens tone with gentle daily use.", price: 42, rating: 4.9, image: AZELAIC_IMG },
  { id: 3, name: "Hydra Barrier Moisturizer", desc: "24-hour hydration that calms and repairs skin.", price: 38, rating: 4.7 },
  { id: 4, name: "Mineral Sunscreen SPF 50", desc: "Weightless, no white cast, everyday protection.", price: 28, rating: 4.6 },
  { id: 5, name: "Rose Clay Detox Mask", desc: "Gently draws out congestion, softens texture.", price: 32, rating: 4.7 },
  { id: 6, name: "Calming Rosewater Toner", desc: "Alcohol-free, preps skin for serums beautifully.", price: 22, rating: 4.5 },
  { id: 7, name: "Overnight Repair Elixir", desc: "A rich night oil that restores while you sleep.", price: 46, rating: 4.9 },
  { id: 8, name: "Soothing Eye Cream", desc: "Cools puffiness and brightens tired under-eyes.", price: 30, rating: 4.6 },
];

const REVIEWS = [
  { name: "Hira A.", text: "My skin finally feels calm. The serum is gentle but I can see real results." },
  { name: "Zainab M.", text: "Simple routine, beautiful packaging, and it actually works. Repeat customer now." },
  { name: "Noor F.", text: "Ordered cash on delivery, arrived in 3 days. Genuinely lovely quality." },
];

const money = (n) => `$${n.toFixed(2)}`;

function Sprig({ flip }) {
  return (
    <div className={`w-full flex justify-center py-2 ${flip ? "scale-y-[-1]" : ""}`} aria-hidden="true">
      <svg width="90" height="20" viewBox="0 0 90 20" fill="none">
        <path d="M2 10 Q22 -2 45 10 T88 10" stroke={ROSE} strokeWidth="1.2" fill="none" />
        <ellipse cx="30" cy="6" rx="3.2" ry="1.6" fill={EMERALD} opacity="0.55" transform="rotate(-20 30 6)" />
        <ellipse cx="60" cy="14" rx="3.2" ry="1.6" fill={EMERALD} opacity="0.55" transform="rotate(20 60 14)" />
        <circle cx="45" cy="10" r="2.4" fill={ROSE} />
      </svg>
    </div>
  );
}

/* Quiet product visual: a soft petal-dot instead of an illustrated bottle */
function PetalDot({ size = 96 }) {
  return (
    <div className="rounded-full flex items-center justify-center" style={{ width: size, height: size, background: `radial-gradient(circle at 32% 30%, #ffffff, ${ROSE_SOFT} 55%, ${BEIGE})` }}>
      <div className="rounded-full" style={{ width: size * 0.34, height: size * 0.34, background: EMERALD, opacity: 0.85 }} />
    </div>
  );
}

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={13} fill={i <= Math.round(rating) ? ROSE : "none"} stroke={ROSE} strokeWidth={1.3} />
      ))}
    </div>
  );
}

export default function BloomAndGlow() {
  const [cart, setCart] = useState([]); // {id, qty}
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(0); // 0 = cart, 1 = details, 2 = confirmed
  const [payment, setPayment] = useState("cod");

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  const addToCart = (p) => {
    setCart((c) => {
      const ex = c.find((i) => i.id === p.id);
      if (ex) return c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { id: p.id, qty: 1 }];
    });
    setToast(`${p.name} added to cart`);
  };
  const updateQty = (id, qty) => setCart((c) => (qty <= 0 ? c.filter((i) => i.id !== id) : c.map((i) => (i.id === id ? { ...i, qty } : i))));

  const cartItems = cart.map((i) => ({ ...i, product: PRODUCTS.find((p) => p.id === i.id) }));
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.product.price * i.qty, 0);

  const filtered = useMemo(
    () => PRODUCTS.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const openCart = () => { setCheckoutStep(0); setCartOpen(true); };
  const buyNow = (p) => { addToCart(p); openCart(); };

  return (
    <div style={{ fontFamily: "'Work Sans', sans-serif", color: INK, background: "#FFFFFF" }} className="min-h-screen">
      <style>{`
        ${FONT_IMPORT}
        .font-display { font-family: 'Cormorant Garamond', serif; }
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { * { transition-duration: 0.001ms !important; } }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-[#F1ECE4]">
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-[76px] flex items-center justify-between">
          <span className="font-display text-2xl tracking-wide" style={{ color: EMERALD_DARK }}>Bloom &amp; Glow</span>
          <nav className="hidden md:flex gap-8 text-sm" style={{ color: "#4B534C" }}>
            <a href="#products" className="hover:opacity-70">Shop</a>
            <a href="#why" className="hover:opacity-70">Why Us</a>
            <a href="#reviews" className="hover:opacity-70">Reviews</a>
            <a href="#contact" className="hover:opacity-70">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: GRAY }} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products"
                className="pl-8 pr-3 py-2 rounded-full border text-sm outline-none w-40 focus:w-52 transition-all"
                style={{ borderColor: "#E7E0D6" }} />
            </div>
            <button onClick={openCart} className="relative" aria-label="Cart" style={{ color: EMERALD_DARK }}>
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="absolute -top-2 -right-2 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center" style={{ background: ROSE }}>{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative" style={{ background: `linear-gradient(180deg, ${BEIGE} 0%, #FFFFFF 100%)` }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28 text-center flex flex-col items-center">
          <span className="font-display italic text-lg mb-4" style={{ color: ROSE }}>Bloom &amp; Glow</span>
          <h1 className="font-display text-4xl md:text-6xl leading-tight max-w-2xl mb-6" style={{ color: EMERALD_DARK }}>
            Simple skincare, quietly effective.
          </h1>
          <p className="text-[#5b6158] max-w-md mb-9">
            A small, honest collection of skincare essentials — made for a routine you'll actually keep.
          </p>
          <a href="#products" className="px-8 py-4 rounded-full text-white text-sm font-medium tracking-wide inline-flex items-center gap-2 transition-transform hover:scale-[1.03]" style={{ background: EMERALD }}>
            Shop Now <ChevronRight size={16} />
          </a>
          <div className="mt-14"><PetalDot size={110} /></div>
        </div>
        <Sprig />
      </section>

      {/* Featured Products */}
      <section id="products" className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.2em] text-xs mb-3" style={{ color: ROSE }}>Our Collection</p>
          <h2 className="font-display text-3xl md:text-4xl" style={{ color: EMERALD_DARK }}>Featured Products</h2>
        </div>
        {filtered.length === 0 ? (
          <p className="text-center py-14" style={{ color: GRAY }}>No products match "{search}".</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <div key={p.id} className="rounded-3xl border p-5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_14px_32px_rgba(20,92,67,0.10)] hover:-translate-y-1" style={{ borderColor: "#F1ECE4" }}>
                {p.image ? (
                  <img src={p.image} alt={p.name} className="w-24 h-24 object-cover rounded-2xl" />
                ) : (
                  <PetalDot size={78} />
                )}
                <h3 className="font-display text-lg mt-4" style={{ color: EMERALD_DARK }}>{p.name}</h3>
                <p className="text-xs mt-1 mb-2" style={{ color: GRAY }}>{p.desc}</p>
                <Stars rating={p.rating} />
                <p className="font-display text-xl mt-3 mb-4" style={{ color: EMERALD }}>{money(p.price)}</p>
                <div className="flex gap-2 w-full">
                  <button onClick={() => addToCart(p)} className="flex-1 py-2.5 rounded-full text-xs font-semibold border" style={{ borderColor: EMERALD, color: EMERALD }}>
                    Add to Cart
                  </button>
                  <button onClick={() => buyNow(p)} className="flex-1 py-2.5 rounded-full text-xs font-semibold text-white" style={{ background: EMERALD }}>
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Sprig flip />

      {/* Why Choose Glowtion */}
      <section id="why" style={{ background: BEIGE }} className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <p className="uppercase tracking-[0.2em] text-xs mb-3" style={{ color: ROSE }}>The Difference</p>
            <h2 className="font-display text-3xl md:text-4xl" style={{ color: EMERALD_DARK }}>Why Choose Bloom &amp; Glow</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Sparkles, label: "Premium Quality" },
              { icon: ShieldCheck, label: "Dermatologist Inspired" },
              { icon: Truck, label: "Fast Delivery" },
              { icon: Leaf, label: "Trusted Ingredients" },
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "#FFFFFF" }}>
                  <f.icon size={20} style={{ color: EMERALD }} />
                </div>
                <p className="text-sm font-medium" style={{ color: EMERALD_DARK }}>{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.2em] text-xs mb-3" style={{ color: ROSE }}>Kind Words</p>
          <h2 className="font-display text-3xl md:text-4xl" style={{ color: EMERALD_DARK }}>Customer Reviews</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <div key={i} className="rounded-3xl p-6 border" style={{ borderColor: "#F1ECE4", background: BEIGE }}>
              <Stars rating={5} />
              <p className="font-display italic text-lg mt-3 leading-relaxed" style={{ color: "#3d4139" }}>"{r.text}"</p>
              <p className="text-xs font-semibold mt-4" style={{ color: EMERALD }}>{r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ background: BEIGE }} className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <div className="text-center mb-10">
            <p className="uppercase tracking-[0.2em] text-xs mb-3" style={{ color: ROSE }}>Say Hello</p>
            <h2 className="font-display text-3xl md:text-4xl" style={{ color: EMERALD_DARK }}>Get in Touch</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <input placeholder="Your name" className="w-full px-4 py-3 rounded-xl border outline-none" style={{ borderColor: "#E7E0D6" }} />
              <input type="email" placeholder="Email address" className="w-full px-4 py-3 rounded-xl border outline-none" style={{ borderColor: "#E7E0D6" }} />
              <textarea placeholder="Your message" rows={4} className="w-full px-4 py-3 rounded-xl border outline-none" style={{ borderColor: "#E7E0D6" }} />
              <button className="px-7 py-3 rounded-full text-white text-sm font-semibold" style={{ background: EMERALD }}>Send Message</button>
            </form>
            <div className="flex flex-col gap-4">
              <a href="https://wa.me/923293864011" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-5 py-4 rounded-2xl text-white" style={{ background: "#25D366" }}>
                <MessageCircle size={20} /> Chat with us on WhatsApp
              </a>
              <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white border" style={{ borderColor: "#E7E0D6" }}>
                <Mail size={18} style={{ color: EMERALD }} /> hello@bloomandglow.com
              </div>
              <p className="text-xs px-1" style={{ color: GRAY }}>We usually reply within a few hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: EMERALD_DARK }} className="text-white/85 pt-12 pb-6">
        <div className="max-w-6xl mx-auto px-5 md:px-8 flex flex-col md:flex-row justify-between gap-8">
          <div>
            <span className="font-display text-xl text-white">Bloom &amp; Glow</span>
            <p className="text-sm text-white/50 mt-2 max-w-xs">Simple, honest skincare — made to fit quietly into your day.</p>
          </div>
          <div className="flex gap-10 text-sm">
            <div className="space-y-2">
              <p className="text-white font-medium mb-1">Company</p>
              <p className="text-white/60 cursor-pointer hover:text-white">About</p>
              <p className="text-white/60 cursor-pointer hover:text-white">Privacy Policy</p>
              <p className="text-white/60 cursor-pointer hover:text-white">Terms</p>
            </div>
            <div className="space-y-2">
              <p className="text-white font-medium mb-1">Follow</p>
              <div className="flex gap-3">
                <Instagram size={17} className="cursor-pointer text-white/60 hover:text-white" />
                <Facebook size={17} className="cursor-pointer text-white/60 hover:text-white" />
                <Mail size={17} className="cursor-pointer text-white/60 hover:text-white" />
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-white/30 text-xs mt-10">© 2026 Bloom &amp; Glow. All rights reserved.</p>
      </footer>

      {/* Cart / Checkout Drawer */}
      <div onClick={() => setCartOpen(false)} className={`fixed inset-0 bg-black/30 z-40 transition-opacity ${cartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} />
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${cartOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "#F1ECE4" }}>
          <h2 className="font-display text-2xl" style={{ color: EMERALD_DARK }}>
            {checkoutStep === 0 ? "Your Cart" : checkoutStep === 1 ? "Checkout" : "Order Placed"}
          </h2>
          <button onClick={() => setCartOpen(false)}><X size={20} /></button>
        </div>

        {checkoutStep === 0 && (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {cartItems.length === 0 ? (
                <p className="text-center mt-10" style={{ color: GRAY }}>Your cart is empty.</p>
              ) : cartItems.map((i) => (
                <div key={i.id} className="flex gap-4 items-center">
                  {i.product.image ? (
                    <img src={i.product.image} alt={i.product.name} className="w-14 h-14 object-cover rounded-xl flex-shrink-0" />
                  ) : (
                    <PetalDot size={52} />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{i.product.name}</p>
                    <p className="text-xs mb-1" style={{ color: GRAY }}>{money(i.product.price)}</p>
                    <div className="flex items-center border rounded-full w-fit" style={{ borderColor: "#E7E0D6" }}>
                      <button onClick={() => updateQty(i.id, i.qty - 1)} className="w-7 h-7 flex items-center justify-center"><Minus size={12} /></button>
                      <span className="w-6 text-center text-xs">{i.qty}</span>
                      <button onClick={() => updateQty(i.id, i.qty + 1)} className="w-7 h-7 flex items-center justify-center"><Plus size={12} /></button>
                    </div>
                  </div>
                  <button onClick={() => updateQty(i.id, 0)} style={{ color: GRAY }}><X size={16} /></button>
                </div>
              ))}
            </div>
            {cartItems.length > 0 && (
              <div className="p-6 border-t" style={{ borderColor: "#F1ECE4" }}>
                <div className="flex justify-between mb-4 font-semibold">
                  <span>Total</span><span style={{ color: EMERALD }}>{money(cartTotal)}</span>
                </div>
                <button onClick={() => setCheckoutStep(1)} className="w-full py-4 rounded-full text-white text-sm font-semibold" style={{ background: EMERALD }}>
                  Checkout
                </button>
              </div>
            )}
          </>
        )}

        {checkoutStep === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); setCheckoutStep(2); }} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            <input required placeholder="Full name" className="w-full px-4 py-3 rounded-xl border outline-none" style={{ borderColor: "#E7E0D6" }} />
            <input required placeholder="Phone number" className="w-full px-4 py-3 rounded-xl border outline-none" style={{ borderColor: "#E7E0D6" }} />
            <input required placeholder="Delivery address" className="w-full px-4 py-3 rounded-xl border outline-none" style={{ borderColor: "#E7E0D6" }} />

            <p className="text-sm font-medium mt-2" style={{ color: EMERALD_DARK }}>Payment Method</p>
            <div className="flex gap-3">
              <button type="button" onClick={() => setPayment("cod")} className="flex-1 py-3 rounded-xl border text-sm font-medium" style={payment === "cod" ? { background: EMERALD, color: "white", borderColor: EMERALD } : { borderColor: "#E7E0D6" }}>
                Cash on Delivery
              </button>
              <button type="button" onClick={() => setPayment("card")} className="flex-1 py-3 rounded-xl border text-sm font-medium" style={payment === "card" ? { background: EMERALD, color: "white", borderColor: EMERALD } : { borderColor: "#E7E0D6" }}>
                Pay by Card
              </button>
            </div>
            {payment === "card" && (
              <>
                <input required placeholder="Card number" className="w-full px-4 py-3 rounded-xl border outline-none" style={{ borderColor: "#E7E0D6" }} />
                <div className="grid grid-cols-2 gap-3">
                  <input required placeholder="MM/YY" className="px-4 py-3 rounded-xl border outline-none" style={{ borderColor: "#E7E0D6" }} />
                  <input required placeholder="CVC" className="px-4 py-3 rounded-xl border outline-none" style={{ borderColor: "#E7E0D6" }} />
                </div>
              </>
            )}

            <div className="flex justify-between font-semibold pt-2 mt-auto">
              <span>Total</span><span style={{ color: EMERALD }}>{money(cartTotal)}</span>
            </div>
            <button type="submit" className="w-full py-4 rounded-full text-white text-sm font-semibold" style={{ background: EMERALD }}>
              Place Order
            </button>
            <p className="text-[11px] text-center" style={{ color: GRAY }}>Demo checkout — no real payment is processed.</p>
          </form>
        )}

        {checkoutStep === 2 && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: EMERALD }}>
              <Check className="text-white" size={26} />
            </div>
            <h3 className="font-display text-2xl mb-2" style={{ color: EMERALD_DARK }}>Thank you!</h3>
            <p className="text-sm mb-1" style={{ color: GRAY }}>Order #BG-{Math.floor(1000 + Math.random() * 9000)}</p>
            <p className="text-sm mb-6" style={{ color: "#5b6158" }}>
              {payment === "cod" ? "Pay cash when your order arrives at your door." : "Your payment has been received."} A confirmation email is on its way.
            </p>
            <button onClick={() => { setCart([]); setCartOpen(false); }} className="px-7 py-3.5 rounded-full text-white text-sm font-semibold" style={{ background: EMERALD }}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      {/* Floating WhatsApp button */}
      <a href="https://wa.me/923293864011" target="_blank" rel="noreferrer" className="fixed bottom-6 left-6 z-30 w-14 h-14 rounded-full flex items-center justify-center shadow-lg text-white" style={{ background: "#25D366" }} aria-label="WhatsApp">
        <MessageCircle size={24} />
      </a>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 text-white px-5 py-3 rounded-full text-sm shadow-lg flex items-center gap-2" style={{ background: EMERALD_DARK }}>
          <Check size={16} /> {toast}
        </div>
      )}
    </div>
  );
}
