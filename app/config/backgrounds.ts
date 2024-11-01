export type BackgroundId = 
  | 'aurora-1' 
  | 'aurora-2' 
  | 'aurora-3'
  | 'starry-1'
  | 'starry-2'
  | 'starry-3'
  | 'gradient-1'
  | 'gradient-2'
  | 'gradient-3'
  | 'custom';

export const backgrounds = [
  {
    id: 'aurora-1' as const,
    name: '极光-蓝绿',
    type: 'image',
    path: '/images/backgrounds/aurora/aurora-1.jpg'
  },
  {
    id: 'aurora-2' as const,
    name: '极光-紫色',
    type: 'image',
    path: '/images/backgrounds/aurora/aurora-2.jpg'
  },
  {
    id: 'aurora-3' as const,
    name: '极光-绿色',
    type: 'image',
    path: '/images/backgrounds/aurora/aurora-3.jpg'
  },
  {
    id: 'starry-1' as const,
    name: '星空-深蓝',
    type: 'image',
    path: '/images/backgrounds/starry/starry-1.jpg'
  },
  {
    id: 'starry-2' as const,
    name: '星空-银河',
    type: 'image',
    path: '/images/backgrounds/starry/starry-2.jpg'
  },
  {
    id: 'starry-3' as const,
    name: '星空-繁星',
    type: 'image',
    path: '/images/backgrounds/starry/starry-3.jpg'
  },
  {
    id: 'gradient-1' as const,
    name: '渐变-深邃',
    type: 'image',
    path: '/images/backgrounds/gradient/gradient-1.jpg'
  },
  {
    id: 'gradient-2' as const,
    name: '渐变-暗夜',
    type: 'image',
    path: '/images/backgrounds/gradient/gradient-2.jpg'
  },
  {
    id: 'gradient-3' as const,
    name: '渐变-黎明',
    type: 'image',
    path: '/images/backgrounds/gradient/gradient-3.jpg'
  }
]; 