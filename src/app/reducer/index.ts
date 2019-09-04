// import { storeFreeze } from "ngrx-store-freeze";
import {
  combineReducers,
  ActionReducer,
  createSelector,
  createFeatureSelector
} from "@ngrx/store";
import { ActionReducerMap, MetaReducer } from "@ngrx/store";

import { environment } from "../../environments/environment";

import * as fromShops from "./shop.reducer";
import * as fromUsers from "./user.reducer";

export interface State {
  shops: fromShops.State;
  users: fromUsers.State; // append more states here
}

export const reducer: ActionReducerMap<State> = {
  shops: fromShops.reducer, // append additional reducers here
  users: fromUsers.reducer
};

// tslint:disable-next-line:no-shadowed-variable
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];
