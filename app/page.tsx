import { APPS, AppConfig } from "@/lib/apps";
import { AppStatus } from "@/app/api/status/route";
import AppCard from "@/components/AppCard";

export const revalidate = 3600;

async function getStatuses(): Promise<AppStatus[]> {
  try {
    const base = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";
    const res = await fetch(`${base}/api/status`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Home() {
  const statuses = await getStatuses();
  const statusMap = Object.fromEntries(statuses.map((s) => [s.id, s.lastUpdated]));

  return (
    <main className="min-h-screen px-4 py-12 max-w-2xl mx-auto">
      <header className="mb-10">
        <p className="text-xs font-mono text-zinc-500 mb-2 uppercase tracking-widest">
          MVP Machine
        </p>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Hub</h1>
        <p className="text-zinc-400 text-sm">
          All tools in one place. Each updates automatically on a daily cron schedule.
        </p>
      </header>

      <section className="space-y-3">
        {APPS.map((app: AppConfig) => (
          <AppCard
            key={app.id}
            app={app}
            lastUpdated={statusMap[app.id] ?? null}
          />
        ))}
      </section>

      <footer className="text-center text-xs text-zinc-700 pt-12 mt-12 border-t border-zinc-800">
        MVP Machine — w00
      </footer>
    </main>
  );
}
