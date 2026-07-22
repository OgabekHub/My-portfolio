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
        @keyframes float-wobble {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(2deg); }
        }
        @keyframes logo-morphing {
          0%   { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          25%  { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
          50%  { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
          75%  { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; }
          100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
        }
      `}} />
      
      {/* The animated liquid blob background matching hero section */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "linear-gradient(45deg, rgba(20,20,25,0.9), rgba(10,10,15,0.7))",
          border: "2px solid #c8a164",
          animation: "logo-morphing 10s ease-in-out infinite, float-wobble 6s ease-in-out infinite",
          boxShadow: "0 0 15px rgba(200, 161, 100, 0.15), inset 0 0 10px rgba(200, 161, 100, 0.1)",
          transition: "all 0.3s ease",
          backdropFilter: "blur(4px)"
        }}
        className="group-hover:scale-105 group-hover:border-[#e2c08d] group-hover:shadow-[0_0_20px_rgba(200,161,100,0.4)]"
      />

      {/* The inner text (O/) */}
      <div 
        style={{
          position: "absolute",
          zIndex: 10,
          fontFamily: "'Playfair Display', serif",
          fontWeight: "800",
          fontSize: size * 0.45,
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textShadow: "0 2px 4px rgba(0,0,0,0.8)",
          letterSpacing: "-1px"
        }}
        className="group-hover:scale-110 transition-transform"
      >
        O<span style={{ color: "#c8a164", marginLeft: "2px" }}>/</span>
      </div>
    </div>
  );
}
