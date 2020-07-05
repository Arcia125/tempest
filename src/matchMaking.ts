import { useReducer, useCallback } from 'react';

import { LCUPluginEvent } from './shared/LCUPluginEvent';
import { useEventEffect } from './hooks/useEventEffect';
import * as MatchMaking from './matchMakingTypes';
import { log } from './utils';

const initialState: MatchMaking.Data = {};

const actions: MatchMaking.Actions = {
  createSearch: (dispatch, data: MatchMaking.Data) => {
    dispatch({ type: MatchMaking.ActionType.CreateSearch, data });
  },
  updateSearch: (dispatch, data: MatchMaking.Data) => {
    dispatch({ type: MatchMaking.ActionType.UpdateSearch, data });
  },
  deleteSearch: (dispatch) => {
    dispatch({ type: MatchMaking.ActionType.DeleteSearch })
  }
};

const events: Record<string, Record<string, MatchMaking.ActionDispatcher>> = {
  Create: {
    '/lol-matchmaking/v1/search': actions.createSearch,
  },
  Update: {
    '/lol-matchmaking/v1/search': actions.updateSearch
  },
  Delete: {
    '/lol-matchmaking/v1/search': actions.deleteSearch
  }
};

const matchMakingReducer = (state: MatchMaking.Data, action: MatchMaking.Action<any>): MatchMaking.Data => {
  log.silly('matchMaking reducer activated', state, action);

  switch (action.type) {
    case MatchMaking.ActionType.CreateSearch: {
      return action.data;
    }
    case MatchMaking.ActionType.UpdateSearch: {
      return action.data;
    }
    case MatchMaking.ActionType.DeleteSearch: {
      return initialState;
    }
    default:
      log.warn(`Unsupported action type ${action.type}`);
      return state;
  }
};

const useMatchMakingReducer = () => {
  const [state, dispatch] = useReducer(matchMakingReducer, initialState);

  return {
    state,
    dispatch,
    actions
  };
};

function dispatchFromEvent<T>(dispatch: React.Dispatch<MatchMaking.Action<T>>, event: { uri: string, eventType: string, data: any }) {
  const action = events[event.eventType]?.[event.uri];

  if (!action) log.warn(`Unsupported event uri and eventType combination ${event.uri} ${event.eventType}`);
  else action?.(dispatch, event.data);
}

export const useMatchMaking = () => {
  const matchMaking = useMatchMakingReducer();

  const callback = useCallback((sender, event) => {
    dispatchFromEvent(matchMaking.dispatch, event);
  }, [matchMaking.dispatch]);

  useEventEffect(LCUPluginEvent.MATCHMAKING, callback);

  return matchMaking;
};
