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
  templateUrl: "subCategoryList.component.html"
})
export class SubCategoryListComponent implements OnInit {
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

    this.loadSubCategory();
  }
  openModal(template: TemplateRef<any>, id: any) {
    this.category = this.categories.filter(category => category.id == id);

    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  confirm(id): void {
    this.loadingDelete = true;
    this.mainService.deleteSubCategory(id).subscribe(result => {
      this.loadingDelete = false;
      if (!result) {
        this.modalRef.hide();
        this.categories = this.categories.filter(category => category.id != id);
      }
    });
  }
  decline(): void {
    this.modalRef.hide();
  }
  loadSubCategory() {
    this.mainService.getSubCategory().subscribe(cat => {
      let categoryArray = cat;
      categoryArray.forEach(item => {
        item.path = item.path ? image.getImage(item.path) : null;
      });
      this.categories = cat;
      this.loadingTable = false;
    });
  }

  editButtonClick(subCategoryId: number): void {
    this.router.navigate(["/base/sub-category-detail", subCategoryId]);
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
