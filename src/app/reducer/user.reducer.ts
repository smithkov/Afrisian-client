import { Action, createFeatureSelector, createSelector } from "@ngrx/store";
import * as UserActions from "../actions/user.action";
import { User } from "../models/user";

export interface State {
  users: User[];
}

export const initialState: State = {
  users: []
};

export function reducer(
  state: State = initialState,
  action: UserActions.Actions
): State {
  switch (action.type) {
    case UserActions.USER_CLEAR:
      return {
        users: []
      };

    case UserActions.CREATE_USER:
      return {
        users: [action.payload, ...state.users]
      };

    case UserActions.UPDATE_USER:
      return Object.assign({}, state, {
        users: state.users.map(user => {
          return user.id === action.payload.id ? action.payload : user;
        })
      });

    case UserActions.DELETE_USER:
      return Object.assign({}, state, {
        users: state.users.filter((user: User) => {
          return user.id !== action.payload.id;
        })
      });

    default:
      return state;
  }
}

export const getUserState = createFeatureSelector<State>("users");

export const getUsers = createSelector(
  getUserState,
  (state: State) => state.users
);
