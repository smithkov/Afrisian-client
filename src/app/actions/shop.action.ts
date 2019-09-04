import { Action } from "@ngrx/store";
import { Shop } from "../models/shop";

/**
 List of Shop messages
 **/
export const CREATE_SHOP = "CREATE_SHOP";

export const DELETE_SHOP = "DELETE_SHOP";

export const SHOP_CLEAR = "SHOP_CLEAR";

export const UPDATE_SHOP = "UPDATE_SHOP";

export const FETCH_SHOP = "FETCH_SHOP";
// ===================================
//  CREATE
// -----------------------------------

export class CreateShop implements Action {
  readonly type = CREATE_SHOP;

  constructor(public payload: Shop) {}
}

export class FetchShop implements Action {
  readonly type = FETCH_SHOP;

  constructor() {}
}
export class DeleteShop implements Action {
  readonly type = DELETE_SHOP;

  constructor(public payload: Shop) {}
}

export class UpdateShop implements Action {
  readonly type = UPDATE_SHOP;

  constructor(public payload: Shop) {}
}
// ===================================
//  TOGGLE
// -----------------------------------

export class ShopClear implements Action {
  readonly type = SHOP_CLEAR;

  constructor() {}
}

export type Actions =
  | CreateShop
  | DeleteShop
  | ShopClear
  | UpdateShop
  | FetchShop;
