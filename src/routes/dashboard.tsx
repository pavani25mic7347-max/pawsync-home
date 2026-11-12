import { createFileRoute, Link } from "@tanstack/react-router";
import { Dog, Plus } from "lucide-react";
import hero from "@/assets/pawsync-hero.jpg";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — PAWSYNC" }, { name: "description", content: "Your PAWSYNC pet care overview for today." }, { property: "og:title", content: "Dashboard — PAWSYNC" }, { property: "og:description", content: "Your PAWSYNC pet care overview for today." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Dashboard,
});

function Dashboard() {
  return <div className="page">
    <div className="dashboard-hero" aria-label="Cute pet illustration for dashboard">
      <div className="hero-card"><img src={hero} alt="Cute happy dog and cat illustration with paw prints, hearts and toys" className="pet-illustration" /></div>
      <div className="hero-badge hero-badge-top">🐾 3 walks</div><div className="hero-badge hero-badge-bottom">❤ 9 meals</div>
      <style>{`.dashboard-hero{position:relative;margin:1.2rem 0 1.6rem;padding:1rem;border-radius:28px;background:linear-gradient(135deg,rgba(123,155,115,.12),rgba(244,211,141,.18));border:1px solid rgba(123,155,115,.12);box-shadow:0 18px 40px rgba(58,77,63,.08);overflow:hidden}.hero-card{position:relative;width:min(100%,760px);margin:0 auto;padding:.5rem 0 0}.pet-illustration{position:relative;z-index:1;display:block;width:100%;height:auto;border-radius:26px;object-fit:cover;filter:drop-shadow(0 18px 26px rgba(46,70,52,.08))}.hero-badge{position:absolute;z-index:2;display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:.45rem .8rem;font-size:.78rem;font-weight:700;color:var(--text-primary);background:rgba(255,255,255,.88);border:1px solid rgba(123,155,115,.16);box-shadow:0 10px 22px rgba(52,65,53,.12);backdrop-filter:blur(4px)}.hero-badge-top{top:18%;left:7%}.hero-badge-bottom{right:8%;bottom:20%}@media(max-width:700px){.dashboard-hero{padding:.75rem}.hero-badge{font-size:.7rem;padding:.35rem .65rem}.hero-badge-top{left:4%;top:16%}.hero-badge-bottom{right:6%;bottom:18%}}`}</style>
    </div>
    <div className="page-header"><h1>Welcome to PAWSYNC</h1><p>Here's your pet care overview for today</p></div>
    <div className="card empty-state"><Dog size={48}/><h3>No pets yet</h3><p>Get started by adding your first pet profile</p><Link className="btn btn-primary" to="/pets" style={{marginTop:"1rem"}}><Plus size={20}/>Add Your First Pet</Link></div>
  </div>;
}
