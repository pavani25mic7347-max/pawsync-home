import { useEffect, useState } from "react";
import { Crosshair, MapPin, PencilLine } from "lucide-react";

type Mode = "current" | "manual";

const KEY = "pawsync-location";

/**
 * Shared location control: live browser geolocation (only when the user asks)
 * or manual entry, with switching between the two. Never forces permission.
 */
export function LocationBar({
  placeholder = "Mumbai, Delhi, Bangalore",
  onLocation,
}: {
  placeholder?: string;
  onLocation: (value: string) => void;
}) {
  const [mode, setMode] = useState<Mode>("manual");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const saved = typeof window === "undefined" ? "" : window.localStorage.getItem(KEY) ?? "";
    if (saved) {
      setValue(saved);
      onLocation(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const commit = (next: string) => {
    setValue(next);
    if (typeof window !== "undefined") window.localStorage.setItem(KEY, next);
    onLocation(next);
  };

  const detect = () => {
    if (!("geolocation" in navigator)) {
      setStatus("This browser can't share a location. Please type your city instead.");
      setMode("manual");
      return;
    }
    setStatus("Asking your browser for location permission…");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = `${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)}`;
        commit(coords);
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
    <div className="card">
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.9rem" }}>
        <button
          type="button"
          className={`btn ${mode === "current" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => {
            setMode("current");
            detect();
          }}
        >
          <Crosshair size={18} /> Use my current location
        </button>
        <button
          type="button"
          className={`btn ${mode === "manual" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => {
            setMode("manual");
            setStatus("Type your city, area or PIN code.");
          }}
        >
          <PencilLine size={18} /> Enter location manually
        </button>
      </div>
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label">
          <MapPin size={14} style={{ display: "inline", verticalAlign: "-2px" }} /> Location
        </label>
        <input
          className="form-input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => commit(e.target.value)}
        />
        {status && (
          <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>{status}</p>
        )}
      </div>
    </div>
  );
}
