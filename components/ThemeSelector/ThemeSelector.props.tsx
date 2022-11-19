import {
  getNativeElementProps,
  MenuButton,
  MenuItem,
  MenuItemRadio,
  MenuList,
  MenuPopover,
  resolveShorthand,
} from '@fluentui/react-components';
import { WeatherSunny24Regular } from '@fluentui/react-icons';
import { useMemo } from 'react';
import UseComponent from '../../models/UseComponent';
import { useTheme } from '../../utilities/theme';
import { ThemeSelectorProps, ThemeSelectorStates } from './ThemeSelector.types';

export const useThemeSelector: UseComponent<
  ThemeSelectorProps,
  ThemeSelectorStates
> = (props, ref) => {
  const {
    menuTrigger,
    menuPopover,
    strings,
    isDarkModeDisabled,
    isLightModeDisabled,
    isFollowSystemDisabled,
    isDisabled,
    menuProps,
  } = props;

  const { theme, changeTheme } = useTheme();
  const themeNames = useMemo(() => {
    return {
      dark: strings?.darkMode ?? 'Dark mode',
      light: strings?.lightMode ?? 'Light mode',
      system: strings?.followSystem ?? 'Follow system',
    };
  }, [strings?.darkMode, strings?.followSystem, strings?.lightMode]);
  const selectedThemeName = useMemo(
    () => themeNames[theme],
    [theme, themeNames]
  );

  const resolvedMenuTrigger = resolveShorthand(menuTrigger, {
    required: true,
    defaultProps: {
      disabled: isDisabled,
      children: selectedThemeName,
      icon: <WeatherSunny24Regular />,
      appearance: 'transparent',
      'aria-label':
        strings?.label !== null
          ? strings?.label ?? 'Change theme of this site.'
          : undefined,
    },
  });

  const resolvedMenuPopover = resolveShorthand(menuPopover, { required: true });

  return {
    components: {
      root: 'div',
      menuTrigger: MenuButton,
      menuPopover: MenuPopover,
    },
    root: getNativeElementProps('div', {
      ref,
      children: (
        <>
          <MenuItemRadio
            name='theme'
            value='system'
            disabled={isFollowSystemDisabled}
          >
            {themeNames.system}
          </MenuItemRadio>
          <MenuItemRadio
            name='theme'
            value='light'
            disabled={isLightModeDisabled}
          >
            {themeNames.light}
          </MenuItemRadio>
          <MenuItemRadio
            name='theme'
            value='dark'
            disabled={isDarkModeDisabled}
          >
            {themeNames.dark}
          </MenuItemRadio>
        </>
      ),
      ...props,
    }),
    menuProps: {
      hasCheckmarks: true,
      checkedValues: { theme: [theme] },
      onCheckedValueChange: (_, data) => {
        if (data.name === 'theme') {
          changeTheme(data.checkedItems[0] as 'system' | 'light' | 'dark');
        }
      },
      ...menuProps,
      children: <></>,
    },
    menuTrigger: resolvedMenuTrigger,
    menuPopover: resolvedMenuPopover,
    triggerLabel:
      strings?.label !== null
        ? strings?.label ?? 'Change theme of this site.'
        : null,
  };
};
