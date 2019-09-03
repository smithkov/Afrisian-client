import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
var config = require("../_helper/config");

import { User } from "../models/user";

@Injectable({ providedIn: "root" })
export class MainService {
  url: string = config.development.url;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
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
  getCity() {
    return this.http.get(`${this.url}/city`);
  }
  getShopType() {
    return this.http.get(`${this.url}/shopType`);
  }
}
