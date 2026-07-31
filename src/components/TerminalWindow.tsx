import type { ReactNode } from "react";

export default function TerminalWindow({
  command,
  children,
  className = "",
}: {
  command: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`terminal-window overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 border-b border-border bg-black/20 px-4 py-3">
        <span className="terminal-dot bg-[#ff5f56]" />
        <span className="terminal-dot bg-[#ffbd2e]" />
        <span className="terminal-dot bg-[#27c93f]" />
        <span className="ml-3 truncate text-xs text-fg-dim">{command}</span>
      </div>
      <div className="p-5 sm:p-8">{children}</div>
    </div>
  );
}
