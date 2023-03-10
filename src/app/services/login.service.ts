import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "../models/user";
import { LoggedInUser } from "../models/logged-in-user";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  // Url for login
  private url =
    "https://developer.webstar.hu/rest/frontend-felveteli/v2/authentication/";

  // Required headers defined by the specification
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Applicant-Id": "9Vp6sAea",
    }),
  };
  private user = new BehaviorSubject<LoggedInUser | null>(null);
  user$ = this.user.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem("user");
    this.user = storedUser !== null ? JSON.parse(storedUser) : null;
  }

  // Actual HTTP request
  login(username: string, password: string) {
    return this.http
      .post<User>(this.url, { username, password }, this.httpOptions)
      .pipe(
        tap((res) => this.handleLogin(res)),
        catchError(this.handleError)
      );
  }

  // Sets user data and store acces_token in local storage
  private handleLogin(data: User): void {
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    const loggedInUser = new LoggedInUser(
      data.user.email,
      data.user.firstName,
      data.user.lastName
    );
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    this.user.next(loggedInUser);
  }

  // Displays the error for both the user and the developer
  private handleError(res: HttpErrorResponse) {
    switch (res.status) {
      case 400:
        console.log("LoginServie: 400 - No Applicant-Id");
        return throwError("Nincs ApplicantId");
      case 405:
        console.log("LoginServie: 405 - Method Not Allowed");
        return throwError("Nincs jogosults??god");
      case 500:
        console.log("LoginServie: 405 - Authentication failed");
        return throwError("Sikertelen azonos??t??s");
      default:
        console.log("LoginServie: Unknown error");
        return throwError("V??ratlan hiba t??rt??nt");
    }
  }

  // Clear local storage
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }
}
