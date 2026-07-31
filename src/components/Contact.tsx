"use client";

import { useState } from "react";
import { profile } from "@/lib/content";
import TerminalWindow from "./TerminalWindow";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-5xl px-5 py-8 pb-24">
      <TerminalWindow command="visitor@web ~ % ./contact.sh">
        <p className="text-fg-dim">
          <span className="text-accent">$</span> ./contact.sh --interactive
        </p>

        <form onSubmit={handleSubmit} className="mt-4 max-w-xl space-y-4">
          <div>
            <label className="text-xs text-fg-dim" htmlFor="name">
              --name
            </label>
            <input
              id="name"
              name="name"
              required
              className="mt-1 w-full rounded border border-border bg-black/20 px-3 py-2 text-sm text-fg outline-none focus:border-accent-dim"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-xs text-fg-dim" htmlFor="email">
              --email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded border border-border bg-black/20 px-3 py-2 text-sm text-fg outline-none focus:border-accent-dim"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-xs text-fg-dim" htmlFor="message">
              --message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="mt-1 w-full rounded border border-border bg-black/20 px-3 py-2 text-sm text-fg outline-none focus:border-accent-dim"
              placeholder="Say hello..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-md border border-accent-dim bg-accent/10 px-4 py-2 text-sm text-accent transition hover:bg-accent/20 disabled:opacity-50"
          >
            {status === "sending" ? "sending..." : "$ send"}
          </button>

          {status === "sent" && (
            <p className="text-sm text-accent">
              ✓ Message sent. Thanks for reaching out!
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-pink">✗ {errorMsg}</p>
          )}
        </form>

        <p className="mt-8 text-fg-dim">
          <span className="text-accent">$</span> cat social.json
        </p>
        <div className="mt-2 flex gap-4 text-sm">
          <a href={`mailto:${profile.email}`} className="text-cyan hover:text-accent">
            {profile.email}
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="text-cyan hover:text-accent">
            github.com/{profile.handle}
          </a>
        </div>
      </TerminalWindow>
    </section>
  );
}
