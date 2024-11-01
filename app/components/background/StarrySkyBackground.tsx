'use client';

import { useEffect, useRef } from 'react';

export default function StarrySkyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Star {
      private readonly canvasWidth: number;
      private readonly canvasHeight: number;
      x: number;
      y: number;
      size: number;
      speed: number;
      twinkleSpeed: number;
      brightness: number;
      maxBrightness: number;
      phase: number;
      color: string;
      pulseSize: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = Math.random() * this.canvasWidth;
        this.y = Math.random() * this.canvasHeight;
        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 0.2 + 0.1;
        this.twinkleSpeed = Math.random() * 0.01 + 0.005;
        this.brightness = Math.random();
        this.maxBrightness = Math.random() * 0.4 + 0.6;
        this.phase = Math.random() * Math.PI * 2;
        const colors = [
          '255, 255, 255', // 白色
          '255, 255, 220', // 暖白
          '220, 220, 255', // 冷白
          '255, 220, 220'  // 淡红
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.pulseSize = 0;
      }

      update(time: number) {
        this.y += this.speed;
        if (this.y > this.canvasHeight) {
          this.y = 0;
          this.x = Math.random() * this.canvasWidth;
        }

        const primaryTwinkle = Math.sin(time * this.twinkleSpeed + this.phase);
        const secondaryTwinkle = Math.sin(time * this.twinkleSpeed * 1.5 + this.phase);
        this.brightness = ((primaryTwinkle + secondaryTwinkle) / 2 + 1) * 0.5 * this.maxBrightness;

        this.pulseSize = Math.sin(time * 0.002 + this.phase) * 0.5 + 1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * this.pulseSize
        );
        
        gradient.addColorStop(0, `rgba(${this.color}, ${this.brightness})`);
        gradient.addColorStop(0.5, `rgba(${this.color}, ${this.brightness * 0.5})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 2 * this.pulseSize, 0, Math.PI * 2);
        ctx.fill();

        if (this.brightness > 0.7) {
          ctx.save();
          ctx.strokeStyle = `rgba(${this.color}, ${(this.brightness - 0.7) * 0.3})`;
          ctx.lineWidth = 0.5;
          
          ctx.beginPath();
          ctx.moveTo(this.x - this.size * 4, this.y);
          ctx.lineTo(this.x + this.size * 4, this.y);
          ctx.moveTo(this.x, this.y - this.size * 4);
          ctx.lineTo(this.x, this.y + this.size * 4);
          
          ctx.moveTo(this.x - this.size * 3, this.y - this.size * 3);
          ctx.lineTo(this.x + this.size * 3, this.y + this.size * 3);
          ctx.moveTo(this.x - this.size * 3, this.y + this.size * 3);
          ctx.lineTo(this.x + this.size * 3, this.y - this.size * 3);
          
          ctx.stroke();
          ctx.restore();

          const glowGradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 6
          );
          glowGradient.addColorStop(0, `rgba(${this.color}, ${this.brightness * 0.2})`);
          glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = glowGradient;
          ctx.fill();
        }
      }
    }

    const smallStars = Array.from({ length: 400 }, () => new Star(canvas.width, canvas.height));
    const mediumStars = Array.from({ length: 150 }, () => {
      const star = new Star(canvas.width, canvas.height);
      star.size *= 1.5;
      return star;
    });
    const largeStars = Array.from({ length: 50 }, () => {
      const star = new Star(canvas.width, canvas.height);
      star.size *= 2;
      star.maxBrightness = Math.random() * 0.2 + 0.8;
      return star;
    });

    let animationTime = 0;
    const animate = () => {
      if (!ctx || !canvas) return;

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#000510');
      gradient.addColorStop(0.5, '#001025');
      gradient.addColorStop(1, '#000510');
      
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      [...smallStars, ...mediumStars, ...largeStars].forEach(star => {
        star.update(animationTime);
        star.draw(ctx);
      });

      animationTime += 1;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
    />
  );
} 