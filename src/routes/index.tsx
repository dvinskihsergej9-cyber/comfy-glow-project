import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  useMotionValue,
  useMotionValueEvent,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  Menu,
  X,
  Check,
  ChevronDown,
  Send,
  Globe,
  Sparkles,
  Shield,
  Zap,
  Smartphone,
  Monitor,
  HeadphonesIcon,
  Gift,
} from "lucide-react";
import { A } from "@/lib/assets";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DvinVPN — VPN в Telegram и браузере" },
      {
        name: "description",
        content:
          "Попробуйте DvinVPN бесплатно 3 дня. Управляйте подпиской, устройствами, оплатой и подключением через Telegram Mini App или веб-кабинет.",
      },
      { property: "og:title", content: "DvinVPN — VPN в Telegram и браузере" },
      {
        property: "og:description",
        content: "3 дня бесплатно, до 5 устройств, от 108 ₽/мес.",
      },
      { property: "og:url", content: "https://comfy-glow-project.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://comfy-glow-project.lovable.app/" }],
  }),
  component: LandingPage,
});

/* -------------------------------------------------------- */
/*  Links                                                    */
/* -------------------------------------------------------- */

const TG = (utm: string) => `https://t.me/DvinVPNBot?start=${utm}`;
const WEB = (medium: string) =>
  `https://shop.dvinconnect.store/?utm_source=landing&utm_medium=${medium}&utm_campaign=website`;

/* -------------------------------------------------------- */
/*  PhoneFrame — единая iPhone-рамка на всём сайте           */
/* -------------------------------------------------------- */

function PhoneFrame({
  children,
  className = "",
  notch = true,
  glow = true,
}: {
  children: React.ReactNode;
  className?: string;
  notch?: boolean;
  glow?: boolean;
}) {
  return (
    <div
      className={`relative aspect-[9/19.5] rounded-[14%/6.5%] p-[3.2%] bg-gradient-to-b from-white/25 via-white/[0.08] to-white/[0.04] ${
        glow ? "shadow-[0_30px_90px_-30px_rgba(124,58,237,0.55)]" : ""
      } ${className}`}
    >
      <div className="relative w-full h-full rounded-[12%/5.6%] overflow-hidden bg-black">
        {children}
        {notch && (
          <div className="absolute top-[1.6%] left-1/2 -translate-x-1/2 w-[32%] h-[3.2%] bg-black rounded-full z-20 ring-1 ring-white/5" />
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------- */
/*  Header                                                   */
/* -------------------------------------------------------- */

const NAV = [
  { label: "Как работает", href: "#how" },
  { label: "Mini App", href: "#miniapp" },
  { label: "Возможности", href: "#features" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Отзывы", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-[#050711]/70 border-b border-white/5" : ""
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 md:px-10 py-4">
        <a href="#top" className="flex items-center gap-2.5 group">
          <img src={A.logo} alt="DvinVPN" className="h-8 w-8 rounded-lg" />
          <span className="font-display text-[17px] font-bold tracking-tight text-text">
            DvinVPN
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="px-3.5 py-2 text-[14px] text-text-mute hover:text-text transition rounded-full hover:bg-white/5"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={WEB("header")}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-[14px] text-text-mute hover:text-text transition rounded-full border border-white/10 hover:border-white/20"
          >
            <Globe className="w-4 h-4" />
            Веб-версия
          </a>
          <a
            href={TG("site_header")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 btn-primary-glow rounded-full px-4 py-2 text-[14px] font-semibold text-white"
          >
            <Send className="w-4 h-4" />
            Telegram
          </a>
          <button
            className="lg:hidden ml-1 p-2 rounded-full border border-white/10"
            onClick={() => setOpen(true)}
            aria-label="Меню"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#050711]/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <img src={A.logo} alt="" className="h-8 w-8 rounded-lg" />
                <span className="font-display font-bold">DvinVPN</span>
              </div>
              <button
                className="p-2 rounded-full border border-white/10"
                onClick={() => setOpen(false)}
                aria-label="Закрыть"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col p-6 gap-1">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="py-4 border-b border-white/5 text-[20px] font-semibold text-text"
                >
                  {n.label}
                </a>
              ))}
              <a
                href={WEB("header_mobile")}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/15 py-3.5 text-[15px]"
              >
                <Globe className="w-4 h-4" /> Веб-версия
              </a>
              <a
                href={TG("site_header_mobile")}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 btn-primary-glow rounded-full py-3.5 text-[15px] font-semibold"
              >
                <Send className="w-4 h-4" /> Открыть в Telegram
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* -------------------------------------------------------- */
/*  Hero                                                     */
/* -------------------------------------------------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#050711]"
    >
      {/* Video BG */}
      <motion.div
        style={{ scale: videoScale }}
        className="absolute inset-0 will-change-transform"
      >
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-55"
          src={A.heroVideo}
          poster={A.heroPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        {/* Globe sits to the right, text has room on the left */}
        <div className="absolute inset-0 bg-[radial-gradient(1000px_800px_at_75%_55%,transparent,rgba(5,7,17,0.65)_55%,#050711_85%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#050711_0%,rgba(5,7,17,0.85)_25%,rgba(5,7,17,0.35)_55%,transparent_100%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050711] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#050711] to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(500px_400px_at_15%_25%,rgba(124,58,237,0.22),transparent),radial-gradient(700px_500px_at_85%_40%,rgba(37,99,235,0.18),transparent)]" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-center px-5 md:px-10 pt-28 pb-16">
        <motion.div style={{ y: textY, opacity }} className="max-w-[1100px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[12px] font-medium text-text-mute backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
            Доступ проверен · база Mini App
          </motion.div>

          <h1 className="mt-6 font-display font-extrabold tracking-[-0.045em] text-[clamp(46px,8.5vw,140px)] leading-[1.02] text-text">
            <MaskLine delay={0.05}>VPN, который</MaskLine>
            <MaskLine delay={0.15}>всегда под рукой.</MaskLine>
            <MaskLine delay={0.28}>
              <span className="text-gradient-accent italic font-medium">В Telegram и браузере.</span>
            </MaskLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-8 max-w-[620px] text-[17px] md:text-[19px] leading-[1.55] text-text-mute"
          >
            Попробуйте DvinVPN бесплатно 3 дня. Управляйте подпиской, устройствами, оплатой и
            подключением в одном личном кабинете.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <a
              href={TG("site_hero")}
              target="_blank"
              rel="noreferrer"
              className="btn-primary-glow inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold text-white"
            >
              <Send className="w-4 h-4" /> Открыть в Telegram
              <ArrowUpRight className="w-4 h-4 opacity-70" />
            </a>
            <a
              href={WEB("hero")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-md px-6 py-3.5 text-[15px] font-semibold text-text hover:bg-white/[0.06] transition"
            >
              <Globe className="w-4 h-4" /> Открыть веб-версию
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 max-w-[880px]"
          >
            {[
              ["3 дня", "бесплатно"],
              ["до 5", "устройств"],
              ["от 108 ₽", "в месяц"],
              ["∞", "трафика"],
            ].map(([big, small]) => (
              <div key={big as string} className="min-w-0">
                <div className="font-display text-[26px] md:text-[32px] font-bold tracking-tight text-text">
                  {big}
                </div>
                <div className="text-[13px] uppercase tracking-[0.14em] text-text-dim mt-1">
                  {small}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Sweeping connection line at bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full h-40 pointer-events-none z-[5]"
        viewBox="0 0 1400 160"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="hero-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="40%" stopColor="#5b5cf6" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 0 120 C 350 30, 700 200, 1050 60 S 1400 100, 1400 100"
          stroke="url(#hero-line)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, delay: 0.4, ease: "easeInOut" }}
        />
      </svg>
    </section>
  );
}

function MaskLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden pt-[0.12em] pb-[0.22em] -my-[0.12em]">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        className="block will-change-transform"
      >
        {children}
      </motion.span>
    </span>
  );
}

/* -------------------------------------------------------- */
/*  How it works                                             */
/* -------------------------------------------------------- */

const STEPS = [
  {
    n: "01",
    title: "Откройте DvinVPN",
    text: "Запустите Telegram-бот или откройте веб-версию.",
    icon: Send,
  },
  {
    n: "02",
    title: "Получите 3 дня",
    text: "Пробный доступ включает 1 устройство без оплаты.",
    icon: Gift,
  },
  {
    n: "03",
    title: "Подключитесь по инструкции",
    text: "Личный кабинет покажет необходимые шаги настройки.",
    icon: Zap,
  },
  {
    n: "04",
    title: "Управляйте подпиской",
    text: "Продлевайте доступ, добавляйте устройства и обращайтесь в поддержку.",
    icon: Shield,
  },
];

function HowItWorks() {
  return (
    <section id="how" className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <SectionLabel>Как это работает</SectionLabel>
            <h2 className="mt-4 font-display font-extrabold tracking-[-0.03em] text-[clamp(36px,5.5vw,76px)] leading-[1.02] max-w-[900px]">
              Откройте. Проверьте. <span className="text-gradient-accent italic font-medium">Подключитесь.</span>
            </h2>
          </div>
          <p className="text-[15px] text-text-mute max-w-[320px] md:text-right">
            Четыре шага от установки до защищённого соединения — всё внутри Telegram.
          </p>
        </div>

        <div className="relative mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="relative rounded-2xl border border-white/8 bg-white/[0.02] p-6 hover:border-white/15 transition"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet to-electric flex items-center justify-center shadow-lg shadow-violet/30">
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <div className="font-mono text-[12px] tracking-widest text-text-dim">{s.n}</div>
              </div>
              <h3 className="mt-6 font-display text-[20px] font-bold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-[14px] text-text-mute leading-[1.6]">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- */
/*  MiniApp Scene (pinned scroll on desktop)                 */
/* -------------------------------------------------------- */

const SCENES = [
  {
    img: A.miniappHome,
    title: "Всё важное перед глазами",
    text: "Срок подписки, устройства и основные действия находятся в одном кабинете.",
    tag: "01 · Главный",
  },
  {
    img: A.payments,
    title: "Платежи и продление",
    text: "Выберите период подписки и удобный способ оплаты.",
    tag: "02 · Оплата",
  },
  {
    img: A.devicesList,
    title: "Устройства",
    text: "Добавляйте устройства и управляйте подключениями в одном месте.",
    tag: "03 · Устройства",
  },
  {
    img: A.supportTicket,
    title: "Поддержка и FAQ",
    text: "Создайте обращение или найдите ответ, не покидая DvinVPN.",
    tag: "04 · Поддержка",
  },
];

function MiniAppScene() {
  const total = SCENES.length;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const scrollDistance = `calc(100svh + ${(total - 1) * 82}svh)`;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((total - 1) / total) * 100}%`],
  );

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.min(total - 1, Math.max(0, Math.round(p * (total - 1))));
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const jumpTo = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    const scrollable = el.offsetHeight - window.innerHeight;
    const target = top + (i / (total - 1)) * scrollable;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      id="miniapp"
      ref={sectionRef}
      className="relative bg-[#080b16] hidden sm:block"
      style={{ height: scrollDistance }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] pointer-events-none" />

        <div className="absolute top-0 left-0 right-0 z-20 mx-auto max-w-[1400px] w-full px-5 md:px-10 pt-7 md:pt-10 flex items-end justify-between gap-8 pointer-events-none">
          <div className="max-w-[720px]">
            <SectionLabel>Mini App</SectionLabel>
            <h2 className="mt-3 font-display font-extrabold tracking-[-0.03em] text-[clamp(28px,4vw,52px)] leading-[1.02] pb-[0.08em]">
              Один кабинет.{" "}
              <span className="text-gradient-accent italic font-medium">Все действия.</span>
            </h2>
          </div>
          <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-text-mute pb-2 hidden lg:block">
            Scroll ↓ · {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>

        <motion.div
          style={{ x, width: `${total * 100}vw` }}
          className="absolute inset-0 flex will-change-transform"
        >
          {SCENES.map((s, i) => (
            <div key={i} className="w-screen h-full flex-shrink-0">
              <div className="mx-auto max-w-[1400px] h-full w-full px-5 md:px-10 pt-[clamp(176px,22svh,280px)] pb-24 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                <div className="lg:col-span-6 xl:col-span-7 text-center lg:text-left max-w-[620px] mx-auto lg:mx-0">
                  <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-cyan">
                    {s.tag}
                  </div>
                  <h3 className="mt-3 md:mt-4 font-display text-[clamp(30px,5vw,64px)] font-bold tracking-[-0.025em] leading-[1.02] pb-[0.08em]">
                    {s.title}
                  </h3>
                  <p className="mt-3 md:mt-6 text-[16px] xl:text-[20px] text-text-mute leading-[1.55] max-w-[560px] mx-auto lg:mx-0">
                    {s.text}
                  </p>
                  <div className="hidden lg:block mt-8 font-mono text-[64px] xl:text-[96px] font-black text-white/[0.04] leading-none select-none">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>

                <div className="lg:col-span-6 xl:col-span-5 flex justify-center min-h-0">
                  <div className="relative">
                    <div className="absolute -inset-16 md:-inset-24 -z-10 bg-[radial-gradient(closest-side,rgba(124,58,237,0.4),transparent_70%)] blur-2xl" />
                    <PhoneFrame className="w-[min(68vw,340px)] lg:w-[340px] xl:w-[380px] max-h-[calc(100svh-260px)]">
                      <img
                        src={s.img}
                        alt={s.title}
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                    </PhoneFrame>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="absolute bottom-8 left-0 right-0 z-20 mx-auto max-w-[1400px] w-full px-5 md:px-10">
          <div className="flex items-center gap-3">
            {SCENES.map((sc, j) => (
              <button
                key={j}
                onClick={() => jumpTo(j)}
                className="group flex-1 flex items-center gap-3 text-left"
              >
                <span
                  className={`font-mono text-[11px] tracking-[0.25em] uppercase transition ${
                    j === active ? "text-white" : "text-text-mute"
                  }`}
                >
                  0{j + 1}
                </span>
                <div className="flex-1 h-[2px] rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-violet to-cyan"
                    animate={{ scaleX: j <= active ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: "left" }}
                  />
                </div>
                <span
                  className={`text-[12px] font-medium hidden lg:inline transition ${
                    j === active ? "text-white" : "text-text-mute group-hover:text-white/70"
                  }`}
                >
                  {sc.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}




/* Mobile scenes - non-pinned */
function MiniAppSceneMobile() {
  return (
    <section id="miniapp-m" className="sm:hidden py-16 px-5 bg-[#080b16] relative">
      <SectionLabel>Mini App</SectionLabel>
      <h2 className="mt-4 font-display font-extrabold tracking-[-0.03em] text-[38px] leading-[1.02]">
        Один кабинет. <span className="text-gradient-accent italic font-medium">Все действия.</span>
      </h2>
      <div className="mt-12 space-y-14">
        {SCENES.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-cyan">{s.tag}</div>
            <h3 className="mt-2 font-display text-[24px] font-bold">{s.title}</h3>
            <p className="mt-2 text-[15px] text-text-mute leading-[1.6]">{s.text}</p>
            <div className="mt-5 relative w-full max-w-[320px] mx-auto aspect-[9/19.5] rounded-[36px] p-[8px] bg-white/10 glow-ring">
              <div className="w-full h-full rounded-[30px] overflow-hidden bg-black flex items-center justify-center">
                <img src={s.img} alt={s.title} className="w-full h-full object-contain" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------- */
/*  Web + Devices                                            */
/* -------------------------------------------------------- */

function WebSection() {
  return (
    <section className="relative py-14 md:py-20 overflow-hidden bg-[#050711]">
      <div className="absolute inset-0 bg-aurora opacity-40" />
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <SectionLabel>Веб-версия</SectionLabel>
            <h2 className="mt-4 font-display font-extrabold tracking-[-0.03em] text-[clamp(36px,5vw,72px)] leading-[1.02]">
              Telegram — не единственный <span className="text-gradient-accent italic font-medium">вариант.</span>
            </h2>
            <p className="mt-6 text-[17px] text-text-mute leading-[1.6] max-w-[460px]">
              Откройте веб-версию DvinVPN в браузере и войдите через Telegram. Управляйте подпиской с
              компьютера или телефона.
            </p>
            <p className="mt-4 text-[14px] text-text-dim leading-[1.6]">
              Для полноценной работы веб-версии требуется вход через Telegram.
            </p>
            <a
              href={WEB("web_section")}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 btn-primary-glow rounded-full px-6 py-3.5 text-[15px] font-semibold text-white"
            >
              <Globe className="w-4 h-4" /> Открыть веб-версию
              <ArrowUpRight className="w-4 h-4 opacity-70" />
            </a>
          </div>

          <div className="lg:col-span-7 relative">
            {/* Browser mock */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9 }}
              className="relative rounded-2xl overflow-hidden card-glass glow-ring"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-white/10" />
                  <span className="w-3 h-3 rounded-full bg-white/10" />
                  <span className="w-3 h-3 rounded-full bg-white/10" />
                </div>
                <div className="ml-4 flex-1 max-w-md rounded-md bg-black/40 px-3 py-1 text-[11px] font-mono text-text-dim">
                  shop.dvinconnect.store
                </div>
              </div>
              <img
                src={A.web}
                alt="DvinVPN веб-версия"
                className="w-full h-auto block object-cover"
              />
            </motion.div>

            {/* Phone overlay */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="hidden md:block absolute -bottom-16 -right-4 w-[190px] aspect-[9/19.5] rounded-[32px] p-[7px] bg-white/10 glow-ring"
            >
              <div className="w-full h-full rounded-[26px] overflow-hidden bg-black">
                <img src={A.miniappHome} alt="" className="w-full h-full object-cover object-top" />
              </div>
            </motion.div>

            {/* Connection line */}
            <svg
              className="hidden md:block absolute -bottom-20 left-0 w-full h-32 pointer-events-none"
              viewBox="0 0 800 100"
            >
              <motion.path
                d="M 100 20 Q 400 90 700 40"
                stroke="url(#hero-line)"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="4 6"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              />
            </svg>
          </div>
        </div>

        {/* Devices statement */}
        <div className="mt-40 md:mt-56 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <SectionLabel>Устройства</SectionLabel>
            <h2 className="mt-4 font-display font-extrabold tracking-[-0.03em] text-[clamp(36px,5vw,84px)] leading-[1.0]">
              Одна подписка.<br />
              <span className="text-gradient-accent italic font-medium">До пяти устройств.</span>
            </h2>
            <p className="mt-6 text-[17px] text-text-mute leading-[1.6] max-w-[520px]">
              Начните с одного устройства и добавляйте новые прямо в личном кабинете. Итоговая цена
              зависит от срока и количества устройств.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl card-glass p-2">
              <img
                src={A.devicesAdd}
                alt="Добавление устройства"
                className="w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- */
/*  Trial                                                    */
/* -------------------------------------------------------- */

function Trial() {
  return (
    <section className="relative py-14 md:py-20 overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(700px_400px_at_50%_50%,rgba(34,211,238,0.12),transparent)]" />
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 relative">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <SectionLabel>Пробный период</SectionLabel>
            <h2 className="mt-4 font-display font-extrabold tracking-[-0.03em] text-[clamp(34px,4.5vw,60px)] leading-[1.02]">
              Сначала проверьте.{" "}
              <span className="text-gradient-accent italic font-medium">Потом решайте.</span>
            </h2>
            <p className="mt-5 text-[16px] text-text-mute max-w-[460px] leading-[1.6]">
              Получите пробный доступ и проверьте подключение до покупки подписки.
            </p>
            <a
              href={TG("site_trial")}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 btn-primary-glow rounded-full px-6 py-3.5 text-[15px] font-semibold text-white"
            >
              <Send className="w-4 h-4" /> Получить 3 дня бесплатно
              <ArrowUpRight className="w-4 h-4 opacity-70" />
            </a>
          </div>
          <div className="lg:col-span-6 grid grid-cols-2 gap-3">
            {[
              { big: "3", small: "дня доступа" },
              { big: "1", small: "устройство" },
            ].map((x, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 text-center"
              >
                <div className="font-display font-black text-[clamp(64px,8vw,104px)] leading-[1] tracking-[-0.04em] text-gradient">
                  {x.big}
                </div>
                <div className="mt-2 text-[12px] uppercase tracking-widest text-text-dim">
                  {x.small}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- */
/*  Pricing calculator                                       */
/* -------------------------------------------------------- */

const PERIODS = [
  { id: 1, label: "1 месяц", months: 1, price: 149, extra: 50 },
  { id: 3, label: "3 месяца", months: 3, price: 399, extra: 120 },
  { id: 6, label: "6 месяцев", months: 6, price: 749, extra: 220 },
  { id: 12, label: "12 месяцев", months: 12, price: 1290, extra: 390, badge: "Выгодно" },
];

function Pricing() {
  const [periodId, setPeriodId] = useState(12);
  const [devices, setDevices] = useState(1);
  const period = PERIODS.find((p) => p.id === periodId)!;

  const total = period.price + period.extra * (devices - 1);
  const perMonth = total / period.months;
  const baseMonthly = 149 * devices;
  const savingsPct = Math.max(
    0,
    Math.round((1 - perMonth / (baseMonthly / 1)) * 100),
  );

  return (
    <section id="pricing" className="relative py-14 md:py-20 overflow-hidden bg-[#080b16]">
      <div className="absolute inset-0 bg-grid opacity-25 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 relative">
        <SectionLabel>Тарифы</SectionLabel>
        <h2 className="mt-4 font-display font-extrabold tracking-[-0.03em] text-[clamp(36px,6vw,88px)] leading-[1.02] max-w-[1100px]">
          Соберите подписку <span className="text-gradient-accent italic font-medium">под себя.</span>
        </h2>

        <div className="mt-16 grid lg:grid-cols-12 gap-8">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-10">
            {/* Period */}
            <div>
              <div className="text-[13px] uppercase tracking-[0.18em] text-text-dim font-mono">
                Срок подписки
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                {PERIODS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPeriodId(p.id)}
                    className={`relative rounded-2xl border px-4 py-4 text-left transition ${
                      p.id === periodId
                        ? "border-transparent bg-gradient-to-br from-violet/25 to-electric/20"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    {p.id === periodId && (
                      <motion.div
                        layoutId="pricing-active"
                        className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/25"
                        transition={{ type: "spring", stiffness: 260, damping: 26 }}
                      />
                    )}
                    <div className="relative">
                      {p.badge && (
                        <div className="inline-block mb-1 text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-cyan/20 text-cyan">
                          {p.badge}
                        </div>
                      )}
                      <div className="font-display text-[18px] font-bold">{p.label}</div>
                      <div className="mt-1 text-[13px] text-text-mute">
                        {p.price.toLocaleString("ru")} ₽
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Devices */}
            <div>
              <div className="flex items-center justify-between">
                <div className="text-[13px] uppercase tracking-[0.18em] text-text-dim font-mono">
                  Устройства
                </div>
                <div className="font-display text-[26px] font-bold">
                  <AnimatedNumber value={devices} /> из 5
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => setDevices((d) => Math.max(1, d - 1))}
                  className="w-11 h-11 rounded-full border border-white/10 hover:border-white/20 flex items-center justify-center text-[20px] leading-none"
                  aria-label="Меньше устройств"
                >
                  −
                </button>
                <div className="flex-1 h-11 rounded-full bg-white/[0.03] border border-white/10 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet to-electric"
                    animate={{ width: `${((devices - 1) / 4) * 100}%` }}
                    transition={{ type: "spring", stiffness: 220, damping: 26 }}
                  />
                  <div className="relative flex h-full items-center justify-between px-4">
                    {[1, 2, 3, 4, 5].map((d) => (
                      <button
                        key={d}
                        onClick={() => setDevices(d)}
                        className={`w-8 h-8 rounded-full text-[13px] font-semibold transition ${
                          d <= devices ? "text-white" : "text-text-dim"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setDevices((d) => Math.min(5, d + 1))}
                  className="w-11 h-11 rounded-full border border-white/10 hover:border-white/20 flex items-center justify-center text-[20px] leading-none"
                  aria-label="Больше устройств"
                >
                  +
                </button>
              </div>
              <div className="mt-3 text-[13px] text-text-dim">
                Первое устройство включено. Каждое дополнительное — +{period.extra} ₽ за {period.label.toLowerCase()}.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 p-6 bg-white/[0.02]">
              <div className="text-[13px] uppercase tracking-[0.18em] text-text-dim font-mono">
                Тариф «Базовый» включает
              </div>
              <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-[15px] text-text">
                {[
                  "Безлимитный трафик",
                  "Серверы VPN",
                  "1–5 устройств",
                  "Поддержка при подключении",
                  "Продление в кабинете",
                  "YooKassa и T-pay",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-1 shrink-0 text-cyan" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Result card */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <motion.div
                layout
                className="rounded-3xl card-glass p-8 glow-ring relative overflow-hidden"
              >
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-violet/25 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="font-mono text-[12px] uppercase tracking-widest text-cyan">
                      Итог
                    </div>
                    {savingsPct > 0 && (
                      <div className="text-[12px] font-semibold px-2.5 py-1 rounded-full bg-cyan/15 text-cyan">
                        −{savingsPct}% выгода
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex items-baseline gap-3">
                    <div className="font-display font-black text-[64px] md:text-[80px] leading-none tracking-[-0.04em]">
                      <AnimatedNumber value={Math.round(total)} />
                      <span className="text-[36px] md:text-[44px] text-text-mute ml-2 font-bold">₽</span>
                    </div>
                  </div>
                  <div className="mt-2 text-[15px] text-text-mute">
                    За весь срок · <AnimatedNumber value={Math.round(perMonth)} /> ₽ в месяц
                  </div>

                  <div className="mt-6 space-y-2 text-[14px] text-text-mute">
                    <Row k="Срок" v={period.label} />
                    <Row k="Устройства" v={`${devices} из 5`} />
                    <Row k="Базовая цена" v={`${period.price} ₽`} />
                    {devices > 1 && (
                      <Row k="Доп. устройства" v={`+${period.extra * (devices - 1)} ₽`} />
                    )}
                  </div>

                  <div className="mt-8 flex flex-col gap-2">
                    <a
                      href={TG("site_pricing")}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary-glow inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-[15px] font-semibold text-white"
                    >
                      <Send className="w-4 h-4" /> Выбрать в Telegram
                    </a>
                    <a
                      href={WEB("pricing")}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-6 py-4 text-[15px] font-semibold text-text hover:bg-white/[0.05] transition"
                    >
                      <Globe className="w-4 h-4" /> Открыть веб-кабинет
                    </a>
                  </div>

                  <div className="mt-6 text-[12px] text-text-dim leading-[1.5]">
                    Доступны YooKassa и T-pay. Финальная цена и способы оплаты подтверждаются в
                    личном кабинете перед оплатой.
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-white/5 pb-1.5">
      <span>{k}</span>
      <span className="text-text font-medium">{v}</span>
    </div>
  );
}

function AnimatedNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const spring = useSpring(value, { stiffness: 140, damping: 22 });
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    spring.set(value);
  }, [spring, value]);
  useEffect(() => {
    return spring.on("change", (v) => setDisplay(v));
  }, [spring]);
  return <span>{display.toLocaleString("ru", { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}</span>;
}

/* -------------------------------------------------------- */
/*  Support                                                  */
/* -------------------------------------------------------- */

function Support() {
  return (
    <section id="features" className="relative py-14 md:py-20 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <SectionLabel>Поддержка</SectionLabel>
            <h2 className="mt-4 font-display font-extrabold tracking-[-0.03em] text-[clamp(36px,5vw,72px)] leading-[1.02]">
              Помощь находится там же, где <span className="text-gradient-accent italic font-medium">подписка.</span>
            </h2>
            <p className="mt-6 text-[17px] text-text-mute leading-[1.6] max-w-[460px]">
              Создайте обращение в личном кабинете, приложите скриншот и получите ответ внутри
              DvinVPN.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 max-w-[420px]">
              {[
                { icon: HeadphonesIcon, t: "Обращения в поддержку" },
                { icon: Sparkles, t: "FAQ и инструкции" },
                { icon: Globe, t: "Статус серверов" },
                { icon: Shield, t: "Ответ внутри Mini App" },
              ].map((x, i) => (
                <div
                  key={i}
                  className="card-glass rounded-2xl p-4 flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet/40 to-electric/40 flex items-center justify-center">
                    <x.icon className="w-4 h-4" />
                  </div>
                  <div className="text-[13px] font-medium">{x.t}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-3 gap-3 md:gap-4">
            {[
              { src: A.supportTicket, alt: "Обращение в поддержку", video: false },
              { src: A.faq, alt: "FAQ внутри Mini App", video: false },
              { src: A.serverMonVideo, alt: "Статус серверов", video: true },
            ].map((x, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`relative aspect-[9/19.5] rounded-[28px] p-[6px] bg-white/10 glow-ring ${
                  i === 1 ? "mt-6 md:mt-10" : ""
                }`}
              >
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-[#0a0d1a] flex items-center justify-center">
                  {x.video ? (
                    <video
                      src={x.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img src={x.src} alt={x.alt} className="w-full h-full object-contain" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- */
/*  Wheel & Daily Games                                      */
/* -------------------------------------------------------- */

function WheelGames() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-[#050711]">
      <div className="absolute inset-0 bg-[radial-gradient(700px_500px_at_20%_40%,rgba(124,58,237,0.18),transparent),radial-gradient(600px_500px_at_85%_60%,rgba(34,211,238,0.14),transparent)]" />
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <SectionLabel>Ежедневные игры</SectionLabel>
            <h2 className="mt-4 font-display font-extrabold tracking-[-0.03em] text-[clamp(36px,5vw,72px)] leading-[1.05] pb-[0.08em]">
              Крути колесо. <br />
              <span className="text-gradient-accent italic font-medium">Забирай бонусы.</span>
            </h2>
            <p className="mt-6 text-[17px] text-text-mute leading-[1.6] max-w-[480px]">
              Колесо фортуны, «Угадай слово», 21 очко, минёр, больше-меньше и морской бой. До 30
              ежедневных игр — за дни подписки, промокоды и оформление профиля.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 max-w-[440px]">
              {[
                "1 спин в день",
                "Спин за 10 ₽",
                "Дни подписки",
                "Промокоды",
                "Фоны профиля",
                "6 игр в кабинете",
              ].map((t, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[13.5px] font-medium"
                >
                  {t}
                </div>
              ))}
            </div>

            <a
              href={TG("site_games")}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full px-7 py-4 text-[15px] font-semibold text-white bg-gradient-to-r from-violet to-electric hover:opacity-95 transition"
            >
              <Sparkles className="w-4 h-4" />
              Играть в DvinVPN
            </a>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-5 md:gap-8 max-w-[640px] mx-auto">
              {[A.games3Video, A.games4Video].map((src, i) => (
                <div
                  key={i}
                  className="relative rounded-[38px] p-[3px] bg-gradient-to-br from-white/30 via-white/10 to-white/5 shadow-[0_30px_100px_-30px_rgba(124,58,237,0.55)]"
                >
                  <div className="rounded-[35px] bg-black p-[6px]">
                    <div className="relative rounded-[30px] overflow-hidden bg-black aspect-[9/19.5]">
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-[22px] bg-black rounded-full z-10" />
                      <video
                        src={src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* -------------------------------------------------------- */
/*  Bonuses                                                  */
/* -------------------------------------------------------- */


function Bonuses() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-[#080b16]">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionLabel>Бонусы</SectionLabel>
        <h2 className="mt-4 font-display font-extrabold tracking-[-0.03em] text-[clamp(34px,5vw,64px)] leading-[1.02] max-w-[900px]">
          Больше пользы <span className="text-gradient-accent italic font-medium">внутри DvinVPN.</span>
        </h2>

        <div className="mt-14 grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="card-glass rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6"
          >
            <div className="flex-1">
              <div className="font-mono text-[12px] uppercase tracking-widest text-cyan">
                Реферальная программа
              </div>
              <h3 className="mt-3 font-display text-[26px] font-bold tracking-tight">
                +7 дней за приглашение
              </h3>
              <p className="mt-3 text-[15px] text-text-mute leading-[1.6]">
                Пригласивший получает +7 дней после первой оплаты друга. Новый пользователь получает
                +3 дня.
              </p>
            </div>
            <div className="shrink-0 w-[220px] aspect-[9/19.5] rounded-[32px] p-[7px] bg-gradient-to-b from-white/25 to-white/[0.03] glow-ring">
              <div className="w-full h-full rounded-[26px] overflow-hidden bg-black">
                <img src={A.referral} alt="Реферальная программа" className="w-full h-full object-contain" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="card-glass rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6"
          >
            <div className="flex-1">
              <div className="font-mono text-[12px] uppercase tracking-widest text-cyan">
                Игры и колесо
              </div>
              <h3 className="mt-3 font-display text-[26px] font-bold tracking-tight">
                Ежедневные бонусы
              </h3>
              <p className="mt-3 text-[15px] text-text-mute leading-[1.6]">
                Ежедневные игры и колесо позволяют получать дни подписки, скидки, спины и оформление
                профиля.
              </p>
            </div>
            <div className="shrink-0 w-[220px] aspect-[9/19.5] rounded-[32px] p-[7px] bg-gradient-to-b from-white/25 to-white/[0.03] glow-ring">
              <div className="w-full h-full rounded-[26px] overflow-hidden bg-black">
                <img src={A.games1} alt="Ежедневные игры" className="w-full h-full object-contain" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- */
/*  Reviews                                                  */
/* -------------------------------------------------------- */

const REVIEWS = [
  { author: "Паша", handle: "Пользователь DvinVPN", text: "Отличный VPN, пользуюсь уже месяц. Скорость супер — видео в 4K грузятся без лагов, а пинг в играх почти не вырос. Приложение удобное, подключается за пару секунд. За свои деньги — просто топ." },
  { author: "Anastasia", handle: "Пользователь DvinVPN", text: "В поисках стабильного VPN, который будет работать и с мобильным интернетом. Легко и быстро подключилась, всё работает, всё летает." },
  { author: "Даниил", handle: "Пользователь DvinVPN", text: "Отличный впн, работает без нареканий." },
  { author: "Zetop", handle: "Пользователь DvinVPN", text: "Хм, ну норм. Пользуюсь уже пару недель — стабильно, к скорости вопросов нет." },
  { author: "Артём", handle: "Пользователь DvinVPN", text: "Настроил Happ за минуту по инструкции из бота. Пробный период дал спокойно проверить всё до оплаты." },
  { author: "Марина", handle: "Пользователь DvinVPN", text: "Подключила себе и мужу с одной подписки, докупили второе устройство. Управлять из Telegram реально удобно." },
];

function Reviews() {
  const row1 = REVIEWS;
  const row2 = [...REVIEWS].reverse();
  return (
    <section id="reviews" className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(600px_500px_at_20%_30%,rgba(124,58,237,0.15),transparent),radial-gradient(500px_400px_at_80%_60%,rgba(34,211,238,0.12),transparent)]" />
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 relative">
        <div className="max-w-[900px]">
          <SectionLabel>Отзывы</SectionLabel>
          <h2 className="mt-4 font-display font-extrabold tracking-[-0.03em] text-[clamp(36px,5vw,76px)] leading-[1.05] pb-[0.08em]">
            Работает там, где это <span className="text-gradient-accent italic font-medium">действительно нужно.</span>
          </h2>
          <p className="mt-6 text-[16px] text-text-mute max-w-[520px]">
            Реальные отзывы пользователей DvinVPN.
          </p>
        </div>
      </div>

      <div className="relative mt-14 space-y-5 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <Marquee items={row1} duration={55} />
        <Marquee items={row2} duration={70} reverse />
      </div>
    </section>
  );
}

function Marquee({
  items,
  duration = 60,
  reverse = false,
}: {
  items: { author: string; handle: string; text: string }[];
  duration?: number;
  reverse?: boolean;
}) {
  const loop = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-5 w-max"
        animate={{ x: reverse ? ["-33.333%", "0%"] : ["0%", "-33.333%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((r, i) => (
          <article
            key={i}
            className="w-[340px] md:w-[400px] shrink-0 rounded-3xl p-6 md:p-7 bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet to-electric flex items-center justify-center font-display font-bold text-[15px] text-white">
                {r.author[0]}
              </div>
              <div className="min-w-0">
                <div className="text-[14px] font-semibold text-text truncate">{r.author}</div>
                <div className="text-[12px] text-text-dim font-mono truncate">{r.handle}</div>
              </div>
              <div className="ml-auto text-cyan text-[14px]">★★★★★</div>
            </div>
            <p className="mt-4 text-[14.5px] leading-[1.6] text-text-mute">{r.text}</p>
          </article>
        ))}
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------- */
/*  FAQ                                                      */
/* -------------------------------------------------------- */

const FAQ = [
  { q: "Как получить пробный период?", a: "Нажмите «Пробный период» в меню Mini App. Доступ выдаётся на 3 дня и 1 устройство." },
  { q: "Сколько стоит подписка?", a: "1 месяц — 149 ₽. При оплате за 12 месяцев стоимость 1290 ₽, около 108 ₽ в месяц." },
  { q: "Сколько устройств можно подключить?", a: "От 1 до 5 устройств. Первое включено в тариф, каждое дополнительное — с доплатой за выбранный период." },
  { q: "Как подключиться?", a: "Откройте личный кабинет, нажмите «Установить и настроить» и следуйте инструкции. Рекомендуемое приложение — Happ." },
  { q: "Как оплатить?", a: "Выберите тариф и период в кабинете, оплатите через YooKassa или T-pay. Подписка активируется автоматически." },
  { q: "Можно ли пользоваться через браузер?", a: "Да. Откройте shop.dvinconnect.store и войдите через Telegram, чтобы управлять подпиской с компьютера." },
  { q: "Где находится поддержка?", a: "В меню Mini App есть раздел «Поддержка». Создайте обращение — ответ придёт внутри DvinVPN." },
  { q: "Как добавить устройство?", a: "В личном кабинете нажмите докупить устройство. После оплаты лимит увеличится автоматически." },
  { q: "Как продлить подписку?", a: "В кабинете нажмите «Продлить подписку», выберите период и оплатите. Срок обновится автоматически." },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="relative py-14 md:py-20">
      <div className="mx-auto max-w-[1000px] px-5 md:px-10">
        <SectionLabel>FAQ</SectionLabel>
        <h2 className="mt-4 font-display font-extrabold tracking-[-0.03em] text-[clamp(36px,5vw,72px)] leading-[1.02]">
          Вопросы и <span className="text-gradient-accent italic font-medium">ответы.</span>
        </h2>

        <div className="mt-14 border-t border-white/8">
          {FAQ.map((f, i) => (
            <div key={i} className="border-b border-white/8">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-6 py-6 text-left group"
              >
                <span className="text-[18px] md:text-[20px] font-semibold text-text pr-4">{f.q}</span>
                <span
                  className={`shrink-0 w-9 h-9 rounded-full border border-white/15 flex items-center justify-center transition-all ${
                    open === i ? "bg-white/10 rotate-45" : "group-hover:bg-white/5"
                  }`}
                >
                  <span className="text-[18px] leading-none">+</span>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pr-12 text-[16px] text-text-mute leading-[1.65]">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- */
/*  Final CTA                                                */
/* -------------------------------------------------------- */

function FinalCTA() {
  return (
    <section className="relative py-14 md:py-20 overflow-hidden bg-[#080b16]">
      {/* Composed gradient — no globe repeat */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_50%_100%,rgba(124,58,237,0.35),transparent_70%),radial-gradient(700px_500px_at_20%_20%,rgba(37,99,235,0.22),transparent_65%),radial-gradient(600px_400px_at_80%_30%,rgba(34,211,238,0.18),transparent_65%)]" />
        <div className="absolute inset-0 bg-grid opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-10 text-center">
        <motion.img
          src={A.logo}
          alt="DvinVPN"
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-24 h-24 md:w-32 md:h-32 rounded-3xl mb-8 glow-ring"
        />

        <h2 className="font-display font-extrabold tracking-[-0.035em] text-[clamp(40px,7vw,104px)] leading-[1.0]">
          <MaskLine>Готовы попробовать?</MaskLine>
          <MaskLine delay={0.15}>
            <span className="text-gradient-accent italic font-medium">3 дня бесплатно.</span>
          </MaskLine>
        </h2>

        <p className="mt-7 text-[16px] md:text-[18px] text-text-mute max-w-[560px] mx-auto leading-[1.6]">
          Откройте Telegram или веб-версию и получите пробный доступ за минуту.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-stretch justify-center gap-3">
          <a
            href={TG("site_final")}
            target="_blank"
            rel="noreferrer"
            className="btn-primary-glow inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[16px] font-semibold text-white"
          >
            <Send className="w-4 h-4" /> Открыть в Telegram
            <ArrowUpRight className="w-4 h-4 opacity-70" />
          </a>
          <a
            href={WEB("final")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.03] backdrop-blur-md px-7 py-4 text-[16px] font-semibold hover:bg-white/[0.06] transition"
          >
            <Globe className="w-4 h-4" /> Открыть веб-версию
          </a>
        </div>

        <div className="mt-8 text-[12px] uppercase tracking-[0.22em] text-text-dim">
          3 дня · 1 устройство · безлимитный трафик
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- */
/*  Footer                                                   */
/* -------------------------------------------------------- */

function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#050711] py-16 px-5 md:px-10">
      <div className="mx-auto max-w-[1400px] grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <img src={A.logo} alt="DvinVPN" className="h-9 w-9 rounded-lg" />
            <span className="font-display text-[18px] font-bold">DvinVPN</span>
          </div>
          <p className="mt-4 text-[14px] text-text-mute max-w-[380px] leading-[1.6]">
            VPN, который работает через Telegram и браузер. Одна подписка — до 5 устройств.
          </p>
        </div>

        <FooterCol
          title="Продукт"
          items={[
            ["Telegram-бот", "https://t.me/DvinVPNBot"],
            ["Веб-версия", "https://shop.dvinconnect.store/"],
            ["Сообщество", "https://t.me/DvinVPNchat"],
            ["Отзывы", "https://t.me/DvinVPNchat/190"],
          ]}
        />
        <FooterCol
          title="Юридическое"
          items={[
            ["Политика", "https://shop.dvinconnect.store/privacy/"],
            ["Оферта", "https://shop.dvinconnect.store/offer/"],
            ["Условия", "https://shop.dvinconnect.store/terms/"],
          ]}
        />
      </div>
      <div className="mx-auto max-w-[1400px] mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[13px] text-text-dim">
        <div>© {new Date().getFullYear()} DvinVPN</div>
        <div>Финальная цена и способы оплаты подтверждаются в личном кабинете.</div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <div className="text-[12px] uppercase tracking-widest text-text-dim font-mono">{title}</div>
      <ul className="mt-4 space-y-2.5">
        {items.map(([label, href]) => (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-[15px] text-text hover:text-cyan transition inline-flex items-center gap-1.5"
            >
              {label}
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------- */
/*  Reusable                                                 */
/* -------------------------------------------------------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.22em] text-cyan">
      <span className="w-8 h-px bg-cyan/60" />
      {children}
    </div>
  );
}

/* -------------------------------------------------------- */
/*  Page                                                     */
/* -------------------------------------------------------- */

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050711] text-text antialiased overflow-x-clip">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        {/* Desktop pinned scene */}
        <div className="hidden sm:block">
          <MiniAppScene />
        </div>
        {/* Mobile stacked scenes */}
        <MiniAppSceneMobile />
        <WebSection />
        <Trial />
        <Pricing />
        <Support />
        <WheelGames />
        <Bonuses />
        <Reviews />
        <FaqSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
