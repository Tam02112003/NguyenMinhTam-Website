"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const SPRITE_SIZE = 64;
const SPEED = 70; // px per second
const RUN_FRAME_COUNT = 6;
const WAVE_FRAME_COUNT = 9;
const FRAME_DURATION = 200; // ms, matches source gifs
const JUMP_DURATION = 500; // ms

export default function WalkingSprite() {
  const [x, setX] = useState(0);
  const [direction, setDirection] = useState<"east" | "west">("east");
  const [frame, setFrame] = useState(0);
  const [jumping, setJumping] = useState(false);
  const [waving, setWaving] = useState(false);
  const [ready, setReady] = useState(false);

  const directionRef = useRef<"east" | "west">("east");
  const xRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const jumpTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextAutoJumpRef = useRef(0);
  const lastFrameChangeRef = useRef(0);
  const wavingRef = useRef(false);

  const doJump = useCallback(() => {
    setJumping(true);
    if (jumpTimeoutRef.current) clearTimeout(jumpTimeoutRef.current);
    jumpTimeoutRef.current = setTimeout(() => setJumping(false), JUMP_DURATION);
  }, []);

  useEffect(() => {
    const contactEl = document.getElementById("contact");
    if (!contactEl) return;

    function onEnter() {
      wavingRef.current = true;
      setWaving(true);
    }
    function onLeave() {
      wavingRef.current = false;
      setWaving(false);
    }

    contactEl.addEventListener("mouseenter", onEnter);
    contactEl.addEventListener("mouseleave", onLeave);
    return () => {
      contactEl.removeEventListener("mouseenter", onEnter);
      contactEl.removeEventListener("mouseleave", onLeave);
    };
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

      if (wavingRef.current) {
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

  const frameName = waving
    ? `frame_${String(frame % WAVE_FRAME_COUNT).padStart(2, "0")}`
    : `frame_${String(frame % RUN_FRAME_COUNT).padStart(2, "0")}`;
  const src = waving ? `/pixel-avatar/wave/${frameName}.png` : `/pixel-avatar/run/${frameName}.png`;

  return (
    <div
      className="fixed bottom-4 z-40 cursor-pointer select-none"
      style={{ left: x, width: SPRITE_SIZE, height: SPRITE_SIZE }}
      onClick={() => {
        if (!waving) doJump();
      }}
      role="button"
      aria-label="Nhấn để nhân vật nhảy"
      title="Click me!"
    >
      <div className={!waving && jumping ? "animate-[jump_0.5s_ease-out]" : ""}>
        <div style={{ transform: !waving && direction === "west" ? "scaleX(-1)" : undefined }}>
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
