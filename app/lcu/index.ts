export type { LCUData } from './LCUData';

export { getLcuUrl } from './getLcuUrl';

export { LCUWebSocket, LCU_SOCKET_TOPIC } from './LCUWebSocket';

export { LCUConnection } from './LCUConnection';

// export const lcuFetch = (lcuData: LCUData, endpoint: string, options: RequestInit) => fetch(getLcuUrl(lcuData, endpoint), options);