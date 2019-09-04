import { Component, OnInit } from "@angular/core";
import { MainService } from "../../_services/main.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
var msgObject = require("../../_helper/alertBase");
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { Shop } from "../../models/shop";
import { AppState } from "./../../app.state";
import { User } from "../../models/user";
import * as fromRoot from "../../reducer";
import * as fromUser from "../../reducer/user.reducer";
import * as ShopActions from "../../actions/shop.action";
import * as AppActions from "../../actions/user.action";
import { userInfo } from "os";
import { identity } from "rxjs";

@Component({
  templateUrl: "shop.component.html"
})
export class ShopComponent implements OnInit {
  shop: Observable<Shop>;
  shopForm: FormGroup;
  city: any = [];
  shopType = [];
  selectedFile = null;
  loading = false;
  submitted = false;
  returnUrl: string;
  msg: object;
  constructor(
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.msg = msgObject.default;

    var shop = new Shop();
    shop.name = "Mama Iyabo";
    shop.id = 30;
    shop.phone = "949404004";
    //this.store.dispatch(new AppActions.AddUser(user));
    this.addShop(shop);
    // this.getShops().subscribe(data => {
    //   console.log(data);
    // });
  }
  // getShops(): Observable<Shop[]> {
  //   return this.store.select(fromUser.getUsers);
  // }
  addShop(newShop: Shop) {
    return this.store.dispatch(new ShopActions.CreateShop(newShop));
  }

  updateShop(shop: Shop) {
    return this.store.dispatch(new ShopActions.UpdateShop(shop));
  }
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }
  get f() {
    return this.shopForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.shopForm.invalid) {
      return;
    }
    this.loading = true;
    const fd = new FormData();
    fd.append("file", this.selectedFile, this.selectedFile.name);
    fd.append("name", this.f.shopName.value);
    fd.append("postCode", this.f.postCode.value);
    fd.append("phone", this.f.phone.value);
    fd.append("address", this.f.address.value);
    fd.append("cityId", this.f.city.value);
    fd.append("shopTypeId", this.f.shopType.value);
    this.getUser().subscribe(user => {
      fd.append("userId", user[0].id);
      this.mainService.addShop(fd).subscribe(
        data => {
          this.loading = false;
          if (data.error) this.msg = msgObject.danger(data.msg);
          else {
            this.msg = msgObject.success(
              msgObject.successCreate("Shop") +
                "you will be taken to the dashboard in 4 seconds"
            );
            setTimeout(() => this.router.navigate(["/dashboard"]), 4000);
          }
        },
        error => {
          this.loading = false;
        }
      );
    });
  }

  isCollapsed: boolean = false;
  iconCollapse: string = "icon-arrow-up";

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }
  ngOnInit() {
    this.shopForm = this.formBuilder.group({
      shopName: ["", Validators.required],
      phone: ["", Validators.required],
      postCode: ["", Validators.required],
      address: ["", Validators.required],
      shopType: ["", Validators.required],
      city: ["", Validators.required]
    });

    //this loads all the shop type from service
    this.mainService.getShopType().subscribe(shoptypes => {
      this.shopType = shoptypes["data"];
      this.shopForm.controls.shopType.patchValue(this.shopType[0].id);
    });

    //this loads all the cities from the service
    this.mainService.getCity().subscribe(cities => {
      this.city = cities["data"];
      this.shopForm.controls.city.patchValue(this.city[0].id);
    });
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? "icon-arrow-down" : "icon-arrow-up";
  }

  getUser(): Observable<User[]> {
    return this.store.select(fromUser.getUsers);
  }
}
