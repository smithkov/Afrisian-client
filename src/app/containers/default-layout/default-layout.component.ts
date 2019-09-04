import { Component, OnDestroy, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { navItems } from "../../_nav";
import { Observable } from "rxjs/Observable";
import { User } from "../../models/user";
import * as fromRoot from "../../reducer";
import * as fromUser from "../../reducer/user.reducer";
import * as fromShops from "../../reducer/shop.reducer";
import * as ShopActions from "../../actions/shop.action";
import * as UserActions from "../../actions/user.action";
import * as AppActions from "../../actions/user.action";
import { Store } from "@ngrx/store";
import { Shop } from "../../models/shop";
import { AppState } from "./../../app.state";
var image = require("../../_helper/config");

@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html"
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  shop: Observable<Shop>;
  shopName: any;
  logo: any;
  constructor(
    private store: Store<AppState>,
    @Inject(DOCUMENT) _document?: any
  ) {
    this.store.dispatch(new ShopActions.FetchShop());
    this.changes = new MutationObserver(mutations => {
      this.sidebarMinimized = _document.body.classList.contains(
        "sidebar-minimized"
      );
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ["class"]
    });

    //this is basically loading shop data from the store

    this.getShop().subscribe(data => {
      console.log("before object");
      console.log(data);
      let img = image.getImage(data[0].logo);

      this.logo = data[0] ? img : null;
      this.shopName = data[0] ? data[0]["name"] : null;
    });
  }
  //this is a method that pulls shop data from the store.
  getShop(): Observable<Shop[]> {
    return this.store.select(fromShops.getShops);
  }

  addShop(newShop: Shop) {
    return this.store.dispatch(new ShopActions.CreateShop(newShop));
  }

  getUser(): Observable<User[]> {
    return this.store.select(fromUser.getUsers);
  }
  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
