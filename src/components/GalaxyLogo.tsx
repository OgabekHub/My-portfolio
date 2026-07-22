"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface GalaxyLogoProps {
  size?: number;
}

export default function GalaxyLogo({ size = 48 }: GalaxyLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Scene Setup ──────────────────────────────────────────────
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.set(0, 2.8, 3.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // ── Galaxy Parameters ─────────────────────────────────────────
    const PARTICLES = 7000;
    const ARMS = 3;
    const ARM_SPREAD = 0.35;
    const RADIUS = 2.2;
    const SPIN = 1.6;

    const positions = new Float32Array(PARTICLES * 3);
    const colors = new Float32Array(PARTICLES * 3);

    const colorCore = new THREE.Color("#ffeebb");   // warm white core
    const colorArm1 = new THREE.Color("#7ba7ff");   // cool blue arms
    const colorArm2 = new THREE.Color("#c084fc");   // purple mid
    const colorOuter = new THREE.Color("#1a1a3e");  // dark outer

    for (let i = 0; i < PARTICLES; i++) {
      const i3 = i * 3;

      // Distance from center (power gives more stars near core)
      const r = Math.pow(Math.random(), 0.6) * RADIUS;

      // Which spiral arm
      const arm = (i % ARMS) * ((Math.PI * 2) / ARMS);
      const spin = r * SPIN;
      const spread = (Math.random() - 0.5) * ARM_SPREAD * (r + 0.3);
      const spreadY = (Math.random() - 0.5) * ARM_SPREAD * 0.25;

      const angle = arm + spin + (Math.random() - 0.5) * 0.35;

      positions[i3]     = Math.cos(angle) * r + spread;
      positions[i3 + 1] = spreadY * (1 - r / RADIUS);
      positions[i3 + 2] = Math.sin(angle) * r + spread;

      // Color: warm bright near core → blue arms → dark outer
      const t = r / RADIUS; // 0 = center, 1 = edge
      const mixedColor = new THREE.Color();

      if (t < 0.25) {
        mixedColor.lerpColors(colorCore, colorArm1, t / 0.25);
      } else if (t < 0.6) {
        mixedColor.lerpColors(colorArm1, colorArm2, (t - 0.25) / 0.35);
      } else {
        mixedColor.lerpColors(colorArm2, colorOuter, (t - 0.6) / 0.4);
      }

      colors[i3]     = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // ── Circular star texture ────────────────────────────────────
    const starCanvas = document.createElement("canvas");
    starCanvas.width = 32;
    starCanvas.height = 32;
    const ctx = starCanvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.3, "rgba(200,180,255,0.8)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    const starTexture = new THREE.CanvasTexture(starCanvas);

    const material = new THREE.PointsMaterial({
      size: 0.045,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const galaxy = new THREE.Points(geometry, material);
    scene.add(galaxy);

    // ── Bright core glow ─────────────────────────────────────────
    const coreGeo = new THREE.BufferGeometry();
    const corePositions = new Float32Array(300 * 3);
    const coreColors = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      const i3 = i * 3;
      const r = Math.random() * 0.25;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * 0.4;
      corePositions[i3]     = Math.cos(theta) * r;
      corePositions[i3 + 1] = phi * r;
      corePositions[i3 + 2] = Math.sin(theta) * r;
      coreColors[i3]     = 1;
      coreColors[i3 + 1] = 0.95;
      coreColors[i3 + 2] = 0.8;
    }
    coreGeo.setAttribute("position", new THREE.BufferAttribute(corePositions, 3));
    coreGeo.setAttribute("color", new THREE.BufferAttribute(coreColors, 3));
    const coreMat = new THREE.PointsMaterial({
      size: 0.12,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(coreGeo, coreMat));

    // ── Animation ─────────────────────────────────────────────────
    let t = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      t += 0.003;
      galaxy.rotation.y = t;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      starTexture.dispose();
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ width: size, height: size, borderRadius: "50%", display: "block" }}
    />
  );
}
