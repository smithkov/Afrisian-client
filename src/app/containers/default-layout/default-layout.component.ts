import { Component, OnDestroy, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { navItems } from "../../_nav";
import { Observable } from "rxjs/Observable";
import { User } from "../../models/user";
import { Shop } from "../../models/shop";
var image = require("../../_helper/config");
import { MainService } from "../../_services/main.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../app.state";

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
  shops: Observable<Shop[]>;
  constructor(
    private mainService: MainService,
    private store: Store<AppState>,
    @Inject(DOCUMENT) _document?: any
  ) {
    store.select("shop").subscribe(a => {});

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
    this.mainService.currentUser.subscribe((data: any) => {
      this.mainService.shopByUser(data.id).subscribe(shop => {
        if (shop) {
          this.shopName = shop.name;
          this.logo = image.getImage(shop.logo);
        } else {
          this.shopName = "Default Name";
          this.logo = "assets/images/grocer.png";
        }
      });
    });
  }

  // addShop(newShop: Shop) {

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
