"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { siteConfig } from "@/lib/site";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

type NavContextValue = {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
};

const NavContext = createContext<NavContextValue>({
  isOpen: false,
  openMenu: () => {},
  closeMenu: () => {},
});

export function useNavMenu() {
  return useContext(NavContext);
}

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const openMenu = useCallback(() => {
    setMounted(true);
    setIsOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleExit = useCallback(() => {
    setMounted(false);
  }, []);

  return (
    <NavContext.Provider value={{ isOpen, openMenu, closeMenu }}>
      {children}
      {mounted ? (
        <OverlayNav visible={isOpen} onClose={closeMenu} onExit={handleExit} />
      ) : null}
    </NavContext.Provider>
  );
}

type OverlayNavProps = {
  visible: boolean;
  onClose: () => void;
  onExit: () => void;
};

function OverlayNav({ visible, onClose, onExit }: OverlayNavProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (visible) {
      if (reduced) {
        gsap.set(root, { autoAlpha: 1 });
        return;
      }

      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        tl.set("[data-nav-item], [data-nav-foot]", { autoAlpha: 0, y: 64 })
          .fromTo(
            root,
            { autoAlpha: 0, clipPath: "inset(0 0 100% 0)" },
            { autoAlpha: 1, clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "power4.inOut" },
          )
          .to("[data-nav-item]", {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power4.out",
            stagger: 0.09,
          }, "-=0.3")
          .to("[data-nav-foot]", {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          }, "-=0.7");
      }, root);

      document.documentElement.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKey);
      closeRef.current?.focus();

      return () => {
        window.removeEventListener("keydown", onKey);
        document.documentElement.style.overflow = "";
        ctx.revert();
      };
    }

    if (reduced) {
      gsap.set(root, { autoAlpha: 0 });
      onExit();
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to("[data-nav-item]", {
        y: 32,
        autoAlpha: 0,
        duration: 0.45,
        stagger: 0.04,
        ease: "power2.in",
      });
      gsap.to(root, {
        clipPath: "inset(0 0 100% 0)",
        autoAlpha: 0,
        duration: 0.5,
        ease: "power3.inOut",
        delay: 0.35,
        onComplete: onExit,
      });
    }, root);

    return () => ctx.revert();
  }, [visible, onClose, onExit]);

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[80] flex flex-col bg-background"
    >
      <div className="flex items-center justify-between border-b border-gray-500 px-6 sm:px-8">
        <Link href="/" onClick={onClose} aria-label="Black Screen Media, home" className="flex items-center py-5">
          <Image
            src="/logo.svg"
            alt="Black Screen Media"
            width={473}
            height={210}
            unoptimized
            className="h-7 w-auto"
          />
        </Link>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="group flex items-center gap-3 py-5 text-sm font-medium uppercase tracking-[0.25em] text-gray-100 transition-colors hover:text-accent"
        >
          Close
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M4 4l12 12M16 4L4 16"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>

      <nav
        aria-label="Primary"
        className="flex flex-1 flex-col justify-center overflow-y-auto px-6 sm:px-8"
      >
        <ul className="flex flex-col gap-1 sm:gap-2">
          {navItems.map((item, index) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                data-nav-item
                className="group flex items-baseline gap-4 sm:gap-6"
              >
                <span className="w-8 shrink-0 font-heading text-sm font-bold text-accent sm:text-base">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-heading text-[clamp(2.75rem,9vw,7.5rem)] font-bold uppercase leading-[1.02] tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div
        data-nav-foot
        className="flex flex-col gap-4 border-t border-gray-500 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8"
      >
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-sm text-gray-100 transition-colors hover:text-accent"
        >
          {siteConfig.email}
        </a>
        <div className="flex gap-6">
          {siteConfig.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-100 transition-colors hover:text-accent"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}