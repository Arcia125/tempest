import { MatchMakingResponse } from './shared/LCUResponses';
import * as reducers from './reducerTypes';

export type Data = Partial<MatchMakingResponse>;


export enum ActionType {
  CreateSearch = 'CreateSearch',
  UpdateSearch = 'UpdateSearch',
  DeleteSearch = 'DeleteSearch'
}

export type ActionDispatcher = reducers.BaseActionDispatcher<ActionType>;

export type Action<D> = reducers.BaseAction<ActionType, D>;

export type Actions = reducers.BaseActions<ActionType>;
