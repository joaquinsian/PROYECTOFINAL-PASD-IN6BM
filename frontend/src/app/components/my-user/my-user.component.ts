import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Title } from '@angular/platform-browser';
import { UsuarioService } from 'src/app/services/login/usuario.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-my-user',
  templateUrl: './my-user.component.html',
  styleUrls: ['./my-user.component.css']
})
export class MyUserComponent implements OnInit {
  idUser = "";
  public role="";
  public user = {
    nombre: "",
    foto: "",
    descripcion: ""
  };
  public doc = [];
  paramsSubscription: Subscription = new Subscription;

  constructor(private titleService: Title,public loginService:LoginService, private usuarioService: UsuarioService, private route: ActivatedRoute) {
    this.titleService.setTitle("Mi Usuario");
  }

  ngOnInit(): void {
    this.getIdentidad();
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.idUser = params['id'];
      console.log(this.idUser);
    })
    this.getAllData(this.idUser);
    this.obtenerDoctor(this.idUser)
  }

  getIdentidad(){
    this.loginService.getIdentity().subscribe(
      res => {
        this.role = res.rol;
      },
      err => {
        console.error(err);
      }
    );

  }

  getAllData(newid: any){
    this.usuarioService.obtenerUsuarioId(this.idUser).subscribe(
      res => {
        this.user.nombre = res.usuarioEncontrado.nombre;
        this.user.foto = res.usuarioEncontrado.foto;
        this.user.descripcion = res.usuarioEncontrado.descripcion;
      },
      err => {
        console.error(err);
      }
    )
  }

  obtenerDoctor(newid: any){
    this.usuarioService.obtenerDoctor(this.idUser).subscribe(
      res => {
        this.doc = res.resultado;
        console.log(this.doc);
      },
      err => {
        console.error(err);
      }
    )
  }
}
