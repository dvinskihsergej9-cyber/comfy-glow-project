import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Политика конфиденциальности — DvinVPN" },
      {
        name: "description",
        content:
          "Какие данные использует сервис DvinVPN, для чего они нужны и как обрабатываются платёжные данные.",
      },
      { property: "og:title", content: "Политика конфиденциальности — DvinVPN" },
      {
        property: "og:description",
        content: "Какие данные использует DvinVPN и как они обрабатываются.",
      },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage
      title="Политика конфиденциальности DvinVPN"
      lead="Документ описывает, какие данные использует сервис DvinVPN и для чего они нужны."
      updated="04.07.2026"
    >
      <h2>Оператор сервиса</h2>
      <p>Оператор сервиса: DvinVPN.</p>

      <h2>Какие данные используются</h2>
      <ul>
        <li>Telegram ID</li>
        <li>username Telegram</li>
        <li>данные подписки</li>
        <li>платёжный статус</li>
        <li>обращения в поддержку</li>
      </ul>

      <h2>Для чего используются данные</h2>
      <ul>
        <li>создание и управление подпиской</li>
        <li>оказание поддержки</li>
        <li>обработка оплаты и статуса платежа</li>
        <li>отправка сервисных уведомлений</li>
      </ul>

      <h2>Платежные данные</h2>
      <p>
        Платёжные данные обрабатываются на стороне YooKassa. DvinVPN не хранит данные банковских
        карт.
      </p>

      <h2>Вопросы по данным</h2>
      <p>
        Пользователь может обратиться в поддержку DvinVPN для вопросов, связанных с данными и
        использованием сервиса.
      </p>
    </LegalPage>
  );
}
