import { Component, OnInit, TemplateRef } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { MainService } from "../../../_services/main.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
var msgObject = require("../../../_helper/alertBase");
var image = require("../../../_helper/config");
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  templateUrl: "subCategory.component.html"
})
export class SubCategoryComponent implements OnInit {
  modalRef: BsModalRef;
  pageForm: FormGroup;
  category: any = [];
  formData = new FormData();
  selectedFile = null;
  loading = false;
  submitted = false;
  returnUrl: string;
  shopId: any;
  showImageClearButton = false;
  url: any;
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

    mainService.getCategory().subscribe(categories => {
      this.category = categories;
      this.pageForm.controls.categoryId.patchValue(this.category[0].id);
    });
  }

  get f() {
    return this.pageForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.pageForm.invalid) {
      return;
    }
    this.loading = true;

    this.formData.append("name", this.f.name.value);
    this.formData.append("categoryId", this.f.categoryId.value);

    //fd.append("userId", user.id);
    this.mainService.addSubCategory(this.formData).subscribe(
      data => {
        this.loading = false;
        if (data.error) this.msg = msgObject.danger(data.msg);
        else {
          this.pageForm.reset();
          this.formData = new FormData();
          this.url = null;
          this.msg = msgObject.success(msgObject.successCreate("Sub Category"));
        }
      },
      error => {
        this.loading = false;
      }
    );
  }
  clearImage(): void {
    this.url = null;
    this.showImageClearButton = false;
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
    this.pageForm = this.formBuilder.group({
      name: ["", Validators.required],
      categoryId: ["", Validators.required]
    });
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? "icon-arrow-down" : "icon-arrow-up";
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      this.formData.append("file", event.target.files[0]);
      this.showImageClearButton = true;
      var reader = new FileReader();

      reader.onload = (event: any) => {
        console.log(event.target.result);
        this.url = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
