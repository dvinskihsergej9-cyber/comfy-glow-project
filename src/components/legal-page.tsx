import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export function LegalPage({
  title,
  lead,
  updated,
  children,
}: {
  title: string;
  lead?: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050711] text-text">
      {/* subtle top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(124,58,237,0.18),transparent_70%)]" />

      <header className="relative z-10 border-b border-white/5">
        <div className="mx-auto max-w-[860px] px-5 md:px-8 py-5 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[14px] text-text-mute hover:text-text transition"
          >
            <ArrowLeft className="w-4 h-4" />
            DvinVPN
          </Link>
          <a
            href="https://t.me/DvinVPNBot"
            target="_blank"
            rel="noreferrer"
            className="text-[13px] text-cyan hover:text-white transition"
          >
            Открыть в Telegram
          </a>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-[760px] px-5 md:px-8 py-14 md:py-20">
        <h1 className="font-display text-[36px] md:text-[52px] font-bold leading-[1.1] tracking-tight">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 text-[17px] md:text-[19px] text-text-mute leading-[1.55] max-w-[640px]">
            {lead}
          </p>
        )}
        {updated && (
          <div className="mt-4 font-mono text-[12px] uppercase tracking-widest text-text-dim">
            Обновлено: {updated}
          </div>
        )}

        <article className="legal-prose mt-10 md:mt-14">{children}</article>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-3 text-[14px]">
          <Link
            to="/privacy"
            className="rounded-full border border-white/10 px-4 py-2 text-text-mute hover:text-text hover:border-white/20 transition"
          >
            Политика
          </Link>
          <Link
            to="/offer"
            className="rounded-full border border-white/10 px-4 py-2 text-text-mute hover:text-text hover:border-white/20 transition"
          >
            Оферта
          </Link>
          <Link
            to="/terms"
            className="rounded-full border border-white/10 px-4 py-2 text-text-mute hover:text-text hover:border-white/20 transition"
          >
            Условия
          </Link>
        </div>
      </main>
    </div>
  );
}
