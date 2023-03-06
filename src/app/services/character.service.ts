import {
  HttpClient,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CharacterService {
  private url =
    "https://developer.webstar.hu/rest/frontend-felveteli/v2/characters/"; // url for geting the characters from the api
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Applicant-Id": "9Vp6sAea",
      "Application-Authorization": "Bearer" + localStorage.getItem("token"), // Authorize request
    }),
  };

  constructor(private http: HttpClient) {}

  // Get the characters back from the api as an object containing the characters key with a Character[] value
  getCharacters() {
    return this.http
      .get(this.url, this.httpOptions)
      .pipe(tap((_) => console.log("CharacterService: Fetched characters")));
  }
}
