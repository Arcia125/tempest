export interface BaseAction<T, D> { type: T; data?: D; }

export type BaseDispatch<T, D = any> = React.Dispatch<BaseAction<T, D>>;

export type BaseActionDispatcher<T, D = any> = (dispatch: BaseDispatch<T, D>, data?: D) => void;

export type BaseActions<T> = Record<string, BaseActionDispatcher<T>>;
