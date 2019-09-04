import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
var config = require("../_helper/config");
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { User } from "../models/user";
import { Shop } from "../models/shop";
import * as fromRoot from "../reducer";
import * as fromShops from "../reducer/shop.reducer";
import * as fromUsers from "../reducer/user.reducer";
import * as ShopActions from "../actions/shop.action";
import * as UserActions from "../actions/user.action";
import * as AppActions from "../actions/user.action";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  url: string = config.development.url;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email, password, hasShop = true) {
    return this.http
      .post<any>(`${this.url}/login`, { email, password, hasShop })
      .pipe(
        map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.addUser(user.user);
          this.addShop(user.shop);
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  register(user: User) {
    return this.http.post<any>(`${this.url}/register`, user).pipe(
      map(userData => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("currentUser", JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.addUser(userData.user);
        return user;
      })
    );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
  //this is a method that pulls shop data from the store.

  addUser(newUser: User) {
    return this.store.dispatch(new UserActions.CreateUser(newUser));
  }
  addShop(newShop: Shop) {
    return this.store.dispatch(new ShopActions.CreateShop(newShop));
  }
}
