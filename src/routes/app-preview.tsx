import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import logoAsset from "@/assets/dvinvpn-logo-transparent.png.asset.json";

export const Route = createFileRoute("/app-preview")({
  head: () => ({
    meta: [
      { title: "Кабинет — DvinVPN" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Превью личного кабинета DvinVPN." },
    ],
  }),
  component: AppPreview,
});

type SectionId = "home" | "subscription" | "devices" | "payments" | "referral" | "support";

const NAV: { id: SectionId; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V11z" },
  { id: "subscription", label: "Подписка", icon: "M4 6h16v4H4V6zm0 6h16v6H4v-6zm2 3h4v1H6v-1z" },
  { id: "devices", label: "Устройства", icon: "M4 5h16v10H4V5zm2 12h12v2H6v-2z" },
  { id: "payments", label: "Оплата", icon: "M3 6h18v4H3V6zm0 6h18v6H3v-6zm2 3h4v1H5v-1z" },
  { id: "referral", label: "Рефералы", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-8 9a8 8 0 1 1 16 0H4z" },
  { id: "support", label: "Поддержка", icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 15h2v2h-2v-2zm2-3.5c1.5-.5 3-1.6 3-3.5a4 4 0 1 0-8 0h2a2 2 0 1 1 4 0c0 1-1 1.5-2 2s-1 1-1 2v1h2v-1z" },
];

function AppPreview() {
  const [active, setActive] = useState<SectionId>("home");
  const [mobileNav, setMobileNav] = useState(false);

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
            {NAV.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => {
                  setActive(n.id);
                  setMobileNav(false);
                }}
                className={`ap-nav-item ${active === n.id ? "is-active" : ""}`}
              >
                <svg viewBox="0 0 24 24" className="ap-nav-icon" aria-hidden>
                  <path d={n.icon} fill="currentColor" />
                </svg>
                <span>{n.label}</span>
                {active === n.id && <span className="ap-nav-dot" aria-hidden />}
              </button>
            ))}
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
            <div className="ap-top-title">
              {NAV.find((n) => n.id === active)?.label}
            </div>
            <div className="ap-top-right">
              <span className="ap-chip ap-chip-live"><i />Активен</span>
              <div className="ap-avatar" aria-hidden>А</div>
            </div>
          </header>

          <div className="ap-content">
            {active === "home" && <HomeSection />}
            {active === "subscription" && <SubscriptionSection />}
            {active === "devices" && <DevicesSection />}
            {active === "payments" && <PaymentsSection />}
            {active === "referral" && <ReferralSection />}
            {active === "support" && <SupportSection />}
          </div>
        </section>
      </div>

      <AppPreviewStyles />
    </main>
  );
}

/* ============================= Sections ============================= */

function HomeSection() {
  return (
    <div className="ap-grid-cols">
      <div className="ap-card ap-hero">
        <div className="ap-hero-badge">Подписка активна</div>
        <h2 className="ap-hero-title">Добро пожаловать, Александр</h2>
        <p className="ap-hero-desc">
          Ваш VPN работает стабильно. До окончания подписки — <strong>27 дней</strong>.
        </p>
        <div className="ap-hero-actions">
          <button className="ap-btn ap-btn-primary">Подключиться</button>
          <button className="ap-btn">Инструкция</button>
        </div>
        <div className="ap-hero-stats">
          <Stat label="Тариф" value="Базовый" />
          <Stat label="Устройств" value="2 из 5" />
          <Stat label="Трафик" value="Безлимит" />
        </div>
      </div>

      <div className="ap-card ap-status">
        <div className="ap-status-ring">
          <svg viewBox="0 0 120 120" aria-hidden>
            <circle cx="60" cy="60" r="52" className="ap-ring-bg" />
            <circle cx="60" cy="60" r="52" className="ap-ring-fg" strokeDasharray="326" strokeDashoffset="88" />
          </svg>
          <div className="ap-status-center">
            <div className="ap-status-num">73%</div>
            <div className="ap-status-lab">срока</div>
          </div>
        </div>
        <div className="ap-status-list">
          <Row k="Тариф" v="12 месяцев" />
          <Row k="Оплачено" v="1 290 ₽" />
          <Row k="Продление" v="14.08.2026" />
        </div>
      </div>

      <div className="ap-card">
        <div className="ap-card-head">
          <h3 className="ap-card-title">Быстрые действия</h3>
        </div>
        <div className="ap-quick">
          <QuickTile icon="⚡" title="Продлить" desc="Оплатить следующий период" />
          <QuickTile icon="＋" title="Устройство" desc="Добавить новое" />
          <QuickTile icon="🎁" title="Подарить" desc="Отправить подписку другу" />
          <QuickTile icon="👥" title="Пригласить" desc="Реферальная ссылка" />
        </div>
      </div>

      <div className="ap-card">
        <div className="ap-card-head">
          <h3 className="ap-card-title">Активность за неделю</h3>
          <span className="ap-muted">Трафик</span>
        </div>
        <Chart />
      </div>
    </div>
  );
}

function SubscriptionSection() {
  const plans = [
    { id: "1m", label: "1 месяц", price: "149 ₽", per: "149 ₽/мес" },
    { id: "3m", label: "3 месяца", price: "399 ₽", per: "133 ₽/мес" },
    { id: "6m", label: "6 месяцев", price: "749 ₽", per: "125 ₽/мес" },
    { id: "12m", label: "12 месяцев", price: "1 290 ₽", per: "108 ₽/мес", best: true },
  ];
  const [pick, setPick] = useState("12m");

  return (
    <div className="ap-stack">
      <div className="ap-card ap-sub-current">
        <div>
          <div className="ap-muted">Текущий тариф</div>
          <div className="ap-sub-name">Базовый · 12 месяцев</div>
          <div className="ap-muted">Продление 14.08.2026 · 1 290 ₽</div>
        </div>
        <button className="ap-btn ap-btn-primary">Продлить сейчас</button>
      </div>

      <div className="ap-card">
        <div className="ap-card-head">
          <h3 className="ap-card-title">Выберите тариф</h3>
          <span className="ap-muted">Все тарифы включают безлимитный трафик</span>
        </div>
        <div className="ap-plans">
          {plans.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPick(p.id)}
              className={`ap-plan ${pick === p.id ? "is-active" : ""}`}
            >
              {p.best && <span className="ap-plan-badge">Выгодно</span>}
              <div className="ap-plan-label">{p.label}</div>
              <div className="ap-plan-price">{p.price}</div>
              <div className="ap-plan-per">{p.per}</div>
            </button>
          ))}
        </div>
        <div className="ap-devices-row">
          <div>
            <div className="ap-muted">Устройств в подписке</div>
            <div className="ap-devices-num">3</div>
          </div>
          <div className="ap-stepper">
            <button>−</button><span>3</span><button>+</button>
          </div>
        </div>
        <div className="ap-summary">
          <div><span>Тариф</span><b>1 290 ₽</b></div>
          <div><span>Доп. устройства</span><b>+ 780 ₽</b></div>
          <div className="ap-summary-total"><span>Итого</span><b>2 070 ₽</b></div>
        </div>
        <button className="ap-btn ap-btn-primary ap-btn-full">Перейти к оплате</button>
      </div>
    </div>
  );
}

function DevicesSection() {
  const devices = [
    { name: "iPhone 15 Pro", os: "iOS · Happ", last: "сейчас", on: true },
    { name: "MacBook Pro", os: "macOS · Happ", last: "3 мин назад", on: true },
    { name: "iPad Air", os: "iPadOS · INCY", last: "вчера", on: false },
  ];
  return (
    <div className="ap-stack">
      <div className="ap-card ap-dev-head">
        <div>
          <div className="ap-muted">Устройства</div>
          <div className="ap-dev-num">3 <span>/ 5</span></div>
        </div>
        <button className="ap-btn ap-btn-primary">＋ Добавить устройство</button>
      </div>

      <div className="ap-card">
        <div className="ap-devlist">
          {devices.map((d, i) => (
            <div key={i} className="ap-devitem">
              <div className={`ap-devdot ${d.on ? "is-on" : ""}`} />
              <div className="ap-devinfo">
                <div className="ap-devname">{d.name}</div>
                <div className="ap-muted">{d.os} · {d.last}</div>
              </div>
              <div className="ap-devactions">
                <button className="ap-icon-btn" aria-label="Настройки">⚙</button>
                <button className="ap-icon-btn ap-icon-danger" aria-label="Удалить">✕</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ap-card">
        <h3 className="ap-card-title">Как подключить</h3>
        <div className="ap-steps">
          {["Установите Happ или INCY", "Откройте ссылку подключения", "Нажмите «Подключить»"].map((s, i) => (
            <div key={i} className="ap-step">
              <span className="ap-step-num">{i + 1}</span>
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PaymentsSection() {
  const history = [
    { d: "14.07.2026", s: "Оплата подписки · 12 мес", a: "1 290 ₽", ok: true },
    { d: "01.06.2026", s: "Доп. устройство", a: "50 ₽", ok: true },
    { d: "14.07.2025", s: "Оплата подписки · 12 мес", a: "1 190 ₽", ok: true },
    { d: "10.07.2025", s: "Промокод LOVE10", a: "− 129 ₽", ok: true },
  ];
  return (
    <div className="ap-stack">
      <div className="ap-grid-cols">
        <div className="ap-card">
          <div className="ap-muted">Ближайшее списание</div>
          <div className="ap-pay-amount">1 290 ₽</div>
          <div className="ap-muted">14 августа 2026</div>
          <button className="ap-btn ap-btn-primary ap-btn-full">Оплатить сейчас</button>
        </div>
        <div className="ap-card">
          <div className="ap-muted">Способ оплаты</div>
          <div className="ap-pay-methods">
            <label className="ap-radio is-on">
              <span className="ap-radio-dot" />
              <span>YooKassa · Visa •• 4242</span>
            </label>
            <label className="ap-radio">
              <span className="ap-radio-dot" />
              <span>T-Pay</span>
            </label>
            <label className="ap-radio">
              <span className="ap-radio-dot" />
              <span>СБП</span>
            </label>
          </div>
        </div>
      </div>

      <div className="ap-card">
        <div className="ap-card-head">
          <h3 className="ap-card-title">История операций</h3>
          <button className="ap-link">Все операции →</button>
        </div>
        <div className="ap-table">
          {history.map((h, i) => (
            <div key={i} className="ap-tr">
              <div className="ap-td ap-muted">{h.d}</div>
              <div className="ap-td">{h.s}</div>
              <div className="ap-td ap-td-amount">{h.a}</div>
              <div className="ap-td"><span className="ap-tag ap-tag-ok">Успех</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReferralSection() {
  return (
    <div className="ap-stack">
      <div className="ap-card ap-ref-hero">
        <div>
          <h2 className="ap-hero-title">Приглашайте друзей — получайте месяцы</h2>
          <p className="ap-muted">За каждого друга вы получаете +30 дней подписки. Друг получает 3 дня триала.</p>
          <div className="ap-invite">
            <input readOnly value="https://t.me/DvinVPNBot?start=ref_a1b2c3" />
            <button className="ap-btn ap-btn-primary">Скопировать</button>
          </div>
        </div>
        <div className="ap-ref-stats">
          <Stat label="Приглашено" value="12" />
          <Stat label="Активных" value="7" />
          <Stat label="Бонус дней" value="+210" />
        </div>
      </div>

      <div className="ap-card">
        <h3 className="ap-card-title">Ваши приглашения</h3>
        <div className="ap-table">
          {[
            { n: "@ivan_p", d: "12.07.2026", s: "Активен", b: "+30 дн" },
            { n: "@masha_k", d: "05.07.2026", s: "Триал", b: "—" },
            { n: "@denis88", d: "28.06.2026", s: "Активен", b: "+30 дн" },
          ].map((r, i) => (
            <div key={i} className="ap-tr">
              <div className="ap-td">{r.n}</div>
              <div className="ap-td ap-muted">{r.d}</div>
              <div className="ap-td"><span className="ap-tag">{r.s}</span></div>
              <div className="ap-td ap-td-amount">{r.b}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SupportSection() {
  const faqs = [
    { q: "Как подключить VPN на iPhone?", a: "Установите Happ, откройте ссылку подключения и нажмите «Разрешить» в системном окне VPN." },
    { q: "Что делать, если сервер медленный?", a: "Попробуйте выбрать другой сервер из списка — обычно ближайший географически даёт лучшую скорость." },
    { q: "Можно ли использовать одну подписку на нескольких устройствах?", a: "Да, тариф поддерживает от 1 до 5 устройств. Дополнительные добавляются в разделе «Подписка»." },
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="ap-stack">
      <div className="ap-grid-cols">
        <div className="ap-card">
          <h3 className="ap-card-title">Написать в поддержку</h3>
          <p className="ap-muted">Отвечаем в течение 15 минут, каждый день с 9:00 до 24:00 МСК.</p>
          <div className="ap-support-actions">
            <button className="ap-btn ap-btn-primary">Открыть чат в Telegram</button>
            <button className="ap-btn">Написать в Mini App</button>
          </div>
        </div>
        <div className="ap-card">
          <h3 className="ap-card-title">Статус сервисов</h3>
          <div className="ap-status-lines">
            {[
              ["VPN-серверы", "Работают"],
              ["Оплата", "Работает"],
              ["Telegram-бот", "Работает"],
            ].map(([k, v]) => (
              <div key={k} className="ap-status-line">
                <span className="ap-devdot is-on" />
                <span>{k}</span>
                <b>{v}</b>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ap-card">
        <h3 className="ap-card-title">Частые вопросы</h3>
        <div className="ap-faq">
          {faqs.map((f, i) => (
            <div key={i} className={`ap-faq-item ${open === i ? "is-open" : ""}`}>
              <button className="ap-faq-q" onClick={() => setOpen(open === i ? null : i)}>
                <span>{f.q}</span>
                <span className="ap-faq-icn">＋</span>
              </button>
              {open === i && <div className="ap-faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================= Bits ============================= */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="ap-stat">
      <div className="ap-stat-lab">{label}</div>
      <div className="ap-stat-val">{value}</div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="ap-row"><span className="ap-muted">{k}</span><b>{v}</b></div>
  );
}

function QuickTile({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <button className="ap-quick-tile">
      <span className="ap-quick-icon">{icon}</span>
      <span className="ap-quick-title">{title}</span>
      <span className="ap-quick-desc">{desc}</span>
    </button>
  );
}

function Chart() {
  const data = [30, 55, 40, 78, 62, 90, 70];
  const labels = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  return (
    <div className="ap-chart">
      {data.map((v, i) => (
        <div key={i} className="ap-chart-col">
          <div className="ap-chart-bar" style={{ height: `${v}%` }}>
            <span className="ap-chart-bar-fill" />
          </div>
          <div className="ap-chart-lab">{labels[i]}</div>
        </div>
      ))}
    </div>
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

      /* Sidebar */
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
        cursor: pointer;
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

      /* Main */
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
      .ap-grid-cols {
        display: grid; gap: 18px;
        grid-template-columns: 1fr 1fr;
      }
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

      /* Hero */
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

      /* Status ring */
      .ap-status { display: grid; grid-template-columns: 130px 1fr; gap: 18px; align-items: center; }
      .ap-status-ring { position: relative; width: 130px; height: 130px; }
      .ap-status-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
      .ap-ring-bg { fill: none; stroke: rgba(255,255,255,.08); stroke-width: 10; }
      .ap-ring-fg { fill: none; stroke: url(#g); stroke-width: 10; stroke-linecap: round;
        stroke: #a78bfa; filter: drop-shadow(0 0 8px rgba(167,139,250,.6)); }
      .ap-status-center { position: absolute; inset: 0; display: grid; place-items: center; text-align: center; }
      .ap-status-num { font-size: 22px; font-weight: 800; }
      .ap-status-lab { font-size: 11px; color: rgba(236,233,255,.55); }
      .ap-status-list { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
      .ap-row { display: flex; justify-content: space-between; gap: 12px; font-size: 14px; }
      .ap-row b { font-weight: 700; }

      /* Quick actions */
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

      /* Chart */
      .ap-chart { display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; height: 180px; align-items: end; }
      .ap-chart-col { display: flex; flex-direction: column; align-items: center; gap: 6px; height: 100%; }
      .ap-chart-bar { width: 100%; max-width: 32px; border-radius: 8px 8px 4px 4px; background: rgba(255,255,255,.05); position: relative; overflow: hidden; flex: 0 0 auto; }
      .ap-chart-bar-fill { position: absolute; inset: 0; background: linear-gradient(180deg, #a78bfa, #38bdf8); border-radius: inherit; }
      .ap-chart-lab { font-size: 11px; color: rgba(236,233,255,.5); }

      /* Buttons */
      .ap-btn {
        display: inline-flex; align-items: center; justify-content: center; gap: 8px;
        padding: 11px 18px; border-radius: 12px;
        font-size: 14px; font-weight: 600; color: #fff;
        background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12);
        cursor: pointer;
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

      /* Subscription */
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

      /* Devices */
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

      /* Payments */
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

      /* Referral */
      .ap-ref-hero { display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: center; }
      @media (max-width: 780px) { .ap-ref-hero { grid-template-columns: 1fr; } }
      .ap-invite { display: flex; gap: 8px; margin-top: 14px; padding: 6px; border-radius: 14px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08); }
      .ap-invite input { flex: 1; min-width: 0; background: transparent; border: none; color: #fff; font-family: inherit; font-size: 13px; padding: 0 10px; outline: none; }
      .ap-ref-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; min-width: 280px; }
      @media (max-width: 780px) { .ap-ref-stats { min-width: 0; } }

      /* Support */
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
