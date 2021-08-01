import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Title } from '@angular/platform-browser';
import { UsuarioService } from 'src/app/services/login/usuario.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/services/game/game.service';


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
  public haspoll = false;
  paramsSubscription: Subscription = new Subscription;

  constructor(private titleService: Title,public loginService:LoginService, private usuarioService: UsuarioService, private route: ActivatedRoute, private gameService: GameService) {
    this.titleService.setTitle("")
  };

  ngOnInit(): void {
    this.getIdentidad();
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.idUser = params['id'];
      console.log(this.idUser);
    })
    this.getAllData(this.idUser);
    this.obtenerDoctor(this.idUser)
    this.verifyPoll();
  }

  getIdentidad() {
    this.loginService.getIdentity().subscribe(
      res => {
        this.role = res.rol;
      },
      err => {
        console.error(err);
      }
    );
  }

  verifyPoll() {
    this.gameService.verifyPoll().subscribe(
      res => {
        switch (res.message) {
          case "El usuario tiene una encuesta":
            this.haspoll = true;
            break;
          case "El usuario no tiene encuesta":
            this.haspoll = false;
            break;
        }

        console.log("HAS POLL: " + this.haspoll)
      },
      err => console.error(err)
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
