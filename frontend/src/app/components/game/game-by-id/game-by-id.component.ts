import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
import { QuestionService } from 'src/app/services/question/question.service';
import { UserResponseService } from 'src/app/services/user-response/user-response.service';
import { UserResultService } from 'src/app/services/user-result/user-result.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game-by-id',
  templateUrl: './game-by-id.component.html',
  styleUrls: ['./game-by-id.component.css']
})
export class GameByIdComponent implements OnInit {
  public gamenumber = 0;
  public gameid = "";
  public game = {
    response: ""
  }
  public myid = "";

  public question = {
    _id: "",
    numero: 0,
    pregunta: "Cargando...",
    imagen: "",
    respuesta: [],
    juego: "",
  };
  

  paramsSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private questionService: QuestionService,
    private router: Router,
    private loginService: LoginService,
    private userResponseService: UserResponseService,
    private userResultService: UserResultService
  ) {
    this.titleService.setTitle("Juego");
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.gamenumber = params['number'];
      this.gameid = params["idjuego"]
    });

    this.getQuestion(this.gameid,this.gamenumber);
    this.getIdentity();
  }

  getIdentity() {
    this.loginService.getIdentity().subscribe(
      res => {
        this.myid = res.sub;
      },
      err => {
        console.error(err);
      }
    )
  }

  getQuestion(gameid:any,number:Number) {
    this.questionService.getQuestionPollByNumber(gameid,number).subscribe(
      res => {
        this.question = res;
        console.log(res);
      },
      err => {
        console.error(err);
      }
    )
  }

  submitResponse() {
    if (this.game.response === "") return Swal.fire("Error", "Debe seleccionar una opción", "error")
    console.log(this.game.response);
    const newResponse = {
      usuario: this.myid,
      respuesta: {
        pregunta: this.question._id,
        respuesta: this.game.response
      }
    }

    console.log(newResponse);

    this.userResponseService.submitUserResponse(newResponse).subscribe(
      res => {
        console.log(res);
        const newNumber = Number(this.gamenumber);
        if (newNumber === 10) {
          
          this.userResultService.submitUserCommonResult(this.question._id).subscribe(
            res2 => {
              console.log(res2);
              Swal.fire({
                title: 'Su prueba ha finalizado',
                text: 'Su calificación es: '+res2.resultado,
                icon: 'success',
                confirmButtonText: 'Aceptar'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(["/my-user/game"]);
                  console.log("FUNCIONAAAAA");
                }
              })
            },
            err2 => {
              console.error(err2);
            }
          )
          
        } else {
          const realNewNumber = newNumber + 1;
          console.log(realNewNumber);

          this.router.navigate(["/my-user/game/game-by-id/"+this.gameid+"/" + realNewNumber]);
          this.gamenumber = realNewNumber;
          this.getQuestion(this.gameid,realNewNumber);
        }
      },
      err => {
        switch (err) {
          case "El usuario ya ha respondido esta pregunta":
            Swal.fire("Error", "El usuario ya ha respondido esta pregunta", "error");
            break;
        }
        console.error(err);
      }
    )
  }
}
