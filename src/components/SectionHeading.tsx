import React from "react";

/**
 * Bo'lim sarlavhasi — to'rtta bo'lim bir xil ko'rinishda.
 *
 * Oltin so'z ostidagi chiziq hero'dagi ism ostidagi chiziq bilan bir xil;
 * u bo'lim `.visible` bo'lganda chiziladi (globals.css → .heading-sketch).
 */
export default function SectionHeading({
  title,
}: {
  /** Birinchi so'z oq, qolgani oltin: "Mening ko'nikmalarim" */
  title: string;
}) {
  const [first, ...rest] = title.split(" ");

  return (
    <div className="section-heading-wrap">
      <h2 className="section-heading font-playfair font-bold">
        {first}{" "}
        <span className="relative inline-block text-accent">
          {rest.join(" ")}
          <svg
            className="heading-sketch"
            viewBox="0 0 300 20"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 5 12 Q 75 4, 150 12 T 295 10"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </h2>
    </div>
  );
}
