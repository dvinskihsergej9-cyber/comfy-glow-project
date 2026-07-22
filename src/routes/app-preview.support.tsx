import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/app-preview/support")({
  head: () => ({
    meta: [
      { title: "Поддержка — Кабинет DvinVPN" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Поддержка и частые вопросы DvinVPN." },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
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
