import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public game = {
    response:""
  }
  constructor() { }

  ngOnInit(): void {
  }


  submitResponse(){
    console.log(this.game)
  }
}
