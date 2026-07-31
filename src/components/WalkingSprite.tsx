"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const SPRITE_SIZE = 64;
const SPEED = 70; // px per second
const RUN_FRAME_COUNT = 6;
const FRAME_DURATION = 200; // ms, matches source gifs
const JUMP_DURATION = 500; // ms

type InteractionName = "wave" | "pickup" | "drink" | "getup";

const INTERACTIONS: Record<InteractionName, { elementId: string; frameCount: number }> = {
  wave: { elementId: "contact", frameCount: 9 },
  pickup: { elementId: "projects", frameCount: 9 },
  drink: { elementId: "about", frameCount: 9 },
  getup: { elementId: "experience", frameCount: 9 },
};

export default function WalkingSprite() {
  const [x, setX] = useState(0);
  const [direction, setDirection] = useState<"east" | "west">("east");
  const [frame, setFrame] = useState(0);
  const [jumping, setJumping] = useState(false);
  const [interaction, setInteraction] = useState<InteractionName | null>(null);
  const [ready, setReady] = useState(false);

  const directionRef = useRef<"east" | "west">("east");
  const xRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const jumpTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextAutoJumpRef = useRef(0);
  const lastFrameChangeRef = useRef(0);
  const interactionRef = useRef<InteractionName | null>(null);

  const doJump = useCallback(() => {
    setJumping(true);
    if (jumpTimeoutRef.current) clearTimeout(jumpTimeoutRef.current);
    jumpTimeoutRef.current = setTimeout(() => setJumping(false), JUMP_DURATION);
  }, []);

  useEffect(() => {
    const cleanups: Array<() => void> = [];

    (Object.keys(INTERACTIONS) as InteractionName[]).forEach((name) => {
      const el = document.getElementById(INTERACTIONS[name].elementId);
      if (!el) return;

      function onEnter() {
        interactionRef.current = name;
        setInteraction(name);
      }
      function onLeave() {
        if (interactionRef.current === name) {
          interactionRef.current = null;
          setInteraction(null);
        }
      }

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setReady(true);
    let lastTime = performance.now();
    lastFrameChangeRef.current = lastTime;
    nextAutoJumpRef.current = lastTime + 3000 + Math.random() * 4000;

    function tick(now: number) {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (now - lastFrameChangeRef.current >= FRAME_DURATION) {
        lastFrameChangeRef.current = now;
        setFrame((f) => f + 1);
      }

      if (interactionRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const maxX = window.innerWidth - SPRITE_SIZE;
      let nextX =
        xRef.current + (directionRef.current === "east" ? SPEED * dt : -SPEED * dt);

      if (nextX >= maxX) {
        nextX = maxX;
        directionRef.current = "west";
        setDirection("west");
      } else if (nextX <= 0) {
        nextX = 0;
        directionRef.current = "east";
        setDirection("east");
      }

      xRef.current = nextX;
      setX(nextX);

      if (now >= nextAutoJumpRef.current) {
        doJump();
        nextAutoJumpRef.current = now + 3000 + Math.random() * 5000;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (jumpTimeoutRef.current) clearTimeout(jumpTimeoutRef.current);
    };
  }, [doJump]);

  if (!ready) return null;

  const src = interaction
    ? `/pixel-avatar/${interaction}/frame_${String(
        frame % INTERACTIONS[interaction].frameCount
      ).padStart(2, "0")}.png`
    : `/pixel-avatar/run/frame_${String(frame % RUN_FRAME_COUNT).padStart(2, "0")}.png`;

  return (
    <div
      className="fixed bottom-4 z-40 cursor-pointer select-none"
      style={{ left: x, width: SPRITE_SIZE, height: SPRITE_SIZE }}
      onClick={() => {
        if (!interaction) doJump();
      }}
      role="button"
      aria-label="Nhấn để nhân vật nhảy"
      title="Click me!"
    >
      <div className={!interaction && jumping ? "animate-[jump_0.5s_ease-out]" : ""}>
        <div
          style={{
            transform: !interaction && direction === "west" ? "scaleX(-1)" : undefined,
          }}
        >
          <Image
            src={src}
            alt=""
            width={SPRITE_SIZE}
            height={SPRITE_SIZE}
            className="[image-rendering:pixelated]"
            priority
          />
        </div>
      </div>
    </div>
  );
}
