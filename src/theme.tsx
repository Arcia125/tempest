import React, { createContext, FC, useState } from 'react';
import { getCssPropertyValue } from './utils';

const initThemeProps = (propNames: string[]): Record<string, string> => {
  return propNames.reduce((propsAcc, propName) => {
    const cssPropName = `--${propName}`;
    const cssPropValue = getCssPropertyValue(cssPropName);
    if (!cssPropValue)
      console.warn(`css property name ${cssPropName} is falsy`);
    return { ...propsAcc, [propName]: cssPropValue };
  }, {});
};

const colors = initThemeProps([
  'background',
  'fg0',
  'fg1',
  'text',
  'accent0',
  'accent4',
  'important0',
  'important4',
  'success0',
]);

const vars = initThemeProps(['backdropFilter', 'appWidth', 'appMaxWidth']);

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

export const defaultActiveTheme: ActiveTheme = themes.modes.darkGPU;

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
