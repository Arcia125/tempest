import * as reducers from './reducerTypes';
export interface Data {
}


export enum ActionType {
  CreateSearch = 'CreateSearch',
}

export type ActionDispatcher = reducers.BaseActionDispatcher<ActionType>;

export type Action<D> = reducers.BaseAction<ActionType, D>;

export type Actions = reducers.BaseActions<ActionType>;