export type AppConfig = {
  id: string;
  name: string;
  description: string;
  url: string;
  s4Prefix: string;
  accent: string;
  icon: string;
};

export const APPS: AppConfig[] = [
  {
    id: "w01",
    name: "AI Build Ideas",
    description: "Daily build ideas from news, Reddit, and newsletters.",
    url: "https://w01-linkedin-post-writer.vercel.app",
    s4Prefix: "w01/ideas/",
    accent: "bg-emerald-500",
    icon: "💡",
  },
  {
    id: "w02",
    name: "UI Demo Lab",
    description: "Auto-generated React demos and curated UI patterns.",
    url: "https://w02-portfolio.vercel.app",
    s4Prefix: "w02/sources/",
    accent: "bg-indigo-500",
    icon: "🎨",
  },
  {
    id: "w03",
    name: "YT Digest",
    description: "Daily YouTube digest for the NateBJones channel.",
    url: "https://w03-yt-digest.vercel.app",
    s4Prefix: "w03/yt-digest/",
    accent: "bg-sky-500",
    icon: "▶",
  },
];
