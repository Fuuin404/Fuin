export default function About() {
  return (
    <div className="mb-4 font-mono">
      <h1
        className="text-5xl font-press-start-2p font-light text-red-500 mb-15"
        style={{ letterSpacing: "0.1em" }}
      >
        FŪiN
      </h1>
      <p>
        We are <strong>Fūin</strong> — a studio of creative engineers and system
        designers working at the edge of mathematics, design, and computation.
        We build digital tools and experiences that translate abstract logic
        into structured, expressive interfaces.
      </p>
      <p className="mt-2">
        Our work is rooted in precision and driven by curiosity. We distill
        complexity into clarity, using code as a medium for insight, expression,
        and function. Each project is an exploration of patterns, systems, and
        the elegance of structured design.
      </p>
      <h2 className="text-xl font-medium mt-15">Our Values</h2>
      <ul className="list-disc pl-5">
        <li>Clarity: Reveal what matters. Strip away what doesn’t.</li>
        <li>
          Precision: Every element intentional, every decision considered.
        </li>
        <li>Exploration: Systems as a space for creativity and discovery.</li>
        <li>Elegance: Technical depth expressed with visual simplicity.</li>
        <li>
          Resonance: Building work that feels thoughtful, purposeful, and
          lasting.
        </li>
      </ul>
      <p className="mt-4">
        At Fūin, we design with logic, code with intent, and aim to leave behind
        tools and ideas that feel both rigorous and alive.
      </p>
      <p className="mt-18">info@fuuin.com</p>
    </div>
  );
}
