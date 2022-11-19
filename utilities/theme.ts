import {
  BrandVariants,
  createDarkTheme,
  createLightTheme,
  Theme,
} from '@fluentui/react-components';
import * as React from 'react';
import ThemeContext from '../contexts/Theme';
import { getConfig, setConfig } from './userConfig';

const brandColors: BrandVariants = {
  10: '#071f36',
  20: '#092948',
  30: '#0c335a',
  40: '#0e3d6c',
  50: '#10477e',
  60: '#135290',
  70: '#155ca2',
  80: '#1661ab',
  90: '#1a70c7',
  100: '#1c7ad9',
  110: '#2685e3',
  120: '#388fe5',
  130: '#4a99eb',
  140: '#5da3ea',
  150: '#6fadec',
  160: '#81b8ef',
};

const lightTheme: Theme = {
  ...createLightTheme(brandColors),
  fontFamilyMonospace: `Consolas, 'Cascadia Code', 'Courier New', Courier, monospace`,
};
const darkTheme: Theme = {
  ...createDarkTheme(brandColors),
  fontFamilyMonospace: `Consolas, 'Cascadia Code', 'Courier New', Courier, monospace`,
};

const getUserThemeConfig = () => {
  if (typeof window === 'undefined') {
    return 'light';
  }
  const setting = getConfig().theme;
  if (
    !setting ||
    (setting !== 'dark' && setting !== 'light' && setting !== 'system')
  ) {
    setConfig({ theme: 'system' });
    return 'system';
  }
  return setting;
};

const getSystemTheme = () => {
  if (window.matchMedia('(prefers-color-scheme)').media === 'not all') {
    return 'light';
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'light';
};

const getTheme: (config: 'system' | 'dark' | 'light') => Theme = config => {
  if (config === 'dark') {
    return darkTheme;
  }
  if (config === 'light') {
    return lightTheme;
  }
  return getTheme(getSystemTheme());
};

const useTheme = () => {
  const context = React.useContext(ThemeContext);

  return { ...context };
};

export {
  lightTheme,
  darkTheme,
  getSystemTheme,
  getTheme,
  getUserThemeConfig,
  useTheme,
};
