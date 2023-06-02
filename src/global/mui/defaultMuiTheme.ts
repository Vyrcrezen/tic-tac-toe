import { createTheme } from "@mui/material/styles";

const getCssVar = (name: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(name);
};

const defaultMuiTheme = createTheme({
  palette: {
    primary: {
      main: `${getCssVar("--vy-sys-color-primary")}`,
    },

    text: {
      primary: `${getCssVar("--vy-sys-color-on-primary")}`,
    },
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        standard: {
          color: `${getCssVar("--vy-sys-color-on-secondary")}`,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: `${getCssVar("--vy-sys-color-primary")}`,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: `${getCssVar("--vy-sys-color-on-primary")}`,
        },
      },
    },
  },
});

export default defaultMuiTheme;
