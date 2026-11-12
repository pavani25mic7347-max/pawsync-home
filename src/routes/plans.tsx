import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, PawPrint } from "lucide-react";

export const Route = createFileRoute("/plans")({
  head: () => ({
    meta: [
      { title: "Subscription Plans — PawSync" },
      { name: "description", content: "Choose a PawSync plan: Free, Plus or Family for multi-pet households." },
      { property: "og:title", content: "Subscription Plans — PawSync" },
      { property: "og:description", content: "Pick the PawSync plan that fits your pets and family." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Plans,
});

type Plan = { name: string; tagline: string; monthly: number; yearly: number; intro?: string; features: string[]; featured?: boolean };

const plans: Plan[] = [
  { name: "Free", tagline: "For getting started", monthly: 0, yearly: 0,
    features: ["1 pet profile", "Vaccination reminders", "5 AI assistant queries per month", "Basic health records"] },
  { name: "Plus", tagline: "For devoted pet parents", monthly: 99, yearly: 999, intro: "Everything in Free, plus:", featured: true,
    features: ["Up to 2 pet profiles", "30 AI assistant queries per month", "Monthly pet health summary", "Pet expense tracking and reports", "Exclusive partner discounts"] },
  { name: "Family Plan", tagline: "For multi-pet households", monthly: 199, yearly: 1999, intro: "Everything in Plus, plus:",
    features: ["Up to 5 pet profiles", "Access for up to 4 family members", "Shared pet-care schedules", "Shared vaccination and medicine reminders", "100 AI assistant queries per month", "Advanced expense analytics", "Priority customer support", "Premium partner offers"] },
];

export function Plans() {
  const [yearly, setYearly] = useState(false);
  return (
    <div id="plans" className="bg-background px-4 py-16">
      <header className="mx-auto max-w-2xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1 text-sm font-semibold text-secondary-foreground">
          <PawPrint className="h-4 w-4" /> PawSync
        </div>
        <h1 className="mt-6 font-display text-5xl text-foreground md:text-6xl">Subscription Plans</h1>
        <p className="mt-4 text-lg text-muted-foreground">Care for every paw in your home — pick the plan that fits.</p>
        <div className="mt-8 inline-flex rounded-full bg-muted p-1">
          {["Monthly", "Yearly"].map((l, i) => (
            <button key={l} onClick={() => setYearly(i === 1)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${yearly === (i === 1) ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground"}`}>
              {l}{i === 1 && <span className="ml-1 text-xs opacity-80">save ~16%</span>}
            </button>
          ))}
        </div>
      </header>

      <section className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <article key={p.name}
            className={`relative flex flex-col rounded-3xl border p-8 ${p.featured ? "border-primary bg-card shadow-xl md:-translate-y-3" : "bg-card"}`}>
            {p.featured && <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">Most popular</span>}
            <h2 className="font-display text-2xl text-card-foreground">{p.name}</h2>
            <p className="text-sm text-muted-foreground">{p.tagline}</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="font-display text-5xl text-foreground">₹{(yearly ? p.yearly : p.monthly).toLocaleString("en-IN")}</span>
              <span className="text-muted-foreground">/ {yearly ? "year" : "month"}</span>
            </div>
            {p.monthly > 0 && (
              <p className="mt-1 text-sm text-muted-foreground">
                {yearly ? `₹${p.monthly} / month billed monthly` : `₹${p.yearly.toLocaleString("en-IN")} / year`}
              </p>
            )}
            {p.intro && <p className="mt-6 text-sm font-semibold text-foreground">{p.intro}</p>}
            <ul className={`${p.intro ? "mt-3" : "mt-6"} flex-1 space-y-3`}>
              {p.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-card-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}
                </li>
              ))}
            </ul>
            <button className={`mt-8 rounded-full py-3 font-semibold transition hover:opacity-90 ${p.featured ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
              {p.monthly === 0 ? "Get started free" : `Choose ${p.name}`}
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}
