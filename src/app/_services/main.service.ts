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

  // addShop(fd) {
  //   console.log(fd);
  //   return this.http.post(`${this.url}/shop`, fd);
  // }
  addShop(fd) {
    return this.http.post<any>(`${this.url}/shop`, fd).pipe(
      map(shop => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        // localStorage.setItem("currentUser", JSON.stringify(user));
        //this.currentUserSubject.next(user);
        return shop;
      })
    );
  }

  addProduct(fd) {
    return this.http.post<any>(`${this.url}/item/upload`, fd).pipe(
      map(product => {
        return product;
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
  getShopType() {
    return this.http.get(`${this.url}/shopType`);
  }
}
