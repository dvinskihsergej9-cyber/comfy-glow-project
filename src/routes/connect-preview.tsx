import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import happIconAsset from "@/assets/happ-icon.png.asset.json";
import incyIconAsset from "@/assets/incy-icon.png.asset.json";

export const Route = createFileRoute("/connect-preview")({
  head: () => ({
    meta: [
      { title: "Выберите приложение — DvinVPN" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Установка Happ или INCY для подключения к DvinVPN." },
    ],
  }),
  component: ConnectPreview,
});

type AppId = "happ" | "incy";

const APPS: Record<AppId, {
  id: AppId;
  name: string;
  recommended?: boolean;
  tagline: string;
  icon: string;
  ring: string;
  storeRu: string;
  storeGlobal: string;
  scheme: string;
}> = {
  happ: {
    id: "happ",
    name: "Happ",
    recommended: true,
    tagline: "Рекомендуемый клиент. Быстрая настройка и стабильное соединение.",
    icon: happIconAsset.url,
    ring: "167, 139, 250",
    storeRu: "#",
    storeGlobal: "#",
    scheme: "happ://add/",
  },
  incy: {
    id: "incy",
    name: "INCY",
    tagline: "Минималистичный клиент. Простой интерфейс и фокус на приватность.",
    icon: incyIconAsset.url,
    ring: "56, 189, 248",
    storeRu: "#",
    storeGlobal: "#",
    scheme: "incy://add/",
  },
};

function ConnectPreview() {
  const [active, setActive] = useState<AppId>("happ");
  const app = APPS[active];

  return (
    <main className="cp-root">
      <div className="cp-bg" aria-hidden>
        <div className="cp-orb cp-orb-a" />
        <div className="cp-orb cp-orb-b" />
        <div className="cp-orb cp-orb-c" />
      </div>

      <div className="cp-shell">
        <h1 className="cp-title">Выберите приложение</h1>

        {/* App cards */}
        <div className="cp-apps" role="radiogroup" aria-label="Выбор приложения">
          {(Object.keys(APPS) as AppId[]).map((id) => {
            const a = APPS[id];
            const isActive = id === active;
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => setActive(id)}
                className={`cp-app ${isActive ? "is-active" : ""}`}
                style={{ ["--cp-ring" as string]: a.ring }}
              >
                <span className="cp-app-glow" aria-hidden />
                <img
                  src={a.icon}
                  alt=""
                  className="cp-app-icon"
                  width={80}
                  height={80}
                  loading="lazy"
                />
                <span className="cp-app-body">
                  <span className="cp-app-row">
                    <span className="cp-app-name">{a.name}</span>
                    {a.recommended && <span className="cp-badge">Рекомендуем</span>}
                  </span>
                  <span className="cp-app-tag">{a.tagline}</span>
                </span>
                <span className={`cp-radio ${isActive ? "is-on" : ""}`} aria-hidden>
                  <span className="cp-radio-dot" />
                </span>
              </button>
            );
          })}
        </div>

        {/* Instruction blocks */}
        <section className="cp-steps" aria-live="polite">
          <article className="cp-step">
            <header className="cp-step-head">
              <span className="cp-step-num">1</span>
              <h2 className="cp-step-title">Установка приложения</h2>
            </header>
            <p className="cp-step-desc">
              Откройте страницу в App Store и установите <strong>{app.name}</strong>. Запустите
              приложение — в окне разрешения VPN‑конфигурации нажмите <em>Allow</em> и введите
              пароль устройства.
            </p>
            <div className="cp-actions cp-actions-grid">
              <a className="cp-btn" href={app.storeRu} target="_blank" rel="noreferrer">
                App Store (RU)
              </a>
              <a className="cp-btn" href={app.storeGlobal} target="_blank" rel="noreferrer">
                App Store (Global)
              </a>
            </div>
          </article>

          <article className="cp-step">
            <header className="cp-step-head">
              <span className="cp-step-num">2</span>
              <h2 className="cp-step-title">Добавление подписки</h2>
            </header>
            <p className="cp-step-desc">
              Нажмите кнопку ниже — {app.name} откроется, и подписка добавится автоматически.
            </p>
            <div className="cp-actions">
              <a className="cp-btn cp-btn-primary" href={app.scheme}>
                Добавить подписку в {app.name}
              </a>
            </div>
          </article>

          <article className="cp-step">
            <header className="cp-step-head">
              <span className="cp-step-num">3</span>
              <h2 className="cp-step-title">Подключение и использование</h2>
            </header>
            <p className="cp-step-desc">
              В главном разделе {app.name} нажмите большую кнопку включения по центру. Выберите
              сервер из списка — при необходимости попробуйте другой, если нужен более быстрый.
            </p>
          </article>
        </section>
      </div>

      <ConnectPreviewStyles />
    </main>
  );
}

function ConnectPreviewStyles() {
  return (
    <style>{`
      .cp-root {
        position: relative;
        min-height: 100dvh;
        width: 100%;
        overflow-x: hidden;
        color: #ece9ff;
        background:
          radial-gradient(ellipse 90% 60% at 50% 40%, #241640 0%, #1a1030 55%, #140a26 100%);
        padding: 48px 20px 72px;
        font-family: 'Manrope', 'Inter', system-ui, -apple-system, sans-serif;
      }
      .cp-bg {
        position: absolute; inset: 0;
        pointer-events: none;
        overflow: hidden;
        z-index: 0;
      }
      .cp-orb {
        position: absolute;
        border-radius: 999px;
        filter: blur(160px);
        opacity: 0.18;
      }
      .cp-orb-a {
        width: 620px; height: 620px;
        left: -220px; top: -200px;
        background: radial-gradient(circle at 40% 40%, #6d28d9 0%, transparent 65%);
      }
      .cp-orb-b {
        width: 680px; height: 680px;
        right: -260px; top: 10%;
        background: radial-gradient(circle at 60% 40%, #5b21b6 0%, transparent 65%);
        opacity: 0.14;
      }
      .cp-orb-c {
        width: 560px; height: 560px;
        left: 30%; bottom: -280px;
        background: radial-gradient(circle at 50% 50%, #4c1d95 0%, transparent 65%);
        opacity: 0.16;
      }

      .cp-shell {
        position: relative; z-index: 1;
        max-width: 880px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 32px;
      }

      .cp-title {
        margin: 0;
        font-size: clamp(28px, 4.2vw, 40px);
        font-weight: 700;
        letter-spacing: -0.02em;
        line-height: 1.15;
        color: #ffffff;
        text-align: left;
      }

      /* ===== App cards ===== */
      .cp-apps {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
      @media (max-width: 720px) {
        .cp-apps { grid-template-columns: 1fr; }
      }

      .cp-app {
        position: relative;
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 16px;
        padding: 18px 20px;
        border-radius: 20px;
        background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
        border: 1px solid rgba(255,255,255,0.08);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        color: inherit;
        text-align: left;
        cursor: pointer;
        transition: transform .25s ease, border-color .25s ease, background .25s ease, box-shadow .25s ease;
      }
      .cp-app:hover {
        transform: translateY(-2px);
        border-color: rgba(255,255,255,0.16);
      }
      .cp-app:focus-visible {
        outline: none;
        border-color: rgba(var(--cp-ring), 0.8);
        box-shadow: 0 0 0 4px rgba(var(--cp-ring), 0.25);
      }
      .cp-app.is-active {
        border-color: rgba(var(--cp-ring), 0.7);
        background: linear-gradient(180deg, rgba(var(--cp-ring), 0.14), rgba(255,255,255,0.03));
        box-shadow:
          0 0 0 1px rgba(var(--cp-ring), 0.4) inset,
          0 20px 60px -20px rgba(var(--cp-ring), 0.55);
      }
      .cp-app-glow {
        position: absolute; inset: -1px;
        border-radius: inherit;
        pointer-events: none;
        opacity: 0;
        background: radial-gradient(60% 100% at 50% 0%, rgba(var(--cp-ring), 0.35), transparent 70%);
        transition: opacity .3s ease;
      }
      .cp-app.is-active .cp-app-glow { opacity: 1; }

      .cp-app-icon {
        width: 64px; height: 64px;
        border-radius: 16px;
        display: block;
        object-fit: contain;
        filter: drop-shadow(0 12px 24px rgba(0,0,0,0.35));
      }

      .cp-app-body {
        display: flex; flex-direction: column; gap: 6px; min-width: 0;
      }
      .cp-app-row {
        display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
      }
      .cp-app-name {
        font-size: 18px; font-weight: 700; color: #fff; letter-spacing: -0.01em;
      }
      .cp-badge {
        display: inline-flex; align-items: center;
        padding: 3px 9px;
        border-radius: 999px;
        font-size: 11px; font-weight: 700;
        letter-spacing: 0.02em;
        color: #0f0a24;
        background: linear-gradient(135deg, #c4b5fd, #a78bfa);
      }
      .cp-app-tag {
        font-size: 13px;
        color: rgba(236, 233, 255, 0.7);
        line-height: 1.5;
      }

      .cp-radio {
        width: 22px; height: 22px;
        border-radius: 50%;
        border: 1.5px solid rgba(255,255,255,0.25);
        display: inline-flex; align-items: center; justify-content: center;
        transition: border-color .25s ease, background .25s ease;
        flex-shrink: 0;
      }
      .cp-radio.is-on {
        border-color: rgba(var(--cp-ring), 0.9);
        background: rgba(var(--cp-ring), 0.15);
      }
      .cp-radio-dot {
        width: 10px; height: 10px; border-radius: 50%;
        background: transparent;
        transition: background .25s ease, transform .25s ease;
      }
      .cp-radio.is-on .cp-radio-dot {
        background: linear-gradient(135deg, #ffffff, rgba(255,255,255,0.75));
        box-shadow: 0 0 10px rgba(var(--cp-ring), 0.8);
      }

      /* ===== Steps ===== */
      .cp-steps {
        display: flex; flex-direction: column; gap: 16px;
      }
      .cp-step {
        position: relative;
        padding: 22px 24px;
        border-radius: 20px;
        background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015));
        border: 1px solid rgba(255,255,255,0.08);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
      }
      .cp-step-head {
        display: flex; align-items: center; gap: 12px;
        margin-bottom: 10px;
      }
      .cp-step-num {
        display: inline-flex; align-items: center; justify-content: center;
        width: 28px; height: 28px;
        border-radius: 50%;
        font-size: 13px; font-weight: 700;
        color: #fff;
        background: linear-gradient(135deg, #7c3aed, #38bdf8);
        box-shadow: 0 6px 16px -6px rgba(124, 58, 237, 0.7);
        flex-shrink: 0;
      }
      .cp-step-title {
        margin: 0;
        font-size: 18px; font-weight: 700;
        color: #fff; letter-spacing: -0.01em;
      }
      .cp-step-desc {
        margin: 0;
        font-size: 14.5px; line-height: 1.6;
        color: rgba(236, 233, 255, 0.75);
      }
      .cp-step-desc strong { color: #fff; font-weight: 700; }
      .cp-step-desc em { font-style: normal; color: #c4b5fd; font-weight: 600; }

      .cp-actions {
        margin-top: 16px;
        display: flex; flex-wrap: wrap; gap: 10px;
      }
      .cp-actions-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
      @media (max-width: 480px) {
        .cp-actions-grid { grid-template-columns: 1fr; }
      }

      .cp-btn {
        display: inline-flex; align-items: center; justify-content: center;
        gap: 8px;
        padding: 13px 20px;
        border-radius: 12px;
        font-size: 14px; font-weight: 600;
        text-decoration: none;
        color: #fff;
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.12);
        cursor: pointer;
        outline: none;
        -webkit-tap-highlight-color: transparent;
        transition: transform .2s ease, background .2s ease, border-color .2s ease, box-shadow .2s ease;
      }
      .cp-btn:hover {
        transform: translateY(-1px);
        background: rgba(255,255,255,0.1);
        border-color: rgba(255,255,255,0.22);
      }
      .cp-btn:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.45);
      }
      .cp-btn-primary {
        background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
        border-color: transparent;
        box-shadow: 0 16px 40px -14px rgba(124, 58, 237, 0.7);
        padding: 15px 22px;
        font-size: 15px;
      }
      .cp-btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 22px 50px -14px rgba(124, 58, 237, 0.85);
      }

      @media (max-width: 480px) {
        .cp-root { padding: 32px 16px 56px; }
        .cp-app { padding: 16px; gap: 14px; }
        .cp-app-icon { width: 56px; height: 56px; border-radius: 14px; }
        .cp-step { padding: 18px 18px; border-radius: 18px; }
      }

      @media (prefers-reduced-motion: reduce) {
        .cp-app, .cp-btn, .cp-radio, .cp-radio-dot, .cp-app-glow {
          transition: none !important;
        }
        .cp-app:hover, .cp-btn:hover { transform: none !important; }
      }
    `}</style>
  );
}
