"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface GalaxyLogoProps {
  size?: number;
}

export default function GalaxyLogo({ size = 48 }: GalaxyLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Scene Setup ──────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.set(0, 2.8, 3.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // ── Star texture (shared) ─────────────────────────────────────
    const starCanvas = document.createElement("canvas");
    starCanvas.width = 32; starCanvas.height = 32;
    const ctx = starCanvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.3, "rgba(200,180,255,0.8)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    const starTexture = new THREE.CanvasTexture(starCanvas);

    // ── Galaxy Particles ──────────────────────────────────────────
    const PARTICLES = 7000;
    const ARMS = 3;
    const ARM_SPREAD = 0.35;
    const RADIUS = 2.2;
    const SPIN = 1.6;

    const positions = new Float32Array(PARTICLES * 3);
    const colors = new Float32Array(PARTICLES * 3);
    const colorCore  = new THREE.Color("#ffeebb");
    const colorArm1  = new THREE.Color("#7ba7ff");
    const colorArm2  = new THREE.Color("#c084fc");
    const colorOuter = new THREE.Color("#1a1a3e");

    for (let i = 0; i < PARTICLES; i++) {
      const i3 = i * 3;
      const r = Math.pow(Math.random(), 0.6) * RADIUS;
      const arm = (i % ARMS) * ((Math.PI * 2) / ARMS);
      const spin = r * SPIN;
      const spread = (Math.random() - 0.5) * ARM_SPREAD * (r + 0.3);
      const spreadY = (Math.random() - 0.5) * ARM_SPREAD * 0.25;
      const angle = arm + spin + (Math.random() - 0.5) * 0.35;

      positions[i3]     = Math.cos(angle) * r + spread;
      positions[i3 + 1] = spreadY * (1 - r / RADIUS);
      positions[i3 + 2] = Math.sin(angle) * r + spread;

      const t = r / RADIUS;
      const mc = new THREE.Color();
      if (t < 0.25)      mc.lerpColors(colorCore, colorArm1, t / 0.25);
      else if (t < 0.6)  mc.lerpColors(colorArm1, colorArm2, (t - 0.25) / 0.35);
      else               mc.lerpColors(colorArm2, colorOuter, (t - 0.6) / 0.4);

      colors[i3] = mc.r; colors[i3+1] = mc.g; colors[i3+2] = mc.b;
    }

    const galaxyGeo = new THREE.BufferGeometry();
    galaxyGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    galaxyGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const galaxyMat = new THREE.PointsMaterial({
      size: 0.045, map: starTexture, vertexColors: true,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
    });
    const galaxy = new THREE.Points(galaxyGeo, galaxyMat);
    scene.add(galaxy);

    // ── Bright core ───────────────────────────────────────────────
    const coreGeo = new THREE.BufferGeometry();
    const corePos = new Float32Array(300 * 3);
    const coreCol = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      const i3 = i * 3;
      const r = Math.random() * 0.25;
      const theta = Math.random() * Math.PI * 2;
      corePos[i3]   = Math.cos(theta) * r;
      corePos[i3+1] = (Math.random() - 0.5) * 0.1 * r;
      corePos[i3+2] = Math.sin(theta) * r;
      coreCol[i3] = 1; coreCol[i3+1] = 0.95; coreCol[i3+2] = 0.8;
    }
    coreGeo.setAttribute("position", new THREE.BufferAttribute(corePos, 3));
    coreGeo.setAttribute("color", new THREE.BufferAttribute(coreCol, 3));
    const coreMat = new THREE.PointsMaterial({
      size: 0.13, map: starTexture, vertexColors: true,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(coreGeo, coreMat));

    // ── Planets ───────────────────────────────────────────────────
    const planetData = [
      // { orbitR, size, color,   orbitSpeed, orbitTilt, startAngle, ringColor }
      { orbitR: 0.6,  r: 0.055, color: "#4fc3f7", speed: 1.8,  tilt: 0.15, angle: 0,    ring: null },
      { orbitR: 1.1,  r: 0.08,  color: "#e8a87c", speed: 1.1,  tilt: 0.3,  angle: 2.1,  ring: "#d4a04a" },
      { orbitR: 1.65, r: 0.06,  color: "#81c784", speed: 0.65, tilt: -0.2, angle: 4.5,  ring: null },
    ];

    // Planet pivot groups (orbit around galaxy center)
    const planetMeshes: {
      mesh: THREE.Mesh;
      pivot: THREE.Object3D;
      speed: number;
      orbitR: number;
      orbitAngle: number;
      ringMesh?: THREE.Mesh;
    }[] = [];

    const toDispose: (THREE.BufferGeometry | THREE.Material)[] = [];

    for (const pd of planetData) {
      // Orbit pivot tilted
      const pivot = new THREE.Object3D();
      pivot.rotation.x = pd.tilt;
      scene.add(pivot);

      // Planet sphere
      const geo = new THREE.SphereGeometry(pd.r, 14, 14);
      const mat = new THREE.MeshStandardMaterial({
        color: pd.color,
        roughness: 0.6,
        metalness: 0.2,
        emissive: pd.color,
        emissiveIntensity: 0.25,
      });
      const mesh = new THREE.Mesh(geo, mat);
      pivot.add(mesh);
      toDispose.push(geo, mat);

      // Optional ring (Saturn-like)
      let ringMesh: THREE.Mesh | undefined;
      if (pd.ring) {
        const ringGeo = new THREE.RingGeometry(pd.r * 1.4, pd.r * 2.2, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: pd.ring,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.5,
          depthWrite: false,
        });
        ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2.5;
        mesh.add(ringMesh);
        toDispose.push(ringGeo, ringMat);
      }

      // Orbit trail (subtle dashed circle)
      const trailPoints: THREE.Vector3[] = [];
      for (let i = 0; i <= 80; i++) {
        const a = (i / 80) * Math.PI * 2;
        trailPoints.push(new THREE.Vector3(Math.cos(a) * pd.orbitR, 0, Math.sin(a) * pd.orbitR));
      }
      const trailGeo = new THREE.BufferGeometry().setFromPoints(trailPoints);
      const trailMat = new THREE.LineBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.07 });
      pivot.add(new THREE.LineLoop(trailGeo, trailMat));
      toDispose.push(trailGeo, trailMat);

      planetMeshes.push({ mesh, pivot, speed: pd.speed, orbitR: pd.orbitR, orbitAngle: pd.angle, ringMesh });
    }

    // ── Lighting ──────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xfff4cc, 2.5, 8);
    pointLight.position.set(0, 0.5, 0);
    scene.add(pointLight);
    const rimLight = new THREE.PointLight(0x7ba7ff, 1.2, 6);
    rimLight.position.set(2, 1, -1);
    scene.add(rimLight);

    // ── Animation ─────────────────────────────────────────────────
    let elapsed = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      elapsed += 0.003;

      // Rotate galaxy
      galaxy.rotation.y = elapsed;

      // Orbit planets
      for (const p of planetMeshes) {
        p.orbitAngle += p.speed * 0.003;
        p.mesh.position.x = Math.cos(p.orbitAngle) * p.orbitR;
        p.mesh.position.z = Math.sin(p.orbitAngle) * p.orbitR;
        // Self-rotation
        p.mesh.rotation.y += 0.02;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      for (const d of toDispose) d.dispose();
      galaxyGeo.dispose();
      galaxyMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      starTexture.dispose();
      renderer.dispose();
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
