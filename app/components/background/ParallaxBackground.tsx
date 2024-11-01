'use client';

import { useEffect, useRef, useState } from 'react';

interface ParallaxBackgroundProps {
  imageUrl: string;
}

export default function ParallaxBackground({ imageUrl }: ParallaxBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0, scale: 1.1 });
  const [isLoaded, setIsLoaded] = useState(false);
  const targetPosition = useRef({ x: 0, y: 0, scale: 1.1 });
  const animationFrameRef = useRef<number>();
  const lastUpdateTime = useRef(Date.now());

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { width, height } = containerRef.current.getBoundingClientRect();
      const centerX = width / 2;
      const centerY = height / 2;
      
      // 计算鼠标位置相对于中心点的偏移，使用二次函数使移动更平滑
      const deltaX = (e.clientX - centerX) / width;
      const deltaY = (e.clientY - centerY) / height;
      
      // 使用平方根计算距离，使缩放更自然
      const distance = Math.sqrt(Math.abs(deltaX * deltaY));
      const scale = 1.1 + (distance * 0.08); // 减小缩放幅度，使变化更细腻

      // 使用缓动函数使移动更平滑
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedX = easeOutQuad(Math.abs(deltaX)) * Math.sign(deltaX);
      const easedY = easeOutQuad(Math.abs(deltaY)) * Math.sign(deltaY);

      // 更新目标位置
      targetPosition.current = {
        x: easedX * 25, // 减小移动范围
        y: easedY * 25,
        scale
      };
    };

    // 使用 RAF 和时间差来平滑动画
    const animate = () => {
      const now = Date.now();
      const deltaTime = (now - lastUpdateTime.current) / 16; // 标准化为 60fps
      lastUpdateTime.current = now;

      // 使用更平滑的弹性动画
      const spring = 0.05; // 减小弹性系数，使动画更平滑
      const friction = 0.95; // 添加摩擦力，减少振动

      const dx = (targetPosition.current.x - position.x) * spring * deltaTime;
      const dy = (targetPosition.current.y - position.y) * spring * deltaTime;
      const dScale = (targetPosition.current.scale - position.scale) * spring * deltaTime;

      setPosition(prev => ({
        x: prev.x + dx * friction,
        y: prev.y + dy * friction,
        scale: prev.scale + dScale * friction
      }));

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // 添加平滑的陀螺仪支持
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!e.beta || !e.gamma) return;

      const x = (e.gamma / 90) * 25;
      const y = (e.beta / 180) * 25;
      const distance = Math.sqrt(x * x + y * y) / 25;
      const scale = 1.1 + (distance * 0.08);

      targetPosition.current = { x, y, scale };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('deviceorientation', handleDeviceOrientation);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [position]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden"
    >
      <div 
        className={`absolute inset-[-30px] transition-opacity duration-1000 ease-out will-change-transform ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${position.scale})`,
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.8)',
          transition: 'filter 0.3s ease-out',
        }}
        onMouseEnter={() => {
          targetPosition.current.scale = 1.12; // 减小鼠标进入时的缩放幅度
        }}
        onMouseLeave={() => {
          targetPosition.current = { x: 0, y: 0, scale: 1.1 };
        }}
      >
        <div className="absolute inset-0 bg-black/30 transition-opacity duration-300" />
      </div>
      <img 
        src={imageUrl} 
        alt="" 
        className="hidden"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}