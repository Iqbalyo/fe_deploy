import { extendTheme } from '@mui/joy/styles';

// Extend theme with light and dark mode
const customTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#0079B1',
        },
        neutral: {
          main: '#64748B',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#8EC5FC',
        },
        neutral: {
          main: '#94A3B8',
        },
        background: {
          body: '#121212',
        },
      },
    },
  },
  defaultColorScheme: 'light', // Set default to 'light' or 'dark'
});

export default customTheme;
