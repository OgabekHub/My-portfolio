"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface GalaxyLogoProps {
  size?: number;
}

export default function GalaxyLogo({ size = 56 }: GalaxyLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Scene ─────────────────────────────────────────────────────
    const scene = new THREE.Scene();

    // Camera: more dramatic angle, slightly zoomed in
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 2.2, 2.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;

    const toDispose: (THREE.BufferGeometry | THREE.Material | THREE.Texture)[] = [];

    // ── Helper: soft glow texture ─────────────────────────────────
    const makeGlowTex = (innerColor: string, outerColor: string, res = 64) => {
      const c = document.createElement("canvas");
      c.width = c.height = res;
      const cx = c.getContext("2d")!;
      const g = cx.createRadialGradient(res/2, res/2, 0, res/2, res/2, res/2);
      g.addColorStop(0,   innerColor);
      g.addColorStop(0.4, outerColor);
      g.addColorStop(1,   "rgba(0,0,0,0)");
      cx.fillStyle = g;
      cx.fillRect(0, 0, res, res);
      const t = new THREE.CanvasTexture(c);
      toDispose.push(t);
      return t;
    };

    const starTex   = makeGlowTex("rgba(255,255,255,1)", "rgba(180,160,255,0.6)");
    const planetTex = makeGlowTex("rgba(255,255,255,1)", "rgba(255,200,100,0.3)");

    // ── Background scatter stars ──────────────────────────────────
    const bgCount = 400;
    const bgPos = new Float32Array(bgCount * 3);
    const bgCol = new Float32Array(bgCount * 3);
    for (let i = 0; i < bgCount; i++) {
      const i3 = i * 3;
      bgPos[i3]   = (Math.random() - 0.5) * 8;
      bgPos[i3+1] = (Math.random() - 0.5) * 4;
      bgPos[i3+2] = (Math.random() - 0.5) * 8;
      const br = 0.4 + Math.random() * 0.6;
      bgCol[i3] = br; bgCol[i3+1] = br; bgCol[i3+2] = br + Math.random() * 0.2;
    }
    const bgGeo = new THREE.BufferGeometry();
    bgGeo.setAttribute("position", new THREE.BufferAttribute(bgPos, 3));
    bgGeo.setAttribute("color", new THREE.BufferAttribute(bgCol, 3));
    const bgMat = new THREE.PointsMaterial({
      size: 0.025, map: starTex, vertexColors: true,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(bgGeo, bgMat));
    toDispose.push(bgGeo, bgMat);

    // ── Galaxy Particles ──────────────────────────────────────────
    const PARTICLES = 9000;
    const ARMS = 3;
    const RADIUS = 2.0;
    const SPIN = 1.8;
    const ARM_SPREAD = 0.28;

    const pos = new Float32Array(PARTICLES * 3);
    const col = new Float32Array(PARTICLES * 3);

    // Richer, more saturated palette
    const cCore  = new THREE.Color("#fff5cc"); // warm bright center
    const cMid   = new THREE.Color("#a78bfa"); // vivid violet arms
    const cArm   = new THREE.Color("#38bdf8"); // electric blue
    const cOuter = new THREE.Color("#0d0d2b"); // deep dark blue

    for (let i = 0; i < PARTICLES; i++) {
      const i3 = i * 3;
      const r = Math.pow(Math.random(), 0.55) * RADIUS;
      const arm = (i % ARMS) * ((Math.PI * 2) / ARMS);
      const angle = arm + r * SPIN + (Math.random() - 0.5) * 0.3;
      const spread = (Math.random() - 0.5) * ARM_SPREAD * (r + 0.25);
      const spreadY = (Math.random() - 0.5) * 0.12 * (1 - r / RADIUS);

      pos[i3]   = Math.cos(angle) * r + spread;
      pos[i3+1] = spreadY;
      pos[i3+2] = Math.sin(angle) * r + spread;

      const t = r / RADIUS;
      const mc = new THREE.Color();
      if      (t < 0.15) mc.lerpColors(cCore,  cMid,   t / 0.15);
      else if (t < 0.5)  mc.lerpColors(cMid,   cArm,   (t - 0.15) / 0.35);
      else               mc.lerpColors(cArm,   cOuter, (t - 0.5) / 0.5);

      col[i3] = mc.r; col[i3+1] = mc.g; col[i3+2] = mc.b;
    }

    const gGeo = new THREE.BufferGeometry();
    gGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    gGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const gMat = new THREE.PointsMaterial({
      size: 0.042, map: starTex, vertexColors: true,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
    });
    const galaxy = new THREE.Points(gGeo, gMat);
    scene.add(galaxy);
    toDispose.push(gGeo, gMat);

    // ── Core glow layers ─────────────────────────────────────────
    const addCoreLayer = (count: number, maxR: number, sz: number, brightness: number) => {
      const p = new Float32Array(count * 3);
      const c = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const r = Math.pow(Math.random(), 2) * maxR;
        const a = Math.random() * Math.PI * 2;
        p[i3]   = Math.cos(a) * r;
        p[i3+1] = (Math.random() - 0.5) * 0.05;
        p[i3+2] = Math.sin(a) * r;
        c[i3] = 1; c[i3+1] = brightness; c[i3+2] = brightness * 0.7;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(p, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(c, 3));
      const mat = new THREE.PointsMaterial({
        size: sz, map: planetTex, vertexColors: true,
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      });
      scene.add(new THREE.Points(geo, mat));
      toDispose.push(geo, mat);
    };
    addCoreLayer(500, 0.18, 0.18, 0.95);
    addCoreLayer(200, 0.08, 0.30, 1.0);

    // ── Planets ───────────────────────────────────────────────────
    const ambLight = new THREE.AmbientLight(0x223366, 1.5);
    scene.add(ambLight);
    const sunLight = new THREE.PointLight(0xfff5cc, 8, 12);
    sunLight.position.set(0, 0.3, 0);
    scene.add(sunLight);
    const rimLight = new THREE.PointLight(0x38bdf8, 3, 8);
    rimLight.position.set(2.5, 1.5, -1);
    scene.add(rimLight);

    interface PlanetDef {
      orbitR: number; r: number; color: string;
      speed: number; tilt: number; startAngle: number;
      ring?: { inner: number; outer: number; color: string; opacity: number };
      emissive?: string;
    }

    const planetDefs: PlanetDef[] = [
      { orbitR: 0.52, r: 0.07,  color: "#60a5fa", speed: 2.2,  tilt: 0.2,  startAngle: 0,
        emissive: "#1e40af" },
      { orbitR: 1.0,  r: 0.10,  color: "#fb923c", speed: 1.2,  tilt: 0.35, startAngle: 2.0,
        ring: { inner: 0.15, outer: 0.26, color: "#f59e0b", opacity: 0.55 },
        emissive: "#7c2d12" },
      { orbitR: 1.55, r: 0.075, color: "#4ade80", speed: 0.7,  tilt:-0.25, startAngle: 4.2,
        emissive: "#14532d" },
    ];

    const planets: { mesh: THREE.Mesh; pivot: THREE.Object3D; speed: number; orbitR: number; angle: number }[] = [];

    for (const pd of planetDefs) {
      const pivot = new THREE.Object3D();
      pivot.rotation.x = pd.tilt;
      scene.add(pivot);

      // Planet
      const geo = new THREE.SphereGeometry(pd.r, 20, 20);
      const mat = new THREE.MeshStandardMaterial({
        color: pd.color,
        roughness: 0.5,
        metalness: 0.1,
        emissive: pd.emissive ?? pd.color,
        emissiveIntensity: 0.4,
      });
      const mesh = new THREE.Mesh(geo, mat);
      pivot.add(mesh);
      toDispose.push(geo, mat);

      // Ring
      if (pd.ring) {
        const rGeo = new THREE.RingGeometry(pd.ring.inner, pd.ring.outer, 40);
        const rMat = new THREE.MeshBasicMaterial({
          color: pd.ring.color, side: THREE.DoubleSide,
          transparent: true, opacity: pd.ring.opacity, depthWrite: false,
        });
        const ring = new THREE.Mesh(rGeo, rMat);
        ring.rotation.x = Math.PI / 2.8;
        mesh.add(ring);
        toDispose.push(rGeo, rMat);
      }

      // Orbit trail
      const trail: THREE.Vector3[] = [];
      for (let i = 0; i <= 100; i++) {
        const a = (i / 100) * Math.PI * 2;
        trail.push(new THREE.Vector3(Math.cos(a) * pd.orbitR, 0, Math.sin(a) * pd.orbitR));
      }
      const tGeo = new THREE.BufferGeometry().setFromPoints(trail);
      const tMat = new THREE.LineBasicMaterial({ color: "#7c3aed", transparent: true, opacity: 0.12 });
      pivot.add(new THREE.LineLoop(tGeo, tMat));
      toDispose.push(tGeo, tMat);

      planets.push({ mesh, pivot, speed: pd.speed, orbitR: pd.orbitR, angle: pd.startAngle });
    }

    // ── Animate ───────────────────────────────────────────────────
    let t = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      t += 0.003;

      galaxy.rotation.y = t;

      for (const p of planets) {
        p.angle += p.speed * 0.003;
        p.mesh.position.x = Math.cos(p.angle) * p.orbitR;
        p.mesh.position.z = Math.sin(p.angle) * p.orbitR;
        p.mesh.rotation.y += 0.018;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      for (const d of toDispose) d.dispose();
      renderer.dispose();
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        display: "block",
        filter: "drop-shadow(0 0 6px rgba(139,92,246,0.6)) drop-shadow(0 0 12px rgba(56,189,248,0.3))",
      }}
    />
  );
}
