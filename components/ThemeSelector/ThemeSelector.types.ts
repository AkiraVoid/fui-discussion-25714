import {
  ComponentProps,
  ComponentState,
  MenuButton,
  MenuList,
  MenuPopover,
  MenuProps,
  Slot,
} from '@fluentui/react-components';

export type ThemeSelectorSlots = {
  root: NonNullable<Slot<'div'>>;
  menuTrigger?: NonNullable<Slot<typeof MenuButton>>;
  menuPopover?: Slot<typeof MenuPopover>;
};

export type ThemeSelectorProps = ComponentProps<ThemeSelectorSlots> & {
  strings?: {
    darkMode?: string;
    lightMode?: string;
    followSystem?: string;
    label?: string | null;
  };
  isDarkModeDisabled?: boolean;
  isLightModeDisabled?: boolean;
  isFollowSystemDisabled?: boolean;
  isDisabled?: boolean;
  menuProps?: MenuProps;
};

export type ThemeSelectorStates = ComponentState<ThemeSelectorSlots> &
  Required<Pick<ThemeSelectorProps, 'menuProps'>> & {
    triggerLabel: string | null;
  };
