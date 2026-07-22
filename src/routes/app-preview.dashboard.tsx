import { createFileRoute } from "@tanstack/react-router";
import { Row, Stat } from "@/components/app-preview/shared";

export const Route = createFileRoute("/app-preview/dashboard")({
  head: () => ({
    meta: [
      { title: "Главная — Кабинет DvinVPN" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Обзор подписки и активности DvinVPN." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
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
