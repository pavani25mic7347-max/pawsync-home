import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, PawPrint, Bot, Syringe, Wallet, Users, HeartPulse, Gift, Star } from "lucide-react";
import family from "@/assets/slide-family.jpg";
import vet from "@/assets/slide-vet.jpg";
import shop from "@/assets/slide-shop.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PawSync — Your Pet's Life, Perfectly in Sync" },
      { name: "description", content: "Health records, reminders, AI pet assistant, expense tracking and exclusive offers for pet parents." },
      { property: "og:title", content: "PawSync — Your Pet's Life, Perfectly in Sync" },
      { property: "og:description", content: "Smart pet care, reminders and offers for the whole family." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const slides = [
  { img: family, tag: "Family Plan", title: "One home. Many paws. Zero chaos.", text: "Up to 5 pets & 4 family members — just ₹199/month.", cta: "See plans", to: "/plans" },
  { img: vet, tag: "Never miss a shot", title: "Vaccines on time, every time.", text: "Smart reminders for vaccines, medicines & vet visits.", cta: "Get started", to: "/health" },
  { img: shop, tag: "Up to 30% OFF", title: "Treats for them, savings for you.", text: "Exclusive partner discounts on food, toys & grooming.", cta: "Unlock offers", to: "/shop" },
] as const;

const features = [
  { icon: Bot, title: "AI Pet Assistant", text: "Ask anything, anytime — from diet to behaviour." },
  { icon: Syringe, title: "Vaccine Reminders", text: "Automatic alerts so nothing slips by." },
  { icon: HeartPulse, title: "Health Summary", text: "A monthly snapshot of your pet's wellbeing." },
  { icon: Wallet, title: "Expense Tracking", text: "Know exactly where every rupee goes." },
  { icon: Users, title: "Family Sharing", text: "Shared schedules for the whole household." },
  { icon: Gift, title: "Partner Offers", text: "Members-only deals from trusted brands." },
];

const offers = [
  { off: "30% OFF", what: "Premium pet food", code: "PAWFOOD30" },
  { off: "₹200 OFF", what: "First grooming session", code: "FRESHPAW" },
  { off: "20% OFF", what: "Vet consultations", code: "VETCARE20" },
  { off: "Buy 1 Get 1", what: "Chew toys & treats", code: "TREATS2" },
];

function Home() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % slides.length), 4500); return () => clearInterval(t); }, []);
  const go = (d: number) => setI((x) => (x + d + slides.length) % slides.length);

  return (
    <main className="min-h-screen bg-background px-4 pb-16">
      <div className="h-4" />

      <div className="mx-auto mb-4 max-w-6xl rounded-full bg-accent px-4 py-2 text-center text-sm font-semibold text-accent-foreground">
        🎉 Festive offer: Get 2 months FREE on yearly plans!
      </div>

      <section className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl">
        <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${i * 100}%)` }}>
          {slides.map((s, k) => (
            <div key={k} className="relative min-w-full">
              <img src={s.img} alt={s.title} width={1600} height={704} className="h-[300px] w-full object-cover md:h-[440px]" />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/40 to-transparent" />
              <div className="absolute inset-y-0 left-0 flex max-w-lg flex-col justify-center gap-3 p-8 text-background md:p-14">
                <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">{s.tag}</span>
                <h2 className="font-display text-3xl md:text-5xl">{s.title}</h2>
                <p className="opacity-90">{s.text}</p>
                <Link to={s.to} className="mt-2 w-fit rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">{s.cta}</Link>
              </div>
            </div>
          ))}
        </div>
        <button aria-label="Previous" onClick={() => go(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground"><ChevronLeft /></button>
        <button aria-label="Next" onClick={() => go(1)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground"><ChevronRight /></button>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, k) => <button key={k} aria-label={`Slide ${k + 1}`} onClick={() => setI(k)} className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-background" : "w-2 bg-background/50"}`} />)}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-6xl">
        <h2 className="font-display text-3xl text-foreground">Today's paw-some deals</h2>
        <p className="text-muted-foreground">Happy pets, happier wallets.</p>
        <div className="mt-6 flex snap-x gap-4 overflow-x-auto pb-2">
          {offers.map((o) => (
            <div key={o.code} className="min-w-[230px] snap-start rounded-2xl border bg-card p-6">
              <p className="font-display text-3xl text-primary">{o.off}</p>
              <p className="mt-1 font-semibold text-card-foreground">{o.what}</p>
              <p className="mt-4 w-fit rounded-md border border-dashed border-primary px-2 py-1 text-xs font-bold text-primary">{o.code}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-6xl">
        <h2 className="font-display text-3xl text-foreground">Everything your pet needs, in one app</h2>
        <p className="text-muted-foreground">Less worrying, more tail-wagging.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl bg-card p-6 shadow-sm">
              <div className="w-fit rounded-xl bg-secondary p-3 text-secondary-foreground"><Icon className="h-6 w-6" /></div>
              <h3 className="mt-4 font-display text-xl text-card-foreground">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 grid max-w-6xl items-center gap-8 rounded-3xl bg-secondary p-8 md:grid-cols-2 md:p-12">
        <div>
          <h2 className="font-display text-3xl text-secondary-foreground md:text-4xl">Plans starting at just ₹99/month</h2>
          <p className="mt-3 text-secondary-foreground/80">From solo pet parents to busy multi-pet homes — there's a plan with your pet's name on it.</p>
          <Link to="/plans" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Compare plans</Link>
        </div>
        <div className="flex items-center gap-2 text-secondary-foreground">
          {[...Array(5)].map((_, k) => <Star key={k} className="h-6 w-6 fill-accent text-accent" />)}
          <span className="ml-2 font-semibold">Loved by 10,000+ pet parents</span>
        </div>
      </section>

    </main>
  );
}
