import React from "react";
import ContactForm from "../components/ContactForm.jsx";
import { ShieldCheck, Sparkles, Wind } from "lucide-react"; // icons

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

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



const Home = () => (
  <section
    id="home"
    className="relative bg-gradient-to-b from-emerald-50 to-white py-24"
  >
    <div className="mx-auto max-w-6xl px-6 text-center">
      {/* Headline */}
      <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 leading-tight">
        Sanitize. Deodorize. Disinfect.
      </h1>
      <p className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto text-slate-600">
        We go beyond surface cleaning. Our{" "}
        <span className="font-semibold text-emerald-700">eco-friendly</span>{" "}
        service sanitizes your bins by killing harmful bacteria, deodorizes to
        remove stubborn odors, and disinfects to protect your family and
        community. Every visit leaves your bins{" "}
        <span className="font-semibold text-emerald-700">fresh, safe</span>, and
        eco-friendly.
      </p>

      {/* Call to action */}
      <div className="mt-8 flex justify-center gap-4">
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-3 text-lg font-medium text-white shadow-lg hover:bg-emerald-700 hover:shadow-xl transition"
        >
          Book<ArrowRight />
        </a>
        <a
          href="#services"
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-8 py-3 text-lg font-medium text-slate-700 hover:bg-slate-50 transition"
        >
          Services
        </a>
      </div>

      {/* 3-column highlights */}
      <div className="mt-16 grid gap-8 sm:grid-cols-3">
        <div className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Sanitize</h3>
          <p className="mt-2 text-slate-600 text-sm">
            Eliminate up to 99.9% of bacteria like E. coli and Salmonella.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
            <Wind className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Deodorize</h3>
          <p className="mt-2 text-slate-600 text-sm">
            Neutralize stubborn odors from trash, food waste, and diapers.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Disinfect</h3>
          <p className="mt-2 text-slate-600 text-sm">
            Keep bins pest-free, mold-free, and safe for your family.
          </p>
        </div>
      </div>
    </div>
  </section>
);


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
    </div>
  </section>
);

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
      <main>
        <Home />
        <Services />
        <About />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
