import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
  useMotionValue,
} from "framer-motion";
import Lenis from "lenis";
import {
  appCapabilities,
  ctaLinks,
  faq,
  featureCards,
  gameModes,
  legalLinks,
  miniAppScreens,
  pricingPlans,
  productFacts,
  reviews,
  serviceFacts,
} from "@/data/product";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: "https://shop.dvinconnect.store/assets/miniapp-dashboard.jpg" },
    ],
  }),
  component: Landing,
});

/* ---------- Smooth scroll ---------- */
function useLenis() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });
    let f = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      f = requestAnimationFrame(raf);
    };
    f = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(f);
      lenis.destroy();
    };
  }, []);
}

/* ---------- Cursor blob ---------- */
function CursorBlob() {
  const x = useSpring(0, { stiffness: 120, damping: 20, mass: 0.6 });
  const y = useSpring(0, { stiffness: 120, damping: 20, mass: 0.6 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      className="pointer-events-none fixed top-0 left-0 z-[60] hidden h-[420px] w-[420px] rounded-full md:block"
    >
      <div className="glow-orb h-full w-full grad-bg" />
    </motion.div>
  );
}

/* ---------- Header ---------- */
const NAV = [
  { label: "Mini App", href: "#miniapp" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Бонусы", href: "#bonus" },
  { label: "Отзывы", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6">
        <div
          className={`flex items-center justify-between rounded-full border transition-all duration-500 ${
            scrolled
              ? "border-line/70 bg-background/70 px-4 py-2 backdrop-blur-xl shadow-[0_10px_40px_-20px_oklch(0.12_0.025_265_/_0.15)]"
              : "border-transparent px-2 py-1"
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5 pl-2">
            <img src="/assets/dvinvpn-logo.png" width={34} height={34} alt="" className="rounded-lg" />
            <span className="text-[15px] font-medium tracking-tight text-ink">DvinVPN</span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="rounded-full px-4 py-2 text-[13.5px] text-ink-soft transition hover:bg-milk hover:text-ink"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href={ctaLinks.hero}
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-5 py-2.5 text-[13.5px] font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            <span className="relative z-10">Открыть в Telegram</span>
            <ArrowUpRight className="relative z-10 h-3.5 w-3.5" />
            <span className="absolute inset-0 -translate-x-full grad-bg transition-transform duration-500 group-hover:translate-x-0" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}

/* ---------- Icons ---------- */
function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  const words = "Твой VPN живёт в Telegram.".split(" ");

  return (
    <section ref={ref} id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="glow-orb absolute -top-40 -left-40 h-[520px] w-[520px]" style={{ background: "oklch(0.55 0.24 295)" }} />
        <div className="glow-orb absolute -top-20 right-0 h-[480px] w-[480px]" style={{ background: "oklch(0.72 0.14 195)" }} />
        <div className="glow-orb absolute top-1/2 left-1/3 h-[420px] w-[420px]" style={{ background: "oklch(0.58 0.22 260)" }} />
      </div>

      <motion.div style={{ opacity }} className="relative mx-auto max-w-[1400px] px-6">
        {/* Meta strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-10 flex items-center justify-between gap-4 text-[12px]"
        >
          <span className="mono-tag">— {productFacts.name} · index /01</span>
          <span className="mono-tag hidden md:inline">Проверено {productFacts.verifiedAt}</span>
        </motion.div>

        {/* Big display */}
        <motion.h1 style={{ y: y1 }} className="display text-[clamp(3.2rem,10vw,10.5rem)] text-ink text-balance">
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mr-[0.18em] inline-block"
            >
              {i === 2 ? <em className="grad-text italic">{w}</em> : w}
            </motion.span>
          ))}
        </motion.h1>

        {/* Sub row */}
        <motion.div
          style={{ y: y2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-12 grid grid-cols-1 items-end gap-8 md:grid-cols-12"
        >
          <p className="md:col-span-5 text-[17px] leading-relaxed text-ink-soft text-pretty">
            Никаких приложений и сайтов-ловушек. Открываешь Mini App — видишь тариф, пробный период, оплату и подключение в одном окне.
          </p>
          <div className="md:col-span-4 md:col-start-8 flex flex-col gap-3">
            <a
              href={ctaLinks.hero}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-between gap-4 rounded-full bg-ink px-7 py-5 text-[15px] font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              <span>Забрать 3 дня бесплатно</span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground text-ink transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
            <span className="pl-2 text-[12.5px] text-ink-mute">
              {productFacts.trial}
            </span>
          </div>
        </motion.div>

        {/* Hero visual */}
        <motion.div
          style={{ scale }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-20 max-w-[1120px]"
        >
          <div className="relative overflow-hidden rounded-[32px] border border-line/70 bg-white p-2 shadow-[var(--shadow-plate)]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] grad-bg">
              <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ background: "radial-gradient(1200px 400px at 30% 20%, white, transparent)" }} />
              <div className="absolute inset-0 grid place-items-center">
                <motion.img
                  src="/assets/miniapp-dashboard.jpg"
                  alt="Mini App DvinVPN"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-[85%] w-auto rounded-[22px] shadow-2xl ring-1 ring-white/40"
                />
              </div>
              {/* floating labels */}
              <FloatingLabel className="left-[8%] top-[18%]" delay={1.6}>Подключение · 12 сек</FloatingLabel>
              <FloatingLabel className="right-[7%] top-[30%]" delay={1.8}>Безлимитный трафик</FloatingLabel>
              <FloatingLabel className="left-[10%] bottom-[15%]" delay={2.0}>от 108 ₽ / мес</FloatingLabel>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function FloatingLabel({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute rounded-full border border-white/40 bg-white/85 px-4 py-2 text-[12.5px] font-medium text-ink shadow-lg backdrop-blur ${className}`}
    >
      <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-teal align-middle" />
      {children}
    </motion.div>
  );
}

/* ---------- Marquee ---------- */
function Marquee() {
  return (
    <section className="relative overflow-hidden border-y border-line/60 bg-milk py-6">
      <div className="flex whitespace-nowrap">
        <div className="marquee flex shrink-0 gap-12 pr-12">
          {[...serviceFacts, ...serviceFacts].map((f, i) => (
            <span key={i} className="flex items-center gap-4 text-[15px] text-ink-soft">
              <span className="inline-block h-1.5 w-1.5 rounded-full grad-bg" />
              {f}
            </span>
          ))}
        </div>
        <div className="marquee flex shrink-0 gap-12 pr-12" aria-hidden>
          {[...serviceFacts, ...serviceFacts].map((f, i) => (
            <span key={i} className="flex items-center gap-4 text-[15px] text-ink-soft">
              <span className="inline-block h-1.5 w-1.5 rounded-full grad-bg" />
              {f}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Pinned Mini App scene ---------- */
function MiniAppScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(miniAppScreens.length - 1, Math.floor(v * miniAppScreens.length * 0.999));
    setActive(idx);
  });

  return (
    <section id="miniapp" ref={ref} className="relative" style={{ height: `${miniAppScreens.length * 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-12">
          {/* Text side */}
          <div className="md:col-span-6">
            <div className="mono-tag mb-6">— Mini App / {String(active + 1).padStart(2, "0")} из {String(miniAppScreens.length).padStart(2, "0")}</div>
            <div className="relative h-[220px] md:h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ y: 60, opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -60, opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <h2 className="display text-[clamp(2.5rem,5.5vw,5rem)] text-ink text-balance">
                    {miniAppScreens[active].title}
                  </h2>
                  <p className="mt-6 max-w-md text-[16.5px] leading-relaxed text-ink-soft text-pretty">
                    {miniAppScreens[active].text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* progress */}
            <div className="mt-10 flex gap-2">
              {miniAppScreens.map((_, i) => (
                <div key={i} className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-line/70">
                  <motion.div
                    className="absolute inset-y-0 left-0 grad-bg"
                    animate={{ width: i < active ? "100%" : i === active ? "100%" : "0%" }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Screens stack */}
          <div className="md:col-span-6 relative flex justify-center">
            <div className="relative h-[560px] w-[300px] md:h-[640px] md:w-[340px]">
              {miniAppScreens.map((s, i) => {
                const offset = i - active;
                return (
                  <motion.div
                    key={s.src}
                    className="absolute inset-0 overflow-hidden rounded-[36px] border border-line/70 bg-white p-2 shadow-[var(--shadow-plate)]"
                    animate={{
                      y: offset * 24,
                      scale: 1 - Math.abs(offset) * 0.06,
                      opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.25,
                      zIndex: 10 - Math.abs(offset),
                      rotate: offset * -2,
                    }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <img src={s.src} alt={s.alt} className="h-full w-full rounded-[28px] object-cover" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Feature Scenes (each a unique story) ---------- */
function FeatureStories() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionIntro tag="/02 Преимущества" title="Каждое отличие — сцена, а не карточка." />

        <div className="mt-24 space-y-40">
          {featureCards.map((f, i) => (
            <FeatureRow key={i} index={i} f={f} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureRow({ index, f }: { index: number; f: (typeof featureCards)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const reverse = index % 2 === 1;

  const visuals = [
    // 0 — huge number
    <div className="relative grid aspect-square place-items-center overflow-hidden rounded-[32px] bg-milk">
      <span className="display grad-text text-[16rem] leading-none">01</span>
      <span className="absolute bottom-8 left-8 mono-tag">Один шаг в Telegram</span>
    </div>,
    // 1 — price
    <div className="relative aspect-square overflow-hidden rounded-[32px] grad-bg p-10 text-primary-foreground">
      <div className="mono-tag !text-white/70">от / месяц</div>
      <div className="display mt-4 text-[9rem] leading-none">108<span className="text-[3rem] align-top"> ₽</span></div>
      <div className="absolute bottom-8 left-10 right-10 flex justify-between text-[13px] text-white/80">
        <span>Безлимит трафика</span><span>до 5 устройств</span>
      </div>
    </div>,
    // 2 — Happ setup
    <div className="relative aspect-square overflow-hidden rounded-[32px] border border-line bg-white">
      <img src="/assets/dvinvpn-client-connect.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-8 text-white">
        <div className="mono-tag !text-white/70">Happ · рекомендуемый клиент</div>
        <div className="mt-2 text-2xl font-medium">Один тап — и ты подключён</div>
      </div>
    </div>,
    // 3 — bonuses
    <div className="relative aspect-square overflow-hidden rounded-[32px] bg-ink text-primary-foreground">
      <div className="absolute inset-0 opacity-70" style={{ background: "conic-gradient(from 0deg, oklch(0.55 0.24 295), oklch(0.58 0.22 260), oklch(0.72 0.14 195), oklch(0.55 0.24 295))" }} />
      <div className="absolute inset-6 grid place-items-center rounded-[24px] bg-ink/70 backdrop-blur">
        <div className="text-center">
          <div className="mono-tag !text-white/70">Каждый день</div>
          <div className="display mt-3 text-6xl">Спин · Игры · Промокоды</div>
        </div>
      </div>
    </div>,
  ];

  return (
    <div ref={ref} className={`grid grid-cols-1 items-center gap-16 md:grid-cols-12 ${reverse ? "md:[direction:rtl]" : ""}`}>
      <motion.div style={{ y }} className="md:col-span-6 [direction:ltr]">
        {visuals[index] ?? visuals[0]}
      </motion.div>
      <div className="md:col-span-5 md:col-start-8 [direction:ltr]">
        <div className="mono-tag">/ 0{index + 1}</div>
        <h3 className="display mt-4 text-[clamp(2rem,4.5vw,4rem)] text-ink text-balance">{f.title}</h3>
        <p className="mt-6 max-w-md text-[16.5px] leading-relaxed text-ink-soft text-pretty">{f.text}</p>
      </div>
    </div>
  );
}

/* ---------- Section intro ---------- */
function SectionIntro({ tag, title, kicker }: { tag: string; title: string; kicker?: string }) {
  return (
    <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12">
      <div className="md:col-span-6">
        <div className="mono-tag">— {tag}</div>
        <h2 className="display mt-6 text-[clamp(2.5rem,7vw,6.5rem)] text-ink text-balance">{title}</h2>
      </div>
      {kicker && <p className="md:col-span-4 md:col-start-9 text-[16px] text-ink-soft text-pretty">{kicker}</p>}
    </div>
  );
}

/* ---------- Capabilities grid ---------- */
function Capabilities() {
  return (
    <section className="relative py-32 bg-milk">
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionIntro tag="/03 Что внутри" title="Восемь сценариев Mini App." kicker="Всё, что нужно клиенту DvinVPN, живёт в одном окне Telegram." />
        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-[28px] border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {appCapabilities.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.6 }}
              className="group relative bg-background p-8 transition hover:bg-white"
            >
              <div className="mono-tag">/{String(i + 1).padStart(2, "0")}</div>
              <div className="mt-6 text-[19px] font-medium tracking-tight text-ink">{c.title}</div>
              <div className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">{c.text}</div>
              <div className="absolute inset-x-0 bottom-0 h-[2px] w-0 grad-bg transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Bonuses / Games ---------- */
function Bonuses() {
  return (
    <section id="bonus" className="relative overflow-hidden py-32">
      <div aria-hidden className="glow-orb absolute -top-20 right-1/3 h-[520px] w-[520px]" style={{ background: "oklch(0.55 0.24 295)" }} />
      <div className="relative mx-auto max-w-[1400px] px-6">
        <SectionIntro tag="/04 Бонусы" title="Игры возвращают деньги." kicker="Ежедневный спин, мини-игры и промокоды продлевают подписку каждый день." />
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {gameModes.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.06, duration: 0.7 }}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-[24px] p-6 ${
                i === 0 ? "col-span-1 md:col-span-2 lg:col-span-3 lg:row-span-2 grad-bg text-primary-foreground" : "border border-line bg-white text-ink"
              } ${i === 0 ? "min-h-[400px]" : "min-h-[220px]"}`}
            >
              <div className={`mono-tag ${i === 0 ? "!text-white/70" : ""}`}>/{String(i + 1).padStart(2, "0")}</div>
              <div>
                <div className={`display text-[clamp(1.6rem,2.5vw,2.5rem)] ${i === 0 ? "text-white" : "text-ink"}`}>{g.title}</div>
                <p className={`mt-3 text-[14px] leading-relaxed ${i === 0 ? "text-white/85" : "text-ink-soft"}`}>{g.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Pricing ---------- */
function Pricing() {
  const [devices, setDevices] = useState(1);
  return (
    <section id="pricing" className="relative py-40">
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionIntro tag="/05 Тарифы" title="Один тариф. Четыре периода." kicker={productFacts.trial} />

        <div className="mt-16 flex flex-wrap items-center gap-6 text-[14px] text-ink-soft">
          <span className="mono-tag">Устройств:</span>
          <div className="inline-flex items-center gap-1 rounded-full border border-line bg-white p-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setDevices(n)}
                className={`h-9 w-9 rounded-full text-[13.5px] transition ${
                  devices === n ? "bg-ink text-primary-foreground" : "text-ink-soft hover:bg-milk"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 space-y-4">
          {pricingPlans.map((p, i) => {
            const extra = (devices - 1) * p.extraDevicePrice;
            const total = p.price + extra;
            return (
              <motion.a
                key={p.id}
                href={ctaLinks.pricing}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.07, duration: 0.6 }}
                className="group relative grid grid-cols-6 items-center gap-4 rounded-[20px] border border-line bg-white px-6 py-8 transition hover:border-ink/60 hover:shadow-[var(--shadow-soft)] md:grid-cols-12 md:px-10 md:py-10"
              >
                <div className="col-span-2 md:col-span-1 mono-tag">/0{i + 1}</div>
                <div className="col-span-4 md:col-span-3">
                  <div className="display text-[clamp(1.6rem,3vw,2.4rem)] text-ink">{p.label}</div>
                  {p.badge && <div className="mt-1 inline-block rounded-full grad-bg px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-widest text-white">{p.badge}</div>}
                </div>
                <div className="col-span-3 md:col-span-3 text-[13.5px] text-ink-mute">
                  {p.perMonth} ₽ / мес{devices > 1 ? ` · +${extra} ₽ за устройства` : ""}
                </div>
                <div className="col-span-3 md:col-span-3 text-right md:text-left">
                  <div className="display text-[clamp(2rem,4vw,3.6rem)] text-ink">
                    {total.toLocaleString("ru")} <span className="text-[0.4em] align-middle text-ink-mute">₽</span>
                  </div>
                </div>
                <div className="col-span-6 md:col-span-2 flex justify-end">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-line text-ink transition group-hover:bg-ink group-hover:text-primary-foreground group-hover:rotate-45">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
        <p className="mt-8 max-w-2xl text-[13px] text-ink-mute">
          Финальная цена, доступность оплаты и применимость промокодов подтверждаются внутри DvinVPN перед оплатой. Оплата через YooKassa и T-pay.
        </p>
      </div>
    </section>
  );
}

/* ---------- Reviews ---------- */
function Reviews() {
  return (
    <section id="reviews" className="relative overflow-hidden bg-ink py-32 text-primary-foreground">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="mono-tag !text-white/60">— /06 Отзывы</div>
            <h2 className="display mt-6 text-[clamp(2.5rem,6vw,5.5rem)] text-white text-balance">
              Из чата <em className="grad-text italic">DvinVPN</em>.
            </h2>
            <div className="mt-10 overflow-hidden rounded-[28px] border border-white/15 bg-white/5 p-2">
              <img src="/assets/telegram-reviews.jpg" alt="Отзывы в Telegram" className="w-full rounded-[22px]" />
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7 space-y-6">
            {reviews.map((r, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="rounded-[24px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur"
              >
                <p className="text-[17px] leading-relaxed text-white/90">{r.text}</p>
                <footer className="mt-5 flex items-center gap-3 text-[13px] text-white/60">
                  <span className="grid h-8 w-8 place-items-center rounded-full grad-bg text-white text-[13px] font-medium">
                    {r.author[0]}
                  </span>
                  {r.author}
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionIntro tag="/07 Вопросы" title="Коротко и по делу." />
        <div className="mt-16 divide-y divide-line border-y border-line">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-[clamp(1.1rem,2vw,1.7rem)] font-medium tracking-tight text-ink">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-ink"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 5v14M5 12h14" /></svg>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-3xl pb-8 text-[15.5px] leading-relaxed text-ink-soft">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function Final() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.6, 1.1]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-milk pt-32 pb-16">
      <div className="mx-auto max-w-[1400px] px-6 text-center">
        <div className="mono-tag">— /08 Финал</div>
        <h2 className="display mt-6 text-[clamp(3rem,12vw,12rem)] text-ink text-balance leading-[0.9]">
          Просто<br />
          <em className="grad-text italic">открой</em> Telegram.
        </h2>
        <div className="mt-14 flex flex-col items-center gap-4">
          <a
            href={ctaLinks.final}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-4 rounded-full bg-ink px-9 py-6 text-[16px] font-medium text-primary-foreground transition hover:scale-[1.03]"
          >
            <span>Забрать 3 дня бесплатно</span>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary-foreground text-ink transition-transform group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
          <span className="text-[13px] text-ink-mute">{productFacts.telegramBot} · {productFacts.trial}</span>
        </div>

        <motion.div
          style={{ scale }}
          className="mt-24 flex items-center justify-center"
        >
          <div className="display grad-text text-[clamp(6rem,22vw,22rem)] leading-none">
            DvinVPN
          </div>
        </motion.div>
      </div>

      <footer className="mx-auto mt-12 flex max-w-[1400px] flex-col items-start justify-between gap-6 px-6 pt-10 text-[13px] text-ink-mute md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <img src="/assets/dvinvpn-logo.png" width={28} height={28} alt="" className="rounded-md" />
          <span>© {new Date().getFullYear()} DvinVPN. Все права защищены.</span>
        </div>
        <div className="flex gap-6">
          {legalLinks.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="hover:text-ink">
              {l.label}
            </a>
          ))}
        </div>
      </footer>
    </section>
  );
}

/* ---------- Page ---------- */
function Landing() {
  useLenis();
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <CursorBlob />
      <Header />
      <Hero />
      <Marquee />
      <MiniAppScene />
      <FeatureStories />
      <Capabilities />
      <Bonuses />
      <Pricing />
      <Reviews />
      <Faq />
      <Final />
    </main>
  );
}
