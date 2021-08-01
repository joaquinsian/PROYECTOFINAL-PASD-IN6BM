import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService{
  private URL = "http://localhost:3000/PASD";

  constructor(private http: HttpClient, private router: Router){}
}
