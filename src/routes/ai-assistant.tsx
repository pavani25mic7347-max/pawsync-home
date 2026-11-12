import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bot, PawPrint, RefreshCcw, Send, UserRound } from "lucide-react";

export const Route = createFileRoute("/ai-assistant")({
  head: () => ({ meta: [{ title: "PAWSYNC AI — PAWSYNC" }, { name: "description", content: "Get helpful pet-care suggestions with the PAWSYNC demo assistant." }, { property: "og:title", content: "PAWSYNC AI — PAWSYNC" }, { property: "og:description", content: "Get helpful pet-care suggestions with the PAWSYNC demo assistant." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: AiAssistant,
});
type Message = { role: "user" | "assistant"; text: string };
const tips = ["Keep fresh water available for your pet throughout the day.", "Regular gentle grooming helps you notice skin or coat changes early.", "Keep vaccinations up to date and contact your veterinarian with health concerns.", "Daily play and exercise support your pet's physical and mental wellbeing."];
function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([]), [value, setValue] = useState("");
  const send = () => { const text = value.trim(); if (!text) return; const response = tips[messages.filter(m => m.role === "assistant").length % tips.length]; setMessages([...messages, { role: "user", text }, { role: "assistant", text: response }]); setValue(""); };
  return <div className="page"><div className="page-header"><h1>PAWSYNC AI</h1><p>Demo assistant using your saved pet data</p></div><div className="card ai-shell"><div className="ai-topbar"><div className="ai-status"><div className="ai-badge"><Bot size={18} /></div><div><strong>Demo AI Assistant</strong><small>Not connected to a live model</small></div></div><div className="pet-picker"><label htmlFor="pet-select">Pet</label><select id="pet-select"><option>No pets added</option></select></div></div><div className="empty-state ai-empty"><PawPrint size={42} /><h3>No pet selected</h3><p>Add a pet profile to unlock personalized PAWSYNC AI suggestions.</p></div><div className="ai-chat" aria-live="polite">{messages.map((m, i) => <div key={i} className={`chat-message ${m.role}`}><div className="chat-avatar">{m.role === "user" ? <UserRound size={16} /> : <Bot size={16} />}</div><div className="chat-bubble">{m.text}</div></div>)}</div><form className="chat-input-row" onSubmit={e => { e.preventDefault(); send(); }}><input aria-label="Message" value={value} onChange={e => setValue(e.target.value)} placeholder="Ask a pet-care question..." /><button className="btn btn-primary" type="submit" aria-label="Send message"><Send size={18} />Send</button></form><div className="ai-footer"><button type="button" className="btn btn-secondary" onClick={() => setMessages([])}><RefreshCcw size={16} />Reset chat</button><span>Uses stored app data only. No live AI model is connected.</span></div></div></div>;
}
