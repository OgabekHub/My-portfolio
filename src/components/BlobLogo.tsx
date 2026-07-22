"use client";

import React from "react";

interface BlobLogoProps {
  size?: number;
}

export default function BlobLogo({ size = 56 }: BlobLogoProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="group"
    >
      {/* The inner text (O) */}
      <div 
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: "800",
          fontSize: size * 0.7,
          color: "#c8a164",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textShadow: "0 0 15px rgba(200, 161, 100, 0.4)",
          transition: "all 0.3s ease",
        }}
        className="group-hover:scale-110 group-hover:brightness-125"
      >
        O
      </div>
    </div>
  );
}
