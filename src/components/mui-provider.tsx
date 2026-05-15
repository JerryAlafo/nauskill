"use client";

import * as React from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { useTheme as useNextTheme } from "next-themes";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { muiLightTheme, muiDarkTheme } from "./mui-theme";

export function MuiProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useNextTheme();
  const theme = resolvedTheme === "dark" ? muiDarkTheme : muiLightTheme;

  return (
    <AppRouterCacheProvider options={{ key: "mui" }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </AppRouterCacheProvider>
  );
}
