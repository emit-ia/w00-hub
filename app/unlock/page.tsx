"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UnlockPage() {
  const [passphrase, setPassphrase] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passphrase }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      setError("Wrong passphrase");
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold tracking-tight text-center">
          Enter passphrase
        </h1>
        <input
          type="password"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          placeholder="Passphrase"
          autoFocus
          className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600"
        />
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <button
          type="submit"
          disabled={loading || !passphrase}
          className="w-full py-2.5 rounded-lg font-medium bg-white text-zinc-900 hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          {loading ? "Checking..." : "Unlock"}
        </button>
      </form>
    </main>
  );
}
