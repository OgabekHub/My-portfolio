"use client";

import React, { useEffect, useRef } from "react";

interface CodeLine {
  text: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
  fontSize: number;
}

const CODE_SNIPPETS = [
  "const dev = \"Og'abek\";",
  "import React from 'react';",
  "function build() { return true; }",
  "useState<string>('');",
  "useEffect(() => {}, []);",
  "export default Hero;",
  "const [data, setData] = useState(null);",
  "className=\"flex items-center\"",
  "border-radius: 50px;",
  "transform: translateY(-3px);",
  "async function fetch() {",
  "return <Component />;",
  "npm run dev",
  "git commit -m 'feat: add'",
  "const router = useRouter();",
  "interface Props { id: number }",
  "tailwind.config.ts",
  "z-index: 50;",
  "backdrop-filter: blur(12px);",
  "transition: all 0.3s ease;",
];

export default function FloatingCode() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let lines: CodeLine[] = [];

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth ?? window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight ?? window.innerHeight;
      init();
    };

    const init = () => {
      lines = [];
      const count = Math.floor(canvas.width / 90);
      for (let i = 0; i < count; i++) {
        lines.push(makeLine(i * (canvas.width / count)));
      }
    };

    const makeLine = (x?: number): CodeLine => ({
      text: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
      x: x ?? Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      speed: 0.18 + Math.random() * 0.22,
      opacity: 0.028 + Math.random() * 0.04,
      fontSize: 10 + Math.random() * 3,
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${lines[0]?.fontSize ?? 11}px 'Courier New', monospace`;

      lines.forEach((line) => {
        line.y += line.speed;
        if (line.y > canvas.height + 30) {
          Object.assign(line, makeLine());
          line.y = -20;
        }
        ctx.save();
        ctx.font = `${line.fontSize}px 'Courier New', monospace`;
        ctx.fillStyle = `rgba(200, 161, 100, ${line.opacity})`;
        ctx.fillText(line.text, line.x, line.y);
        ctx.restore();
      });

      animId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
