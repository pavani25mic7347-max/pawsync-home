import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Home, Dog, Heart, CalendarDays, MessageCircle, Scissors, ShoppingBag, House, MapPin, Search, Users, IndianRupee, Crown, Menu, X, PawPrint, User } from "lucide-react";

const items = [
  { title: "Home / Dashboard", to: "/", icon: Home },
  { title: "My Pets", slug: "pets", icon: Dog },
  { title: "Health & Vaccinations", slug: "health", icon: Heart },
  { title: "Daily Care", slug: "daily-care", icon: CalendarDays },
  { title: "AI Pet Assistant", slug: "assistant", icon: MessageCircle },
  { title: "Services", slug: "services", icon: Scissors },
  { title: "Shop", slug: "shop", icon: ShoppingBag },
  { title: "Adoption", slug: "adoption", icon: House },
  { title: "Pet-Friendly Places", slug: "places", icon: MapPin },
  { title: "Lost & Found", slug: "lost-found", icon: Search },
  { title: "Community & Guides", slug: "community", icon: Users },
  { title: "Expenses", slug: "expenses", icon: IndianRupee },
  { title: "Subscription Plans", to: "/plans", icon: Crown },
] as const;

export const sectionTitles: Record<string, string> = Object.fromEntries(
  items.filter((i) => "slug" in i).map((i) => [(i as { slug: string }).slug, i.title]),
);

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  const nav = (
    <aside className="flex h-full w-72 flex-col overflow-y-auto bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 border-b border-sidebar-border p-5">
        <div className="rounded-2xl bg-sidebar-accent p-3"><PawPrint className="h-7 w-7 text-accent" /></div>
        <div>
          <p className="font-display text-2xl leading-none">PAWSYNC</p>
          <p className="mt-1 text-xs tracking-widest opacity-80">PET CARE COMPANION</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {items.map((it) => {
          const href = "to" in it ? it.to : `/${it.slug}`;
          const active = path === href;
          const cls = `flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition hover:bg-sidebar-accent ${active ? "bg-sidebar-accent" : ""}`;
          const Icon = it.icon;
          return "to" in it ? (
            <Link key={it.title} to={it.to} onClick={() => setOpen(false)} className={cls}><Icon className="h-5 w-5" />{it.title}</Link>
          ) : (
            <Link key={it.title} to="/$section" params={{ section: it.slug }} onClick={() => setOpen(false)} className={cls}><Icon className="h-5 w-5" />{it.title}</Link>
          );
        })}
      </nav>
    </aside>
  );

  return (
    <div className="flex min-h-screen w-full">
      <div className="sticky top-0 hidden h-screen lg:block">{nav}</div>
      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {nav}
          <button aria-label="Close menu" className="flex-1 bg-foreground/40" onClick={() => setOpen(false)}><X className="m-4 h-6 w-6 text-background" /></button>
        </div>
      )}
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b bg-background/90 px-4 py-3 backdrop-blur">
          <button aria-label="Open menu" className="rounded-lg p-2 lg:invisible" onClick={() => setOpen(true)}><Menu className="h-6 w-6" /></button>
          <Link to="/login" className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold"><User className="h-4 w-4" /> Login</Link>
        </header>
        {children}
      </div>
    </div>
  );
}
