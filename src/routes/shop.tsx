import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin, ShoppingBag, Star } from "lucide-react";
import { LocationBar } from "@/components/LocationBar";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — PAWSYNC" },
      { name: "description", content: "Browse nearby pet shops with product availability, prices and timings." },
      { property: "og:title", content: "Shop — PAWSYNC" },
      { property: "og:description", content: "Browse nearby pet shops with product availability and timings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

type Product = { name: string; category: string; stock: number; price: number };
type Store = { name: string; rating: number; description: string; location: string; open: string; products: Product[] };

const stores: Store[] = [
  {
    name: "Pawfect Basket",
    rating: 4.8,
    description: "Premium pet food, grooming essentials, and health supplements.",
    location: "Mumbai, Maharashtra, Andheri West",
    open: "9:00 AM - 9:00 PM",
    products: [
      { name: "Premium Dog Food", category: "food", stock: 10, price: 2500 },
      { name: "Cat Treats", category: "food", stock: 25, price: 450 },
      { name: "Grooming Brush", category: "grooming", stock: 12, price: 800 },
      { name: "Pet Collar", category: "accessories", stock: 20, price: 650 },
    ],
  },
  {
    name: "Bark & Bone",
    rating: 4.7,
    description: "A neighborhood pet store with toys, nutrition, and wellness products.",
    location: "Delhi, Delhi, Saket",
    open: "10:00 AM - 8:30 PM",
    products: [
      { name: "Vitamin Supplements", category: "health", stock: 8, price: 1200 },
      { name: "Chew Toy", category: "toys", stock: 15, price: 350 },
      { name: "Dog Shampoo", category: "grooming", stock: 18, price: 620 },
      { name: "Pet Carrier", category: "accessories", stock: 6, price: 2100 },
    ],
  },
  {
    name: "Happy Tails Mart",
    rating: 4.9,
    description: "Trusted pet essentials for dogs, cats, and birds across all breeds.",
    location: "Bangalore, Karnataka, Koramangala",
    open: "8:30 AM - 9:30 PM",
    products: [
      { name: "Bird Seed Mix", category: "food", stock: 22, price: 420 },
      { name: "Cat Litter", category: "health", stock: 14, price: 780 },
      { name: "Paw Cleaner", category: "grooming", stock: 19, price: 560 },
      { name: "Interactive Toy", category: "toys", stock: 16, price: 890 },
    ],
  },
];

function Shop() {
  const [place, setPlace] = useState("");
  const [cart, setCart] = useState<string[]>([]);

  const query = place.trim().toLowerCase();
  const shown = useMemo(
    () =>
      stores.filter(
        (s) => !query || s.location.toLowerCase().includes(query) || s.name.toLowerCase().includes(query),
      ),
    [query],
  );

  return (
    <div className="page">
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <h1>Pet Shops</h1>
            <p>Find nearby pet stores with product availability and shop timings.</p>
          </div>
          <span className="badge badge-success">
            <ShoppingBag size={14} /> {cart.length} item{cart.length === 1 ? "" : "s"} in cart
          </span>
        </div>
      </div>

      <LocationBar onLocation={setPlace} />

      {shown.length === 0 ? (
        <div className="card empty-state" style={{ marginTop: "1.5rem" }}>
          <h3>No shops match your location</h3>
          <p>Try another city, or clear the location field to see every shop.</p>
        </div>
      ) : (
        <div className="grid grid-2" style={{ marginTop: "1.5rem" }}>
          {shown.map((s) => (
            <div className="card" key={s.name}>
              <div className="card-header">
                <h2 className="card-title">{s.name}</h2>
                <span className="badge badge-info">
                  <Star size={12} /> {s.rating}
                </span>
              </div>
              <p>{s.description}</p>
              <p><MapPin size={14} style={{ display: "inline", verticalAlign: "-2px" }} /> Location: {s.location}</p>
              <p>Open: {s.open}</p>
              <h3 style={{ marginTop: "1rem" }}>Available pet products</h3>
              <div className="grid grid-2" style={{ gap: "0.75rem", marginTop: "0.5rem" }}>
                {s.products.map((p) => (
                  <div className="card" key={p.name} style={{ padding: "0.8rem" }}>
                    <strong>{p.name}</strong>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                      {p.category} • {p.stock} in stock
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.4rem" }}>
                      <span>₹{p.price.toLocaleString("en-IN")}</span>
                      <button
                        className="btn btn-secondary"
                        style={{ padding: "0.3rem 0.8rem" }}
                        onClick={() => setCart((c) => [...c, `${s.name} — ${p.name}`])}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: "1rem", color: "var(--text-secondary)" }}>Timing: {s.open}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
