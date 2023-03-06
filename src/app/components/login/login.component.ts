import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service";
import { MessageService } from "src/app/services/message.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  // Login form
  form = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), // Validates email address
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6), // Password length must be 6 characters at minimum
    ]),
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem("user")) {
      this.router.navigate(["/character-selection"]);
    }
  }

  login() {
    this.loginService
      .login(this.form.value.username!, this.form.value.password!)
      .subscribe(
        (_) => {
          this.messageService.clear(); // Delete the previous error message for the user
          this.router.navigate(["/character-selection"]);
        },
        (err: any) => this.messageService.write(err) // For displaying the error for both the user and the developer
      );
  }
}
