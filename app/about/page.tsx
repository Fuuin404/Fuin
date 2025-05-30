import React from "react";

const Header = () => (
  <h1 className="text-5xl font-light text-red-500 mb-8 tracking-[0.1em] font-press-start-2p">
    FŪiN
  </h1>
);

const Introduction = () => (
  <div className="space-y-4">
    <p>
      We are <strong>Fūin</strong> — a studio of creative engineers and system
      designers working at the edge of mathematics, design, and computation. We
      build digital tools and experiences that translate abstract logic into
      structured, expressive interfaces.
    </p>
    <p>
      Our work is rooted in precision and driven by curiosity. We distill
      complexity into clarity, using code as a medium for insight, expression,
      and function. Each project is an exploration of patterns, systems, and the
      elegance of structured design.
    </p>
  </div>
);

const Values = () => (
  <div className="mt-8">
    <h2 className="text-xl font-medium mb-4">Our Values</h2>
    <ul className="list-disc pl-5 space-y-2">
      <li>Clarity: Reveal what matters. Strip away what doesn’t.</li>
      <li>Precision: Every element intentional, every decision considered.</li>
      <li>Exploration: Systems as a space for creativity and discovery.</li>
      <li>Elegance: Technical depth expressed with visual simplicity.</li>
      <li>
        Resonance: Building work that feels thoughtful, purposeful, and lasting.
      </li>
    </ul>
  </div>
);

const Footer = () => (
  <p className="mt-8">
    At Fūin, we design with logic, code with intent, and aim to leave behind
    tools and ideas that feel both rigorous and alive.
  </p>
);

const Contact = () => <p className="mt-8 text-gray-600">info@fuuin.com</p>;

export default function About() {
  return (
    <section className="mb-8 font-mono max-w-2xl mx-auto px-4">
      <Header />
      <Introduction />
      <Values />
      <Footer />
      <Contact />
    </section>
  );
}
