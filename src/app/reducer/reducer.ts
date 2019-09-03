import { Action } from "@ngrx/store";
import { Shop } from "../models/shop";
import * as AppActions from "../actions/action";

const initialState: any = {
  shopName: "Anonymous",
  postCode: "EH20 1NU",
  phone: "0708947737",
  cityId: "A",
  address: "",
  logo: "",
  shopTypeId: ""
};

// Section 2
export function reducer(
  state: any[] = initialState,
  action: AppActions.Actions
) {
  // Section 3
  switch (action.type) {
    case AppActions.ADD_SHOP:
      return [...state, action.payload];
    default:
      return state;
  }
}
