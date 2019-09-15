import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
var config = require("../_helper/config");
import { Store } from "@ngrx/store";
import { User } from "../models/user";
import { AppState } from "./../app.state";
import * as ShopActions from "../actions/shop.action";
import { Shop } from "../models/shop";
import { Shops } from "../models/shops";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  url: string = config.development.url;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email, password, hasShop = true) {
    return this.http
      .post<any>(`${this.url}/login`, { email, password, hasShop })
      .pipe(
        map((user: any) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          let userData = { user: user.user, shop: user.shop };
          localStorage.setItem("currentUser", JSON.stringify(userData));
          this.currentUserSubject.next(userData);
          return user;
        })
      );
  }

  register(user: User) {
    return this.http.post<any>(`${this.url}/register`, user).pipe(
      map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        let userData = { user: user.user, shop: user.shop };
        localStorage.setItem("currentUser", JSON.stringify(userData));

        this.currentUserSubject.next(userData);
        return userData;
      })
    );
  }
  addShop(fd) {
    return this.http.post<any>(`${this.url}/shop`, fd).pipe(
      map(result => {
        let shop = result.data;
        this.currentUser.subscribe(user => {
          let userData = { user: user.user, shop: shop };
          localStorage.setItem("currentUser", JSON.stringify(userData));
          this.currentUserSubject.next(userData);
        });
        return shop;
      })
    );
  }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
  //this is a method that pulls shop data from the store.
}
