import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private URL = "http://localhost:3000/PASD";

  constructor(private http: HttpClient, private router: Router) { }

  signUp(user: any) {
    return this.http.post<any>(this.URL + "/registro", user);
  }

  signIn(user: any) {
    return this.http.post<any>(this.URL + "/login", user);
  }

  logout() {
    if(sessionStorage.getItem("authorization")){
      sessionStorage.removeItem("authorization");
      this.router.navigate(["/"])
    }
  }

  loggedIn(): Boolean {
    return !!sessionStorage.getItem("authorization");
  }
}
