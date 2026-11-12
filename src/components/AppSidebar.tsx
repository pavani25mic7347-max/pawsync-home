import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  House,
  Dog,
  Heart,
  Calendar,
  MessageCircle,
  Scissors,
  ShoppingBag,
  Home,
  MapPin,
  Search,
  Users,
  DollarSign,
  Settings,
  Crown,
  Menu,
  User,
  ChevronDown,
  LogOut,
  MapPinned,
  PencilLine,
  X,
} from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";

const items = [
  { title: "Home", to: "/", icon: House },
  { title: "Dashboard", to: "/dashboard", icon: House },
  { title: "My Pets", to: "/pets", icon: Dog },
  { title: "Health & Vaccinations", to: "/health", icon: Heart },
  { title: "Daily Care", to: "/daily-care", icon: Calendar },
  { title: "AI Pet Assistant", to: "/ai-assistant", icon: MessageCircle },
  { title: "Services", to: "/services", icon: Scissors },
  { title: "Shop", to: "/shop", icon: ShoppingBag },
  { title: "Adoption", to: "/adoption", icon: Home },
  { title: "Pet-Friendly Places", to: "/places", icon: MapPin },
  { title: "Lost & Found", to: "/lost-found", icon: Search },
  { title: "Community & Guides", to: "/community", icon: Users },
  { title: "Expenses", to: "/expenses", icon: DollarSign },
  { title: "Settings", to: "/settings", icon: Settings },
  { title: "Subscription Plans", to: "/plans", icon: Crown },
] as const;

export const sectionTitles: Record<string, string> = Object.fromEntries(
  items.map((i) => [i.to.replace("/", ""), i.title]),
);

function PawMark() {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="Paw logo">
      <defs>
        <linearGradient id="paw-brand-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f7f1ea" />
          <stop offset="100%" stopColor="#f4d38d" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="rgba(255,255,255,0.12)" />
      <circle cx="22" cy="23" r="5.5" fill="url(#paw-brand-gradient)" />
      <circle cx="32" cy="16" r="5.5" fill="url(#paw-brand-gradient)" />
      <circle cx="42" cy="23" r="5.5" fill="url(#paw-brand-gradient)" />
      <circle cx="27" cy="34" r="5.5" fill="url(#paw-brand-gradient)" />
      <circle cx="37" cy="34" r="5.5" fill="url(#paw-brand-gradient)" />
      <path
        d="M32 40c-7.2 0-12.6 5.7-12.6 12.2 0 2.6 2.1 4.8 4.8 4.8h15.6c2.7 0 4.8-2.2 4.8-4.8C44.6 45.7 39.2 40 32 40z"
        fill="url(#paw-brand-gradient)"
      />
    </svg>
  );
}

function LocationModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<"current" | "manual">("manual");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");

  const detect = () => {
    setMode("current");
    if (!("geolocation" in navigator)) {
      setMode("manual");
      setStatus("This browser can't share a location. Please type your city instead.");
      return;
    }
    setStatus("Asking your browser for location permission…");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = `${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)}`;
        setCity(coords);
        setStatus(`Detected ${coords}. Confirm it, or type your city below.`);
      },
      (err) => {
        setMode("manual");
        setStatus(
          err.code === err.PERMISSION_DENIED
            ? "Location permission was declined. You can type your city instead."
            : "We couldn't read your location right now. Please type your city instead.",
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Set your location">
      <div className="modal">
        <div className="modal-header">
          <h2>Set your location</h2>
          <button className="btn btn-secondary" aria-label="Close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="modal-body">
          <p style={{ marginBottom: "1rem", color: "var(--text-secondary)" }}>
            We’ll use this location to show nearby services, pet-friendly places, and shops.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <button
              type="button"
              className={`btn ${mode === "current" ? "btn-primary" : "btn-secondary"}`}
              onClick={detect}
            >
              <MapPinned size={18} />
              Use my current location
            </button>
            <button
              type="button"
              className={`btn ${mode === "manual" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => {
                setMode("manual");
                setStatus("Type your city, area or PIN code.");
              }}
            >
              <PencilLine size={18} />
              Enter location manually
            </button>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">
              {mode === "current" ? "Detected location (confirm or change)" : "City, area or PIN code"}
            </label>
            <input
              className="form-input"
              placeholder="Mumbai, Delhi, Bangalore"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {status && (
              <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>{status}</p>
            )}
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Skip for now
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              if (typeof window !== "undefined" && city.trim()) {
                window.localStorage.setItem("pawsync-location", city.trim());
              }
              onClose();
            }}
          >
            Save location
          </button>
        </div>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.localStorage.getItem("pawsync-location-seen")) {
      setShowLocation(true);
    }
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setMenu(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [menu]);

  const closeLocation = () => {
    if (typeof window !== "undefined") window.localStorage.setItem("pawsync-location-seen", "1");
    setShowLocation(false);
  };

  const current = items.find((i) => i.to === path);
  const pageTitle = path === "/" ? "Welcome" : (current?.title ?? "PAWSYNC");

  return (
    <div className="layout">
      <aside className={`sidebar${open ? " open" : ""}`}>
        <div className="sidebar-header">
          <div className="brand-lockup" aria-label="PAWSYNC logo and brand">
            <div className="brand-mark" aria-hidden="true">
              <PawMark />
            </div>
            <div className="brand-copy">
              <span className="logo">PAWSYNC</span>
              <span className="tagline">Pet care companion</span>
            </div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {items.map((it) => {
            const Icon = it.icon;
            const active = path === it.to;
            return (
              <Link
                key={it.to}
                to={it.to}
                className={`nav-item${active ? " active" : ""}`}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={20} aria-hidden="true" />
                <span>{it.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {open && <div className="sidebar-overlay" onClick={() => setOpen(false)} aria-hidden="true" />}

      <div className="main-content">
        <header className="header">
          <div className="header-left">
            <button
              className="menu-btn"
              aria-label="Open menu"
              onClick={() => setOpen((v) => !v)}
            >
              <Menu size={24} />
            </button>
            <h2 className="page-title">{pageTitle}</h2>
          </div>
          <div className="header-right">
            <Link to="/plans" className="header-btn" title="Subscription Plans" aria-label="Subscription Plans">
              <Crown size={20} />
            </Link>
            <Link to="/login" className="header-btn" title="Login" aria-label="Login">
              <User size={20} />
            </Link>
            <div className="profile-menu-wrapper" ref={wrapRef}>
              <button
                type="button"
                className="header-btn profile-trigger"
                aria-expanded={menu}
                aria-label="Account menu"
                onClick={() => setMenu((v) => !v)}
              >
                <User size={20} />
                <ChevronDown size={14} />
              </button>
              {menu && (
                <div className="profile-dropdown" role="menu">
                  <div className="profile-dropdown-header">
                    <div className="profile-avatar">P</div>
                    <div>
                      <strong>Pet Parent</strong>
                      <small>petparent@demo.com</small>
                    </div>
                  </div>
                  <Link to="/settings" className="profile-dropdown-item" role="menuitem" onClick={() => setMenu(false)}>
                    <Settings size={16} /> Profile &amp; Settings
                  </Link>
                  <Link to="/plans" className="profile-dropdown-item" role="menuitem" onClick={() => setMenu(false)}>
                    <Crown size={16} /> Subscription Plans
                  </Link>
                  <Link to="/login" className="profile-dropdown-item" role="menuitem" onClick={() => setMenu(false)}>
                    <LogOut size={16} /> Log out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="page-content">{children}</main>
        <SiteFooter />
      </div>

      {showLocation && <LocationModal onClose={closeLocation} />}
    </div>
  );
}
