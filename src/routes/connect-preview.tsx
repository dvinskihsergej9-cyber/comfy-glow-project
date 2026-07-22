import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, Download, CloudDownload, CheckCircle2, ExternalLink, Plus, Sparkles } from "lucide-react";

export const Route = createFileRoute("/connect-preview")({
  head: () => ({
    meta: [
      { title: "Подключение — DvinVPN (preview)" },
      { name: "robots", content: "noindex, nofollow" },
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
  gradient: string;
  ringColor: string;
  monogram: string;
  storeRu: string;
  storeGlobal: string;
  scheme: string;
}> = {
  happ: {
    id: "happ",
    name: "Happ",
    recommended: true,
    tagline: "Быстрый клиент с автоматической настройкой",
    gradient: "linear-gradient(135deg, #2b1e4a 0%, #4b2a7a 100%)",
    ringColor: "rgba(139, 92, 246, 0.55)",
    monogram: "H",
    storeRu: "#",
    storeGlobal: "#",
    scheme: "happ://add/",
  },
  incy: {
    id: "incy",
    name: "INCY",
    tagline: "Минималистичный клиент с фокусом на приватность",
    gradient: "linear-gradient(135deg, #1e3a5c 0%, #2b6cb0 100%)",
    ringColor: "rgba(56, 189, 248, 0.55)",
    monogram: "i",
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
      {/* Decorative background */}
      <div className="cp-bg" aria-hidden>
        <div className="cp-bg-grid" />
        <div className="cp-orb cp-orb-a" />
        <div className="cp-orb cp-orb-b" />
        <div className="cp-orb cp-orb-c" />
      </div>

      {/* Top bar */}
      <header className="cp-top">
        <Link to="/" className="cp-back">
          <ArrowLeft size={16} />
          <span>Назад</span>
        </Link>

        <div className="cp-title-pill">
          <span className="cp-title-dot" />
          <span className="cp-title-text">Подключение приложения</span>
        </div>

        <button type="button" className="cp-more" aria-label="Меню">
          <span /><span /><span />
        </button>
      </header>

      <div className="cp-shell">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="cp-hero"
        >
          <div className="cp-hero-eyebrow">
            <Sparkles size={13} />
            <span>3 шага до подключения</span>
          </div>
          <h1 className="cp-h1">
            Выберите приложение <br />
            <em>и следуйте инструкции</em>
          </h1>
          <p className="cp-lead">
            Рекомендуем <strong>Happ</strong> — самый быстрый способ подключиться. INCY — на случай,
            если хочется минимализм и полный контроль.
          </p>
        </motion.div>

        {/* App selector */}
        <section className="cp-section">
          <div className="cp-section-head">
            <span className="cp-num">01</span>
            <h2 className="cp-h2">Выберите приложение</h2>
          </div>

          <div className="cp-apps">
            {(Object.keys(APPS) as AppId[]).map((id, i) => {
              const a = APPS[id];
              const isActive = id === active;
              return (
                <motion.button
                  key={id}
                  type="button"
                  onClick={() => setActive(id)}
                  className={`cp-app ${isActive ? "is-active" : ""}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  style={{ ["--ring" as any]: a.ringColor }}
                >
                  <div className="cp-app-glow" aria-hidden />

                  <div className="cp-app-icon" style={{ background: a.gradient }}>
                    <span>{a.monogram}</span>
                    <div className="cp-app-icon-shine" aria-hidden />
                  </div>

                  <div className="cp-app-body">
                    <div className="cp-app-row">
                      <span className="cp-app-name">{a.name}</span>
                      {a.recommended && (
                        <span className="cp-badge">Рекомендуем</span>
                      )}
                    </div>
                    <p className="cp-app-tag">{a.tagline}</p>
                  </div>

                  <div className="cp-check" aria-hidden>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 380, damping: 22 }}
                        >
                          <CheckCircle2 size={22} strokeWidth={2.2} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {!isActive && <div className="cp-check-empty" />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Steps */}
        <section className="cp-section">
          <div className="cp-section-head">
            <span className="cp-num">02</span>
            <h2 className="cp-h2">Шаги установки</h2>
          </div>

          <div className="cp-steps">
            <Step
              icon={<Download size={18} />}
              tone="violet"
              index={1}
              title="Установка приложения"
              desc={
                <>
                  Откройте страницу в App Store и установите <strong>{app.name}</strong>. Запустите
                  приложение — в окне разрешения VPN‑конфигурации нажмите <em>Allow</em> и введите
                  свой пароль.
                </>
              }
            >
              <div className="cp-btn-grid">
                <AppButton label={`App Store (RU) · ${app.name}`} href={app.storeRu} />
                <AppButton label={`App Store (Global) · ${app.name}`} href={app.storeGlobal} />
              </div>
            </Step>

            <Step
              icon={<CloudDownload size={18} />}
              tone="cyan"
              index={2}
              title="Добавление подписки"
              desc="Нажмите кнопку ниже — приложение откроется, и подписка добавится автоматически."
            >
              <PrimaryButton
                label={`Добавить подписку в ${app.name}`}
                icon={<Plus size={18} strokeWidth={2.4} />}
                href={app.scheme}
              />
            </Step>

            <Step
              icon={<CheckCircle2 size={18} />}
              tone="mint"
              index={3}
              title="Подключение и использование"
              desc={
                <>
                  В главном разделе нажмите большую кнопку включения по центру. Не забудьте выбрать
                  сервер из списка — при необходимости попробуйте другой, если нужен более быстрый.
                </>
              }
            />
          </div>
        </section>

        {/* FAQ tail */}
        <section className="cp-faq">
          <FaqItem q="Что если приложение не устанавливается?">
            Убедитесь, что регион App Store поддерживает выбранное приложение. Попробуйте вторую
            ссылку (RU / Global) или напишите в поддержку в Telegram.
          </FaqItem>
          <FaqItem q="Подписка не добавляется автоматически">
            Откройте приложение вручную и выберите «Добавить из буфера обмена» — ссылка уже будет
            скопирована. Или перейдите в веб‑кабинет и запросите новую ссылку.
          </FaqItem>
          <FaqItem q="Как переключиться между Happ и INCY?">
            Обе подписки — одна и та же. Можно установить оба приложения, но подключаться нужно
            только через одно за раз.
          </FaqItem>
        </section>

        <footer className="cp-footer">
          <span>© DvinVPN</span>
          <div className="cp-footer-links">
            <Link to="/terms">Условия</Link>
            <Link to="/privacy">Политика</Link>
            <Link to="/offer">Оферта</Link>
          </div>
        </footer>
      </div>

      <ConnectPreviewStyles />
    </main>
  );
}

function Step({
  icon,
  tone,
  index,
  title,
  desc,
  children,
}: {
  icon: React.ReactNode;
  tone: "violet" | "cyan" | "mint";
  index: number;
  title: string;
  desc: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <motion.article
      className={`cp-step tone-${tone}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="cp-step-rail" aria-hidden>
        <div className="cp-step-icon">{icon}</div>
        <div className="cp-step-line" />
      </div>

      <div className="cp-step-body">
        <div className="cp-step-head">
          <span className="cp-step-num">Шаг {index}</span>
          <h3 className="cp-step-title">{title}</h3>
        </div>
        <p className="cp-step-desc">{desc}</p>
        {children && <div className="cp-step-actions">{children}</div>}
      </div>
    </motion.article>
  );
}

function AppButton({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} className="cp-btn cp-btn-primary btn-shine" target="_blank" rel="noreferrer">
      <ExternalLink size={16} />
      <span>{label}</span>
    </a>
  );
}

function PrimaryButton({ label, icon, href }: { label: string; icon: React.ReactNode; href: string }) {
  return (
    <a href={href} className="cp-btn cp-btn-primary cp-btn-lg btn-shine">
      {icon}
      <span>{label}</span>
    </a>
  );
}

function FaqItem({ q, children }: { q: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`cp-faq-item ${open ? "is-open" : ""}`}>
      <button type="button" onClick={() => setOpen(v => !v)} className="cp-faq-q">
        <span>{q}</span>
        <ChevronDown size={18} className="cp-faq-chev" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="cp-faq-a-wrap"
          >
            <p className="cp-faq-a">{children}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ConnectPreviewStyles() {
  return (
    <style>{`
      .cp-root {
        position: relative;
        min-height: 100dvh;
        width: 100%;
        overflow: hidden;
        color: #1a1830;
        background: #f6f4ff;
        padding: 20px 20px 60px;
      }

      /* ===== Background ===== */
      .cp-bg { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; }
      .cp-bg-grid {
        position: absolute; inset: 0;
        background-image:
          linear-gradient(rgba(80, 70, 160, 0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(80, 70, 160, 0.06) 1px, transparent 1px);
        background-size: 48px 48px;
        mask-image: radial-gradient(ellipse at 50% 20%, #000 40%, transparent 80%);
      }
      .cp-orb {
        position: absolute;
        border-radius: 999px;
        filter: blur(90px);
        opacity: 0.55;
      }
      .cp-orb-a {
        width: 520px; height: 520px;
        left: -160px; top: -120px;
        background: radial-gradient(circle at 40% 40%, #a78bfa 0%, transparent 65%);
      }
      .cp-orb-b {
        width: 620px; height: 620px;
        right: -220px; top: 8%;
        background: radial-gradient(circle at 60% 40%, #7dd3fc 0%, transparent 65%);
      }
      .cp-orb-c {
        width: 480px; height: 480px;
        left: 30%; bottom: -220px;
        background: radial-gradient(circle at 50% 50%, #c4b5fd 0%, transparent 65%);
        opacity: 0.4;
      }

      /* ===== Top bar ===== */
      .cp-top {
        position: relative; z-index: 2;
        max-width: 1100px; margin: 0 auto 32px;
        display: flex; align-items: center; justify-content: space-between;
        gap: 12px;
      }
      .cp-back, .cp-more {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 10px 16px;
        border-radius: 999px;
        background: rgba(255,255,255,0.7);
        border: 1px solid rgba(20, 20, 60, 0.08);
        backdrop-filter: blur(14px);
        font-size: 13px; font-weight: 600;
        color: #35305a;
        text-decoration: none;
        transition: transform .2s ease, background .2s ease, border-color .2s ease;
        cursor: pointer;
      }
      .cp-back:hover, .cp-more:hover {
        background: #fff; border-color: rgba(124, 58, 237, 0.35);
        transform: translateY(-1px);
      }
      .cp-more { padding: 12px 14px; }
      .cp-more span {
        display: block; width: 4px; height: 4px; border-radius: 50%;
        background: #5b5680; margin: 0 2px;
      }
      .cp-more { display: inline-flex; }

      .cp-title-pill {
        display: inline-flex; align-items: center; gap: 10px;
        padding: 10px 18px;
        border-radius: 999px;
        background: linear-gradient(180deg, #17142b, #0e0b22);
        color: #f2edff;
        font-size: 13px; font-weight: 600;
        letter-spacing: -0.01em;
        box-shadow: 0 12px 30px -12px rgba(20, 10, 60, 0.5);
      }
      .cp-title-dot {
        width: 8px; height: 8px; border-radius: 50%;
        background: linear-gradient(135deg, #a78bfa, #38bdf8);
        box-shadow: 0 0 12px rgba(167, 139, 250, 0.8);
      }

      /* ===== Shell ===== */
      .cp-shell {
        position: relative; z-index: 1;
        max-width: 1100px; margin: 0 auto;
        display: flex; flex-direction: column; gap: 40px;
      }

      /* ===== Hero ===== */
      .cp-hero { text-align: center; padding: 12px 12px 0; }
      .cp-hero-eyebrow {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 8px 14px;
        border-radius: 999px;
        background: rgba(255,255,255,0.7);
        border: 1px solid rgba(124, 58, 237, 0.18);
        color: #5b3aa8;
        font-size: 12.5px; font-weight: 600;
        letter-spacing: 0.02em;
      }
      .cp-h1 {
        margin: 18px auto 12px;
        font-size: clamp(34px, 5.4vw, 56px);
        font-weight: 800;
        letter-spacing: -0.035em;
        line-height: 1.05;
        color: #14112d;
        max-width: 820px;
      }
      .cp-h1 em {
        font-style: normal;
        background: linear-gradient(135deg, #7c3aed 0%, #5b5cf6 40%, #38bdf8 100%);
        -webkit-background-clip: text; background-clip: text; color: transparent;
      }
      .cp-lead {
        max-width: 620px; margin: 0 auto;
        color: #5b567e;
        font-size: 16px; line-height: 1.55;
      }
      .cp-lead strong { color: #14112d; font-weight: 700; }

      /* ===== Section ===== */
      .cp-section-head {
        display: flex; align-items: baseline; gap: 14px;
        margin-bottom: 18px;
      }
      .cp-num {
        font-size: 13px; font-weight: 700;
        color: #7c3aed;
        letter-spacing: 0.14em;
        background: rgba(124, 58, 237, 0.08);
        border: 1px solid rgba(124, 58, 237, 0.16);
        padding: 4px 10px;
        border-radius: 999px;
      }
      .cp-h2 {
        font-size: clamp(22px, 2.6vw, 28px);
        font-weight: 700; letter-spacing: -0.02em;
        color: #14112d;
      }

      /* ===== Apps ===== */
      .cp-apps {
        display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
      }
      .cp-app {
        position: relative;
        display: grid; grid-template-columns: auto 1fr auto;
        align-items: center; gap: 18px;
        padding: 20px;
        border-radius: 22px;
        background: rgba(255,255,255,0.75);
        border: 1px solid rgba(20, 20, 60, 0.08);
        backdrop-filter: blur(14px);
        text-align: left; cursor: pointer;
        transition: border-color .25s ease, box-shadow .25s ease, transform .25s ease, background .25s ease;
      }
      .cp-app:hover {
        background: #fff;
        border-color: var(--ring, rgba(124, 58, 237, 0.35));
        box-shadow: 0 22px 60px -30px var(--ring, rgba(124, 58, 237, 0.55));
      }
      .cp-app.is-active {
        background: #fff;
        border-color: var(--ring, rgba(124, 58, 237, 0.6));
        box-shadow:
          0 30px 80px -35px var(--ring, rgba(124, 58, 237, 0.7)),
          0 0 0 3px rgba(255,255,255,0.6),
          0 0 0 4px var(--ring, rgba(124, 58, 237, 0.4));
      }
      .cp-app-glow {
        position: absolute; inset: -1px; border-radius: inherit;
        pointer-events: none;
        background: radial-gradient(120% 100% at 0% 0%, var(--ring), transparent 55%);
        opacity: 0; transition: opacity .3s ease;
      }
      .cp-app.is-active .cp-app-glow { opacity: 0.14; }

      .cp-app-icon {
        position: relative; overflow: hidden;
        width: 60px; height: 60px;
        border-radius: 18px;
        display: grid; place-items: center;
        color: #fff;
        font-family: 'Instrument Serif', ui-serif, Georgia, serif;
        font-size: 30px; font-weight: 600;
        letter-spacing: -0.02em;
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,0.22),
          0 12px 24px -12px rgba(20, 10, 60, 0.5);
      }
      .cp-app-icon-shine {
        position: absolute; inset: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 55%);
        pointer-events: none;
      }
      .cp-app-body { min-width: 0; }
      .cp-app-row {
        display: flex; align-items: center; gap: 10px;
        margin-bottom: 4px;
      }
      .cp-app-name {
        font-size: 18px; font-weight: 700;
        letter-spacing: -0.015em; color: #14112d;
      }
      .cp-badge {
        display: inline-flex; align-items: center;
        padding: 3px 9px;
        border-radius: 999px;
        font-size: 11px; font-weight: 700;
        letter-spacing: 0.06em; text-transform: uppercase;
        background: linear-gradient(135deg, #d1fae5, #a7f3d0);
        color: #065f46;
        border: 1px solid rgba(16, 185, 129, 0.25);
      }
      .cp-app-tag {
        font-size: 13.5px; color: #6a6688;
        line-height: 1.4;
      }
      .cp-check { color: #7c3aed; }
      .cp-check-empty {
        width: 22px; height: 22px; border-radius: 50%;
        border: 1.5px solid rgba(20, 20, 60, 0.15);
      }

      /* ===== Steps ===== */
      .cp-steps { display: flex; flex-direction: column; gap: 18px; }
      .cp-step {
        position: relative;
        display: grid;
        grid-template-columns: 56px 1fr;
        gap: 20px;
        padding: 22px;
        border-radius: 22px;
        background: rgba(255,255,255,0.78);
        border: 1px solid rgba(20, 20, 60, 0.07);
        backdrop-filter: blur(14px);
      }
      .cp-step-rail {
        display: flex; flex-direction: column; align-items: center; gap: 8px;
      }
      .cp-step-icon {
        width: 44px; height: 44px;
        border-radius: 14px;
        display: grid; place-items: center;
        color: #fff;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), 0 10px 22px -12px rgba(20, 10, 60, 0.5);
      }
      .cp-step.tone-violet .cp-step-icon { background: linear-gradient(135deg, #7c3aed, #5b5cf6); }
      .cp-step.tone-cyan   .cp-step-icon { background: linear-gradient(135deg, #38bdf8, #6366f1); }
      .cp-step.tone-mint   .cp-step-icon { background: linear-gradient(135deg, #10b981, #22d3a5); }
      .cp-step-line {
        flex: 1; width: 2px;
        background: linear-gradient(180deg, rgba(124, 58, 237, 0.4), transparent);
        border-radius: 1px;
      }
      .cp-step:last-child .cp-step-line { display: none; }

      .cp-step-head { margin-bottom: 6px; }
      .cp-step-num {
        display: inline-block;
        font-size: 11.5px; font-weight: 700;
        letter-spacing: 0.14em; text-transform: uppercase;
        color: #7c3aed;
        margin-bottom: 6px;
      }
      .cp-step-title {
        font-size: 19px; font-weight: 700;
        letter-spacing: -0.015em; color: #14112d;
      }
      .cp-step-desc {
        font-size: 14.5px; line-height: 1.55;
        color: #55507a;
        max-width: 640px;
      }
      .cp-step-desc strong { color: #14112d; font-weight: 700; }
      .cp-step-desc em { font-style: normal; padding: 1px 6px; border-radius: 6px;
        background: rgba(124, 58, 237, 0.1); color: #5b3aa8; font-weight: 600; }
      .cp-step-actions { margin-top: 16px; display: flex; flex-direction: column; gap: 10px; }
      .cp-btn-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

      /* ===== Buttons ===== */
      .cp-btn {
        position: relative; overflow: hidden;
        display: inline-flex; align-items: center; justify-content: center; gap: 10px;
        padding: 14px 18px;
        border-radius: 14px;
        font-size: 14.5px; font-weight: 700;
        text-decoration: none;
        border: 0; cursor: pointer;
        color: #fff;
        background: linear-gradient(135deg, #7c3aed 0%, #5b5cf6 50%, #2563eb 100%);
        box-shadow:
          0 14px 30px -12px rgba(91, 92, 246, 0.55),
          inset 0 1px 0 rgba(255,255,255,0.25);
        transition: transform .2s ease, filter .2s ease;
      }
      .cp-btn:hover { transform: translateY(-1px); filter: brightness(1.06); }
      .cp-btn-lg { padding: 16px 22px; font-size: 15px; }

      /* ===== FAQ ===== */
      .cp-faq { display: flex; flex-direction: column; gap: 8px; }
      .cp-faq-item {
        background: rgba(255,255,255,0.78);
        border: 1px solid rgba(20, 20, 60, 0.07);
        border-radius: 16px;
        overflow: hidden;
        backdrop-filter: blur(14px);
      }
      .cp-faq-q {
        width: 100%;
        display: flex; align-items: center; justify-content: space-between;
        gap: 12px;
        padding: 16px 18px;
        background: transparent; border: 0; cursor: pointer;
        font-size: 15px; font-weight: 600; color: #14112d;
        text-align: left;
      }
      .cp-faq-chev { transition: transform .25s ease; color: #7c3aed; }
      .cp-faq-item.is-open .cp-faq-chev { transform: rotate(180deg); }
      .cp-faq-a-wrap { overflow: hidden; }
      .cp-faq-a {
        padding: 0 18px 16px;
        font-size: 14px; line-height: 1.55; color: #55507a;
      }

      /* ===== Footer ===== */
      .cp-footer {
        display: flex; justify-content: space-between; align-items: center;
        padding: 20px 4px 0;
        font-size: 12.5px; color: #7a7599;
      }
      .cp-footer-links { display: flex; gap: 16px; }
      .cp-footer-links a {
        color: #55507a; text-decoration: none;
        border-bottom: 1px dashed rgba(124, 58, 237, 0.35);
      }
      .cp-footer-links a:hover { color: #14112d; }

      /* ===== Mobile ===== */
      @media (max-width: 720px) {
        .cp-root { padding: 14px 14px 40px; }
        .cp-top { margin-bottom: 20px; }
        .cp-title-pill { display: none; }
        .cp-shell { gap: 28px; }
        .cp-apps { grid-template-columns: 1fr; }
        .cp-btn-grid { grid-template-columns: 1fr; }
        .cp-step { grid-template-columns: 44px 1fr; padding: 18px; gap: 14px; }
        .cp-step-icon { width: 36px; height: 36px; border-radius: 12px; }
      }
    `}</style>
  );
}
