import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/app-preview/subscription")({
  head: () => ({
    meta: [
      { title: "Подписка — Кабинет DvinVPN" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Управление тарифом и продление подписки DvinVPN." },
    ],
  }),
  component: SubscriptionPage,
});

function SubscriptionPage() {
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
