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
  templateUrl: "categoryList.component.html"
})
export class CategoryListComponent implements OnInit {
  modalRef: BsModalRef;
  categories: any = [];
  category: any;
  formData = new FormData();
  selectedFile = null;
  loadingTable = true;
  loadingDelete = false;
  submitted = false;
  returnUrl: string;
  shopId: any;
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

    this.loadCategory();
  }

  loadCategory() {
    this.mainService.getCategory().subscribe(cat => {
      let categoryArray = cat;
      categoryArray.forEach(item => {
        item.path = item.path ? image.getImage(item.path) : null;
      });
      this.categories = cat;
      this.loadingTable = false;
    });
  }

  editButtonClick(categoryId: number): void {
    this.router.navigate(["/base/category-Detail", categoryId]);
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
