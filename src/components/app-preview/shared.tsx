import { Link, useLocation } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import logoAsset from "@/assets/dvinvpn-logo-transparent.png.asset.json";

type NavItem = {
  to: "/app-preview/dashboard" | "/app-preview/subscription" | "/app-preview/devices" | "/app-preview/payments" | "/app-preview/referrals" | "/app-preview/support";
  label: string;
  icon: string;
};

const NAV: NavItem[] = [
  { to: "/app-preview/dashboard", label: "Главная", icon: "M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V11z" },
  { to: "/app-preview/subscription", label: "Подписка", icon: "M4 6h16v4H4V6zm0 6h16v6H4v-6zm2 3h4v1H6v-1z" },
  { to: "/app-preview/devices", label: "Устройства", icon: "M4 5h16v10H4V5zm2 12h12v2H6v-2z" },
  { to: "/app-preview/payments", label: "Оплата", icon: "M3 6h18v4H3V6zm0 6h18v6H3v-6zm2 3h4v1H5v-1z" },
  { to: "/app-preview/referrals", label: "Рефералы", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-8 9a8 8 0 1 1 16 0H4z" },
  { to: "/app-preview/support", label: "Поддержка", icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 15h2v2h-2v-2zm2-3.5c1.5-.5 3-1.6 3-3.5a4 4 0 1 0-8 0h2a2 2 0 1 1 4 0c0 1-1 1.5-2 2s-1 1-1 2v1h2v-1z" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileNav, setMobileNav] = useState(false);
  const { pathname } = useLocation();
  const current = NAV.find((n) => pathname.startsWith(n.to)) ?? NAV[0];

  return (
    <main className="ap-root">
      <div className="ap-bg" aria-hidden>
        <div className="ap-orb ap-orb-a" />
        <div className="ap-orb ap-orb-b" />
        <div className="ap-orb ap-orb-c" />
        <div className="ap-grid" />
      </div>

      <div className="ap-shell">
        <aside className={`ap-side ${mobileNav ? "is-open" : ""}`}>
          <div className="ap-brand">
            <img src={logoAsset.url} alt="" className="ap-brand-logo" />
            <div>
              <div className="ap-brand-name">DvinVPN</div>
              <div className="ap-brand-sub">Личный кабинет</div>
            </div>
          </div>

          <nav className="ap-nav" aria-label="Разделы">
            {NAV.map((n) => {
              const active = pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setMobileNav(false)}
                  className={`ap-nav-item ${active ? "is-active" : ""}`}
                >
                  <svg viewBox="0 0 24 24" className="ap-nav-icon" aria-hidden>
                    <path d={n.icon} fill="currentColor" />
                  </svg>
                  <span>{n.label}</span>
                  {active && <span className="ap-nav-dot" aria-hidden />}
                </Link>
              );
            })}
          </nav>

          <div className="ap-side-foot">
            <div className="ap-mini-card">
              <div className="ap-mini-title">Пробный период</div>
              <div className="ap-mini-desc">Осталось 2 дня из 3</div>
              <div className="ap-mini-bar"><span style={{ width: "66%" }} /></div>
            </div>
            <Link to="/" className="ap-back">← На сайт</Link>
          </div>
        </aside>

        {mobileNav && <div className="ap-scrim" onClick={() => setMobileNav(false)} aria-hidden />}

        <section className="ap-main">
          <header className="ap-top">
            <button
              type="button"
              className="ap-burger"
              aria-label="Меню"
              onClick={() => setMobileNav((v) => !v)}
            >
              <span /><span /><span />
            </button>
            <div className="ap-top-title">{current.label}</div>
            <div className="ap-top-right">
              <span className="ap-chip ap-chip-live"><i />Активен</span>
              <div className="ap-avatar" aria-hidden>А</div>
            </div>
          </header>

          <div className="ap-content">{children}</div>
        </section>
      </div>

      <AppPreviewStyles />
    </main>
  );
}

/* ============================= Bits ============================= */

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="ap-stat">
      <div className="ap-stat-lab">{label}</div>
      <div className="ap-stat-val">{value}</div>
    </div>
  );
}

export function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="ap-row"><span className="ap-muted">{k}</span><b>{v}</b></div>
  );
}

/* ============================= Styles ============================= */

function AppPreviewStyles() {
  return (
    <style>{`
      .ap-root {
        position: relative;
        min-height: 100dvh;
        color: #ece9ff;
        background: #0f0a24;
        font-family: 'Manrope', 'Inter', system-ui, -apple-system, sans-serif;
        overflow-x: hidden;
      }
      .ap-bg { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
      .ap-orb { position: absolute; border-radius: 999px; filter: blur(120px); opacity: 0.5; }
      .ap-orb-a { width: 620px; height: 620px; left: -220px; top: -180px;
        background: radial-gradient(circle at 40% 40%, #7c3aed 0%, transparent 65%); }
      .ap-orb-b { width: 680px; height: 680px; right: -240px; top: 10%;
        background: radial-gradient(circle at 60% 40%, #38bdf8 0%, transparent 65%); opacity: 0.4; }
      .ap-orb-c { width: 540px; height: 540px; left: 30%; bottom: -240px;
        background: radial-gradient(circle at 50% 50%, #6366f1 0%, transparent 65%); opacity: 0.35; }
      .ap-grid {
        position: absolute; inset: 0;
        background-image:
          linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
        background-size: 56px 56px;
        mask-image: radial-gradient(circle at 50% 40%, #000 30%, transparent 75%);
      }

      .ap-shell {
        position: relative; z-index: 1;
        display: grid;
        grid-template-columns: 280px 1fr;
        gap: 24px;
        max-width: 1360px;
        margin: 0 auto;
        padding: 24px;
        min-height: 100dvh;
      }
      @media (max-width: 960px) {
        .ap-shell { grid-template-columns: 1fr; padding: 16px; gap: 16px; }
      }

      .ap-scrim { position: fixed; inset: 0; background: rgba(0,0,0,.5); z-index: 39; backdrop-filter: blur(4px); }

      .ap-side {
        position: sticky; top: 24px;
        align-self: start;
        padding: 22px 18px;
        border-radius: 24px;
        background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
        border: 1px solid rgba(255,255,255,0.08);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        display: flex; flex-direction: column; gap: 20px;
        max-height: calc(100dvh - 48px);
      }
      @media (max-width: 960px) {
        .ap-side {
          position: fixed; inset: 0 auto 0 0;
          width: min(320px, 86vw);
          border-radius: 0 24px 24px 0;
          transform: translateX(-105%);
          transition: transform .3s ease;
          z-index: 40;
          max-height: 100dvh;
        }
        .ap-side.is-open { transform: translateX(0); }
      }
      .ap-brand { display: flex; align-items: center; gap: 12px; }
      .ap-brand-logo { width: 40px; height: 40px; object-fit: contain; filter: drop-shadow(0 8px 20px rgba(124,58,237,.6)); }
      .ap-brand-name { font-weight: 800; font-size: 16px; letter-spacing: -0.01em; }
      .ap-brand-sub { font-size: 12px; color: rgba(236,233,255,.55); }
      .ap-nav { display: flex; flex-direction: column; gap: 4px; }
      .ap-nav-item {
        position: relative;
        display: flex; align-items: center; gap: 12px;
        padding: 11px 12px; border-radius: 12px;
        background: transparent; border: 1px solid transparent;
        color: rgba(236,233,255,.75);
        font: inherit; font-size: 14px; font-weight: 500;
        cursor: pointer; text-decoration: none;
        transition: background .2s, color .2s, border-color .2s;
      }
      .ap-nav-item:hover { background: rgba(255,255,255,.05); color: #fff; }
      .ap-nav-item.is-active {
        color: #fff;
        background: linear-gradient(135deg, rgba(124,58,237,.25), rgba(56,189,248,.15));
        border-color: rgba(167,139,250,.35);
        box-shadow: 0 8px 24px -12px rgba(124,58,237,.6);
      }
      .ap-nav-icon { width: 18px; height: 18px; flex-shrink: 0; }
      .ap-nav-dot {
        position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
        width: 6px; height: 6px; border-radius: 50%;
        background: linear-gradient(135deg, #c4b5fd, #38bdf8);
        box-shadow: 0 0 10px rgba(167,139,250,.9);
      }
      .ap-side-foot { margin-top: auto; display: flex; flex-direction: column; gap: 14px; }
      .ap-mini-card {
        padding: 14px; border-radius: 14px;
        background: linear-gradient(135deg, rgba(124,58,237,.18), rgba(56,189,248,.1));
        border: 1px solid rgba(255,255,255,.08);
      }
      .ap-mini-title { font-size: 12px; color: rgba(236,233,255,.6); }
      .ap-mini-desc { font-size: 13px; font-weight: 600; margin: 2px 0 10px; }
      .ap-mini-bar { height: 6px; border-radius: 6px; background: rgba(255,255,255,.08); overflow: hidden; }
      .ap-mini-bar span { display: block; height: 100%; background: linear-gradient(90deg, #a78bfa, #38bdf8); }
      .ap-back { font-size: 13px; color: rgba(236,233,255,.6); text-decoration: none; text-align: center; }
      .ap-back:hover { color: #fff; }

      .ap-main { min-width: 0; display: flex; flex-direction: column; gap: 18px; }
      .ap-top {
        display: flex; align-items: center; gap: 16px;
        padding: 14px 20px; border-radius: 18px;
        background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
        border: 1px solid rgba(255,255,255,.08);
        backdrop-filter: blur(14px);
      }
      .ap-burger {
        display: none;
        flex-direction: column; justify-content: center; gap: 4px;
        width: 36px; height: 36px; border-radius: 10px;
        background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.08);
        cursor: pointer;
      }
      .ap-burger span { display: block; width: 16px; height: 2px; background: #fff; margin: 0 auto; border-radius: 2px; }
      @media (max-width: 960px) { .ap-burger { display: flex; } }
      .ap-top-title { font-size: 18px; font-weight: 700; letter-spacing: -0.01em; flex: 1; min-width: 0; }
      .ap-top-right { display: flex; align-items: center; gap: 10px; }
      .ap-chip {
        display: inline-flex; align-items: center; gap: 6px;
        padding: 5px 10px; border-radius: 999px; font-size: 12px; font-weight: 600;
        background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
      }
      .ap-chip-live i { width: 6px; height: 6px; border-radius: 50%; background: #34d399; box-shadow: 0 0 8px #34d399; }
      .ap-avatar {
        width: 36px; height: 36px; border-radius: 50%;
        display: grid; place-items: center; font-weight: 700; font-size: 14px;
        background: linear-gradient(135deg, #7c3aed, #38bdf8);
      }

      .ap-content { display: block; }
      .ap-stack { display: flex; flex-direction: column; gap: 18px; }
      .ap-grid-cols { display: grid; gap: 18px; grid-template-columns: 1fr 1fr; }
      @media (max-width: 780px) { .ap-grid-cols { grid-template-columns: 1fr; } }

      .ap-card {
        padding: 22px;
        border-radius: 20px;
        background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015));
        border: 1px solid rgba(255,255,255,.08);
        backdrop-filter: blur(14px);
      }
      .ap-card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
      .ap-card-title { margin: 0; font-size: 16px; font-weight: 700; }
      .ap-muted { color: rgba(236,233,255,.6); font-size: 13px; }

      .ap-hero { grid-column: 1 / -1; display: flex; flex-direction: column; gap: 14px; }
      .ap-hero-badge {
        align-self: flex-start;
        padding: 5px 12px; border-radius: 999px; font-size: 12px; font-weight: 600;
        background: linear-gradient(135deg, rgba(124,58,237,.3), rgba(56,189,248,.2));
        border: 1px solid rgba(167,139,250,.4);
      }
      .ap-hero-title { margin: 0; font-size: clamp(22px, 3vw, 30px); font-weight: 800; letter-spacing: -0.02em; }
      .ap-hero-desc { margin: 0; color: rgba(236,233,255,.7); font-size: 14px; line-height: 1.6; }
      .ap-hero-desc strong { color: #fff; }
      .ap-hero-actions { display: flex; gap: 10px; flex-wrap: wrap; }
      .ap-hero-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 4px; }

      .ap-stat {
        padding: 12px 14px; border-radius: 14px;
        background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.06);
      }
      .ap-stat-lab { font-size: 12px; color: rgba(236,233,255,.55); }
      .ap-stat-val { font-size: 18px; font-weight: 700; margin-top: 2px; }

      .ap-status { display: grid; grid-template-columns: 130px 1fr; gap: 18px; align-items: center; }
      .ap-status-ring { position: relative; width: 130px; height: 130px; }
      .ap-status-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
      .ap-ring-bg { fill: none; stroke: rgba(255,255,255,.08); stroke-width: 10; }
      .ap-ring-fg { fill: none; stroke-width: 10; stroke-linecap: round;
        stroke: #a78bfa; filter: drop-shadow(0 0 8px rgba(167,139,250,.6)); }
      .ap-status-center { position: absolute; inset: 0; display: grid; place-items: center; text-align: center; }
      .ap-status-num { font-size: 22px; font-weight: 800; }
      .ap-status-lab { font-size: 11px; color: rgba(236,233,255,.55); }
      .ap-status-list { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
      .ap-row { display: flex; justify-content: space-between; gap: 12px; font-size: 14px; }
      .ap-row b { font-weight: 700; }

      .ap-quick { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
      @media (max-width: 780px) { .ap-quick { grid-template-columns: repeat(2, 1fr); } }
      .ap-quick-tile {
        display: flex; flex-direction: column; gap: 4px; align-items: flex-start;
        padding: 14px; border-radius: 14px; text-align: left;
        background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08);
        color: inherit; font: inherit; cursor: pointer;
        transition: transform .2s, background .2s, border-color .2s;
      }
      .ap-quick-tile:hover { transform: translateY(-2px); background: rgba(255,255,255,.07); border-color: rgba(167,139,250,.35); }
      .ap-quick-icon { font-size: 22px; margin-bottom: 4px; }
      .ap-quick-title { font-weight: 700; font-size: 14px; }
      .ap-quick-desc { font-size: 12px; color: rgba(236,233,255,.55); }

      .ap-chart { display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; height: 180px; align-items: end; }
      .ap-chart-col { display: flex; flex-direction: column; align-items: center; gap: 6px; height: 100%; }
      .ap-chart-bar { width: 100%; max-width: 32px; border-radius: 8px 8px 4px 4px; background: rgba(255,255,255,.05); position: relative; overflow: hidden; flex: 0 0 auto; }
      .ap-chart-bar-fill { position: absolute; inset: 0; background: linear-gradient(180deg, #a78bfa, #38bdf8); border-radius: inherit; }
      .ap-chart-lab { font-size: 11px; color: rgba(236,233,255,.5); }

      .ap-btn {
        display: inline-flex; align-items: center; justify-content: center; gap: 8px;
        padding: 11px 18px; border-radius: 12px;
        font-size: 14px; font-weight: 600; color: #fff;
        background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12);
        cursor: pointer; text-decoration: none;
        transition: transform .2s, background .2s, border-color .2s, box-shadow .2s;
        font-family: inherit;
      }
      .ap-btn:hover { transform: translateY(-1px); background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.22); }
      .ap-btn:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(167,139,250,.45); }
      .ap-btn-primary {
        background: linear-gradient(135deg, #7c3aed 0%, #5b5cf6 55%, #38bdf8 100%);
        border-color: transparent;
        box-shadow: 0 16px 40px -14px rgba(124,58,237,.7);
      }
      .ap-btn-primary:hover { box-shadow: 0 22px 50px -14px rgba(124,58,237,.85); }
      .ap-btn-full { width: 100%; margin-top: 14px; }
      .ap-link { background: none; border: none; color: #a78bfa; font: inherit; font-size: 13px; cursor: pointer; }
      .ap-link:hover { color: #c4b5fd; }

      .ap-sub-current { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
      .ap-sub-name { font-size: 20px; font-weight: 800; margin: 4px 0; }
      .ap-plans { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
      @media (max-width: 780px) { .ap-plans { grid-template-columns: repeat(2, 1fr); } }
      .ap-plan {
        position: relative;
        padding: 16px; border-radius: 14px; text-align: left;
        background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08);
        color: inherit; font: inherit; cursor: pointer;
        transition: transform .2s, background .2s, border-color .2s;
      }
      .ap-plan:hover { transform: translateY(-2px); border-color: rgba(167,139,250,.35); }
      .ap-plan.is-active {
        background: linear-gradient(135deg, rgba(124,58,237,.22), rgba(56,189,248,.1));
        border-color: rgba(167,139,250,.55);
        box-shadow: 0 12px 32px -14px rgba(124,58,237,.6);
      }
      .ap-plan-badge {
        position: absolute; top: -10px; right: 12px;
        padding: 3px 9px; border-radius: 999px; font-size: 11px; font-weight: 700;
        color: #0f0a24; background: linear-gradient(135deg, #c4b5fd, #a78bfa);
      }
      .ap-plan-label { font-size: 12px; color: rgba(236,233,255,.6); }
      .ap-plan-price { font-size: 22px; font-weight: 800; margin: 6px 0 2px; }
      .ap-plan-per { font-size: 12px; color: rgba(236,233,255,.55); }
      .ap-devices-row { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; border-top: 1px solid rgba(255,255,255,.06); border-bottom: 1px solid rgba(255,255,255,.06); margin: 18px 0; }
      .ap-devices-num { font-size: 22px; font-weight: 800; }
      .ap-stepper { display: inline-flex; align-items: center; gap: 4px; background: rgba(255,255,255,.05); border-radius: 12px; padding: 4px; }
      .ap-stepper button { width: 32px; height: 32px; border-radius: 8px; background: rgba(255,255,255,.06); border: none; color: #fff; font-size: 18px; cursor: pointer; font-family: inherit; }
      .ap-stepper button:hover { background: rgba(255,255,255,.12); }
      .ap-stepper span { min-width: 32px; text-align: center; font-weight: 700; }
      .ap-summary { display: flex; flex-direction: column; gap: 8px; font-size: 14px; }
      .ap-summary div { display: flex; justify-content: space-between; }
      .ap-summary div span { color: rgba(236,233,255,.6); }
      .ap-summary-total { padding-top: 8px; border-top: 1px solid rgba(255,255,255,.06); }
      .ap-summary-total b { font-size: 18px; }

      .ap-dev-head { display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; }
      .ap-dev-num { font-size: 32px; font-weight: 800; }
      .ap-dev-num span { color: rgba(236,233,255,.4); font-size: 22px; font-weight: 600; }
      .ap-devlist { display: flex; flex-direction: column; gap: 10px; }
      .ap-devitem { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 14px; padding: 14px; border-radius: 14px; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.06); }
      .ap-devdot { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,.15); }
      .ap-devdot.is-on { background: #34d399; box-shadow: 0 0 10px #34d399; }
      .ap-devinfo { min-width: 0; }
      .ap-devname { font-weight: 700; font-size: 14px; }
      .ap-devactions { display: flex; gap: 6px; }
      .ap-icon-btn { width: 32px; height: 32px; border-radius: 8px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.08); color: #fff; cursor: pointer; font-family: inherit; }
      .ap-icon-btn:hover { background: rgba(255,255,255,.12); }
      .ap-icon-danger:hover { background: rgba(239,68,68,.2); border-color: rgba(239,68,68,.4); }
      .ap-steps { display: flex; flex-direction: column; gap: 10px; margin-top: 14px; }
      .ap-step { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 12px; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.06); font-size: 14px; }
      .ap-step-num { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: linear-gradient(135deg, #7c3aed, #38bdf8); font-size: 12px; font-weight: 700; flex-shrink: 0; }

      .ap-pay-amount { font-size: 36px; font-weight: 800; margin: 6px 0 4px; letter-spacing: -0.02em; }
      .ap-pay-methods { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
      .ap-radio { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 12px; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08); cursor: pointer; font-size: 14px; }
      .ap-radio:hover { border-color: rgba(255,255,255,.16); }
      .ap-radio.is-on { background: linear-gradient(135deg, rgba(124,58,237,.15), rgba(56,189,248,.08)); border-color: rgba(167,139,250,.5); }
      .ap-radio-dot { width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid rgba(255,255,255,.3); display: inline-flex; align-items: center; justify-content: center; }
      .ap-radio.is-on .ap-radio-dot { border-color: #a78bfa; }
      .ap-radio.is-on .ap-radio-dot::after { content: ""; width: 8px; height: 8px; border-radius: 50%; background: linear-gradient(135deg, #a78bfa, #38bdf8); }
      .ap-table { display: flex; flex-direction: column; }
      .ap-tr { display: grid; grid-template-columns: auto 1fr auto auto; gap: 14px; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,.05); align-items: center; font-size: 14px; }
      .ap-tr:last-child { border-bottom: none; }
      .ap-td-amount { font-weight: 700; }
      .ap-tag { display: inline-flex; padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 600; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.08); }
      .ap-tag-ok { background: rgba(52,211,153,.14); border-color: rgba(52,211,153,.35); color: #86efac; }
      @media (max-width: 640px) {
        .ap-tr { grid-template-columns: 1fr auto; gap: 6px; padding: 12px 0; }
        .ap-tr .ap-td:first-child { grid-column: 1 / -1; font-size: 12px; }
      }

      .ap-ref-hero { display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: center; }
      @media (max-width: 780px) { .ap-ref-hero { grid-template-columns: 1fr; } }
      .ap-invite { display: flex; gap: 8px; margin-top: 14px; padding: 6px; border-radius: 14px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08); }
      .ap-invite input { flex: 1; min-width: 0; background: transparent; border: none; color: #fff; font-family: inherit; font-size: 13px; padding: 0 10px; outline: none; }
      .ap-ref-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; min-width: 280px; }
      @media (max-width: 780px) { .ap-ref-stats { min-width: 0; } }

      .ap-support-actions { display: flex; flex-direction: column; gap: 10px; margin-top: 14px; }
      .ap-status-lines { display: flex; flex-direction: column; gap: 10px; margin-top: 12px; }
      .ap-status-line { display: grid; grid-template-columns: auto 1fr auto; gap: 12px; align-items: center; padding: 10px 12px; border-radius: 10px; background: rgba(255,255,255,.03); font-size: 14px; }
      .ap-status-line b { color: #86efac; font-weight: 600; font-size: 13px; }
      .ap-faq { display: flex; flex-direction: column; gap: 8px; margin-top: 14px; }
      .ap-faq-item { border-radius: 12px; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.06); overflow: hidden; }
      .ap-faq-item.is-open { border-color: rgba(167,139,250,.35); }
      .ap-faq-q { display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 14px 16px; background: none; border: none; color: #fff; font: inherit; font-size: 14px; font-weight: 600; text-align: left; cursor: pointer; }
      .ap-faq-icn { font-size: 20px; color: rgba(236,233,255,.6); transition: transform .25s ease; }
      .ap-faq-item.is-open .ap-faq-icn { transform: rotate(45deg); color: #a78bfa; }
      .ap-faq-a { padding: 0 16px 14px; font-size: 13.5px; line-height: 1.6; color: rgba(236,233,255,.7); }

      @media (prefers-reduced-motion: reduce) {
        * { transition: none !important; animation: none !important; }
      }
    `}</style>
  );
}
