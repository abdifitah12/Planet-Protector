// src/pages/PublicSite.jsx
import React from "react";
import { ShieldCheck, Sparkles, Wind } from "lucide-react"; // used in Services
import Banner from "../components/Banner"; // <-- if your file is banner.js (lowercase)
import ContactForm from "../components/ContactForm.jsx";

// Top Nav
const Nav = () => (
  <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
      <a href="#home" className="flex items-center gap-2">
        <img src="/bg.png" alt="Planet Protector Logo" className="h-12 w-auto" />
        <span className="text-xl font-bold text-slate-800">Planet Protector</span>
      </a>
      <nav className="hidden md:flex items-center gap-6 text-slate-700">
        <a href="#home" className="hover:text-emerald-700">Home</a>
        <a href="#services" className="hover:text-emerald-700">Services</a>
        <a href="#about" className="hover:text-emerald-700">About</a>
        <a href="#contact" className="hover:text-emerald-700">Contact</a>
      </nav>
      <a href="#contact" className="ml-4 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
        Schedule
      </a>
    </div>
  </header>
);

// Services
const Services = () => (
  <section id="services" className="py-16 bg-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-slate-900 text-center">Our Services</h2>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl border p-6 shadow-sm hover:shadow-md">
          <h3 className="text-xl font-semibold text-slate-900">Residential Bin Cleaning</h3>
          <p className="mt-2 text-slate-600">Curbside sanitization & deodorizing.</p>
        </div>
        <div className="rounded-2xl border p-6 shadow-sm hover:shadow-md">
          <h3 className="text-xl font-semibold text-slate-900">Commercial Cleaning</h3>
          <p className="mt-2 text-slate-600">Dumpster pads, sidewalks, equipment.</p>
        </div>
        <div className="rounded-2xl border p-6 shadow-sm hover:shadow-md">
          <h3 className="text-xl font-semibold text-slate-900">One-Time Deep Clean</h3>
          <p className="mt-2 text-slate-600">Events, move-ins, seasonal refresh.</p>
        </div>
      </div>

      {/* Feature cards */}
      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-100">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Sanitize</h3>
          <p className="mt-2 text-slate-600 text-sm">Eliminate up to 99.9% of bacteria like E. coli and Salmonella.</p>
        </div>
        <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-100">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
            <Wind className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Deodorize</h3>
          <p className="mt-2 text-slate-600 text-sm">Neutralize stubborn odors from trash, food waste, and diapers.</p>
        </div>
        <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-100">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Disinfect</h3>
          <p className="mt-2 text-slate-600 text-sm">Keep bins pest-free, mold-free, and safe for your family.</p>
        </div>
      </div>
    </div>
  </section>
);

// About
const About = () => (
  <section id="about" className="py-16 bg-emerald-50">
    <div className="mx-auto max-w-5xl px-4 text-center">
      <h2 className="text-3xl font-bold text-slate-900">About Us</h2>
      <p className="mt-3 text-lg text-slate-700">
        Family-owned in SeaTac, WA. Hot-water pressure, eco-friendly disinfectant,
        and proper water collection—safe for your family, pets, and lawn.
      </p>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 py-6 text-center">
    <p>© {new Date().getFullYear()} Trash Clean. All rights reserved.</p>
  </footer>
);

export default function PublicSite() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Nav />

      {/* Use the new Banner as the hero (replaces <Home />) */}
              <Banner
          images={[{ type: "video", src: "/video_trash_truck.mp4" }]}
          headline={<>Sanitize. Deodorize. <span className="text-emerald-300">Disinfect.</span></>}
          subtext="Family-owned in SeaTac, WA. Safe for kids, pets, and lawns."
          primary={{ label: "Schedule", href: "#contact" }}
          secondary={{ label: "See Services", href: "#services" }}
        />


      <main>
        <Services />
        <About />
        <section id="contact" className="py-16 bg-white">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-3xl font-bold text-slate-900 text-center">Get a Quote</h2>
            <p className="mt-3 text-slate-600 text-center">
              Tell us your pickup day and number of bins — we’ll reach out fast.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
