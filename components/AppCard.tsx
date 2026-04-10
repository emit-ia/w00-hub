import { AppConfig } from "@/lib/apps";

function formatDate(iso: string | null): string {
  if (!iso) return "No data yet";
  const d = new Date(iso);
  const diffMs = Date.now() - d.getTime();
  const diffH = Math.floor(diffMs / 1000 / 60 / 60);
  if (diffH < 1) return "Just updated";
  if (diffH < 24) return `${diffH}h ago`;
  const diffD = Math.floor(diffH / 24);
  if (diffD === 1) return "Yesterday";
  if (diffD < 7) return `${diffD} days ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function AppCard({
  app,
  lastUpdated,
}: {
  app: AppConfig;
  lastUpdated: string | null;
}) {
  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700 transition-colors"
    >
      <div className={`w-1 self-stretch rounded-full shrink-0 ${app.accent}`} />

      <div className="text-xl shrink-0 w-7 text-center">{app.icon}</div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors">
            {app.name}
          </span>
          <span className="text-xs font-mono text-zinc-600">{app.id}</span>
        </div>
        <p className="text-sm text-zinc-400 truncate">{app.description}</p>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-xs text-zinc-500">{formatDate(lastUpdated)}</p>
        <p className="text-zinc-600 text-sm mt-0.5 group-hover:text-zinc-400 transition-colors">
          →
        </p>
      </div>
    </a>
  );
}
