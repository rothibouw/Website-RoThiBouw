// @project
import { ThemeMode } from '@/config';

/***************************  ROTHIBOUW - BRAND PALETTE  ***************************/

export default function palette(mode) {
  const textPrimary = '#1A1C1E'; // on surface
  const textSecondary = '#42474E'; // on surface variant
  const divider = '#C2C7CE'; // outline variant
  const background = '#FFF';

  const textPrimaryDark = '#E2E2E5'; // on surface
  const textSecondaryDark = '#C2C7CE'; // on surface variant
  const dividerDark = '#42474E'; // outline variant
  const backgroundDark = '#051519'; // RoThi Bouw brand dark

  const lightPalette = {
    primary: {
      lighter: '#B3D4DC', // lighter teal variant
      light: '#5AA2B5', // light teal
      main: '#4a4e52', // bright teal (This is the main highlight color for RoThi Bouw)
      dark: '#131414', // darker variant (On hover or active state)
      darker: '#051519' // darkest variant (RoThi Bouw brand dark)
    },
    secondary: {
      lighter: '#D9D9D9', // lighter grey
      light: '#ADADAD', // light grey
      main: '#8c8a8a', // RoThi Bouw brand grey
      dark: '#5A5858', // darker grey
      darker: '#2E2D2D' // darkest grey
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
      lighter: '#030E11', // darker variant
      light: '#051519', // RoThi Bouw brand dark
      main: '#4A8B9E', // medium teal
      dark: '#5AA2B5', // lighter variant
      darker: '#7BC4D8' // lightest variant
    },
    secondary: {
      lighter: '#3D3C3C', // darker grey variant
      light: '#A5A3A3', // light grey for dark mode
      main: '#BFBDBD', // RoThi Bouw grey lighter for dark mode
      dark: '#D9D9D9', // lighter grey
      darker: '#F0F0F0' // lightest grey
    },
    grey: {
      50: '#101418', // AI/neutral/06 - surface / surface dim
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
