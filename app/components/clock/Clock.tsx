'use client';

import { useState, useEffect, useRef } from 'react';
import type { TimeDisplay } from '@/app/types/clock';
import StarryBackground from '../background/StarryBackground';
import StarrySkyBackground from '../background/StarrySkyBackground';
import ParallaxBackground from '../background/ParallaxBackground';
import { fonts, FontId } from '@/app/config/fonts';

const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
const backgrounds = [
  { id: 'starry', name: '星空', component: StarrySkyBackground },
  { id: 'aurora', name: '极光', component: StarryBackground },
  { id: 'custom', name: '自定义', component: null },
  { id: 'black', name: '纯黑', component: null },
] as const;

export default function Clock() {
  const [time, setTime] = useState<TimeDisplay>({
    hours: '00',
    minutes: '00',
    seconds: '00',
    date: '',
    weekday: '',
  });
  const [is24Hour, setIs24Hour] = useState(true);
  const [currentBg, setCurrentBg] = useState(0);
  const [customBgUrl, setCustomBgUrl] = useState<string>('');
  const [currentFont, setCurrentFont] = useState<FontId>('default');
  const [customFont, setCustomFont] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fontInputRef = useRef<HTMLInputElement>(null);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      
      if (!is24Hour) {
        hours = hours % 12 || 12;
      }

      setTime({
        hours: hours.toString().padStart(2, '0'),
        minutes: now.getMinutes().toString().padStart(2, '0'),
        seconds: now.getSeconds().toString().padStart(2, '0'),
        date: `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`,
        weekday: `星期${weekDays[now.getDay()]}`,
      });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [is24Hour]);

  useEffect(() => {
    if (currentFont === 'default') {
      setFontLoaded(true);
      return;
    }

    const font = fonts.find(f => f.id === currentFont);
    if (font && font.path) {
      const fontUrl = `${font.path}.ttf`;
      const testFont = new FontFace(font.family, `url(${fontUrl})`);
      
      testFont.load().then(() => {
        document.fonts.add(testFont);
        setFontLoaded(true);
      }).catch((err) => {
        console.error('Font loading failed:', err);
        setFontLoaded(true);
      });
    }
  }, [currentFont]);

  const handleBackgroundChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = backgrounds.findIndex(bg => bg.id === event.target.value);
    setCurrentBg(index >= 0 ? index : 0);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomBgUrl(url);
      setCurrentBg(backgrounds.findIndex(bg => bg.id === 'custom'));
    }
  };

  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFont = event.target.value as FontId;
    setCurrentFont(newFont);

    // 检查并应用默认背景
    const font = fonts.find(f => f.id === newFont);
    if (font?.defaultBackground) {
      setCustomBgUrl(font.defaultBackground);
      setCurrentBg(backgrounds.findIndex(bg => bg.id === 'custom'));
    }
  };

  const handleFontUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomFont(url);
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-family: 'CustomFont';
          src: url('${url}') format('truetype');
        }
      `;
      document.head.appendChild(style);
      setCurrentFont('custom');
    }
  };

  const getCurrentFontFamily = () => {
    if (currentFont === 'custom' && customFont) {
      return 'CustomFont';
    }
    const font = fonts.find(f => f.id === currentFont);
    return font ? font.family : fonts[0].family;
  };

  const getLetterSpacing = () => {
    if (currentFont === 'anton') return '0.4em';
    if (currentFont === 'bangers') return '0.4em';
    return 'normal';
  };

  const CurrentBackground = backgrounds[currentBg].component;
  const isCustomBg = backgrounds[currentBg].id === 'custom';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black relative overflow-hidden">
      {/* 背景 */}
      {CurrentBackground && <CurrentBackground />}
      {isCustomBg && customBgUrl && (
        <ParallaxBackground imageUrl={customBgUrl} />
      )}
      
      {/* 控制按钮 - 移到左下角并水平排列 */}
      <div className="fixed bottom-8 left-8 z-20 flex flex-row gap-4">
        {/* 12/24小时制切换按钮 */}

        
        {/* 背景设置 */}
        <div className="relative group">
          <select
            value={backgrounds[currentBg].id}
            onChange={handleBackgroundChange}
            className="px-4 py-2 bg-zinc-800/50 backdrop-blur-sm text-white/30 rounded-lg 
                       hover:bg-zinc-700/50 hover:text-white/90 transition-all 
                       appearance-none cursor-pointer w-24"
          >
            <option value="" disabled>背景</option>
            {backgrounds.map(bg => (
              <option key={bg.id} value={bg.id}>
                {bg.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute right-0 top-0 h-full px-2 
                       text-white/30 hover:text-white/90 transition-all"
          >
            +
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
        
        {/* 字体设置 */}
        <div className="relative group">
          <select
            value={currentFont}
            onChange={handleFontChange}
            className="px-4 py-2 bg-zinc-800/50 backdrop-blur-sm text-white/30 rounded-lg 
                       hover:bg-zinc-700/50 hover:text-white/90 transition-all 
                       appearance-none cursor-pointer w-24"
          >
            <option value="" disabled>字体</option>
            {fonts.map(font => (
              <option key={font.id} value={font.id}>
                {font.name}
              </option>
            ))}
            {customFont && <option value="custom">自定义</option>}
          </select>
          <button
            onClick={() => fontInputRef.current?.click()}
            className="absolute right-0 top-0 h-full px-2 
                       text-white/30 hover:text-white/90 transition-all"
          >
            +
          </button>
          <input
            ref={fontInputRef}
            type="file"
            accept=".ttf,.woff,.woff2"
            onChange={handleFontUpload}
            className="hidden"
          />
        </div>
      </div>
      
      {/* 日期和时间显示部分 */}
      <div className="absolute top-8 right-8 text-white/70 text-right z-10">
        <div className="text-6xl font-normal mb-4">{time.date}</div>
        <div className="text-6xl font-normal">{time.weekday}</div>
      </div>
      
      {/* 时间显示 */}
      <div className="flex items-center justify-center z-10">
        <div 
          className="flex items-baseline relative"
          style={{ 
            fontFamily: getCurrentFontFamily(),
            letterSpacing: getLetterSpacing(),
            transition: 'font-family 0.3s ease, letter-spacing 0.3s ease'
          }}
        >
          <div className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl p-12">
            <span className="text-white/70 text-[360px] font-bold leading-none">{time.hours}</span>
          </div>
          <span className="text-white/70 text-[360px] font-bold mx-8">:</span>
          <div className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl p-12">
            <span className="text-white/70 text-[360px] font-bold leading-none">{time.minutes}</span>
          </div>
          {/* 秒数显示 */}
          <div className="absolute bottom-4 right-0 bg-zinc-900/30 backdrop-blur-sm rounded-lg p-2">
            <span className="text-white/70 text-[36px] font-bold leading-none">{time.seconds}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 