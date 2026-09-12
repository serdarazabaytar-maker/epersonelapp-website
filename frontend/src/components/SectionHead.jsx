import { Reveal } from "./Reveal";

export const SectionHead = ({ eyebrow, title, desc, align = "left", dark = false, testId }) => (
  <Reveal>
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"} data-testid={testId}>
      {eyebrow && (
        <p
          className={`flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] ${
            align === "center" ? "justify-center" : ""
          } ${dark ? "text-white/50" : "text-mute"}`}
        >
          <span className="inline-block h-2 w-2 rounded-[3px] bg-brand" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-5 text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {desc && (
        <p className={`mt-5 text-base leading-relaxed md:text-lg ${dark ? "text-white/60" : "text-mute"}`}>
          {desc}
        </p>
      )}
    </div>
  </Reveal>
);
