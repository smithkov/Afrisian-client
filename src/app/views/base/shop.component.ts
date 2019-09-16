import { Component, OnInit } from "@angular/core";
import { MainService } from "../../_services/main.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
var msgObject = require("../../_helper/alertBase");
import { AuthenticationService } from "../../_services/authentication.service";
import { Observable } from "rxjs/Observable";
import { Shop } from "../../models/shop";

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
  currentUserId: any;
  msg: any;
  constructor(
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private auth: AuthenticationService,
    private router: Router
  ) {
    this.msg = msgObject.default;
    this.auth.currentUser.subscribe((user: any) => {
      this.currentUserId = user.user.id;
    });
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

    fd.append("userId", this.currentUserId);
    this.auth.addShop(fd).subscribe(
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
}
