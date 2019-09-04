import { Action, createFeatureSelector, createSelector } from "@ngrx/store";
import * as ShopActions from "../actions/shop.action";
import { Shop } from "../models/shop";
import { User } from "../models/user";

export interface State {
  shops: Shop[];
}

export const initialState: State = {
  shops: []
};

export function reducer(
  state: State = initialState,
  action: ShopActions.Actions
): State {
  switch (action.type) {
    case ShopActions.SHOP_CLEAR:
      return {
        shops: []
      };

    case ShopActions.CREATE_SHOP:
      return {
        shops: [action.payload, ...state.shops]
      };
    // case ShopActions.FETCH_SHOP:
    //   return {
    //     shops: action.payload || []
    //   };
    case ShopActions.UPDATE_SHOP:
      return Object.assign({}, state, {
        shops: state.shops.map(shop => {
          return shop.id === action.payload.id ? action.payload : shop;
        })
      });

    case ShopActions.DELETE_SHOP:
      return Object.assign({}, state, {
        shops: state.shops.filter((shop: Shop) => {
          return shop.id !== action.payload.id;
        })
      });

    default:
      return state;
  }
}

export const getShopState = createFeatureSelector<State>("shops");

export const getShops = createSelector(
  getShopState,
  (state: State) => state.shops
);
