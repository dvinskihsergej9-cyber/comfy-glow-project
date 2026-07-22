import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/app-preview/shared";

export const Route = createFileRoute("/app-preview")({
  head: () => ({
    meta: [
      { title: "Кабинет — DvinVPN" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Превью личного кабинета DvinVPN." },
    ],
  }),
  component: AppPreviewLayout,
});

function AppPreviewLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
