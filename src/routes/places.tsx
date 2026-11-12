import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { LocationBar } from "@/components/LocationBar";

export const Route = createFileRoute("/places")({
  head: () => ({
    meta: [
      { title: "Pet-Friendly Places — PAWSYNC" },
      { name: "description", content: "Discover pet-friendly parks, cafes and destinations near you on PAWSYNC." },
      { property: "og:title", content: "Pet-Friendly Places — PAWSYNC" },
      { property: "og:description", content: "Discover pet-friendly parks, cafes and destinations near you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Places,
});

type Place = { emoji: string; type: "PARK" | "CAFE"; name: string; description: string; city: string; hours: string };

const places: Place[] = [
  { emoji: "🐾", type: "PARK", name: "Central Park Bark Trail", description: "Shady walking paths and open dog play zones", city: "Mumbai", hours: "6:00 AM - 9:30 PM" },
  { emoji: "🐶", type: "CAFE", name: "Paws & Whiskers Cafe", description: "Pet-friendly seating with fresh treats for furry guests", city: "Delhi", hours: "9:00 AM - 10:00 PM" },
  { emoji: "🐾", type: "PARK", name: "Greenfield Dog Trail", description: "A calm nature trail with shaded walking loops", city: "Bangalore", hours: "5:30 AM - 8:30 PM" },
  { emoji: "🐶", type: "CAFE", name: "Cozy Corner Cafe", description: "Cute indoor corners and pet-welcoming menus", city: "Mumbai", hours: "8:30 AM - 9:30 PM" },
  { emoji: "🐶", type: "CAFE", name: "Sunset Paw Lounge", description: "Relaxed outdoor seating for pets and owners", city: "Delhi", hours: "10:00 AM - 11:00 PM" },
  { emoji: "🐾", type: "PARK", name: "Guntur Bark Garden", description: "Open dog walk lanes, shade cover, and rest spots", city: "Guntur", hours: "6:00 AM - 8:00 PM" },
  { emoji: "🐶", type: "CAFE", name: "Paw & Bean Lounge", description: "Cafe with pet-friendly patios and puppy treats", city: "Guntur", hours: "9:00 AM - 9:00 PM" },
  { emoji: "🐾", type: "PARK", name: "Vijayawada Walk Trail", description: "Wide open promenade designed for happy walks", city: "Vijayawada", hours: "5:30 AM - 8:30 PM" },
  { emoji: "🐶", type: "CAFE", name: "Happy Tails Terrace", description: "Terrace seating with calm vibes and pet treats", city: "Vizag", hours: "9:00 AM - 9:30 PM" },
  { emoji: "🐾", type: "PARK", name: "Canine Courtyard Gardens", description: "Scenic garden walks and easy pet-friendly paths", city: "Hyderabad", hours: "6:30 AM - 9:00 PM" },
];

function Places() {
  const [place, setPlace] = useState("");
  const query = place.trim().toLowerCase();
  const shown = useMemo(
    () =>
      places.filter(
        (p) => !query || p.city.toLowerCase().includes(query) || p.name.toLowerCase().includes(query),
      ),
    [query],
  );

  return (
    <div className="page">
      <div className="page-header">
        <h1>Pet-Friendly Places</h1>
        <p>Discover pet-friendly parks, cafes, and destinations near your location.</p>
      </div>

      <LocationBar onLocation={setPlace} />

      {shown.length === 0 ? (
        <div className="card empty-state" style={{ marginTop: "1.5rem" }}>
          <h3>No places match your location</h3>
          <p>Try another city, or clear the location field to see every place.</p>
        </div>
      ) : (
        <div className="grid grid-3" style={{ marginTop: "1.5rem" }}>
          {shown.map((p) => (
            <div className="card" key={p.name}>
              <div className="card-header">
                <span style={{ fontSize: "1.6rem" }}>{p.emoji}</span>
                <span className="badge badge-success">{p.type}</span>
              </div>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <p><MapPin size={14} style={{ display: "inline", verticalAlign: "-2px" }} /> City: {p.city}</p>
              <p>Hours: {p.hours}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
