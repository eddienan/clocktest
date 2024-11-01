export type FontId = 
  | 'default' 
  | 'anton'
  | 'bangers'
  | 'guanzhi'
  | 'lemon'
  | 'luckiest'
  | 'shrikhand'
  | 'swiss'
  | 'custom';

export const fonts = [
  {
    id: 'default' as const,
    name: '默认字体',
    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    path: null,
    defaultBackground: null
  },
  {
    id: 'anton' as const,
    name: 'Anton',
    family: 'Anton',
    path: '/fonts/default/Anton-Regular',
    defaultBackground: '/images/backgrounds/refzeyen1_Evening_sunset_27c7e7a1-b5ec-44e3-8a93-aeeed4123028.jpg'
  },
  {
    id: 'bangers' as const,
    name: 'Bangers',
    family: 'Bangers',
    path: '/fonts/default/Bangers-Regular',
    defaultBackground: null
  },
  {
    id: 'guanzhi' as const,
    name: '像素',
    family: 'GuanZhi',
    path: '/fonts/default/GuanZhi-8px',
    defaultBackground: '/images/backgrounds/像素.jpg'
  },
  {
    id: 'lemon' as const,
    name: 'Lemon',
    family: 'Lemon',
    path: '/fonts/default/Lemon-Regular',
    defaultBackground: null
  },
  {
    id: 'luckiest' as const,
    name: 'LuckiestGuy',
    family: 'LuckiestGuy',
    path: '/fonts/default/LuckiestGuy-Regular',
    defaultBackground: null
  },
  {
    id: 'shrikhand' as const,
    name: 'Shrikhand',
    family: 'Shrikhand',
    path: '/fonts/default/Shrikhand-Regular',
    defaultBackground: null
  },
  {
    id: 'swiss' as const,
    name: 'Swiss',
    family: 'Swiss',
    path: '/fonts/default/Swis721 BlkCn BT Black',
    defaultBackground: null
  }
]; 