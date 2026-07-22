import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app-preview/payments")({
  head: () => ({
    meta: [
      { title: "Оплата — Кабинет DvinVPN" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "История оплат и способы оплаты DvinVPN." },
    ],
  }),
  component: PaymentsPage,
});

function PaymentsPage() {
  const history = [
    { d: "14.07.2026", s: "Оплата подписки · 12 мес", a: "1 290 ₽" },
    { d: "01.06.2026", s: "Доп. устройство", a: "50 ₽" },
    { d: "14.07.2025", s: "Оплата подписки · 12 мес", a: "1 190 ₽" },
    { d: "10.07.2025", s: "Промокод LOVE10", a: "− 129 ₽" },
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
