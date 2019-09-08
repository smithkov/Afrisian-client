import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { MainService } from "../../_services/main.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
var msgObject = require("../../_helper/alertBase");
var image = require("../../_helper/config");
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Item } from "../../models/item";

@Component({
  templateUrl: "product.component.html"
})
export class ProductComponent implements OnInit {
  modalRef: BsModalRef;
  @ViewChild("smallModal", { static: false }) public smallModal: ModalDirective;
  productForm: FormGroup;
  category: any = [];
  product: Item;
  formData = new FormData();
  selectedFile = null;
  loading = false;
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
      console.log("begining of shop id");
      console.log(this.shopId);
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
        let productArray = products.data;
        productArray.forEach(item => {
          item.defaultImg = image.getImageItem(item.defaultImg);
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
    this.formData.append("categoryId", this.f.category.value);
    this.formData.append("shopId", this.shopId);

    this.mainService.currentUser.subscribe((user: any) => {
      //fd.append("userId", user.id);
      this.mainService.addProduct(this.formData).subscribe(
        data => {
          this.loading = false;
          if (data.error) this.msg = msgObject.danger(data.msg);
          else {
            this.loadingTable = true;
            this.loadProducts();
            this.productForm.reset();
            this.formData = new FormData();
            this.urls = [];
            this.msg = msgObject.success(msgObject.successCreate("product"));
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
    this.productForm = this.formBuilder.group({
      name: ["", Validators.required],
      price: ["", Validators.required],
      weight: ["", Validators.required],
      definition: ["", Validators.required],
      category: ["", Validators.required]
      //city: ["", Validators.required]
    });

    //this loads all the cities from the service
    this.mainService.getCategory().subscribe(data => {
      this.category = data;
      this.productForm.controls.category.patchValue(this.category[0].id);
    });
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? "icon-arrow-down" : "icon-arrow-up";
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
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
}
