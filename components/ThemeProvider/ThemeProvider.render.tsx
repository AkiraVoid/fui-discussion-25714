import { FluentProvider } from '@fluentui/react-components';
import * as React from 'react';
import ThemeContext from '../../contexts/Theme';
import {
  getSystemTheme,
  getTheme,
  getUserThemeConfig,
} from '../../utilities/theme';
import { setConfig } from '../../utilities/userConfig';

const Component: React.FunctionComponent<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [themeConfig, setThemeConfig] = React.useState<
    'light' | 'dark' | 'system'
  >('light');
  const [theme, setTheme] = React.useState(() => getTheme(themeConfig));
  const [appliedTheme, setAppliedTheme] = React.useState<'light' | 'dark'>(
    'light'
  );

  const darkModeQueryRef = React.useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : undefined
  );
  const listenerRef = React.useRef<(() => any) | undefined>(undefined);

  const systemThemeListener = React.useCallback(function (
    this: MediaQueryList
  ) {
    const systemTheme = getSystemTheme();
    setTheme(getTheme(systemTheme));
    setAppliedTheme(systemTheme);
  },
  []);

  React.useEffect(() => {
    setTheme(getTheme(themeConfig));
    if (typeof window !== 'undefined' && !darkModeQueryRef.current) {
      darkModeQueryRef.current = window.matchMedia(
        '(prefers-color-scheme: dark)'
      );
    }
    if (themeConfig === 'system') {
      if (listenerRef.current) {
        darkModeQueryRef.current!.removeEventListener(
          'change',
          listenerRef.current
        );
      }
      setAppliedTheme(getSystemTheme());
      darkModeQueryRef.current!.addEventListener('change', systemThemeListener);
      listenerRef.current = systemThemeListener;
    } else {
      setAppliedTheme(themeConfig);
      if (listenerRef.current) {
        darkModeQueryRef.current!.removeEventListener(
          'change',
          listenerRef.current
        );
        listenerRef.current = undefined;
      }
    }
  }, [systemThemeListener, themeConfig]);

  const changeTheme = React.useCallback(
    (config: 'light' | 'dark' | 'system') => {
      setThemeConfig(config);
      setConfig({ theme: config });
    },
    []
  );

  // ????????????????????????????????????????????????????????????
  React.useEffect(() => {
    setThemeConfig(getUserThemeConfig());
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme: themeConfig, appliedTheme, changeTheme }}
    >
      <FluentProvider theme={theme}>{children}</FluentProvider>
    </ThemeContext.Provider>
  );
};

Component.displayName = 'ThemeProvider';

export { Component };
