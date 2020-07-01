import { useContext } from 'react';

import { lcuContext, lcuFetch } from './lcuData';
import { LCUData } from './shared/LCUData';
import { lcuPlugins, LCUPluginEvent } from './shared/LCUPluginEvent';

const getCurrentSummoner = async (lcuData: LCUData) => {
  // const res = await lcuFetch(lcuData, lcuPlugins. .endpoints.)
}

export const useCurrentSummoner = () => {
  const ctx = useContext(lcuContext);
  if ('username' in ctx) {
    // lcuFetch()
  }
};