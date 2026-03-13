// @project
import { ThemeMode } from '@/config';

/***************************  LFT-WORKS - BRAND PALETTE  ***************************/

export default function palette(mode) {
  const textPrimary = '#1A1C1E'; // on surface
  const textSecondary = '#42474E'; // on surface variant
  const divider = '#C2C7CE'; // outline variant
  const background = '#FFF';

  const textPrimaryDark = '#E2E2E5'; // on surface
  const textSecondaryDark = '#C2C7CE'; // on surface variant
  const dividerDark = '#42474E'; // outline variant
  const backgroundDark = '#0A1628'; // LFT-Works brand dark (deep navy)

  const lightPalette = {
    primary: {
      lighter: '#B8D4E8', // lighter blue variant
      light: '#4A9AD9', // light blue
      main: '#2B6CB0', // industrial blue (main highlight color for LFT-Works)
      dark: '#1A4A7A', // darker variant (on hover or active state)
      darker: '#0D2B4A' // darkest variant
    },
    secondary: {
      lighter: '#D6D8DC', // lighter steel grey
      light: '#A0A4AB', // light steel grey
      main: '#6B7280', // steel grey (from logo triangle)
      dark: '#4B5058', // darker steel grey
      darker: '#2D3138' // darkest steel grey
    },
    grey: {
      50: '#F9F9FC', // AI/neutral/98 - surface / surface bright
      100: '#F1F4F9', // AI/neutral/96 - surface container low
      200: '#EBEEF3', // AI/neutral/94 - surface container
      300: '#E6E8EE', // AI/neutral/92 - surface container high
      400: '#E2E2E5', // AI/neutral/90 - surface container highest
      500: '#D7DADF', // AI/neutral/87 - surface dim
      600: divider, // AI/neutral variant/80 - outline variant
      700: '#72787E', // AI/neutral variant/50 - outline
      800: textSecondary, // AI/neutral variant/30 - on surface variant
      900: textPrimary // AI/neutral/10 - on surface
    },
    text: {
      primary: textPrimary, // AI/neutral/10 - on surface
      secondary: textSecondary // AI/neutral variant/30 - on surface variant
    },
    divider,
    background: {
      default: background
    }
  };

  const darkPalette = {
    primary: {
      lighter: '#0D2B4A', // darker variant
      light: '#0A1628', // LFT-Works brand dark
      main: '#4A9AD9', // medium blue
      dark: '#6BB3E8', // lighter variant
      darker: '#8ECBF5' // lightest variant
    },
    secondary: {
      lighter: '#3D4048', // darker grey variant
      light: '#9DA1A8', // light steel grey for dark mode
      main: '#B5B9C0', // steel grey lighter for dark mode
      dark: '#D0D3D8', // lighter grey
      darker: '#EBEDF0' // lightest grey
    },
    grey: {
      50: '#0E1520', // AI/neutral/06 - surface / surface dim
      100: '#1A1C1E', // AI/neutral/10 - surface container low
      200: '#1C2024', // AI/neutral/12 - surface container
      300: '#272A2E', // AI/neutral/17 - surface container high
      400: '#313539', // AI/neutral/22 - surface container highest
      500: backgroundDark, // AI/neutral/04 - surface container lowest
      600: dividerDark, // AI/neutral variant/30 - outline variant
      700: '#8C9198', // AI/neutral variant/60 - outline
      800: textSecondaryDark, // AI/neutral variant/80 - on surface variant
      900: textPrimaryDark // AI/neutral/90 - on surface
    },
    text: {
      primary: textPrimaryDark, // AI/neutral/90 - on surface
      secondary: textSecondaryDark // AI/neutral variant/80 - on surface variant
    },
    divider: dividerDark,
    background: {
      default: backgroundDark,
      paper: backgroundDark
    }
  };

  return {
    mode,
    ...(mode === ThemeMode.DARK ? darkPalette : lightPalette)
  };
}
