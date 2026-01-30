import type { ReactNode } from 'react';

import { useMemo, useState, useCallback, createContext, useLayoutEffect } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { createTheme } from 'src/theme/create-theme';

// ----------------------------------------------------------------------

export type ThemMode = 'light' | 'dark';
export type ThemeDirection = 'ltr' | 'rtl';
export type NavLayout = 'vertical' | 'horizontal' | 'mini';
export type NavColor = 'integrate' | 'apparent';

export type ColorPreset = {
  name: string;
  primary: string;
};

const PRESETS: ColorPreset[] = [
  { name: 'Default', primary: '#00A76F' },
  { name: 'Cyan', primary: '#00B8D9' },
  { name: 'Purple', primary: '#7635DC' },
  { name: 'Blue', primary: '#2065D1' },
  { name: 'Orange', primary: '#FDA92D' },
  { name: 'Red', primary: '#FF5630' },
];

// ----------------------------------------------------------------------

export type SettingsContextValue = {
  mode: ThemMode;
  direction: ThemeDirection;
  navLayout: NavLayout;
  navColor: NavColor;
  selectedPreset: number;
  onChangeMode: (mode: ThemMode) => void;
  onChangeDirection: (direction: ThemeDirection) => void;
  onChangeNavLayout: (layout: NavLayout) => void;
  onChangeNavColor: (color: NavColor) => void;
  onChangePreset: (index: number) => void;
  onReset: () => void;
};

export const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

// ----------------------------------------------------------------------

type SettingsProviderProps = {
  children: ReactNode;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'minimal-settings';

const defaultSettings: SettingsContextValue = {
  mode: 'light',
  direction: 'ltr',
  navLayout: 'vertical',
  navColor: 'integrate',
  selectedPreset: 0,
  onChangeMode: () => {},
  onChangeDirection: () => {},
  onChangeNavLayout: () => {},
  onChangeNavColor: () => {},
  onChangePreset: () => {},
  onReset: () => {},
};

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [state, setState] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultSettings;
  });

  const [mode, setMode] = useState<ThemMode>(state.mode);
  const [direction, setDirection] = useState<ThemeDirection>(state.direction);
  const [navLayout, setNavLayout] = useState<NavLayout>(state.navLayout);
  const [navColor, setNavColor] = useState<NavColor>(state.navColor);
  const [selectedPreset, setSelectedPreset] = useState(state.selectedPreset);

  useLayoutEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        mode,
        direction,
        navLayout,
        navColor,
        selectedPreset,
      })
    );
  }, [mode, direction, navLayout, navColor, selectedPreset]);

  const onChangeMode = useCallback((newMode: ThemMode) => {
    setMode(newMode);
  }, []);

  const onChangeDirection = useCallback((newDirection: ThemeDirection) => {
    setDirection(newDirection);
    document.dir = newDirection;
  }, []);

  const onChangeNavLayout = useCallback((layout: NavLayout) => {
    setNavLayout(layout);
  }, []);

  const onChangeNavColor = useCallback((color: NavColor) => {
    setNavColor(color);
  }, []);

  const onChangePreset = useCallback((index: number) => {
    setSelectedPreset(index);
  }, []);

  const onReset = useCallback(() => {
    setMode('light');
    setDirection('ltr');
    setNavLayout('vertical');
    setNavColor('integrate');
    setSelectedPreset(0);
    document.dir = 'ltr';
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        themeOverrides: {
          colorSchemes: {
            light: {
              palette: {
                primary: {
                  main: PRESETS[selectedPreset].primary,
                },
              },
            },
            dark: {
              palette: {
                primary: {
                  main: PRESETS[selectedPreset].primary,
                },
              },
            },
          },
          direction,
        },
      }),
    [direction, selectedPreset]
  );

  // Switch color scheme when mode changes
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-color-scheme', mode);
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      direction,
      navLayout,
      navColor,
      selectedPreset,
      onChangeMode,
      onChangeDirection,
      onChangeNavLayout,
      onChangeNavColor,
      onChangePreset,
      onReset,
    }),
    [
      mode,
      direction,
      navLayout,
      navColor,
      selectedPreset,
      onChangeMode,
      onChangeDirection,
      onChangeNavLayout,
      onChangeNavColor,
      onChangePreset,
      onReset,
    ]
  );

  return (
    <SettingsContext.Provider value={value}>
      <MuiThemeProvider theme={theme} defaultMode={mode}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </SettingsContext.Provider>
  );
}

// Hook to use settings
export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}

// Make useContext available
import { useContext } from 'react';
