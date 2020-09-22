import { useContext, useEffect, useReducer } from 'react';
import { lcuContext, lcuRequest } from '../lcuData';
import { getRequestArgs } from '../shared/LCUPluginEvent';
import { Reducer } from '../types';
import { log } from '../utils';


const getCurrentRegion = () => lcuRequest(...getRequestArgs('riotClient', 'regionLocale' as never, {}));

interface CurrentRegionData {
  loading: boolean;
  data?: any;
  error?: Error;
}

const initialState: CurrentRegionData = {
  loading: false,
  data: null
};

enum CurrentRegionActions {
  LOAD,
  ERR,
  GET,
}

const currentRegionReducer = (state: CurrentRegionData, action: Reducer.BaseAction<CurrentRegionActions, any>): CurrentRegionData => {
  switch (action.type) {
    case CurrentRegionActions.LOAD:
      return { loading: true };
    case CurrentRegionActions.ERR:
      return { loading: false, error: action.data };
    case CurrentRegionActions.GET:
      return { loading: false, data: action.data };
    default:
      return state
  }
}

const actions: Reducer.BaseActions<CurrentRegionActions> = {
  load: (dispatch) => {
    dispatch({ type: CurrentRegionActions.LOAD });
  },
  getRegion: (dispatch, data) => {
    dispatch({ type: CurrentRegionActions.GET, data });
  },
  err: (dispatch, data) => {
    dispatch({ type: CurrentRegionActions.ERR, data });
  }
};

export const useCurrentRegion = () => {
  const lcuData = useContext(lcuContext);
  const [state, dispatch] = useReducer(currentRegionReducer, initialState);

  useEffect(() => {
    async function getRegion() {
      actions.load(dispatch);
      try {
        const regionRes = await getCurrentRegion();
        console.log(regionRes);
        actions.getRegion(dispatch, regionRes);
      } catch (e) {
        actions.err(dispatch, e);
      }
    }
    if (lcuData != null) {
      log.silly('getting region');
      getRegion();
    }
  }, [lcuData]);

  return {
    state,
    dispatch,
    actions
  }
};
