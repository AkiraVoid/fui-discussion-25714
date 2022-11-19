import UserConfiguration from '../models/UserConfiguration';

export const getConfig = () => {
  const config = localStorage.getItem('userConfig');
  if (!config) {
    localStorage.setItem('userConfig', '{}');
    return {} as Partial<UserConfiguration>;
  }
  return JSON.parse(config) as Partial<UserConfiguration>;
};

export const setConfig = (config: Partial<UserConfiguration>) => {
  const storage = localStorage.getItem('userConfig');
  if (!storage) {
    localStorage.setItem('userConfig', JSON.stringify(config));
    return {};
  }
  localStorage.setItem(
    'userConfig',
    JSON.stringify({ ...JSON.parse(storage), ...config })
  );
};
