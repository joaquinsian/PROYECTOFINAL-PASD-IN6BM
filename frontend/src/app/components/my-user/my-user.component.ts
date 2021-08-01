import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Title } from '@angular/platform-browser';
import { GameService } from 'src/app/services/game/game.service';


@Component({
  selector: 'app-my-user',
  templateUrl: './my-user.component.html',
  styleUrls: ['./my-user.component.css']
})
export class MyUserComponent implements OnInit {
  public role = "";
  public haspoll = false;
  public user = {
    nombre: ""
  };

  constructor(
    private titleService: Title,
    public loginService: LoginService,
    private gameService: GameService
  ) {
    this.titleService.setTitle("Mi Usuario");
  }

  ngOnInit(): void {
    this.getIdentidad();
    this.verifyPoll();
  }

  getIdentidad() {
    this.loginService.getIdentity().subscribe(
      res => {
        console.log(res);
        this.user = res;
        this.role = res.rol
      },
      err => console.error(err)
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
}
