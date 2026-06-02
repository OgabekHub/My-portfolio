interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

export function triggerConfetti() {
  if (typeof window === "undefined") return;

  let canvas = document.getElementById("confetti-canvas") as HTMLCanvasElement;
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "confetti-canvas";
    canvas.className = "fixed inset-0 w-full h-full pointer-events-none z-[9999]";
    document.body.appendChild(canvas);
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles: ConfettiParticle[] = [];
  const colors = ["#c8a164", "#ec38bc", "#4db885", "#3b82f6", "#eab308", "#ef4444"];
  const particleCount = 130;

  const w = canvas.width;
  const h = canvas.height;

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI - Math.PI; // upwards trajectory (-180 to 0 degrees)
    const speed = Math.random() * 14 + 7;
    particles.push({
      x: w / 2,
      y: h + 10,
      vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 3,
      vy: Math.sin(angle) * speed - 4,
      radius: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      opacity: 1,
    });
  }

  let animationFrameId: number;

  const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let activeParticles = 0;

    particles.forEach((p) => {
      if (p.opacity <= 0) return;

      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.25; // gravity
      p.vx *= 0.98; // friction

      p.rotation += p.rotationSpeed;
      p.opacity -= 0.013; // fade out

      if (p.opacity > 0) {
        activeParticles++;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fillRect(-p.radius, -p.radius / 1.5, p.radius * 2, p.radius * 1.3);
        ctx.restore();
      }
    });

    if (activeParticles > 0) {
      animationFrameId = requestAnimationFrame(update);
    } else {
      cancelAnimationFrame(animationFrameId);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    }
  };

  update();
}
