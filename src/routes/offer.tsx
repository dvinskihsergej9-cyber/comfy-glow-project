import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/offer")({
  head: () => ({
    meta: [
      { title: "Правила сервиса и условия оплаты — DvinVPN" },
      {
        name: "description",
        content:
          "Тарифы DvinVPN, стоимость дополнительных устройств, пробный период, условия оплаты, возврата и автопродления.",
      },
      { property: "og:title", content: "Правила сервиса и условия оплаты — DvinVPN" },
      {
        property: "og:description",
        content: "Тарифы, пробный период, оплата, возврат и автопродление DvinVPN.",
      },
      { property: "og:url", content: "/offer" },
    ],
    links: [{ rel: "canonical", href: "/offer" }],
  }),
  component: OfferPage,
});

function OfferPage() {
  return (
    <LegalPage
      title="Правила сервиса и условия оплаты DvinVPN"
      lead="Тарифы, пробный период, дополнительные устройства и общие условия оплаты."
    >
      <h2>Тарифы</h2>
      <ul>
        <li>
          <strong>149 ₽</strong> — 1 месяц
        </li>
        <li>
          <strong>399 ₽</strong> — 3 месяца
        </li>
        <li>
          <strong>749 ₽</strong> — 6 месяцев
        </li>
        <li>
          <strong>1290 ₽</strong> — 12 месяцев
        </li>
      </ul>
      <p>Стоимость от 108 ₽/мес указана при оплате за 12 месяцев.</p>

      <h2>Дополнительное устройство</h2>
      <ul>
        <li>
          <strong>50 ₽</strong> — 1 месяц
        </li>
        <li>
          <strong>120 ₽</strong> — 3 месяца
        </li>
        <li>
          <strong>220 ₽</strong> — 6 месяцев
        </li>
        <li>
          <strong>390 ₽</strong> — 12 месяцев
        </li>
      </ul>

      <h2>Пробный период</h2>
      <p>Пробный период: 3 дня, 1 устройство, 5 ГБ.</p>

      <h2>Оплата и активация</h2>
      <p>После оплаты подписка создаётся автоматически.</p>
      <p>Если подписка не активировалась, пользователь должен обратиться в поддержку.</p>

      <h2>Возврат</h2>
      <p>Возврат рассматривается через поддержку.</p>

      <h2>Автопродление</h2>
      <p>
        После оплаты подписки может быть включено автоматическое продление. Списание выполняется на
        следующий период подписки. Пользователь может отключить автопродление в личном кабинете.
        Если списание не прошло, подписку можно продлить вручную.
      </p>
    </LegalPage>
  );
}
