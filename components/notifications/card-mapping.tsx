"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface CardContent {
  title: string;
  href: string;
}

export interface Card {
  cardTitle: string;
  contents: CardContent[];
}

interface CardMappingProps {
  cards?: Card[];
}

const dummyCards = [
  {
    cardTitle: "Quick Navigation",
    contents: [
      { title: "Dashboard", href: "/dashboard" },
      { title: "Analytics", href: "/analytics" },
      { title: "Settings", href: "/settings" },
      { title: "Profile", href: "/profile" },
    ],
  },
  {
    cardTitle: "Team Management",
    contents: [
      { title: "Team Members", href: "/team/members" },
      { title: "Roles & Permissions", href: "/team/roles" },
      { title: "Invitations", href: "/team/invitations" },
      { title: "Activity Log", href: "/team/activity" },
    ],
  },
  {
    cardTitle: "Resources",
    contents: [
      { title: "Documentation", href: "/docs" },
      { title: "API Reference", href: "/api" },
      { title: "Support", href: "/support" },
      { title: "Community", href: "/community" },
      { title: "Changelog", href: "/changelog" },
      { title: "Status", href: "/status" },
    ],
  },
];

const modernColors = [
  {
    bg: "bg-gradient-to-br from-blue-50/80 via-blue-50/40 to-transparent",
    border: "border-blue-100/50",
    hover: "hover:border-blue-200/70 hover:shadow-blue-100/50",
    glow: "group-hover:shadow-blue-500/10",
  },
  {
    bg: "bg-gradient-to-br from-violet-50/80 via-violet-50/40 to-transparent",
    border: "border-violet-100/50",
    hover: "hover:border-violet-200/70 hover:shadow-violet-100/50",
    glow: "group-hover:shadow-violet-500/10",
  },
  {
    bg: "bg-gradient-to-br from-emerald-50/80 via-emerald-50/40 to-transparent",
    border: "border-emerald-100/50",
    hover: "hover:border-emerald-200/70 hover:shadow-emerald-100/50",
    glow: "group-hover:shadow-emerald-500/10",
  },
  {
    bg: "bg-gradient-to-br from-amber-50/80 via-amber-50/40 to-transparent",
    border: "border-amber-100/50",
    hover: "hover:border-amber-200/70 hover:shadow-amber-100/50",
    glow: "group-hover:shadow-amber-500/10",
  },
  {
    bg: "bg-gradient-to-br from-rose-50/80 via-rose-50/40 to-transparent",
    border: "border-rose-100/50",
    hover: "hover:border-rose-200/70 hover:shadow-rose-100/50",
    glow: "group-hover:shadow-rose-500/10",
  },
  {
    bg: "bg-gradient-to-br from-cyan-50/80 via-cyan-50/40 to-transparent",
    border: "border-cyan-100/50",
    hover: "hover:border-cyan-200/70 hover:shadow-cyan-100/50",
    glow: "group-hover:shadow-cyan-500/10",
  },
  {
    bg: "bg-gradient-to-br from-indigo-50/80 via-indigo-50/40 to-transparent",
    border: "border-indigo-100/50",
    hover: "hover:border-indigo-200/70 hover:shadow-indigo-100/50",
    glow: "group-hover:shadow-indigo-500/10",
  },
  {
    bg: "bg-gradient-to-br from-teal-50/80 via-teal-50/40 to-transparent",
    border: "border-teal-100/50",
    hover: "hover:border-teal-200/70 hover:shadow-teal-100/50",
    glow: "group-hover:shadow-teal-500/10",
  },
];

export function CardMapping({ cards }: CardMappingProps) {
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-12 p-6 lg:p-12">
      {/* Empty state when no cards */}
      {(!cards || cards.length === 0) && (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-stone-100/50 bg-white/80 p-12 text-center backdrop-blur-sm">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-stone-100/50">
            <svg
              className="h-8 w-8 text-stone-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-stone-700">No Notifications</h3>
          <p className="text-stone-500">
            You&apos;re all caught up! There are no notifications to display at the moment.
          </p>
        </div>
      )}

      {cards &&
        cards.map((card, cardIndex) => (
          <div key={cardIndex} className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-stone-100/50 bg-white/80 p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] backdrop-blur-sm transition-all duration-500 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06),0_12px_32px_rgba(0,0,0,0.08)] lg:p-12">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />

              <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-gradient-to-br from-stone-100/30 via-transparent to-transparent blur-3xl" />

              {/* Card Title */}
              <h2 className="relative mb-8 text-3xl font-semibold tracking-tight text-stone-700 lg:text-3xl">
                {card.cardTitle}
              </h2>

              <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {card.contents.map((content, index) => {
                  const colorScheme = modernColors[index % modernColors.length];
                  return (
                    <button
                      key={index}
                      onClick={() => handleNavigation(content.href)}
                      className={cn(
                        "group relative rounded-xl border p-6 backdrop-blur-sm",
                        "cursor-pointer overflow-hidden text-left",
                        "transition-all duration-300 ease-out",
                        "focus:outline-none focus:ring-2 focus:ring-stone-300/50 focus:ring-offset-2",
                        "shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04),0_0_0_1px_rgba(0,0,0,0.01)]",
                        "hover:-translate-y-0.5",
                        colorScheme.bg,
                        colorScheme.border,
                        colorScheme.hover
                      )}
                    >
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                      </div>

                      <span className="relative text-base font-medium leading-relaxed text-stone-700 transition-colors duration-200 group-hover:text-stone-900">
                        {content.title}
                      </span>

                      <div className="absolute right-4 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-stone-900/0 transition-all duration-300 group-hover:bg-stone-900/5">
                        <svg
                          className="h-4 w-4 -translate-x-2 text-stone-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
