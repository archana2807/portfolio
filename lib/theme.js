'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',

    primary: {
      main: '#00E5FF',
      light: '#7CFFFF',
      dark: '#00A3B8',
      contrastText: '#001018',
    },

    secondary: {
      main: '#FF6B6B',
      light: '#FF9B9B',
      dark: '#D64545',
      contrastText: '#ffffff',
    },

    background: {
      default: '#050A12',   // deeper premium black-blue
      paper: '#0A1220',     // card surface
    },

    text: {
      primary: '#EAF2FF',
      secondary: '#9AB0C8',
      disabled: '#5C6F85',
    },

    divider: 'rgba(0,229,255,0.08)',
  },

  typography: {
    fontFamily: 'Inter, Arial, sans-serif',

    h1: {
      fontWeight: 800,
      letterSpacing: '-0.03em',
    },
    h2: {
      fontWeight: 750,
      letterSpacing: '-0.02em',
    },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 650 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },

    body1: {
      lineHeight: 1.8,
      fontSize: '1rem',
    },

    body2: {
      lineHeight: 1.7,
      fontSize: '0.92rem',
    },

    button: {
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'none',
    },
  },

  shape: {
    borderRadius: 14,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');

        html {
          scroll-behavior: smooth;
        }

        body {
          background: #050A12;
          color: #EAF2FF;
        }

        * {
          box-sizing: border-box;
        }

        /* Scrollbar (modern minimal) */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #050A12;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(0,229,255,0.25);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0,229,255,0.5);
        }

        ::selection {
          background: rgba(0,229,255,0.25);
        }
      `,
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 22px',
          transition: '0.25s ease',
        },

        containedPrimary: {
          background: 'linear-gradient(135deg, #00E5FF 0%, #0099CC 100%)',
          color: '#001018',
          boxShadow: '0 8px 30px rgba(0,229,255,0.25)',

          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 40px rgba(0,229,255,0.35)',
          },
        },

        outlinedPrimary: {
          borderColor: 'rgba(0,229,255,0.5)',
          color: '#00E5FF',

          '&:hover': {
            background: 'rgba(0,229,255,0.08)',
            borderColor: '#00E5FF',
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(10,18,32,0.75)',
          border: '1px solid rgba(0,229,255,0.08)',
          backdropFilter: 'blur(16px)',
          transition: '0.3s ease',
          boxShadow: '0 10px 40px rgba(0,0,0,0.35)',

          '&:hover': {
            transform: 'translateY(-6px)',
            border: '1px solid rgba(0,229,255,0.25)',
            boxShadow: '0 20px 60px rgba(0,229,255,0.12)',
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(10,18,32,0.75)',
          backdropFilter: 'blur(12px)',
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          background: 'rgba(0,229,255,0.08)',
          border: '1px solid rgba(0,229,255,0.2)',
          color: '#7CEBFF',
          fontWeight: 500,
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'rgba(10,18,32,0.5)',
            borderRadius: 10,

            '& fieldset': {
              borderColor: 'rgba(0,229,255,0.15)',
            },

            '&:hover fieldset': {
              borderColor: 'rgba(0,229,255,0.4)',
            },

            '&.Mui-focused fieldset': {
              borderColor: '#00E5FF',
            },
          },
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 6,
          borderRadius: 10,
          backgroundColor: 'rgba(0,229,255,0.08)',
        },
        bar: {
          borderRadius: 10,
          background: 'linear-gradient(90deg, #00E5FF, #0099CC)',
        },
      },
    },
  },
});

export default theme;