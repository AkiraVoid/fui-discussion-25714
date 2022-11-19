import { ComponentProps } from '@fluentui/react-components';
import React from 'react';

type UseComponent<TProps, TStates> = (
  props: TProps,
  ref?: React.ForwardedRef<any>
) => TStates;

export default UseComponent;
