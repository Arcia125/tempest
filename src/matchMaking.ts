import { useReducer, useCallback } from 'react';

import { LCUPluginEvent } from './shared/LCUPluginEvent';
import { useEventEffect } from './useEventEffect';
import * as MatchMaking from './matchMakingTypes';

const initialState: MatchMaking.Data = {};

const actions: MatchMaking.Actions = {
  createSearch: (dispatch, data: MatchMaking.Data) => {
    dispatch({ type: MatchMaking.ActionType.CreateSearch, data });
  },
  // updateLobbyCountdown
  // updateLastQueuedLobby
}

const events: Record<string, Record<string, MatchMaking.ActionDispatcher>> = {
  Create: {
    '/lol-matchmaking/v1/search': actions.createSearch,
  }
}

const matchMakingReducer = (state: MatchMaking.Data, action: MatchMaking.Action<any>): MatchMaking.Data => {
  console.log('lobby reducer activated', state, action);
  switch (action.type) {
    case MatchMaking.ActionType.CreateSearch: {
      return action.data;
    }
    default:
      console.warn(`Unsupported action type ${action.type}`);
      return state;
  }
}

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
  if (!action) console.warn(`Unsupported event uri and eventType combination ${event.uri} ${event.eventType}`)
  else action?.(dispatch, event.data);
}

export const useMatchMaking = () => {
  const lobby = useMatchMakingReducer();
  const callback = useCallback((sender, event) => {
    dispatchFromEvent(lobby.dispatch, event);
  }, [lobby.dispatch]);
  useEventEffect(LCUPluginEvent.MATCHMAKING, callback);
  return lobby;
}