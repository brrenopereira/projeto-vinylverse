import { Dimensions, Platform } from 'react-native';

const { width: DW, height: DH } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

// Na web usa largura fixa de 390px (iPhone 14), no mobile usa a tela real
export const SW = isWeb ? 390 : DW;
export const SH = isWeb ? 844 : DH;

export const C = {
  black:    '#080808',
  s1:       '#101010',
  s2:       '#181818',
  s3:       '#222222',
  s4:       '#2C2C2C',
  border:   'rgba(255,255,255,0.07)',
  border2:  'rgba(255,255,255,0.12)',
  gold:     '#C8A96E',
  goldL:    '#E0C38C',
  goldBg:   'rgba(200,169,110,0.12)',
  cream:    '#F0EBE0',
  text:     '#D8D0C0',
  text2:    '#908070',
  text3:    '#504840',
  red:      '#C44040',
  green:    '#3A8A4A',
};

export const R = { sm: 4, md: 8, lg: 12, xl: 16, xxl: 24, full: 999 };
export const CARD_W = SW * 0.36;
