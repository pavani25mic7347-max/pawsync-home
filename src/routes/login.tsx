import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PawPrint } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — PawSync" },
      { name: "description", content: "Sign in to PawSync to manage your pets' care." },
      { property: "og:title", content: "Login — PawSync" },
      { property: "og:description", content: "Sign in to your PawSync account." },
    ],
  }),
  component: Login,
});

function Login() {
  const [signup, setSignup] = useState(false);
  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <form onSubmit={(e) => { e.preventDefault(); toast("Login will be connected soon 🐾"); }} className="w-full max-w-md space-y-4 rounded-3xl border bg-card p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="rounded-2xl bg-secondary p-3 text-secondary-foreground"><PawPrint className="h-8 w-8" /></div>
          <h1 className="mt-4 font-display text-3xl text-card-foreground">{signup ? "Join PawSync" : "Welcome back!"}</h1>
          <p className="text-sm text-muted-foreground">Your pets missed you. Sign in to continue.</p>
        </div>
        {signup && <input required placeholder="Full name" className="w-full rounded-xl border bg-background px-4 py-3" />}
        <input required type="email" placeholder="Email" className="w-full rounded-xl border bg-background px-4 py-3" />
        <input required type="password" placeholder="Password" className="w-full rounded-xl border bg-background px-4 py-3" />
        <button className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground">{signup ? "Create account" : "Login"}</button>
        <button type="button" onClick={() => setSignup(!signup)} className="w-full text-sm text-primary">
          {signup ? "Already have an account? Login" : "New here? Create an account"}
        </button>
      </form>
    </main>
  );
}
