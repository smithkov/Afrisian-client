import { Component, OnDestroy, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { navItems } from "../../_nav";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { Shop } from "../../models/shop";
import { AppState } from "./../../app.state";

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
  constructor(
    private store: Store<AppState>,
    @Inject(DOCUMENT) _document?: any
  ) {
    store.select("shop").subscribe(o => {
      this.shopName = o.shopName;
      console.log(o);
    });
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
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
