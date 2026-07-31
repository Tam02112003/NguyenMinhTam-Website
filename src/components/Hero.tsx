"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/content";
import TerminalWindow from "./TerminalWindow";

const roles = ["Backend Developer", "Java & Spring Boot", "Python / AI enthusiast"];

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-5 pt-16 pb-8 sm:pt-24">
      <TerminalWindow command="visitor@web ~ % whoami">
        <p className="text-fg-dim">
          <span className="text-accent">$</span> whoami
        </p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-3 text-3xl font-bold text-fg sm:text-5xl"
        >
          {profile.name}
        </motion.h1>

        <p className="mt-4 text-fg-dim">
          <span className="text-accent">$</span> cat role.txt
        </p>
        <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-lg text-cyan sm:text-xl">
          {roles.map((role, i) => (
            <span key={role}>
              {role}
              {i < roles.length - 1 && <span className="text-fg-dim"> · </span>}
            </span>
          ))}
        </div>

        <p className="mt-6 max-w-2xl leading-relaxed text-fg">{profile.bio}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="rounded-md border border-accent-dim bg-accent/10 px-4 py-2 text-sm text-accent transition hover:bg-accent/20"
          >
            ./view-projects.sh
          </a>
          <a
            href="#contact"
            className="rounded-md border border-border px-4 py-2 text-sm text-fg-dim transition hover:border-accent-dim hover:text-accent"
          >
            ./contact.sh
          </a>
        </div>

        <p className="mt-8 text-fg-dim blink-cursor" />
      </TerminalWindow>
    </section>
  );
}
