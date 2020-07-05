import { useEffect, useReducer, useContext } from 'react';

import * as reducers from './reducerTypes';
import { lcuRequest, lcuContext } from './lcuData';
import { getRequestArgs } from './shared/LCUPluginEvent';
import { log } from './utils';

const getCurrentSummoner = () => lcuRequest(...getRequestArgs('summoner', 'currentSummoner', {}));

interface CurrentSummonerData {
  loading: boolean;
  data?: any;
  error?: Error;
}

const initialState: CurrentSummonerData = {
  loading: false,
  data: null
};

enum CurrentSummonerActions {
  LOAD,
  ERR,
  GET,
}

const currentSummonerReducer = (state: CurrentSummonerData, action: reducers.BaseAction<CurrentSummonerActions, any>): CurrentSummonerData => {
  switch (action.type) {
    case CurrentSummonerActions.LOAD:
      return { loading: true };
    case CurrentSummonerActions.ERR:
      return { loading: false, error: action.data };
    case CurrentSummonerActions.GET:
      return { loading: false, data: action.data };
    default:
      return state
  }
}

const actions: reducers.BaseActions<CurrentSummonerActions> = {
  load: (dispatch) => {
    dispatch({ type: CurrentSummonerActions.LOAD });
  },
  getSummoner: (dispatch, data) => {
    dispatch({ type: CurrentSummonerActions.GET, data });
  },
  err: (dispatch, data) => {
    dispatch({ type: CurrentSummonerActions.ERR, data });
  }
};

export const useCurrentSummoner = () => {
  const lcuData = useContext(lcuContext);
  const [state, dispatch] = useReducer(currentSummonerReducer, initialState);

  useEffect(() => {
    async function getSummoner() {
      actions.load(dispatch);
      try {
        const summonerRes = await getCurrentSummoner();
        actions.getSummoner(dispatch, summonerRes);
      } catch (e) {
        actions.err(dispatch, e);
      }
    }
    if ('username' in lcuData) {
      log.silly('getting summoner');
      getSummoner();
    }
  }, [lcuData]);

  return {
    state,
    dispatch,
    actions
  }
};
