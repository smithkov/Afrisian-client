import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";
import { MustMatch } from "../../_helper/must-match.validator";
import { AlertFactory } from "../../_helper/alert";
import { AuthenticationService } from "../../_services/authentication.service";
import { Alert } from "selenium-webdriver";
var msgObject = require("../../_helper/alertBase");

@Component({
  selector: "app-dashboard",
  templateUrl: "register.component.html"
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  msgDisplay: object;
  msg: object;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.msg = msgObject.default;
    // this.msg = {
    //   show: true,
    //   message: "yeah",
    //   decorator: "alert alert-success"
    // };
    // this.msg = new AlertFactory();
    // this.msgDisplay = this.msg.getSuccess("hwhhwh");
    // console.log(this.msg.getSuccess("hwhhwh"));
    // AlertFactory.
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        firstname: ["", Validators.required],
        surname: ["", Validators.required],
        email: ["", Validators.required],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required]],
        roleId: ["seller", [Validators.required]]
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    //this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          if (data.error) {
            //this.msg.getWarning(data.msg);
            this.msg = msgObject.danger(data.msg);
          }

          //this.alertService.success("Registration successful", true);
          else this.router.navigate(["/dashboard"]);
        },
        error => {
          this.loading = false;
          this.msg = msgObject.danger(error.error.msg);
        }
      );
  }
}
