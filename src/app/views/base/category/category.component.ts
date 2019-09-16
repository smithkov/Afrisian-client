import { Component, OnInit, TemplateRef } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { MainService } from "../../../_services/main.service";
import { AuthenticationService } from "../../../_services/authentication.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
var msgObject = require("../../../_helper/alertBase");
var image = require("../../../_helper/config");
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Item } from "../../../models/item";

@Component({
  templateUrl: "category.component.html"
})
export class CategoryComponent implements OnInit {
  modalRef: BsModalRef;
  categoryForm: FormGroup;
  category: any = [];
  formData = new FormData();
  selectedFile = null;
  loading = false;
  submitted = false;
  returnUrl: string;
  shopId: any;
  showImageClearButton = false;
  url: any;
  msg: any;
  constructor(
    private modalService: BsModalService,
    auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private router: Router
  ) {
    this.msg = msgObject.default;
    auth.currentUser.subscribe(user => {
      this.shopId = user.shop.id;
    });
  }

  get f() {
    return this.categoryForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.categoryForm.invalid) {
      return;
    }
    this.loading = true;

    this.formData.append("name", this.f.name.value);
    this.formData.append("definition", this.f.definition.value);

    //fd.append("userId", user.id);
    this.mainService.addCategory(this.formData).subscribe(
      data => {
        this.loading = false;
        if (data.error) this.msg = msgObject.danger(data.msg);
        else {
          this.categoryForm.reset();
          this.formData = new FormData();
          this.url = null;
          this.msg = msgObject.success(msgObject.successCreate("Product"));
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
    this.categoryForm = this.formBuilder.group({
      name: ["", Validators.required],
      definition: ["", Validators.required]
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
