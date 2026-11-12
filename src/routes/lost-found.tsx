import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, X } from "lucide-react";

export const Route = createFileRoute("/lost-found")({
  head: () => ({
    meta: [
      { title: "Lost and Found — PAWSYNC" },
      { name: "description", content: "Report lost or found pets and help reunite them with their families." },
      { property: "og:title", content: "Lost and Found — PAWSYNC" },
      { property: "og:description", content: "Report lost or found pets on PAWSYNC." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LostFound,
});

type Report = {
  type: "Lost" | "Found";
  petName: string;
  species: string;
  breed: string;
  location: string;
  description: string;
  contact: string;
};

const fields = [
  ["petName", "Pet name"],
  ["species", "Species"],
  ["breed", "Breed"],
  ["location", "Last seen location"],
  ["description", "Description"],
  ["contact", "Contact number"],
] as const;

function LostFound() {
  const [open, setOpen] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setReports([
      ...reports,
      {
        type: d.get("type") === "Found" ? "Found" : "Lost",
        petName: String(d.get("petName") ?? ""),
        species: String(d.get("species") ?? ""),
        breed: String(d.get("breed") ?? ""),
        location: String(d.get("location") ?? ""),
        description: String(d.get("description") ?? ""),
        contact: String(d.get("contact") ?? ""),
      },
    ]);
    setOpen(false);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <h1>Lost and Found</h1>
            <p>Report lost or found pets</p>
          </div>
          <button className="btn btn-primary" onClick={() => setOpen(true)}>
            <Plus size={20} /> Create Report
          </button>
        </div>
      </div>

      {reports.length === 0 ? (
        <div className="card empty-state">
          <h3>No reports yet</h3>
          <p>Create a report to help reunite pets with their families.</p>
        </div>
      ) : (
        <div className="grid grid-2">
          {reports.map((r, i) => (
            <div className="card" key={i}>
              <div className="card-header">
                <span className={`badge ${r.type === "Lost" ? "badge-danger" : "badge-success"}`}>{r.type}</span>
                <h2 className="card-title">{r.petName}</h2>
              </div>
              <p>{r.species} • {r.breed || "—"}</p>
              <p>Last seen: {r.location}</p>
              <p>{r.description}</p>
              <p>Contact: {r.contact}</p>
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="modal-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="modal">
            <div className="modal-header">
              <h2>Create Report</h2>
              <button className="btn btn-secondary" onClick={() => setOpen(false)} aria-label="Close">
                <X size={16} />
              </button>
            </div>
            <form onSubmit={submit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select name="type" className="form-select">
                    <option>Lost</option>
                    <option>Found</option>
                  </select>
                </div>
                {fields.map(([name, label]) => (
                  <div className="form-group" key={name}>
                    <label className="form-label">{label}</label>
                    {name === "description" ? (
                      <textarea name={name} className="form-textarea" required />
                    ) : (
                      <input name={name} className="form-input" required />
                    )}
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setOpen(false)}>Cancel</button>
                <button className="btn btn-primary" type="submit">Submit Report</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
