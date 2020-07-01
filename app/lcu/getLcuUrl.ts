import { LCUData } from '../../src/shared/LCUData';

export const getLcuUrl = ({ username, password, address, port }: LCUData, endpoint: string, protocol: 'http' | 'https' | 'ws' | 'wss' = 'https', withBasicAuth = true) => {
  const auth = withBasicAuth ? `${username}:${password}@` : '';
  return `${protocol}://${auth}${address}:${port}${endpoint && !endpoint.startsWith('/') ? `/${endpoint}` : endpoint}`;
};
