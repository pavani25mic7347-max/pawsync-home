import { Link } from "@tanstack/react-router";
import { Mail, Phone, Clock, PawPrint } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-foreground px-6 py-12 text-background">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-display text-2xl"><PawPrint className="h-6 w-6" /> PawSync</div>
          <p className="mt-3 text-sm opacity-75">Because every wag, purr and chirp deserves the best care.</p>
        </div>
        <div>
          <h3 className="font-display text-lg">Customer Care</h3>
          <ul className="mt-3 space-y-2 text-sm opacity-90">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 90000 12345</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> care@pawsync-help.example</li>
            <li className="flex items-center gap-2"><Clock className="h-4 w-4" /> Mon–Sat, 9 AM – 8 PM IST</li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-lg">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm opacity-90">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/plans">Subscription Plans</Link></li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl border-t border-background/20 pt-6 text-xs opacity-60">© 2026 PawSync. Made with love for pets.</p>
    </footer>
  );
}
