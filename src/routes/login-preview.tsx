import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail } from "lucide-react";
import { A } from "@/lib/assets";

export const Route = createFileRoute("/login-preview")({
  head: () => ({
    meta: [
      { title: "Вход — DvinVPN (preview)" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LoginPreview,
});

function LoginPreview() {
  const [tab, setTab] = useState<"login" | "signup">("login");

  // 3D tilt for the logo — mouse tracking with springs
  const logoRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 140, damping: 14, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 140, damping: 14, mass: 0.6 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-22, 22]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [18, -18]);
  const glareX = useTransform(sx, [-0.5, 0.5], ["25%", "75%"]);
  const glareY = useTransform(sy, [-0.5, 0.5], ["25%", "75%"]);

  const onMove = (e: React.MouseEvent) => {
    const r = logoRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <main className="lp-root">
      {/* Decorative background — kept separate from the form */}
      <div className="lp-bg" aria-hidden>
        <div className="lp-bg-grid" />
        <div className="lp-orb lp-orb-a" />
        <div className="lp-orb lp-orb-b" />
        <div className="lp-orb lp-orb-c" />
        <div className="lp-noise" />
      </div>

      <div className="lp-shell">
        {/* Brand block: logo + name + tagline */}
        <div className="lp-brand">
          <motion.div
            ref={logoRef}
            className="lp-logo-wrap lp-logo-3d"
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 900 }}
          >
            <motion.div
              className="lp-logo-stage"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="lp-logo-halo"
                style={{ transform: "translateZ(-40px)" }}
                animate={{ opacity: [0.55, 0.9, 0.55] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              />
              <motion.div
                className="lp-logo-shadow"
                aria-hidden
                style={{ transform: "translateZ(-20px)" }}
              />
              <motion.img
                src={A.logo}
                alt="DvinVPN"
                className="lp-logo"
                draggable={false}
                style={{ transform: "translateZ(60px)" }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="lp-logo-glare"
                aria-hidden
                style={{
                  transform: "translateZ(80px)",
                  background: useTransform(
                    [glareX, glareY],
                    ([x, y]) =>
                      `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 25%, transparent 55%)`,
                  ) as any,
                }}
              />
            </motion.div>
          </motion.div>


          <motion.h1
            className="lp-title font-display"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            DvinVPN
          </motion.h1>
          <motion.p
            className="lp-lead"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.7 }}
          >
            Быстрый и надёжный VPN. Управляйте подпиской в Telegram или в веб-кабинете.
          </motion.p>
        </div>

        {/* Auth card */}
        <motion.section
          className="lp-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Форма входа"
        >
          <div className="lp-card-glow" aria-hidden />

          {/* Tabs */}
          <div className="lp-tabs" role="tablist" aria-label="Вход или регистрация">
            <button
              role="tab"
              aria-selected={tab === "login"}
              className={`lp-tab ${tab === "login" ? "is-active" : ""}`}
              onClick={() => setTab("login")}
            >
              Вход
            </button>
            <button
              role="tab"
              aria-selected={tab === "signup"}
              className={`lp-tab ${tab === "signup" ? "is-active" : ""}`}
              onClick={() => setTab("signup")}
            >
              Регистрация
            </button>
            <span
              className="lp-tab-indicator"
              style={{ transform: tab === "login" ? "translateX(0%)" : "translateX(100%)" }}
              aria-hidden
            />
          </div>

          {/* Telegram CTA */}
          <button type="button" className="lp-btn-tg btn-shine">
            <TelegramIcon />
            <span>{tab === "login" ? "Войти через Telegram" : "Продолжить через Telegram"}</span>
          </button>

          {/* Divider */}
          <div className="lp-divider" role="separator">
            <span />
            <em>или с помощью</em>
            <span />
          </div>

          {/* Email round button */}
          <div className="lp-email-wrap">
            <button
              type="button"
              className="lp-btn-email"
              aria-label={tab === "login" ? "Войти по email" : "Зарегистрироваться по email"}
              title={tab === "login" ? "Войти по email" : "Зарегистрироваться по email"}
            >
              <Mail size={22} strokeWidth={2} />
            </button>
          </div>

          {/* Legal */}
          <div className="lp-legal">
            <Link to="/terms">Условия использования</Link>
            <span aria-hidden>·</span>
            <Link to="/privacy">Политика конфиденциальности</Link>
          </div>
        </motion.section>
      </div>

      <LoginPreviewStyles />
    </main>
  );
}

function TelegramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21.5 3.5 2.7 10.9c-1.1.4-1.1 1.1-.2 1.4l4.8 1.5 1.9 5.9c.2.6.4.9.9.9.4 0 .6-.2.9-.5l2.4-2.3 4.9 3.6c.9.5 1.5.2 1.7-.8l3.1-14.7c.3-1.3-.5-1.9-1.6-1.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LoginPreviewStyles() {
  return (
    <style>{`
      .lp-root {
        position: relative;
        min-height: 100dvh;
        width: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 32px 20px 40px;
        color: var(--text);
        background: #06040f;
      }

      /* ===== Background layer (decorative, separate from form) ===== */
      .lp-bg { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
      .lp-bg-grid {
        position: absolute; inset: -1px;
        background-image:
          linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px);
        background-size: 56px 56px;
        mask-image: radial-gradient(ellipse at 50% 40%, #000 40%, transparent 75%);
      }
      .lp-orb {
        position: absolute;
        border-radius: 999px;
        filter: blur(80px);
        opacity: 0.7;
        will-change: transform;
      }
      .lp-orb-a {
        width: 620px; height: 620px;
        left: -180px; top: -160px;
        background: radial-gradient(circle at 30% 30%, #7c3aed 0%, transparent 65%);
        animation: lpFloatA 18s ease-in-out infinite;
      }
      .lp-orb-b {
        width: 720px; height: 720px;
        right: -220px; top: 20%;
        background: radial-gradient(circle at 60% 40%, #2563eb 0%, transparent 65%);
        animation: lpFloatB 22s ease-in-out infinite;
      }
      .lp-orb-c {
        width: 520px; height: 520px;
        left: 30%; bottom: -220px;
        background: radial-gradient(circle at 50% 50%, #22d3ee 0%, transparent 65%);
        opacity: 0.45;
        animation: lpFloatC 26s ease-in-out infinite;
      }
      .lp-noise {
        position: absolute; inset: 0;
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
        opacity: 0.5; mix-blend-mode: overlay;
      }
      @keyframes lpFloatA {
        0%,100% { transform: translate3d(0,0,0) scale(1); }
        50% { transform: translate3d(60px,40px,0) scale(1.08); }
      }
      @keyframes lpFloatB {
        0%,100% { transform: translate3d(0,0,0) scale(1); }
        50% { transform: translate3d(-70px,50px,0) scale(1.1); }
      }
      @keyframes lpFloatC {
        0%,100% { transform: translate3d(0,0,0) scale(1); }
        50% { transform: translate3d(40px,-60px,0) scale(1.05); }
      }

      /* ===== Shell layout ===== */
      .lp-shell {
        position: relative; z-index: 1;
        width: 100%;
        max-width: 440px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 28px;
      }

      /* ===== Brand ===== */
      .lp-brand { text-align: center; display: flex; flex-direction: column; align-items: center; }
      .lp-logo-wrap {
        position: relative;
        width: 132px; height: 132px;
        display: grid; place-items: center;
        margin-bottom: 18px;
      }
      .lp-logo-halo {
        position: absolute; inset: -18%;
        background: radial-gradient(circle at 50% 50%,
          rgba(124,58,237,0.55) 0%,
          rgba(37,99,235,0.35) 35%,
          transparent 70%);
        filter: blur(28px);
        border-radius: 999px;
      }
      .lp-logo {
        position: relative;
        width: 100%; height: 100%;
        object-fit: contain;
        background: transparent !important;
        filter:
          drop-shadow(0 20px 40px rgba(91,92,246,0.45))
          drop-shadow(0 6px 14px rgba(34,211,238,0.25));
      }
      .lp-title {
        font-size: clamp(30px, 5vw, 40px);
        font-weight: 800;
        letter-spacing: -0.03em;
        margin: 4px 0 8px;
        background: linear-gradient(135deg, #ffffff 0%, #cfd6ff 60%, #a78bfa 100%);
        -webkit-background-clip: text; background-clip: text; color: transparent;
        line-height: 1.14;
        padding-bottom: 0.14em;
      }
      .lp-lead {
        color: var(--text-mute);
        font-size: 15px;
        line-height: 1.55;
        max-width: 340px;
      }

      /* ===== Card ===== */
      .lp-card {
        position: relative;
        width: 100%;
        border-radius: 28px;
        padding: 22px 22px 20px;
        background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
        border: 1px solid rgba(255,255,255,0.09);
        backdrop-filter: blur(22px) saturate(140%);
        box-shadow:
          0 30px 80px -30px rgba(91,92,246,0.55),
          0 10px 40px -20px rgba(34,211,238,0.25),
          inset 0 1px 0 rgba(255,255,255,0.08);
      }
      .lp-card-glow {
        position: absolute; inset: -1px; border-radius: inherit; pointer-events: none;
        background: linear-gradient(135deg, rgba(124,58,237,0.5), rgba(34,211,238,0.35));
        opacity: 0.35;
        -webkit-mask:
          linear-gradient(#000 0 0) content-box,
          linear-gradient(#000 0 0);
        -webkit-mask-composite: xor; mask-composite: exclude;
        padding: 1px;
      }

      /* Tabs */
      .lp-tabs {
        position: relative;
        display: grid; grid-template-columns: 1fr 1fr;
        padding: 4px;
        border-radius: 999px;
        background: rgba(10,12,26,0.6);
        border: 1px solid rgba(255,255,255,0.06);
        margin-bottom: 18px;
      }
      .lp-tab {
        position: relative; z-index: 1;
        padding: 10px 12px;
        border-radius: 999px;
        font-size: 14px; font-weight: 600;
        color: var(--text-mute);
        background: transparent; border: 0;
        cursor: pointer;
        transition: color .25s ease;
      }
      .lp-tab.is-active { color: #fff; }
      .lp-tab-indicator {
        position: absolute; top: 4px; left: 4px;
        width: calc(50% - 4px); height: calc(100% - 8px);
        border-radius: 999px;
        background: linear-gradient(135deg, #7c3aed 0%, #5b5cf6 55%, #2563eb 100%);
        box-shadow: 0 8px 24px -8px rgba(91,92,246,0.7), inset 0 1px 0 rgba(255,255,255,0.25);
        transition: transform .35s cubic-bezier(0.22,1,0.36,1);
      }

      /* Telegram button */
      .lp-btn-tg {
        position: relative;
        width: 100%;
        display: inline-flex; align-items: center; justify-content: center; gap: 10px;
        padding: 15px 18px;
        border-radius: 16px;
        border: 0;
        cursor: pointer;
        font-size: 15px; font-weight: 700; color: #fff;
        background: linear-gradient(135deg, #229ED9 0%, #2AABEE 100%);
        box-shadow:
          0 14px 30px -10px rgba(42,171,238,0.55),
          inset 0 1px 0 rgba(255,255,255,0.25);
        transition: filter .2s ease, transform .2s ease;
      }
      .lp-btn-tg:hover { filter: brightness(1.08); transform: translateY(-1px); }

      /* Divider */
      .lp-divider {
        display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 12px;
        margin: 18px 0 14px;
      }
      .lp-divider span {
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent);
      }
      .lp-divider em {
        font-style: normal;
        font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
        color: var(--text-dim);
      }

      /* Round email button */
      .lp-email-wrap { display: flex; justify-content: center; margin-bottom: 18px; }
      .lp-btn-email {
        width: 56px; height: 56px;
        border-radius: 999px;
        display: grid; place-items: center;
        background: linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.03));
        border: 1px solid rgba(255,255,255,0.14);
        color: #fff;
        cursor: pointer;
        box-shadow:
          0 12px 30px -14px rgba(124,58,237,0.55),
          inset 0 1px 0 rgba(255,255,255,0.14);
        transition: transform .2s ease, border-color .2s ease, background .2s ease;
      }
      .lp-btn-email:hover {
        transform: translateY(-2px);
        border-color: rgba(167,139,250,0.55);
        background: linear-gradient(135deg, rgba(167,139,250,0.18), rgba(34,211,238,0.10));
      }

      /* Legal */
      .lp-legal {
        display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 8px;
        font-size: 12.5px;
        color: var(--text-dim);
      }
      .lp-legal a {
        color: var(--text-mute);
        text-decoration: none;
        border-bottom: 1px dashed rgba(255,255,255,0.18);
        padding-bottom: 1px;
        transition: color .2s ease, border-color .2s ease;
      }
      .lp-legal a:hover { color: #fff; border-color: rgba(167,139,250,0.6); }

      /* Mobile tuning */
      @media (max-width: 480px) {
        .lp-root { padding: 24px 16px 32px; }
        .lp-logo-wrap { width: 112px; height: 112px; margin-bottom: 14px; }
        .lp-card { padding: 18px 16px 16px; border-radius: 24px; }
        .lp-btn-tg { padding: 14px 16px; font-size: 14.5px; }
        .lp-orb { filter: blur(60px); }
      }

      @media (prefers-reduced-motion: reduce) {
        .lp-orb-a, .lp-orb-b, .lp-orb-c { animation: none; }
      }
    `}</style>
  );
}
