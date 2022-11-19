import {
  getSlots,
  Menu,
  MenuList,
  MenuTrigger,
  Tooltip,
} from '@fluentui/react-components';
import RenderComponent from '../../models/RenderComponent';
import { ThemeSelectorSlots, ThemeSelectorStates } from './ThemeSelector.types';

export const renderThemeSelector: RenderComponent<
  ThemeSelectorStates
> = states => {
  const { slots, slotProps } = getSlots<ThemeSelectorSlots>(states);

  return (
    <slots.root {...slotProps.root}>
      <Menu {...states.menuProps}>
        <MenuTrigger>
          {states.triggerLabel ? (
            <Tooltip content={states.triggerLabel} relationship='label'>
              {slots.menuTrigger ? (
                <slots.menuTrigger {...slotProps.menuTrigger} />
              ) : (
                <></>
              )}
            </Tooltip>
          ) : slots.menuTrigger ? (
            <slots.menuTrigger {...slotProps.menuTrigger} />
          ) : (
            <></>
          )}
        </MenuTrigger>
        {slots.menuPopover ? (
          <slots.menuPopover {...slotProps.menuPopover}>
            <MenuList>{slotProps.root.children}</MenuList>
          </slots.menuPopover>
        ) : (
          <></>
        )}
      </Menu>
    </slots.root>
  );
};
