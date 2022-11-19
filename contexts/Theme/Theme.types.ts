export type ContextType = {
  theme: 'light' | 'dark' | 'system';
  changeTheme: (theme: 'system' | 'light' | 'dark') => void;
  appliedTheme: 'light' | 'dark';
};
