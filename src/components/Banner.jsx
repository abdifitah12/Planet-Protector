import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Banner({
  images = ["/bg.png"],
  headline = (
    <>
      Sanitize. Deodorize. <span className="text-emerald-300">Disinfect.</span>
    </>
  ),
  subtext = "We go beyond surface cleaning — eco-friendly bin sanitizing that protects your family and community.",
  primary = { label: "Book", href: "#contact" },
  secondary = { label: "Services", href: "#services" },
  intervalMs = 5000,
}) {
  const [index, setIndex] = useState(0);
  const hoverRef = useRef(false);
  const focusRef = useRef(true);

  const slides = useMemo(() => images.filter(Boolean), [images]);
  const count = slides.length || 1;

  useEffect(() => {
    const onVisibility = () => (focusRef.current = !document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    const id = setInterval(() => {
      if (!hoverRef.current && focusRef.current && count > 1) {
        setIndex((i) => (i + 1) % count);
      }
    }, intervalMs);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [count, intervalMs]);

  const go = (dir) => setIndex((i) => (i + dir + count) % count);
  const goTo = (i) => setIndex(i % count);

  return (
    <section
      id="home"
      className="relative isolate h-[72vh] min-h-[480px] w-full overflow-hidden bg-slate-900 text-white select-none"
      aria-label="Website banner"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      {/* Slides are pinned behind everything */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <img
              src={slides[index] || "/bg.png"}
              alt={`Banner slide ${index + 1}`}
              className="h-full w-full object-cover"
              fetchPriority="high"
            />
            {/* Overlays must not intercept taps */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />
            <div className="pointer-events-none absolute inset-0 bg-emerald-900/0 mix-blend-multiply" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Text content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
        <div className="max-w-2xl">
          <motion.h1
            className="text-4xl font-extrabold tracking-tight sm:text-6xl drop-shadow"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {headline}
          </motion.h1>

          <motion.p
            className="mt-4 text-lg text-slate-100/90 sm:text-xl max-w-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {subtext}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {primary?.href && (
              <a
                href={primary.href}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-emerald-700 hover:shadow-xl transition active:scale-[.98]"
                aria-label={primary.label}
              >
                {primary.label}
              </a>
            )}
            {secondary?.href && (
              <a
                href={secondary.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur hover:bg-white/20 transition active:scale-[.98]"
                aria-label={secondary.label}
              >
                {secondary.label}
              </a>
            )}
          </motion.div>

          {/* Highlights */}
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/90">
            <span className="rounded-full bg-black/30 px-3 py-1">Eco-friendly</span>
            <span className="rounded-full bg-black/30 px-3 py-1">Hot water pressure</span>
            <span className="rounded-full bg-black/30 px-3 py-1">99.9% bacteria kill</span>
          </div>
        </div>
      </div>

      {/* Controls (raised above everything, optimized for touch) */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="group absolute left-3 top-1/2 -translate-y-1/2 z-30 rounded-full bg-black/40 p-2 text-white backdrop-blur transition hover:bg-black/60"
            style={{ touchAction: "manipulation" }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next slide"
            className="group absolute right-3 top-1/2 -translate-y-1/2 z-30 rounded-full bg-black/40 p-2 text-white backdrop-blur transition hover:bg-black/60"
            style={{ touchAction: "manipulation" }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Dots (also above) */}
      {count > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === index ? "bg-white" : "bg-white/50 hover:bg-white/80"
              }`}
              style={{ touchAction: "manipulation" }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
