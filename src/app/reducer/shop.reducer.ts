import { Action } from "@ngrx/store";
import { Shops } from "../models/shops";
import * as ShopActions from "../actions/shop.action";

// Section 1
// const initialState: Shop = {
//     name: 'Initial Tutorial',
//     url: 'http://google.com'
// }

// Section 2
export function reducer(state: Shops[] = [], action: ShopActions.Actions) {
  // Section 3
  switch (action.type) {
    case ShopActions.ADD_SHOP:
      return [...state, action.payload];
    default:
      return state;
  }
}
