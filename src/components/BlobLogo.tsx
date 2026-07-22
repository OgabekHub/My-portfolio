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
      {/* The animated blob background using the exact same 'morphing' animation from globals.css */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "linear-gradient(45deg, #c8a164, #e2c08d)",
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          animation: "morphing 10s ease-in-out infinite",
          transition: "all 0.3s ease",
          boxShadow: "0 0 15px rgba(200, 161, 100, 0.4)",
        }}
        className="group-hover:scale-105 group-hover:brightness-110"
      />

      {/* The inner text */}
      <div 
        style={{
          position: "absolute",
          zIndex: 10,
          fontFamily: "'Playfair Display', serif",
          fontWeight: "800",
          fontSize: size * 0.4,
          color: "#0f172a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-1px"
        }}
        className="group-hover:scale-110 transition-transform"
      >
        O
      </div>
    </div>
  );
}
