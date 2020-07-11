import React, { createContext, useContext, FC, useState } from 'react';

import { getCssPropertyValue } from './utils';

const colors = {
  background: getCssPropertyValue('--background'),
  fg0: getCssPropertyValue('--fg0'),
  fg1: getCssPropertyValue('--fg1'),
  text: getCssPropertyValue('--text'),
  accent0: getCssPropertyValue('--accent0'),
  accent4: getCssPropertyValue('--accent4'),
  important0: getCssPropertyValue('--important0'),
  important4: getCssPropertyValue('--important4'),
  success0: getCssPropertyValue('--success0'),
};

const vars = {
  backdropFilter: getCssPropertyValue('--backdropFilter'),
};

export enum ThemeMode {
  DARK_GPU = 'darkGPU',
  DARK = 'dark',
}

export const themes = {
  modes: {
    [ThemeMode.DARK]: {
      mode: ThemeMode.DARK,
      colors,
      vars,
    },
    [ThemeMode.DARK_GPU]: {
      mode: ThemeMode.DARK_GPU,
      colors,
      vars,
    },
  },
};

export interface ActiveTheme {
  mode: ThemeMode;
  colors: typeof colors;
  vars: typeof vars;
}

interface ThemeContext {
  theme: ActiveTheme;
  setTheme: ((themeMode: ThemeMode) => void) | null;
}

const defaultActiveTheme: ActiveTheme = themes.modes.darkGPU;

export const themeContext = createContext<ThemeContext>({
  theme: defaultActiveTheme,
  setTheme: null,
});

const useThemeController = (defaultTheme: ActiveTheme | ThemeMode) => {
  const [theme, setThemeState] = useState(
    typeof defaultTheme === 'string' ? themes.modes[defaultTheme] : defaultTheme
  );

  const setTheme = (themeMode: ThemeMode) =>
    setThemeState(themes.modes[themeMode]);

  return {
    theme,
    setTheme,
  };
};

export const Provider: FC<{ initialThemeMode: ThemeMode }> = ({
  children,
  initialThemeMode,
}) => {
  const value = useThemeController(initialThemeMode);

  return (
    <themeContext.Provider value={value}>{children}</themeContext.Provider>
  );
};
