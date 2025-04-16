import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Bricolage Grotesque", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: '"Bricolage Grotesque", sans-serif',
        },
      },
    },
  },
});

export default theme;
