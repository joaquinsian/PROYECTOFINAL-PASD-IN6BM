import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserResponseService {
  private URL = "https://pasd-backend.herokuapp.com/PASD";

  constructor(private http: HttpClient) { }

  submitUserResponse(response: any) {
    return this.http.post<any>(this.URL + "/respuesta_de_usuario", response);
  }
}
