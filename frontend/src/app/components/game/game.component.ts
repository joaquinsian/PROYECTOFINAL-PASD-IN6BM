import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';
import { Title } from '@angular/platform-browser';
import { UserResultService } from 'src/app/services/user-result/user-result.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  public level = "";
  public games = [{
    _id: "",
    nivel: ""
  }];

  public scores = {
    easy: "",
    medium: "",
    hard: ""
  }

  constructor(
    private gameService: GameService,
    private titleService: Title,
    private userResultService: UserResultService,
  ) {
    this.titleService.setTitle("Mis Juegos");
  }

  ngOnInit(): void {
    this.verifyMyGames();
    this.getMyScores();
  }

  verifyMyGames() {
    this.gameService.verifyRequiredGames().subscribe(
      res => {
        this.games = res;
        console.log(this.games);
        switch (res.length) {
          case 1:
            this.level = "low";
            break;
          case 2:
            this.level = "medium";
            break;
          case 3:
            this.level = "high";
            break;
        }
        console.log(this.level)
      },
      err => { console.error(err) }
    )
  }

  getMyScores() {
    this.userResultService.getMyScores().subscribe(
      res => {
        console.log(res);
        res.forEach(x => {
          switch (x.juego.nivel) {
            case "facil":
              console.log("Es facil");
              this.scores.easy = x.resultado;
              break;
            case "medio":
              console.log("Es medio");
              this.scores.medium = x.resultado;
              break;
            case "dificil":
              console.log("Es dificil");
              this.scores.hard = x.resultado;
              break;
          }
        });
      },
      err => {
        console.error(err);
      }
    )
  }

}
