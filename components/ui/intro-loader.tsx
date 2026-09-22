"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SESSION_KEY = "bsm_intro_seen";

export function IntroLoader() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.sessionStorage.getItem(SESSION_KEY)) return;

    window.sessionStorage.setItem(SESSION_KEY, "1");

    const showTimer = window.setTimeout(() => setShow(true), 0);
    const leaveTimer = window.setTimeout(() => setLeaving(true), 1150);
    const removeTimer = window.setTimeout(() => setShow(false), 1550);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[10002] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative">
        <Image
          src="/logo-white.svg"
          alt=""
          width={473}
          height={210}
          unoptimized
          className="intro-reveal-logo h-16 w-auto sm:h-24"
        />
        <div className="intro-sweep" />
      </div>
      <p className="intro-reveal-tagline mt-5 text-xs uppercase tracking-[0.3em] text-gray-100">
        Before it&apos;s seen.
      </p>
    </div>
  );
}