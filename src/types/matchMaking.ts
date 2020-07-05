import { MatchMakingResponse } from '../shared/LCUResponses';
import * as Reducer from './reducer';

export type Data = Partial<MatchMakingResponse>;


export enum ActionType {
  CreateSearch = 'CreateSearch',
  UpdateSearch = 'UpdateSearch',
  DeleteSearch = 'DeleteSearch'
}

export type ActionDispatcher = Reducer.BaseActionDispatcher<ActionType>;

export type Action<D> = Reducer.BaseAction<ActionType, D>;

export type Actions = Reducer.BaseActions<ActionType>;
