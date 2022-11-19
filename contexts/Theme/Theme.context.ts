import * as React from 'react';
import { ContextType } from './Theme.types';
import { defaultContext } from './Theme.values';

export const context = React.createContext<ContextType>(defaultContext);
