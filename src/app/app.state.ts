import { Shop } from "./models/shop";
import { User } from "./models/user";

export interface AppState {
  readonly shop: Shop;
  readonly User: User;
}
