'use client';

import { useEffect, useRef } from 'react';

export default function StarryBackground() {
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

    // 星星类
    class Star {
      x: number;
      y: number;
      size: number;
      brightness: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 1;
        this.brightness = Math.random() * 0.3 + 0.1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
        ctx.fill();
      }

      twinkle() {
        this.brightness = (Math.sin(Date.now() / 3000) * 0.1 + 0.2);
      }
    }

    // 极光类
    class Aurora {
      private readonly canvasWidth: number;
      private readonly canvasHeight: number;
      points: { x: number; y: number }[];
      width: number;
      color: string;
      opacity: number;

      constructor(canvasWidth: number, canvasHeight: number, startY: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.points = [];
        this.width = Math.random() * 200 + 100;
        this.opacity = Math.random() * 0.05 + 0.02;
        
        // 使用更自然的青绿色调
        const hue = Math.random() * 40 + 140; // 140-180 范围
        const saturation = Math.random() * 20 + 80; // 80-100 范围
        const lightness = Math.random() * 20 + 60; // 60-80 范围
        this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${this.opacity})`;

        this.initPoints(startY);
      }

      private initPoints(startY: number) {
        const numPoints = 20;
        for (let i = 0; i < numPoints; i++) {
          const x = (i / (numPoints - 1)) * this.canvasWidth;
          const variance = Math.random() * 100 - 50;
          const y = startY + variance;
          this.points.push({ x, y });
        }
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        ctx.save();
        ctx.beginPath();
        
        // 更新点的位置，创造波动效果
        this.points.forEach((point, i) => {
          point.y += Math.sin(time * 0.001 + i * 0.2) * 0.5;
        });

        // 绘制平滑曲线
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 0; i < this.points.length - 1; i++) {
          const xc = (this.points[i].x + this.points[i + 1].x) / 2;
          const yc = (this.points[i].y + this.points[i + 1].y) / 2;
          ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
        }

        // 创建渐变
        const gradient = ctx.createLinearGradient(0, 0, 0, this.canvasHeight);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');

        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalCompositeOperation = 'screen';
        ctx.filter = 'blur(100px)';
        ctx.stroke();

        // 添加额外的模糊层，创造更柔和的效果
        ctx.filter = 'blur(200px)';
        ctx.globalAlpha = 0.5;
        ctx.stroke();

        ctx.restore();
      }
    }

    // 创建深色渐变背景
    const createBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#001');
      gradient.addColorStop(0.5, '#013');
      gradient.addColorStop(1, '#024');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // 创建星星和多层极光
    const stars = Array.from({ length: 300 }, () => new Star(canvas.width, canvas.height));
    const auroras = [
      ...Array.from({ length: 2 }, () => new Aurora(canvas.width, canvas.height, canvas.height * 0.3)),
      ...Array.from({ length: 3 }, () => new Aurora(canvas.width, canvas.height, canvas.height * 0.5)),
      ...Array.from({ length: 2 }, () => new Aurora(canvas.width, canvas.height, canvas.height * 0.7))
    ];

    let animationTime = 0;
    const animate = () => {
      if (!ctx || !canvas) return;

      // 清除画布并绘制背景
      createBackground();

      // 绘制星星
      stars.forEach(star => {
        star.twinkle();
        star.draw(ctx);
      });

      // 绘制极光
      auroras.forEach(aurora => {
        aurora.draw(ctx, animationTime);
      });

      animationTime += 16;
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