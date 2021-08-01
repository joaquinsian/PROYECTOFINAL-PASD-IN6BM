import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public game = {
    response:""
  }
  constructor(gameService:GameService) { }

  ngOnInit(): void {
  }


  submitResponse(){
    console.log(this.game)
  }
}
