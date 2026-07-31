"use client";

const links = [
  { href: "#about", label: "cd ~/about" },
  { href: "#projects", label: "ls ~/projects" },
  { href: "#experience", label: "cat experience.log" },
  { href: "#contact", label: "./contact.sh" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 text-sm">
        <a href="#top" className="text-accent scanline-glow">
          nmt@portfolio<span className="text-fg-dim">:~$</span>
        </a>
        <ul className="hidden gap-6 sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-fg-dim transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
