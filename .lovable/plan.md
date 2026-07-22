# Превью личного кабинета DvinVPN — отдельные страницы

## Что не так сейчас

`/app-preview` — одна страница с внутренними табами. Это удобно как демо, но:
- не соответствует реальной структуре RWP Shop (у них отдельные URL на каждый раздел)
- нельзя открыть конкретный экран по прямой ссылке
- CSS-классы одного раздела мешают классам другого, стили сложнее переносить в прод

## Что сделаем

Разложить превью на маршруты, повторяющие оригинал `shop.dvinconnect.store`:

```text
/app-preview            -> редирект на /app-preview/dashboard
/app-preview/dashboard  -> Главная (баланс, активная подписка, быстрые действия)
/app-preview/subscription -> Тарифы, выбор устройств, продление
/app-preview/devices    -> Список устройств + добавление
/app-preview/payments   -> История платежей, способы оплаты
/app-preview/referrals  -> Реферальная программа
/app-preview/support    -> Поддержка, FAQ
```

## Архитектура роутов

Используем pathless layout-роут TanStack Router:

```text
src/routes/
  app-preview.tsx              (layout: sidebar + topbar + <Outlet />)
  app-preview.index.tsx        (редирект на dashboard)
  app-preview.dashboard.tsx
  app-preview.subscription.tsx
  app-preview.devices.tsx
  app-preview.payments.tsx
  app-preview.referrals.tsx
  app-preview.support.tsx
```

Общие вещи (sidebar, mobile drawer, topbar с балансом, фон с орбами, токены цветов) живут в layout и в `src/components/app-preview/*`. Данные-заглушки — в `src/data/app-preview.ts`.

## Дизайн-система

Оставляем тёмно-фиолетовую тему и glassmorphism из текущей версии, но выносим в один префикс `.ap-` (app-preview), чтобы стили можно было скопом перенести в прод RWP Shop без конфликтов с лендингом. Никаких эмодзи в UI — иконки Lucide.

Все маршруты помечаем `robots: noindex` — это внутреннее превью.

## Технические детали

- Layout-роут `app-preview.tsx` рендерит `<Outlet />`, не дублирует контент.
- Активный пункт сайдбара через `useRouterState({ select: s => s.location.pathname })`, ссылки — `<Link to="/app-preview/dashboard">` и т.д. (типобезопасно).
- Мобильный сайдбар: `Sheet`/drawer, открывается кнопкой в topbar.
- Каждая страница: собственный `head()` с уникальным title/description, `robots: noindex`.
- Данные тарифов берём из существующего `src/data/product.ts`, не дублируем.
- Не трогаем лендинг, `/connect-preview`, `/login-preview`, legal-страницы.

## Порядок работы

1. Layout + sidebar + редирект index.
2. Dashboard (самый насыщенный экран).
3. Subscription (переиспользуем калькулятор из лендинга).
4. Devices, Payments, Referrals, Support (более лёгкие).
5. Удалить старый монолитный `app-preview.tsx` после переноса содержимого.
