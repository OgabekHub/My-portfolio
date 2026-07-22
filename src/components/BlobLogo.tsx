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
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes liquid-blob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        @keyframes rotate-gradient {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />
      
      {/* The animated liquid blob background */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "linear-gradient(45deg, #0d0d2b, #38bdf8, #a78bfa, #c8a164)",
          backgroundSize: "400% 400%",
          animation: "liquid-blob 6s ease-in-out infinite, rotate-gradient 12s linear infinite",
          boxShadow: "0 0 15px rgba(56, 189, 248, 0.4), inset 0 0 10px rgba(200, 161, 100, 0.2)",
          transition: "all 0.5s ease",
        }}
        className="group-hover:scale-110 group-hover:brightness-125"
      />

      {/* The inner text (O/) */}
      <div 
        style={{
          position: "absolute",
          zIndex: 10,
          fontFamily: "Poppins, sans-serif",
          fontWeight: "bold",
          fontSize: size * 0.4,
          color: "#ffffff",
          textShadow: "0px 2px 4px rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          letterSpacing: "-1px"
        }}
      >
        O<span style={{ color: "#c8a164" }}>/</span>
      </div>
    </div>
  );
}
