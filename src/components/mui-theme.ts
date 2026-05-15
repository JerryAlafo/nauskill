"use client";

import { createTheme } from "@mui/material/styles";

const ESCN_CYAN = "#0891B2"; // cyan-600
const ESCN_CYAN_DARK_MODE = "#22D3EE"; // cyan-400 — mais claro para contraste no dark
const GOLD = "#C9A227";

const FONT_STACK =
  "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

export const muiLightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: ESCN_CYAN,
      light: "#22D3EE",
      dark: "#0E7490",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: GOLD,
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0F1F2A",
      secondary: "#54616B",
    },
  },
  typography: {
    fontFamily: FONT_STACK,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  shape: { borderRadius: 8 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: "transparent" },
      },
    },
  },
});

export const muiDarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: ESCN_CYAN_DARK_MODE,
      light: "#67E8F9",
      dark: "#0891B2",
      contrastText: "#0F1F2A",
    },
    secondary: {
      main: GOLD,
      contrastText: "#0F1F2A",
    },
    background: {
      default: "#0B1418",
      paper: "#12202A",
    },
    text: {
      primary: "#E6F1F5",
      secondary: "#9CB1BD",
    },
  },
  typography: {
    fontFamily: FONT_STACK,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  shape: { borderRadius: 8 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: "transparent" },
      },
    },
  },
});
