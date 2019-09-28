import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Roboto, "Droid Sans", "Yu Gothic", YuGothic, "\\30E1\\30A4\\30EA\\30AA", Meiryo, "\\30D2\\30E9\\30AE\\30CE\\89D2\\30B4 ProN W3", "Hiragino Kaku Gothic ProN", "\\FF2D\\FF33 \\FF30\\30B4\\30B7\\30C3\\30AF", sans-serif',
    textTransform: 'none',
    h1: {
      fontWeight: 'bold',
      fontSize: '34px',
      lineHeight: 1.3,
    },
    h2: {
      fontWeight: 'bold',
      fontSize: '22px',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 'bold',
      fontSize: '17px',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: 1.3,
    },
    h5: {
      fontWeight: '500',
      fontSize: '14px',
      lineHeight: 1.3,
    },
    h6: {
      fontWeight: 'bold',
      fontSize: '12px',
      lineHeight: 1.3,
    },
    body1: {
      fontSize: '16px',
      lineHeight: 1.3,
    },
    body2: {
      fontSize: '13px',
      lineHeight: 1.3,
    },
  },
  breakpoints: {
    values: {
      md: 768,
      lg: 1024,
    },
  },
});
