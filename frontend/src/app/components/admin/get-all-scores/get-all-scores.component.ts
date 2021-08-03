import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserResultService } from 'src/app/services/user-result/user-result.service';

@Component({
  selector: 'app-get-all-scores',
  templateUrl: './get-all-scores.component.html',
  styleUrls: ['./get-all-scores.component.css']
})
export class GetAllScoresComponent implements OnInit {
  public results = [];

  constructor(
    private titleService: Title,
    private userResultService:UserResultService
    ) {
      this.titleService.setTitle("Todos los resultados");
    }

  ngOnInit(): void {
    this.obtenerResultados();
  }

  obtenerResultados(){
    this.userResultService.getAllScores().subscribe(
      res => {
        this.results = res;
        console.log(this.results)
      },
      err =>{
        console.error(err);
        
      }
    )
  }
}
