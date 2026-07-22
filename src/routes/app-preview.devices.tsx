import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app-preview/devices")({
  head: () => ({
    meta: [
      { title: "Устройства — Кабинет DvinVPN" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Подключённые устройства DvinVPN." },
    ],
  }),
  component: DevicesPage,
});

function DevicesPage() {
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
