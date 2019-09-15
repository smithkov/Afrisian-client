import { Component, OnInit, TemplateRef } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { MainService } from "../../../_services/main.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
var msgObject = require("../../../_helper/alertBase");
var image = require("../../../_helper/config");
import { Item } from "../../../models/item";

@Component({
  templateUrl: "subCategoryDetail.component.html",
  styleUrls: ["product.css"]
})
export class SubCategoryDetailComponent implements OnInit {
  pageForm: FormGroup;
  formData = new FormData();
  selectedFile = null;
  loading = false;
  loadingForm = true;
  isEnableEdit = false;
  buttonCaption = "Edit SubCategory";
  submitted = false;
  returnUrl: string;
  category: any;
  path: any;
  shopId: any;
  url: any;
  msg: object;
  constructor(
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
    this.formData.append("path", this.f.path.value);
    this.formData.append("id", this.f.id.value);
    this.formData.append("isUpdate", this.f.isUpdate.value);

    this.mainService.addSubCategory(this.formData).subscribe(
      data => {
        this.loading = false;
        if (data.error) this.msg = msgObject.danger(data.msg);
        else {
          this.pageForm.reset();
          this.formData = new FormData();
          this.url = null;
          this.msg = msgObject.success(msgObject.successUpdate("Sub Category"));
        }
      },
      error => {
        this.loading = false;
      }
    );
  }

  isCollapsed: boolean = false;
  iconCollapse: string = "icon-arrow-up";

  ngOnInit() {
    this.pageForm = this.formBuilder.group({
      name: ["", Validators.required],
      id: ["", Validators.required],
      categoryId: ["", Validators.required],
      isUpdate: [true, Validators.required],
      path: ["", Validators.required]
    });
    this.activatedRoute.paramMap.subscribe(param => {
      const subCategoryId = +param.get("id");
      if (subCategoryId) {
        this.getSubCategoryById(subCategoryId);
      }
    });

    this.pageForm.disable();
  }

  getSubCategoryById(id: number) {
    this.mainService.getSubCategoryById(id).subscribe((data: any) => {
      this.loadingForm = false;
      this.path = image.getImage(data.path);

      this.editSubCategory(data), (err: any) => console.log(err);
    });
  }

  enableForm() {
    if (!this.isEnableEdit) {
      this.pageForm.enable();
      this.buttonCaption = "Disable Edit";
      this.isEnableEdit = true;
    } else {
      this.pageForm.disable();
      this.buttonCaption = "Edit SubCategory";
      this.isEnableEdit = false;
    }
  }

  editSubCategory(subCategory: any) {
    this.loadingForm = false;
    this.pageForm.patchValue({
      name: subCategory.name,
      id: subCategory.id,
      categoryId: subCategory.categoryId,
      path: subCategory.path
    });
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? "icon-arrow-down" : "icon-arrow-up";
  }
  clearImage(): void {
    this.url = null;
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      this.formData.append("file", event.target.files[0]);
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
