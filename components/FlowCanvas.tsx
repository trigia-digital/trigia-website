"use client";

import { useEffect, useRef } from "react";

function bezierPoint(p0: number, p1: number, p2: number, p3: number, t: number) {
  const mt = 1 - t;
  return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
}

export default function FlowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // Flowing curves echoing the brand mark's S-curve
    const LINES = 26;
    const lines = Array.from({ length: LINES }, (_, i) => ({
      offset: i / LINES,
      speed: 0.06 + Math.random() * 0.05,
      phase: Math.random() * Math.PI * 2,
      amp: 40 + Math.random() * 90,
      glow: i % 3 === 0,
      glowT: Math.random(),
      glowSpeed: 0.0018 + Math.random() * 0.0022,
    }));

    // Ambient embers drifting upward — echoes the flame-like "S" mark
    const EMBERS = 42;
    const embers = Array.from({ length: EMBERS }, () => ({
      x: Math.random(),
      y: Math.random() * 1.4 - 0.2,
      r: 0.6 + Math.random() * 1.8,
      vy: 0.00018 + Math.random() * 0.00032,
      vx: (Math.random() - 0.5) * 0.00012,
      baseA: 0.18 + Math.random() * 0.4,
      tw: Math.random() * Math.PI * 2,
      twSpeed: 0.8 + Math.random() * 1.4,
    }));

    let t = 0;
    let raf = 0;

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      embers.forEach((e) => {
        e.y -= e.vy * 16;
        e.x += e.vx * 16;
        if (e.y < -0.05) {
          e.y = 1.05;
          e.x = Math.random();
        }
        const tw = 0.55 + 0.45 * Math.sin(t * e.twSpeed + e.tw);
        const ex = e.x * w;
        const ey = e.y * h;
        const glow = ctx!.createRadialGradient(ex, ey, 0, ex, ey, e.r * 5);
        glow.addColorStop(0, `rgba(255,160,100,${e.baseA * tw})`);
        glow.addColorStop(1, "rgba(255,90,31,0)");
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(ex, ey, e.r * 5, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.beginPath();
        ctx!.arc(ex, ey, e.r * 0.5, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,200,160,${Math.min(0.9, e.baseA * tw * 1.8)})`;
        ctx!.fill();
      });

      lines.forEach((ln) => {
        const baseX = w * (0.15 + ln.offset * 1.05);
        const wobble = Math.sin(t * ln.speed + ln.phase) * ln.amp;
        const p0x = baseX + wobble * 0.2;
        const p0y = -20;
        const p1x = baseX - ln.amp + wobble;
        const p1y = h * 0.35;
        const p2x = baseX + ln.amp - wobble;
        const p2y = h * 0.62;
        const p3x = baseX - wobble * 0.3;
        const p3y = h + 20;

        ctx!.beginPath();
        ctx!.moveTo(p0x, p0y);
        ctx!.bezierCurveTo(p1x, p1y, p2x, p2y, p3x, p3y);
        const grad = ctx!.createLinearGradient(0, 0, 0, h);
        const alpha = 0.05 + (1 - ln.offset) * 0.12;
        grad.addColorStop(0, "rgba(255,90,31,0)");
        grad.addColorStop(0.45, `rgba(255,90,31,${alpha})`);
        grad.addColorStop(1, "rgba(255,90,31,0)");
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1;
        ctx!.stroke();

        if (ln.glow) {
          ln.glowT += ln.glowSpeed * 16;
          if (ln.glowT > 1) ln.glowT -= 1;
          const gx = bezierPoint(p0x, p1x, p2x, p3x, ln.glowT);
          const gy = bezierPoint(p0y, p1y, p2y, p3y, ln.glowT);
          const fade = Math.sin(ln.glowT * Math.PI);
          const glintR = ctx!.createRadialGradient(gx, gy, 0, gx, gy, 16);
          glintR.addColorStop(0, `rgba(255,190,140,${0.85 * fade})`);
          glintR.addColorStop(0.4, `rgba(255,120,50,${0.35 * fade})`);
          glintR.addColorStop(1, "rgba(255,90,31,0)");
          ctx!.fillStyle = glintR;
          ctx!.beginPath();
          ctx!.arc(gx, gy, 16, 0, Math.PI * 2);
          ctx!.fill();
        }
      });
      t += 0.006;
    }

    if (prefersReduced) {
      draw();
      return () => window.removeEventListener("resize", resize);
    }

    let running = false;
    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    // Pause the per-frame redraw once the canvas scrolls out of view (e.g.
    // user scrolled well past Hero) — resumes automatically when it's back.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          loop();
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="flow-canvas" aria-hidden="true" />;
}
