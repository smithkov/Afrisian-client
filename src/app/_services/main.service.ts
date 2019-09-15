import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
var config = require("../_helper/config");

import { User } from "../models/user";
import { Shop } from "../models/shop";

@Injectable({ providedIn: "root" })
export class MainService {
  url: string = config.development.url;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private currentShopSubject: BehaviorSubject<Shop>;
  public currentShop: Observable<Shop>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();

    this.currentShopSubject = new BehaviorSubject<Shop>(
      JSON.parse(localStorage.getItem("currentShop"))
    );
    this.currentShop = this.currentShopSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  addProduct(fd) {
    return this.http.post<any>(`${this.url}/item/upload`, fd).pipe(
      map(product => {
        return product;
      })
    );
  }

  addCategory(fd) {
    return this.http.post<any>(`${this.url}/category/addUpdate`, fd).pipe(
      map(category => {
        return category;
      })
    );
  }

  addSubCategory(fd) {
    return this.http.post<any>(`${this.url}/subCategory/addUpdate`, fd).pipe(
      map(subCategory => {
        return subCategory;
      })
    );
  }

  shopByUser(userId: any) {
    return this.http
      .post<any>(`${this.url}/shop/getByUser`, { userId: userId })
      .pipe(
        map((shop: any) => {
          let data = shop.data;
          localStorage.setItem("currentShop", JSON.stringify(data));
          this.currentShopSubject.next(data);
          return data;
        })
      );
  }
  getCity() {
    return this.http.get(`${this.url}/city`);
  }
  getCategory() {
    return this.http.get(`${this.url}/category/list`).pipe(
      map((category: any) => {
        return category.data;
      })
    );
  }

  getSubCategoryByCategory(id) {
    return this.http
      .post(`${this.url}/subCategory/byCategory`, { categoryId: id })
      .pipe(
        map((subCategory: any) => {
          return subCategory.data;
        })
      );
  }

  getSubCategory() {
    return this.http.get(`${this.url}/subCategory/`).pipe(
      map((subCategory: any) => {
        return subCategory.data;
      })
    );
  }

  getProductById(id: number) {
    return this.http.get(`${this.url}/item/${id}`).pipe(
      map((product: any) => {
        console.log(product);
        return product.data;
      })
    );
  }

  getCategoryById(id: number) {
    return this.http.get(`${this.url}/category/${id}`).pipe(
      map((category: any) => {
        return category.data;
      })
    );
  }

  getSubCategoryById(id: number) {
    return this.http.get(`${this.url}/subCategory/${id}`).pipe(
      map((subCategory: any) => {
        console.log(subCategory);
        return subCategory.data;
      })
    );
  }

  getProductsByShop(shopId: any) {
    return this.http
      .post(`${this.url}/item/itemsByShop`, { shopId: shopId })
      .pipe(
        map((items: any) => {
          return items;
        })
      );
  }

  deleteItem(id: any) {
    return this.http.post(`${this.url}/item/delete`, { itemId: id }).pipe(
      map((result: any) => {
        return result.error;
      })
    );
  }

  deleteSubCategory(id: any) {
    return this.http.post(`${this.url}/subCategory/delete`, { id: id }).pipe(
      map((result: any) => {
        return result.error;
      })
    );
  }

  deleteImage(id: any) {
    return this.http.post(`${this.url}/image/delete`, { id: id }).pipe(
      map((result: any) => {
        return result.error;
      })
    );
  }
  getShopType() {
    return this.http.get(`${this.url}/shopType`);
  }
}
