import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';
import { Title } from '@angular/platform-browser';

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
  }]
  constructor(private gameService: GameService, private titleService: Title) {
    this.titleService.setTitle("Mis Juegos");
  }

  ngOnInit(): void {
    this.verifyMyGames();
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
}
