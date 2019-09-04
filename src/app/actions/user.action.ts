import { Action } from "@ngrx/store";
import { User } from "../models/user";
// import { Event } from '../models/event';
/**
 List of auth messages
 **/

export const CREATE_USER = "CREATE_USER";

export const DELETE_USER = "DELETE_USER";

export const USER_CLEAR = "USER_CLEAR";

export const UPDATE_USER = "UPDATE_USER";

// ===================================
//  CREATE
// -----------------------------------

export class CreateUser implements Action {
  readonly type = CREATE_USER;

  constructor(public payload: User) {}
}

export class DeleteUser implements Action {
  readonly type = DELETE_USER;

  constructor(public payload: User) {}
}

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;

  constructor(public payload: User) {}
}
// ===================================
//  TOGGLE
// -----------------------------------

export class UserClear implements Action {
  readonly type = USER_CLEAR;

  constructor() {}
}

export type Actions = CreateUser | DeleteUser | UserClear | UpdateUser;
