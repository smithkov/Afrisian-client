import { Component, OnInit, TemplateRef } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { MainService } from "../../../_services/main.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
var msgObject = require("../../../_helper/alertBase");
var image = require("../../../_helper/config");
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Item } from "../../../models/item";

@Component({
  templateUrl: "productList.component.html"
})
export class ProductListComponent implements OnInit {
  modalRef: BsModalRef;
  productForm: FormGroup;
  category: any = [];
  product: any;
  formData = new FormData();
  selectedFile = null;
  loadingTable = true;
  loadingDelete = false;
  submitted = false;
  returnUrl: string;
  shopId: any;
  urls = [];
  products = [];
  msg: object;
  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private router: Router
  ) {
    this.msg = msgObject.default;
    mainService.currentShop.subscribe(shop => {
      this.shopId = shop.id;
    });

    this.loadProducts();
  }
  openModal(template: TemplateRef<any>, id: any) {
    this.product = this.products.filter(product => product.id == id);

    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  loadProducts() {
    this.mainService.getProductsByShop(this.shopId).subscribe(products => {
      if (!products.error) {
        console.log(products);
        let productArray = products.data;
        productArray.forEach(item => {
          item.defaultImg = item.defaultImg
            ? image.getImageItem(item.defaultImg)
            : null;
        });
        this.products = products.data;
        this.loadingTable = false;
      }
    });
  }
  confirm(id): void {
    this.loadingDelete = true;
    this.mainService.deleteItem(id).subscribe(result => {
      this.loadingDelete = false;
      if (!result) {
        this.modalRef.hide();
        this.products = this.products.filter(product => product.id != id);
      }
    });
  }

  decline(): void {
    this.modalRef.hide();
  }

  editButtonClick(productId: number): void {
    this.router.navigate(["/base/product-Detail", productId]);
  }
  get f() {
    return this.productForm.controls;
  }

  isCollapsed: boolean = false;
  iconCollapse: string = "icon-arrow-up";

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }
  ngOnInit() {}

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? "icon-arrow-down" : "icon-arrow-up";
  }
}
