import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PawPrint } from "lucide-react";
import { sectionTitles } from "@/components/AppSidebar";

export const Route = createFileRoute("/$section")({
  loader: ({ params }) => {
    const title = sectionTitles[params.section];
    if (!title) throw notFound();
    return { title };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "PawSync"} — PawSync` },
      { name: "description", content: `${loaderData?.title ?? "PawSync"} on PawSync, your pet care companion.` },
      { property: "og:title", content: `${loaderData?.title ?? "PawSync"} — PawSync` },
      { property: "og:description", content: "Your pet care companion." },
    ],
  }),
  component: Section,
});

function Section() {
  const { title } = Route.useLoaderData();
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="rounded-3xl bg-secondary p-5 text-secondary-foreground"><PawPrint className="h-10 w-10" /></div>
      <h1 className="mt-6 font-display text-4xl text-foreground">{title}</h1>
      <p className="mt-2 text-muted-foreground">Something paw-some is coming here soon!</p>
      <Link to="/plans" className="mt-6 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">See Subscription Plans</Link>
    </main>
  );
}
