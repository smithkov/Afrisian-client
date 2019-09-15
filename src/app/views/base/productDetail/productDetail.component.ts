import { Component, OnInit, TemplateRef } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { MainService } from "../../../_services/main.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
var msgObject = require("../../../_helper/alertBase");
var image = require("../../../_helper/config");
import { Item } from "../../../models/item";

@Component({
  templateUrl: "productDetail.component.html",
  styleUrls: ["product.css"]
})
export class ProductDetailComponent implements OnInit {
  productForm: FormGroup;
  category: any = [];
  product: Item;
  itemImages = [];
  formData = new FormData();
  selectedFile = null;
  loading = false;
  loadingForm = true;
  isEnableEdit = false;
  buttonCaption = "Edit Product";
  subCategory: any = [];
  submitted = false;
  returnUrl: string;
  showImageClearButton = false;
  shopId: any;
  urls = [];
  products = [];
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
  }

  get f() {
    return this.productForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.loading = true;

    this.formData.append("name", this.f.name.value);
    this.formData.append("price", this.f.price.value);
    this.formData.append("weight", this.f.weight.value);
    this.formData.append("definition", this.f.definition.value);
    this.formData.append("subCategoryId", this.f.subCategory.value);
    this.formData.append("defaultImg", this.f.defaultImg.value);
    this.formData.append("shopId", this.shopId);
    this.formData.append("id", this.f.id.value);
    this.formData.append("isUpdate", this.f.isUpdate.value);

    this.mainService.currentUser.subscribe((user: any) => {
      this.mainService.addProduct(this.formData).subscribe(
        data => {
          this.loading = false;
          if (data.error) this.msg = msgObject.danger(data.msg);
          else {
            this.productForm.reset();
            this.formData = new FormData();
            this.urls = [];
            this.msg = msgObject.success(msgObject.successUpdate("Product"));
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

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ["", Validators.required],
      price: ["", Validators.required],
      weight: ["", Validators.required],
      definition: ["", Validators.required],
      category: ["", Validators.required],
      subCategory: ["", Validators.required],
      id: ["", Validators.required],
      isUpdate: [true, Validators.required],
      defaultImg: ["", Validators.required]
      //city: ["", Validators.required]
    });
    this.activatedRoute.paramMap.subscribe(param => {
      const productId = +param.get("id");
      if (productId) {
        this.getProductById(productId);
      }
    });
    //this loads all the cities from the service

    this.productForm.disable();
  }
  loadCategory(id) {
    this.mainService.getCategory().subscribe(data => {
      this.category = data;
      this.productForm.controls.category.patchValue(id);
    });
  }
  getProductById(id: number) {
    this.mainService.getProductById(id).subscribe((data: any) => {
      this.loadingForm = false;
      //I'm basically iterating through the item images and adding server's relative path to them
      data.ItemImages.forEach(item => {
        item.path = image.getImageItem(item.path);
      });
      this.itemImages = data.ItemImages;
      this.editProduct(data), (err: any) => console.log(err);
    });
  }

  enableForm() {
    if (!this.isEnableEdit) {
      this.productForm.enable();
      this.buttonCaption = "Disable Edit";
      this.isEnableEdit = true;
    } else {
      this.productForm.disable();
      this.buttonCaption = "Edit Product";
      this.isEnableEdit = false;
    }
  }

  editProduct(product: any) {
    this.loadingForm = false;
    this.productForm.patchValue({
      name: product.name,
      price: product.price,
      weight: product.weight,
      definition: product.definition,
      category: product.category,
      subCategory: product.SubCategoryId,
      id: product.id,
      defaultImg: product.defaultImg
    });
    const categoryId = product.SubCategory ? product.SubCategory.CategoryId : 1;
    this.mainService.getSubCategoryByCategory(categoryId).subscribe(data => {
      this.subCategory = data;
      console.log(data);
      this.productForm.controls.subCategory.patchValue(product.SubCategoryId);
    });

    this.loadCategory(categoryId);
  }
  deleteImage(id: number) {
    if (id) {
      this.mainService.deleteImage(id).subscribe((hasNotDeleted: Boolean) => {
        if (!hasNotDeleted)
          this.itemImages = this.itemImages.filter(image => image.id != id);
      });
    }
  }
  getSubCategory(event) {
    this.loadingForm = true;
    this.mainService
      .getSubCategoryByCategory(event.target.value)
      .subscribe(data => {
        this.subCategory = data;
        this.loadingForm = false;
        if (data.length > 0) {
          this.productForm.controls.subCategory.patchValue(
            this.subCategory[0].id
          );
        }
      });
  }
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? "icon-arrow-down" : "icon-arrow-up";
  }
  clearImage(): void {
    this.urls = [];
    this.showImageClearButton = false;
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      this.formData.append("photos", event.target.files[0]);
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          console.log(event.target.result);
          this.urls.push(event.target.result);
          this.showImageClearButton = true;
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
}
