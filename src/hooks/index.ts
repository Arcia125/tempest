
export { useMockQuery } from './useMockQuery';

export { useSearch } from './useSearch';

export { useStormScene } from './useStormScene';
export { useAnalytics } from './useAnalytics';

const isElectronEnv = typeof window.require === 'function';

export const useChampSelect = isElectronEnv ? require('./useChampSelect').useChampSelect : null;

export const useCurrentSummoner = isElectronEnv ? require('./useCurrentSummoner').useCurrentSummoner : null;

export const useCurrentRegion = isElectronEnv ? require('./useCurrentRegion').useCurrentRegion : null;

export const useMatchMaking = isElectronEnv ? require('./useMatchMaking').useMatchMaking : null;

export const useLobby = isElectronEnv ? require('./useLobby').useLobby : null;

export const useEventEffect = isElectronEnv ? require('./useEventEffect').useEventEffect : null;

export const useLcuDataConnection = isElectronEnv ? require('./useLcuDataConnection').useLcuDataConnection : null;
