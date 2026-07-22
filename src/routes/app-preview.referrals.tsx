import { createFileRoute } from "@tanstack/react-router";
import { Stat } from "@/components/app-preview/shared";

export const Route = createFileRoute("/app-preview/referrals")({
  head: () => ({
    meta: [
      { title: "Рефералы — Кабинет DvinVPN" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Приглашайте друзей и получайте бонусные дни DvinVPN." },
    ],
  }),
  component: ReferralsPage,
});

function ReferralsPage() {
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
