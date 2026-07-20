"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  opacity: number;
}

export default function ParticleNetwork({
  color = "255,222,2",
  count = 72,
  linkDist = 155,
  style = {},
}: {
  color?: string;
  count?: number;
  linkDist?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let pts: Particle[] = [];

    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const w = canvas.width, h = canvas.height;
      pts = Array.from({ length: count }, () => {
        const big = Math.random() > 0.75;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          radius: big ? Math.random() * 3 + 2 : Math.random() * 1.2 + 0.4,
          opacity: big ? Math.random() * 0.55 + 0.3 : Math.random() * 0.35 + 0.12,
        };
      });
    };

    const frame = () => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      // connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < linkDist) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${color},${(1 - d / linkDist) * 0.18})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const p of pts) {
        if (p.radius > 2) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
          g.addColorStop(0, `rgba(${color},${p.opacity * 0.35})`);
          g.addColorStop(1, `rgba(${color},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${p.opacity})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    init();
    frame();

    const ro = new ResizeObserver(init);
    ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [color, count, linkDist]);

  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", ...style }}
    />
  );
}
