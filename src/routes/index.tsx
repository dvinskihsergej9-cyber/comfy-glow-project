import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useMotionValue,
  useReducedMotion,
  AnimatePresence,
  animate,
  MotionValue,
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

/* ============================================================
   SMOOTH SCROLL — Lenis (respects reduced-motion)
============================================================ */
function useLenis() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.1,
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
  }, [reduced]);
}

/* ============================================================
   PERSISTENT GRADIENT ORB — lives across the whole page.
   Its position/scale/hue mutate with global scroll, so Hero,
   Mini App scene and Final share the same object.
============================================================ */
function AmbientStage({ scrollY }: { scrollY: MotionValue<number> }) {
  // stage 0 → hero, 1 → miniapp, 2 → features, 3 → pricing, 4 → final
  const y = useTransform(scrollY, [0, 1000, 2200, 3600, 5200], [-140, 260, 620, 1100, 1600]);
  const x = useTransform(scrollY, [0, 1000, 2200, 3600, 5200], [-200, 120, -280, 200, 0]);
  const scale = useTransform(scrollY, [0, 1000, 2200, 3600, 5200], [1.05, 1.6, 1.15, 1.35, 2.2]);
  const rotate = useTransform(scrollY, [0, 5200], [0, 240]);
  const hue = useTransform(
    scrollY,
    [0, 1200, 2400, 3600, 5200],
    [
      "conic-gradient(from 0deg, oklch(0.55 0.24 295), oklch(0.58 0.22 260), oklch(0.72 0.14 195), oklch(0.55 0.24 295))",
      "conic-gradient(from 90deg, oklch(0.58 0.22 260), oklch(0.72 0.14 195), oklch(0.55 0.24 295), oklch(0.58 0.22 260))",
      "conic-gradient(from 160deg, oklch(0.72 0.14 195), oklch(0.55 0.24 295), oklch(0.58 0.22 260), oklch(0.72 0.14 195))",
      "conic-gradient(from 220deg, oklch(0.55 0.24 295), oklch(0.72 0.14 195), oklch(0.58 0.22 260), oklch(0.55 0.24 295))",
      "conic-gradient(from 320deg, oklch(0.58 0.22 260), oklch(0.55 0.24 295), oklch(0.72 0.14 195), oklch(0.58 0.22 260))",
    ] as unknown as string[]
  );
  return (
    <motion.div
      aria-hidden
      style={{ x, y, scale, rotate, background: hue as unknown as string }}
      className="pointer-events-none fixed left-1/2 top-0 z-0 h-[720px] w-[720px] -translate-x-1/2 rounded-full blur-[110px] opacity-[0.55] mix-blend-multiply"
    />
  );
}

/* ============================================================
   CURSOR — soft aurora that trails the pointer.
============================================================ */
function CursorAurora() {
  const reduced = useReducedMotion();
  const x = useSpring(0, { stiffness: 110, damping: 22, mass: 0.7 });
  const y = useSpring(0, { stiffness: 110, damping: 22, mass: 0.7 });
  const s = useSpring(1, { stiffness: 140, damping: 18 });
  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      const inter = t?.closest("a,button,[data-cursor]");
      s.set(inter ? 1.35 : 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y, s, reduced]);
  if (reduced) return null;
  return (
    <motion.div
      aria-hidden
      style={{ x, y, scale: s, translateX: "-50%", translateY: "-50%" }}
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-[380px] w-[380px] rounded-full md:block"
    >
      <div className="glow-orb h-full w-full grad-bg" />
    </motion.div>
  );
}

/* ============================================================
   HEADER
============================================================ */
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
    >
      <div className="mx-auto max-w-[1400px] px-6">
        <div
          className={`flex items-center justify-between rounded-full border transition-all duration-500 ${
            scrolled
              ? "border-line/70 bg-background/70 px-4 py-2 backdrop-blur-xl shadow-[0_10px_40px_-20px_oklch(0.12_0.025_265_/_0.15)]"
              : "border-transparent px-2 py-1"
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5 pl-2" data-cursor>
            <img src="/assets/dvinvpn-logo.png" width={34} height={34} alt="" className="rounded-lg" />
            <span className="text-[15px] font-medium tracking-tight text-ink">DvinVPN</span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="rounded-full px-4 py-2 text-[13.5px] text-ink-soft transition hover:bg-milk hover:text-ink"
                data-cursor
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href={ctaLinks.hero}
            target="_blank"
            rel="noreferrer"
            data-cursor
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

/* ============================================================
   ICONS
============================================================ */
function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

/* ============================================================
   HERO — scroll-driven, headline separates & sinks under mask,
   plate lifts down to become the stage of the next section.
============================================================ */
function Hero({ mx, my }: { mx: MotionValue<number>; my: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Line-level moves — each line escapes at a different velocity.
  const line1Y = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const line2Y = useTransform(scrollYProgress, [0, 1], [0, -320]);
  const line1X = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const line2X = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const hLetterSp = useTransform(scrollYProgress, [0, 1], ["-0.03em", "0.01em"]);

  // Plate: lifts DOWN as you scroll, growing & tilting into the Mini App stage.
  const plateY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const plateScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const plateRotX = useTransform(scrollYProgress, [0, 1], [0, -6]);

  // Cursor parallax (very subtle)
  const cx = useTransform(mx, [-1, 1], [-14, 14]);
  const cy = useTransform(my, [-1, 1], [-10, 10]);

  const line1 = "Твой VPN живёт".split(" ");
  const line2 = "в Telegram.".split(" ");

  return (
    <section ref={ref} id="top" className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-40">
      <motion.div className="relative mx-auto max-w-[1400px] px-6">
        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="mb-10 flex items-center justify-between gap-4 text-[12px]"
        >
          <span className="mono-tag">— {productFacts.name} · index /01</span>
          <span className="mono-tag hidden md:inline">Проверено {productFacts.verifiedAt}</span>
        </motion.div>

        {/* Headline — two lines, each in an overflow mask */}
        <h1 className="display text-[clamp(3rem,10vw,10.5rem)] text-ink text-balance" style={{ letterSpacing: hLetterSp as unknown as string }}>
          <span className="block overflow-hidden pb-[0.12em]">
            <motion.span style={{ y: line1Y, x: line1X }} className="block will-change-transform">
              {line1.map((w, i) => (
                <StaggerWord key={i} delay={0.2 + i * 0.09}>
                  {w}
                </StaggerWord>
              ))}
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.12em]">
            <motion.span style={{ y: line2Y, x: line2X }} className="block will-change-transform">
              {line2.map((w, i) => (
                <StaggerWord key={i} delay={0.45 + i * 0.09} accent={i === 0}>
                  {w}
                </StaggerWord>
              ))}
            </motion.span>
          </span>
        </h1>

        {/* Sub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-14 grid grid-cols-1 items-end gap-8 md:grid-cols-12"
        >
          <p className="md:col-span-5 text-[18px] leading-relaxed text-ink-soft text-pretty">
            Никаких приложений и сайтов-ловушек. Открываешь Mini App — видишь тариф, пробный период, оплату и подключение в одном окне.
          </p>
          <div className="md:col-span-4 md:col-start-8 flex flex-col gap-3">
            <a
              href={ctaLinks.hero}
              target="_blank"
              rel="noreferrer"
              data-cursor
              className="group relative inline-flex items-center justify-between gap-4 overflow-hidden rounded-full bg-ink px-7 py-5 text-[15px] font-medium text-primary-foreground transition"
            >
              <span className="relative z-10">Забрать 3 дня бесплатно</span>
              <span className="relative z-10 grid h-9 w-9 place-items-center rounded-full bg-primary-foreground text-ink transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
              <span className="absolute inset-0 -translate-x-full grad-bg transition-transform duration-500 group-hover:translate-x-0" />
            </a>
            <span className="pl-2 text-[13.5px] text-ink-mute">{productFacts.trial}</span>
          </div>
        </motion.div>

        {/* Plate — becomes the Mini App stage on scroll */}
        <motion.div
          style={{ y: plateY, scale: plateScale, rotateX: plateRotX, transformPerspective: 1400, x: cx, translateY: cy }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-20 max-w-[1140px] will-change-transform"
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
              <FloatingLabel className="left-[6%] top-[16%]" delay={1.6}>Подключение · 12 сек</FloatingLabel>
              <FloatingLabel className="right-[6%] top-[30%]" delay={1.8}>Безлимитный трафик</FloatingLabel>
              <FloatingLabel className="left-[10%] bottom-[14%]" delay={2.0}>от 108 ₽ / мес</FloatingLabel>

              {/* animated connector line */}
              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 62" preserveAspectRatio="none">
                <motion.path
                  d="M12 22 Q40 8 60 30 T90 40"
                  fill="none"
                  stroke="white"
                  strokeOpacity="0.55"
                  strokeWidth="0.25"
                  strokeDasharray="0.6 0.8"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.7, duration: 1.6, ease: "easeOut" }}
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function StaggerWord({ children, delay = 0, accent = false }: { children: React.ReactNode; delay?: number; accent?: boolean }) {
  return (
    <span className="mr-[0.18em] inline-block overflow-hidden pb-[0.06em] align-top">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
      >
        {accent ? <em className="grad-text italic">{children}</em> : children}
      </motion.span>
    </span>
  );
}

function FloatingLabel({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute rounded-full border border-white/40 bg-white/85 px-4 py-2 text-[12.5px] font-medium text-ink shadow-lg backdrop-blur ${className}`}
    >
      <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-teal align-middle" />
      {children}
    </motion.div>
  );
}

/* ============================================================
   MARQUEE — bridge from Hero into the app scene.
============================================================ */
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

/* ============================================================
   MINI APP SCENE — pinned, phone with real UI screens layered,
   callouts fly out of the frame, progress dominant, background shifts.
============================================================ */
const SCENE_MARKS = [
  {
    // dashboard
    callouts: [
      { text: "Срок и устройства сразу видны", pos: "-left-[38%] top-[16%]", tail: "left" as const },
      { text: "Инструкция → Happ в один тап", pos: "-right-[42%] top-[42%]", tail: "right" as const },
      { text: "Продление тут же, без ухода из чата", pos: "-left-[36%] bottom-[18%]", tail: "left" as const },
    ],
    tint: "oklch(0.94 0.05 260)",
  },
  {
    // pricing
    callouts: [
      { text: "Период — цена — состав, до оплаты", pos: "-right-[44%] top-[18%]", tail: "right" as const },
      { text: "Пересчёт устройств в реальном времени", pos: "-left-[40%] top-[46%]", tail: "left" as const },
      { text: "YooKassa · T-pay", pos: "-right-[36%] bottom-[20%]", tail: "right" as const },
    ],
    tint: "oklch(0.93 0.06 295)",
  },
  {
    // cabinet
    callouts: [
      { text: "FAQ, отзывы, статус серверов", pos: "-left-[42%] top-[20%]", tail: "left" as const },
      { text: "Промокоды и документы", pos: "-right-[36%] top-[44%]", tail: "right" as const },
      { text: "Поддержка внутри Telegram", pos: "-left-[38%] bottom-[16%]", tail: "left" as const },
    ],
    tint: "oklch(0.94 0.05 195)",
  },
];

function MiniAppScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  const N = miniAppScreens.length;
  const spring = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.6 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(N - 1, Math.max(0, Math.floor(v * N * 0.999)));
    setActive(idx);
  });

  // Phone tilt / scale scripted over scroll
  const phoneScale = useTransform(spring, [0, 0.5, 1], [0.92, 1.05, 0.95]);
  const phoneRotY = useTransform(spring, [0, 0.5, 1], [-8, 0, 8]);
  const phoneY = useTransform(spring, [0, 1], [40, -40]);

  const progress = useTransform(spring, [0, 1], ["0%", "100%"]);
  const tint = SCENE_MARKS[active]?.tint ?? "oklch(0.95 0.02 260)";

  return (
    <section id="miniapp" ref={ref} className="relative" style={{ height: `${N * 110}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* animated background tint bound to the active screen */}
        <motion.div
          aria-hidden
          animate={{ background: `radial-gradient(60% 60% at 50% 40%, ${tint} 0%, transparent 70%)` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 -z-10"
        />

        {/* prominent progress rail */}
        <div className="absolute inset-x-0 top-[76px] z-20">
          <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-6">
            <span className="mono-tag whitespace-nowrap">
              Mini App · {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
            </span>
            <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-line/80">
              <motion.div className="absolute inset-y-0 left-0 grad-bg" style={{ width: progress }} />
            </div>
            <div className="hidden gap-1 md:flex">
              {miniAppScreens.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition ${i === active ? "grad-bg" : "bg-line"}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-16 px-6 pt-16 md:grid-cols-12">
          {/* Text side — masked reveals */}
          <div className="md:col-span-5">
            <div className="mono-tag mb-6">— Сцена / {String(active + 1).padStart(2, "0")}</div>
            <div className="relative h-[240px] md:h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                >
                  <h2 className="display text-[clamp(2.5rem,5.2vw,4.8rem)] text-ink text-balance">
                    {(miniAppScreens[active].title || "").split(" ").map((w, i) => (
                      <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-top">
                        <motion.span
                          initial={{ y: "110%" }}
                          animate={{ y: 0 }}
                          transition={{ delay: 0.05 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                          className="inline-block"
                        >
                          {w}
                        </motion.span>
                      </span>
                    ))}
                  </h2>
                  <div className="mt-6 overflow-hidden">
                    <motion.p
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="max-w-md text-[17px] leading-relaxed text-ink-soft text-pretty"
                    >
                      {miniAppScreens[active].text}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Phone stage */}
          <div className="md:col-span-7 relative flex justify-center">
            <motion.div
              style={{ scale: phoneScale, rotateY: phoneRotY, y: phoneY, transformPerspective: 1500 }}
              className="relative h-[560px] w-[290px] md:h-[660px] md:w-[340px] will-change-transform"
            >
              {/* Phone bezel */}
              <div className="absolute inset-0 rounded-[42px] border border-line/70 bg-white p-2 shadow-[var(--shadow-plate)]">
                <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-milk">
                  {miniAppScreens.map((s, i) => {
                    const offset = i - active;
                    return (
                      <motion.img
                        key={s.src}
                        src={s.src}
                        alt={s.alt}
                        animate={{
                          y: offset === 0 ? 0 : offset < 0 ? -60 : 60,
                          scale: offset === 0 ? 1 : 0.95,
                          opacity: offset === 0 ? 1 : 0,
                          filter: offset === 0 ? "blur(0px)" : "blur(6px)",
                        }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    );
                  })}
                  {/* notch */}
                  <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-ink/85" />
                </div>
              </div>

              {/* Callouts — real UI fragments spilling out */}
              <AnimatePresence>
                {SCENE_MARKS[active]?.callouts.map((c, i) => (
                  <Callout key={`${active}-${i}`} delay={0.15 + i * 0.12} pos={c.pos} tail={c.tail}>
                    {c.text}
                  </Callout>
                ))}
              </AnimatePresence>

              {/* Orbit ring */}
              <motion.div
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                className="pointer-events-none absolute -inset-16 rounded-full border border-dashed border-line/60"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Callout({
  children,
  pos,
  tail,
  delay = 0,
}: {
  children: React.ReactNode;
  pos: string;
  tail: "left" | "right";
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: tail === "left" ? -20 : 20, y: 8 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute hidden md:block ${pos} z-30`}
    >
      <div className="relative max-w-[240px] rounded-2xl border border-line/70 bg-white/95 px-4 py-3 text-[13px] font-medium leading-snug text-ink shadow-[0_20px_50px_-20px_rgba(20,20,40,0.25)] backdrop-blur">
        <div className="mono-tag mb-1 !text-[10px]">UI · fragment</div>
        {children}
        <span
          aria-hidden
          className={`absolute top-1/2 -translate-y-1/2 h-px w-16 grad-bg ${tail === "left" ? "left-full" : "right-full"}`}
        />
        <span
          aria-hidden
          className={`absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full grad-bg ${tail === "left" ? "left-[calc(100%+3.5rem)]" : "right-[calc(100%+3.5rem)]"}`}
        />
      </div>
    </motion.div>
  );
}

/* ============================================================
   FEATURE STORIES — each row is a different visual archetype.
============================================================ */
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
  const y = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const yBg = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rot = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const reverse = index % 2 === 1;

  const visuals: React.ReactNode[] = [
    // 0 — enormous 01 with orbiting satellites
    <div className="relative grid aspect-square place-items-center overflow-hidden rounded-[32px] bg-milk">
      <motion.div style={{ y: yBg }} aria-hidden className="glow-orb absolute -top-24 -left-16 h-[360px] w-[360px] grad-bg" />
      <motion.span style={{ rotate: rot }} className="display grad-text text-[clamp(9rem,22vw,20rem)] leading-none">
        01
      </motion.span>
      <span className="absolute bottom-8 left-8 mono-tag">Один шаг в Telegram</span>
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute inset-8 rounded-full border border-dashed border-line/70"
      >
        <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full grad-bg" />
        <span className="absolute top-1/2 -right-1.5 h-2 w-2 -translate-y-1/2 rounded-full bg-teal" />
      </motion.div>
    </div>,
    // 1 — animated price plate
    <div className="relative aspect-square overflow-hidden rounded-[32px] grad-bg p-10 text-primary-foreground">
      <div className="mono-tag !text-white/70">от / месяц</div>
      <div className="display mt-4 text-[clamp(5rem,15vw,10rem)] leading-none">
        <AnimatedNumber value={108} />
        <span className="text-[3rem] align-top"> ₽</span>
      </div>
      <div className="absolute bottom-8 left-10 right-10 flex justify-between text-[13.5px] text-white/85">
        <span>Безлимит трафика</span>
        <span>до 5 устройств</span>
      </div>
      {/* pulse grid */}
      <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
    </div>,
    // 2 — Happ setup + connection line
    <div className="relative aspect-square overflow-hidden rounded-[32px] border border-line bg-white">
      <motion.img
        src="/assets/dvinvpn-client-connect.jpg"
        alt=""
        style={{ scale: useTransform(scrollYProgress, [0, 1], [1.15, 1]) }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M8 82 Q30 50 55 55 T92 22"
          fill="none"
          stroke="white"
          strokeOpacity="0.85"
          strokeWidth="0.4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-8 text-white">
        <div className="mono-tag !text-white/70">Happ · рекомендуемый клиент</div>
        <div className="mt-2 text-2xl font-medium">Один тап — и ты подключён</div>
      </div>
    </div>,
    // 3 — bonuses
    <div className="relative aspect-square overflow-hidden rounded-[32px] bg-ink text-primary-foreground">
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-70"
        style={{ background: "conic-gradient(from 0deg, oklch(0.55 0.24 295), oklch(0.58 0.22 260), oklch(0.72 0.14 195), oklch(0.55 0.24 295))" }}
      />
      <div className="absolute inset-6 grid place-items-center rounded-[24px] bg-ink/70 backdrop-blur">
        <div className="text-center">
          <div className="mono-tag !text-white/70">Каждый день</div>
          <div className="display mt-3 text-[clamp(2rem,4vw,3.5rem)]">Спин · Игры · Промокоды</div>
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
        <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ink-soft text-pretty">{f.text}</p>
      </div>
    </div>
  );
}

/* ============================================================
   ANIMATED NUMBER
============================================================ */
function AnimatedNumber({ value, duration = 1.2 }: { value: number; duration?: number }) {
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  const seen = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(mv, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    const un = mv.on("change", (v) => setDisplay(Math.round(v)));
    return () => {
      controls.stop();
      un();
    };
  }, [value, duration, mv]);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !seen.current) {
        seen.current = true;
      }
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return <span ref={ref}>{display.toLocaleString("ru")}</span>;
}

/* ============================================================
   SECTION INTRO
============================================================ */
function SectionIntro({ tag, title, kicker }: { tag: string; title: string; kicker?: string }) {
  return (
    <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12">
      <div className="md:col-span-7">
        <div className="mono-tag">— {tag}</div>
        <h2 className="display mt-6 text-[clamp(2.5rem,7vw,6.5rem)] text-ink text-balance">
          {title.split(" ").map((w, i) => (
            <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-top">
              <motion.span
                initial={{ y: "110%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: i * 0.06, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h2>
      </div>
      {kicker && (
        <p className="md:col-span-4 md:col-start-9 text-[16.5px] leading-relaxed text-ink-soft text-pretty">
          {kicker}
        </p>
      )}
    </div>
  );
}

/* ============================================================
   CAPABILITIES
============================================================ */
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
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.6 }}
              className="group relative bg-background p-8 transition hover:bg-white"
            >
              <div className="mono-tag">/{String(i + 1).padStart(2, "0")}</div>
              <div className="mt-6 text-[20px] font-medium tracking-tight text-ink">{c.title}</div>
              <div className="mt-3 text-[15px] leading-relaxed text-ink-soft">{c.text}</div>
              <div className="absolute inset-x-0 bottom-0 h-[2px] w-0 grad-bg transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   BONUSES
============================================================ */
function Bonuses() {
  return (
    <section id="bonus" className="relative overflow-hidden py-32">
      <motion.div
        aria-hidden
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="glow-orb absolute -top-20 right-1/3 h-[520px] w-[520px]"
        style={{ background: "oklch(0.55 0.24 295)" }}
      />
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
                i === 0 ? "col-span-1 md:col-span-2 lg:col-span-3 lg:row-span-2 grad-bg text-primary-foreground min-h-[400px]" : "border border-line bg-white text-ink min-h-[220px]"
              }`}
            >
              <div className={`mono-tag ${i === 0 ? "!text-white/70" : ""}`}>/{String(i + 1).padStart(2, "0")}</div>
              <div>
                <div className={`display text-[clamp(1.6rem,2.5vw,2.5rem)] ${i === 0 ? "text-white" : "text-ink"}`}>{g.title}</div>
                <p className={`mt-3 text-[15px] leading-relaxed ${i === 0 ? "text-white/85" : "text-ink-soft"}`}>{g.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PRICING — animated numbers, recommended plan scales up,
   selection changes device count and period smoothly.
============================================================ */
function Pricing() {
  const [devices, setDevices] = useState(1);
  const [activeId, setActiveId] = useState<string>("12m");

  return (
    <section id="pricing" className="relative py-40">
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionIntro tag="/05 Тарифы" title="Один тариф. Четыре периода." kicker={productFacts.trial} />

        {/* Devices selector */}
        <div className="mt-16 flex flex-wrap items-center gap-6">
          <span className="mono-tag">Устройств: {devices}</span>
          <div className="inline-flex items-center gap-1 rounded-full border border-line bg-white p-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setDevices(n)}
                data-cursor
                className={`relative h-10 w-10 rounded-full text-[14px] transition ${
                  devices === n ? "text-primary-foreground" : "text-ink-soft hover:bg-milk"
                }`}
              >
                {devices === n && (
                  <motion.span
                    layoutId="dev-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                <span className="relative z-10">{n}</span>
              </button>
            ))}
          </div>
          <span className="text-[13.5px] text-ink-mute">
            +50–390 ₽ за каждое дополнительное устройство в зависимости от периода
          </span>
        </div>

        {/* Plans */}
        <div className="mt-14 space-y-4">
          {pricingPlans.map((p, i) => {
            const extra = (devices - 1) * p.extraDevicePrice;
            const total = p.price + extra;
            const isActive = activeId === p.id;
            const isRecommended = !!p.badge;
            return (
              <PricingRow
                key={p.id}
                index={i}
                plan={p}
                total={total}
                extra={extra}
                devices={devices}
                isActive={isActive}
                isRecommended={isRecommended}
                onFocus={() => setActiveId(p.id)}
              />
            );
          })}
        </div>
        <p className="mt-8 max-w-2xl text-[14px] leading-relaxed text-ink-mute">
          Финальная цена, доступность оплаты и применимость промокодов подтверждаются внутри DvinVPN перед оплатой. Оплата через YooKassa и T-pay.
        </p>
      </div>
    </section>
  );
}

function PricingRow({
  index,
  plan,
  total,
  extra,
  devices,
  isActive,
  isRecommended,
  onFocus,
}: {
  index: number;
  plan: (typeof pricingPlans)[number];
  total: number;
  extra: number;
  devices: number;
  isActive: boolean;
  isRecommended: boolean;
  onFocus: () => void;
}) {
  return (
    <motion.a
      href={ctaLinks.pricing}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.07, duration: 0.6 }}
      onMouseEnter={onFocus}
      onFocus={onFocus}
      animate={{
        scale: isActive ? 1.015 : 1,
        boxShadow: isActive
          ? "0 40px 80px -30px rgba(60,40,140,0.28), 0 20px 40px -20px rgba(30,60,180,0.22)"
          : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      data-cursor
      className={`group relative block overflow-hidden rounded-[24px] border bg-white transition ${
        isActive ? "border-ink/70" : "border-line hover:border-ink/40"
      }`}
    >
      {/* recommended shimmer */}
      {isRecommended && (
        <motion.span
          aria-hidden
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
        />
      )}
      <div className="relative grid grid-cols-6 items-center gap-4 px-6 py-8 md:grid-cols-12 md:px-10 md:py-10">
        <div className="col-span-2 md:col-span-1 mono-tag">/0{index + 1}</div>
        <div className="col-span-4 md:col-span-3">
          <div className="display text-[clamp(1.8rem,3vw,2.6rem)] text-ink">{plan.label}</div>
          {isRecommended && (
            <div className="mt-2 inline-block rounded-full grad-bg px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-widest text-white">
              {plan.badge} · экономия {Math.round((1 - plan.perMonth / pricingPlans[0].perMonth) * 100)}%
            </div>
          )}
        </div>
        <div className="col-span-3 md:col-span-3 text-[14px] text-ink-soft">
          <div>
            <span className="font-medium text-ink">{plan.perMonth}</span> ₽ / мес
          </div>
          <div className="mt-1 text-[13px] text-ink-mute">
            {devices} {devices === 1 ? "устройство" : devices < 5 ? "устройства" : "устройств"}
            {extra > 0 ? ` · +${extra} ₽ доплата` : " · включено"}
          </div>
        </div>
        <div className="col-span-3 md:col-span-3 text-right md:text-left">
          <div className="display text-[clamp(2.2rem,4.4vw,3.8rem)] text-ink leading-none">
            <AnimatedNumber value={total} />{" "}
            <span className="text-[0.36em] align-middle text-ink-mute">₽</span>
          </div>
          <div className="mt-1 text-[12px] text-ink-mute">итого за {plan.months} мес</div>
        </div>
        <div className="col-span-6 md:col-span-2 flex justify-end">
          <motion.span
            animate={{ scale: isActive ? 1.15 : 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`inline-flex h-14 w-14 items-center justify-center rounded-full transition ${
              isActive ? "bg-ink text-primary-foreground" : "border border-line text-ink group-hover:bg-ink group-hover:text-primary-foreground"
            } group-hover:rotate-45`}
          >
            <ArrowUpRight className="h-5 w-5" />
          </motion.span>
        </div>
      </div>
      {/* underline */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 grad-bg transition-transform duration-500 group-hover:scale-x-100" />
    </motion.a>
  );
}

/* ============================================================
   REVIEWS
============================================================ */
function Reviews() {
  return (
    <section id="reviews" className="relative overflow-hidden bg-ink py-32 text-primary-foreground">
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="glow-orb absolute -top-40 -right-40 h-[600px] w-[600px] grad-bg"
      />
      <div className="relative mx-auto max-w-[1400px] px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="mono-tag !text-white/60">— /06 Отзывы</div>
            <h2 className="display mt-6 text-[clamp(2.5rem,6vw,5.5rem)] text-white text-balance">
              Из чата <em className="grad-text italic">DvinVPN</em>.
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: -1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 overflow-hidden rounded-[28px] border border-white/15 bg-white/5 p-2 shadow-2xl"
            >
              <img src="/assets/telegram-reviews.jpg" alt="Отзывы в Telegram" className="w-full rounded-[22px]" />
            </motion.div>
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
                <footer className="mt-5 flex items-center gap-3 text-[13.5px] text-white/60">
                  <span className="grid h-9 w-9 place-items-center rounded-full grad-bg text-white text-[14px] font-medium">
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

/* ============================================================
   FAQ
============================================================ */
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
                  data-cursor
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-[clamp(1.15rem,2vw,1.75rem)] font-medium tracking-tight text-ink">
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
                      <p className="max-w-3xl pb-8 text-[16px] leading-relaxed text-ink-soft">{item.a}</p>
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

/* ============================================================
   FINAL — logo assembled from a swarm of dots, CTA as climax.
============================================================ */
function Final() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.7, 1], [0.55, 1.05, 1.15]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -60]);

  // seed the swarm of dots that gather into the logo
  const dots = useMemo(
    () =>
      new Array(48).fill(0).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 900,
        y: (Math.random() - 0.5) * 500,
        d: Math.random() * 0.5,
      })),
    []
  );

  return (
    <section ref={ref} className="relative overflow-hidden bg-milk pt-32 pb-16">
      <div className="mx-auto max-w-[1400px] px-6 text-center">
        <div className="mono-tag">— /08 Финал</div>

        {/* Assembled headline — words reveal from a mask */}
        <h2 className="display mt-6 text-[clamp(3rem,12vw,12rem)] text-ink text-balance leading-[0.9]">
          {["Просто", "открой", "Telegram."].map((w, i) => (
            <span key={i} className="mr-[0.18em] inline-block overflow-hidden pb-[0.08em] align-top">
              <motion.span
                initial={{ y: "110%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {i === 1 ? <em className="grad-text italic">{w}</em> : w}
              </motion.span>
              {i === 0 && <br />}
            </span>
          ))}
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-col items-center gap-4"
        >
          <a
            href={ctaLinks.final}
            target="_blank"
            rel="noreferrer"
            data-cursor
            className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-ink px-9 py-6 text-[16.5px] font-medium text-primary-foreground transition"
          >
            <span className="relative z-10">Забрать 3 дня бесплатно</span>
            <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full bg-primary-foreground text-ink transition-transform group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </span>
            <span className="absolute inset-0 -translate-x-full grad-bg transition-transform duration-500 group-hover:translate-x-0" />
            <motion.span
              aria-hidden
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-2 -z-10 rounded-full grad-bg opacity-40 blur-2xl"
            />
          </a>
          <span className="text-[13.5px] text-ink-mute">{productFacts.telegramBot} · {productFacts.trial}</span>
        </motion.div>

        {/* Assembled logotype */}
        <motion.div style={{ scale, y }} className="relative mt-24 flex items-center justify-center">
          {/* swarm dots that fly into the wordmark */}
          <div className="pointer-events-none absolute inset-0">
            {dots.map((d) => (
              <motion.span
                key={d.id}
                initial={{ x: d.x, y: d.y, opacity: 0 }}
                whileInView={{ x: 0, y: 0, opacity: [0, 0.8, 0] }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.2 + d.d, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full grad-bg"
              />
            ))}
          </div>
          <div className="display grad-text text-[clamp(6rem,22vw,22rem)] leading-none">
            DvinVPN
          </div>
        </motion.div>
      </div>

      <footer className="mx-auto mt-12 flex max-w-[1400px] flex-col items-start justify-between gap-6 px-6 pt-10 text-[13.5px] text-ink-mute md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <img src="/assets/dvinvpn-logo.png" width={28} height={28} alt="" className="rounded-md" />
          <span>© {new Date().getFullYear()} DvinVPN. Все права защищены.</span>
        </div>
        <div className="flex gap-6">
          {legalLinks.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="hover:text-ink" data-cursor>
              {l.label}
            </a>
          ))}
        </div>
      </footer>
    </section>
  );
}

/* ============================================================
   PAGE
============================================================ */
function Landing() {
  useLenis();

  // shared mouse motion values for cursor parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mx.set(nx);
      my.set(ny);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  // global scroll for the persistent orb
  const scrollY = useMotionValue(0);
  useEffect(() => {
    const onScroll = () => scrollY.set(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollY]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <AmbientStage scrollY={scrollY} />
      <CursorAurora />
      <Header />
      <Hero mx={mx} my={my} />
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
