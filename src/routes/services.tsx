import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { LocationBar } from "@/components/LocationBar";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — PAWSYNC" },
      { name: "description", content: "Find veterinary, grooming and daycare services near you on PAWSYNC." },
      { property: "og:title", content: "Services — PAWSYNC" },
      { property: "og:description", content: "Find veterinary, grooming and daycare services near you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

type Service = {
  emoji: string;
  category: "Veterinary" | "Grooming" | "Daycare";
  name: string;
  description: string;
  location: string;
  price: string;
  availability: string;
};

const services: Service[] = [
  { emoji: "🩺", category: "Veterinary", name: "Happy Paws Vet Clinic", description: "Full-service veterinary care for routine checks and urgent concerns.", location: "Mumbai, Maharashtra", price: "₹500 - ₹5000", availability: "Open today until 8:00 PM" },
  { emoji: "✂️", category: "Grooming", name: "Purrfect Grooming", description: "Professional grooming, bathing, and coat maintenance.", location: "Delhi, Delhi", price: "₹800 - ₹2000", availability: "3 slots left today" },
  { emoji: "🏠", category: "Daycare", name: "Pet Paradise Daycare", description: "Safe playtime, naps, and enrichment for busy owners.", location: "Bangalore, Karnataka", price: "₹500/day", availability: "Available for drop-in care" },
  { emoji: "✂️", category: "Grooming", name: "Woof & Whisker Spa", description: "Gentle grooming and hygiene care for pets of all sizes.", location: "Pune, Maharashtra", price: "₹900 - ₹2500", availability: "Open this weekend" },
  { emoji: "🏠", category: "Daycare", name: "BarkBuddy Boarding", description: "Boarding and daycare for dogs and cats with care supervision.", location: "Hyderabad, Telangana", price: "₹700/day", availability: "Limited weekday slots" },
  { emoji: "🩺", category: "Veterinary", name: "VetNest Pet Clinic", description: "Preventive healthcare, vaccinations, and consultations.", location: "Chennai, Tamil Nadu", price: "₹600 - ₹4000", availability: "Vaccination drive this week" },
  { emoji: "🩺", category: "Veterinary", name: "PawCare Animal Hospital", description: "Preventive healthcare and pet nutrition support.", location: "Ahmedabad, Gujarat", price: "₹600 - ₹4500", availability: "Same-day consults available" },
  { emoji: "✂️", category: "Grooming", name: "TailWag Groom House", description: "Spa sessions, ear cleaning, and hygienic grooming.", location: "Jaipur, Rajasthan", price: "₹750 - ₹2200", availability: "Weekend slots open" },
  { emoji: "🏠", category: "Daycare", name: "City Pets Lodge", description: "Daytime stay, social play, and medication monitoring.", location: "Kochi, Kerala", price: "₹550/day", availability: "Open 7 days a week" },
  { emoji: "🩺", category: "Veterinary", name: "Guntur Pet Wellness Center", description: "Routine care, vaccinations, and health monitoring for pets in the city.", location: "Guntur, Andhra Pradesh", price: "₹450 - ₹3500", availability: "Open today until 7:30 PM" },
  { emoji: "✂️", category: "Grooming", name: "Guntur Paws Groom Studio", description: "Bathing, styling, and routine grooming for dogs and cats.", location: "Guntur, Andhra Pradesh", price: "₹700 - ₹2200", availability: "2 slots left today" },
  { emoji: "🏠", category: "Daycare", name: "Vijayawada Pet Stay Club", description: "Safe daycare, play sessions, and supervised rest for pets.", location: "Vijayawada, Andhra Pradesh", price: "₹600/day", availability: "Available this week" },
  { emoji: "🩺", category: "Veterinary", name: "Vizag Happy Tails Care", description: "Clinic consultations, vaccinations, and holistic pet wellness care.", location: "Visakhapatnam, Andhra Pradesh", price: "₹500 - ₹4000", availability: "Consultation slots open" },
  { emoji: "✂️", category: "Grooming", name: "Rajahmundry Pet Lounge", description: "Premium grooming, spa care, and hygiene treatments.", location: "Rajahmundry, Andhra Pradesh", price: "₹800 - ₹2400", availability: "Weekend appointments open" },
];

type Spot = { emoji: string; type: "park" | "cafe"; name: string; description: string; city: string };

const spots: Spot[] = [
  { emoji: "🌳", type: "park", name: "Greenfield Dog Park", description: "Large fenced park and walking routes for active dogs.", city: "Mumbai, Maharashtra" },
  { emoji: "☕", type: "cafe", name: "Paws Cafe Lounge", description: "Dog-friendly seating and pet-safe treats.", city: "Delhi, Delhi" },
  { emoji: "🌳", type: "park", name: "Sunset Pet Trail", description: "Shaded walking path and water stations.", city: "Bangalore, Karnataka" },
  { emoji: "☕", type: "cafe", name: "Cozy Cat Corner", description: "Calm cafe space with indoor pet seating.", city: "Mumbai, Maharashtra" },
  { emoji: "🌳", type: "park", name: "Mango Bark Walk", description: "Open-air walk track with benches and shade.", city: "Hyderabad, Telangana" },
  { emoji: "☕", type: "cafe", name: "Whisker & Bean", description: "Coffee and treats for both pets and people.", city: "Chennai, Tamil Nadu" },
  { emoji: "🌳", type: "park", name: "Skyline Pet Path", description: "Comfortable walking track with pet hydration points.", city: "Pune, Maharashtra" },
  { emoji: "☕", type: "cafe", name: "Golden Paw Terrace", description: "Relaxed outdoor seating and pet-friendly menu.", city: "Kochi, Kerala" },
  { emoji: "🌳", type: "park", name: "Guntur Bark Garden", description: "Dog-friendly walk path with open space and shade.", city: "Guntur, Andhra Pradesh" },
  { emoji: "☕", type: "cafe", name: "Paw & Bean Lounge", description: "Relaxed seating for pets and owners in the city center.", city: "Guntur, Andhra Pradesh" },
  { emoji: "🌳", type: "park", name: "Vijayawada Walk Trail", description: "Spacious walking area with pet-friendly seating.", city: "Vijayawada, Andhra Pradesh" },
  { emoji: "☕", type: "cafe", name: "Vizag Tail Cafe", description: "Pet-friendly cafe serving treats and coffee for owners.", city: "Visakhapatnam, Andhra Pradesh" },
];

function Services() {
  const [place, setPlace] = useState("");
  const [type, setType] = useState("all");
  const [booked, setBooked] = useState<string[]>([]);

  const query = place.trim().toLowerCase();
  const shown = useMemo(
    () =>
      services.filter(
        (s) =>
          (type === "all" || s.category === type) &&
          (!query || s.location.toLowerCase().includes(query) || s.name.toLowerCase().includes(query)),
      ),
    [query, type],
  );
  const shownSpots = useMemo(
    () => spots.filter((s) => !query || s.city.toLowerCase().includes(query) || s.name.toLowerCase().includes(query)),
    [query],
  );

  return (
    <div className="page">
      <div className="page-header">
        <h1>Services</h1>
        <p>Find pet services and places based on your current location or the city or town you type in.</p>
      </div>

      <LocationBar onLocation={setPlace} />

      <div className="card" style={{ marginTop: "1.5rem" }}>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-end" }}>
          <div className="form-group" style={{ marginBottom: 0, flex: 1, minWidth: 220 }}>
            <label className="form-label">Service type</label>
            <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="all">All services</option>
              <option value="Veterinary">Veterinary</option>
              <option value="Grooming">Grooming</option>
              <option value="Daycare">Daycare</option>
            </select>
          </div>
        </div>
        <p style={{ marginTop: "1rem", color: "var(--text-secondary)" }}>
          Showing results for: <strong>{query || "all cities"}</strong>
        </p>
      </div>

      <div className="card-header" style={{ marginTop: "1.5rem" }}>
        <h2 className="card-title">Available nearby services</h2>
        <span className="badge badge-info">{shown.length} results</span>
      </div>
      {shown.length === 0 ? (
        <div className="card empty-state">
          <h3>No services match your search</h3>
          <p>Try another city, or clear the location field to see every service.</p>
        </div>
      ) : (
        <div className="grid grid-3">
          {shown.map((s) => (
            <div className="card" key={s.name}>
              <div className="card-header">
                <span style={{ fontSize: "1.6rem" }}>{s.emoji}</span>
                <span className="badge badge-success">{s.category.toUpperCase()}</span>
              </div>
              <h3>{s.name}</h3>
              <p>{s.description}</p>
              <p><MapPin size={14} style={{ display: "inline", verticalAlign: "-2px" }} /> Location: {s.location}</p>
              <p>Price: {s.price}</p>
              <p>Availability: {s.availability}</p>
              <button
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "0.5rem" }}
                onClick={() => setBooked((b) => (b.includes(s.name) ? b : [...b, s.name]))}
              >
                {booked.includes(s.name) ? "Requested ✓" : "Book Service"}
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="card-header" style={{ marginTop: "2rem" }}>
        <h2 className="card-title">Pet-friendly places nearby</h2>
        <span className="badge badge-info">{shownSpots.length} spots</span>
      </div>
      <div className="grid grid-3">
        {shownSpots.map((s) => (
          <div className="card" key={s.name}>
            <div className="card-header">
              <span style={{ fontSize: "1.4rem" }}>{s.emoji}</span>
              <span className="badge badge-info">{s.type.toUpperCase()}</span>
            </div>
            <h3>{s.name}</h3>
            <p>{s.description}</p>
            <p>City: {s.city}</p>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
              Demo listing for a pet-friendly place in your area.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
