import React, { useState, useEffect, useMemo } from "react";
import {
  ShoppingBag, Search, X, Plus, Minus, Check, Star, Instagram, Facebook,
  Mail, MessageCircle, Truck, ShieldCheck, Leaf, Sparkles, ChevronRight
} from "lucide-react";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Work+Sans:wght@400;500;600;700&display=swap');`;

const INK = "#232922";
const EMERALD = "#145C43";
const EMERALD_DARK = "#0D3F2E";
const ROSE = "#CBA093";
const ROSE_SOFT = "#F1E2DA";
const BEIGE = "#FAF7F2";
const GRAY = "#7C8480";

const PRODUCTS = [
  { id: 1, name: "Gentle Cream Cleanser", desc: "Softly lifts away the day, no tightness after.", price: 24, rating: 4.8 },
  { id: 2, name: "Vitamin C Glow Serum", desc: "Brightens tone and softens fine lines over time.", price: 42, rating: 4.9 },
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
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(0);
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
                <PetalDot size={78} />
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
                  <PetalDot size={52} />
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
