import React, { useEffect, useRef } from 'react';

export function StarlightCanvas({ burstTrigger = 0 }) {
  const canvasRef = useRef(null);
  const burstQueueRef = useRef([]);

  useEffect(() => {
    if (burstTrigger > 0) {
      burstQueueRef.current.push(Date.now());
    }
  }, [burstTrigger]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = null;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = mediaQuery.matches;

    const pointer = { x: width * 0.5, y: height * 0.35, active: false };

    const starPalette = ['#faf8f5', '#f6e2b8', '#f8c8d8', '#d5ccb8'];
    const starCount = Math.min(110, Math.max(48, Math.floor((width * height) / 15000)));

    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.65 + 0.55,
      color: starPalette[Math.floor(Math.random() * starPalette.length)],
      baseAlpha: Math.random() * 0.55 + 0.25,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.018 + 0.006,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
    }));

    const petals = [];

    const spawnSakuraAndHeartBurst = (cx, cy) => {
      if (prefersReducedMotion) return;
      const count = 34;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
        const speed = Math.random() * 4.2 + 1.4;
        petals.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2,
          size: Math.random() * 7 + 5,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.06,
          alpha: 1,
          kind: i % 3 === 0 ? 'heart' : 'petal',
          color: i % 2 === 0 ? '#f8c8d8' : '#f6e2b8',
        });
      }
    };

    const drawHeart = (x, y, size, color, alpha) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 12, size / 12);
      ctx.beginPath();
      ctx.moveTo(0, 3);
      ctx.bezierCurveTo(0, -1, -6, -4, -6, 1);
      ctx.bezierCurveTo(-6, 5, 0, 8, 0, 11);
      ctx.bezierCurveTo(0, 8, 6, 5, 6, 1);
      ctx.bezierCurveTo(6, -4, 0, -1, 0, 3);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.fill();
      ctx.restore();
    };

    const drawPetal = (x, y, size, rotation, color, alpha) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.ellipse(0, 0, size, size * 0.55, 0, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.fill();
      ctx.restore();
    };

    const renderFrame = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(renderFrame);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      while (burstQueueRef.current.length > 0) {
        burstQueueRef.current.shift();
        spawnSakuraAndHeartBurst(width * 0.5, height * 0.42);
      }

      // Draw stars and interactive constellation lines
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        if (!prefersReducedMotion) {
          s.phase += s.speed;
          s.x += s.vx;
          s.y += s.vy;
          if (s.x < 0) s.x = width;
          if (s.x > width) s.x = 0;
          if (s.y < 0) s.y = height;
          if (s.y > height) s.y = 0;
        }

        const alpha = prefersReducedMotion
          ? s.baseAlpha
          : Math.max(0.15, Math.min(0.95, s.baseAlpha + Math.sin(s.phase) * 0.25));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        // Connect constellation lines near pointer or between close bright stars
        if (pointer.active) {
          const dx = s.x - pointer.x;
          const dy = s.y - pointer.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 18500) {
            const lineAlpha = (1 - distSq / 18500) * 0.28;
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.strokeStyle = '#f6e2b8';
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Update & draw sakura petals and hearts
      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.055; // gentle gravity
        p.vx *= 0.99;
        p.rotation += p.vRot;
        p.alpha -= 0.012;

        if (p.alpha <= 0.02) {
          petals.splice(i, 1);
          continue;
        }

        if (p.kind === 'heart') {
          drawHeart(p.x, p.y, p.size, p.color, p.alpha);
        } else {
          drawPetal(p.x, p.y, p.size, p.rotation, p.color, p.alpha);
        }
      }

      ctx.globalAlpha = 1;

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      if (prefersReducedMotion) renderFrame();
    };

    const handlePointerMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handleMotionChange = (e) => {
      prefersReducedMotion = e.matches;
      if (!prefersReducedMotion && !animationFrameId) {
        renderFrame();
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
