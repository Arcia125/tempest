import { useReducer } from 'react';

import { useEventEffect } from './useEventEffect';
import * as Lobby from './lobbyTypes';

const initialState: Lobby.Data = {};

const actions: Lobby.Actions = {
  update: (dispatch, data: Lobby.Data) => {
    dispatch({ type: Lobby.ActionType.Update, data });
  },
  updateLobbyMembers: (dispatch, data: Lobby.Member[]) => {
    dispatch({ type: Lobby.ActionType.UpdateLobbyMembers, data });
  },
  // updateLobbyCountdown
  // updateLastQueuedLobby
}

const events: Record<string, Record<string, Lobby.ActionDispatcher>> = {
  Update: {
    '/lol-lobby/v2/lobby': actions.update,
    '/lol-lobby/v2/lobby/members': actions.updateLobbyMembers,
  }
}

const lobbyReducer = (state: Lobby.Data, action: Lobby.Action<any>): Lobby.Data => {
  console.log('lobby reducer activated', state, action);
  switch (action.type) {
    case Lobby.ActionType.Update: {
      return action.data;
    }
    case Lobby.ActionType.UpdateLobbyMembers: {
      return {
        ...state,
        members: action.data
      };
    }
    default:
      console.warn(`Unsupported action type ${action.type}`);
      return state;
  }
}

const useLobbyReducer = () => {
  const [state, dispatch] = useReducer(lobbyReducer, initialState);
  return {
    state,
    dispatch,
    actions
  };
};

const dispatchFromEvent = (lobby: ReturnType<typeof useLobbyReducer>, event: { uri: string, eventType: string, data: any }) => {
  const action = events[event.eventType]?.[event.uri];
  if (!action) console.warn(`Unsupported event uri and eventType combination ${event.uri} ${event.eventType}`)
  else action?.(lobby.dispatch, event.data);
}

export const useLobby = () => {
  const lobby = useLobbyReducer();
  useEventEffect('lol-lobby', (sender, event) => {
    dispatchFromEvent(lobby, event);
  })
  return lobby;
}