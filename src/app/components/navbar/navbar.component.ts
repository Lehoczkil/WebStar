import { Component } from "@angular/core";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  username = '';

  constructor(private loginService: LoginService) {}

  // Gets username
  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    const user = storedUser !== null ? JSON.parse(storedUser) : null;
    this.username = user.firstName + ' ' + user.lastName;
  }

  // Logout the user, the service redirects to the login page
  handleLogout() {
    this.loginService.logout();
  }

}
