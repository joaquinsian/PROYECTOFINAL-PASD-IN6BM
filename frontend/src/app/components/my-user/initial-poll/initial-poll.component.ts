import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { QuestionService } from 'src/app/services/question/question.service';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';
import { UserResponseService } from 'src/app/services/user-response/user-response.service';
import { UserResultService } from 'src/app/services/user-result/user-result.service';

@Component({
  selector: 'app-initial-poll',
  templateUrl: './initial-poll.component.html',
  styleUrls: ['./initial-poll.component.css']
})
export class InitialPollComponent implements OnInit {
  paramsSubscription: Subscription = new Subscription();

  public myid = "";

  public gamenumber = 0;
  public game = {
    response: ""
  }
  public question = {
    _id: "",
    numero: 0,
    pregunta: "Cargando...",
    imagen: "",
    respuesta: [],
    juego: "",
  };

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private questionService: QuestionService,
    private router: Router,
    private loginService: LoginService,
    private userResponseService: UserResponseService,
    private userResultService: UserResultService
  ) {
    this.titleService.setTitle("Encuesta Inicial");
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.gamenumber = params['number'];
    });

    this.getQuestion(this.gamenumber);
    this.getIdentity();
  }

  getQuestion(numero: Number) {
    this.questionService.getInitialPollByNumber(numero).subscribe(
      res => {
        this.question = res;
      },
      err => {
        console.error(err);
      }
    )
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

          this.userResultService.submitUserResult(this.question._id).subscribe(
            res2 => {
              console.log(res2);
              Swal.fire({
                title: 'Su prueba ha finalizado',
                text: 'Su calificación es: '+res2.resultado,
                icon: 'success',
                confirmButtonText: 'Aceptar'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(["/my-user"]);
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

          this.router.navigate(["/my-user/initial-poll/" + realNewNumber]);
          this.gamenumber = realNewNumber;
          this.getQuestion(realNewNumber);
        }
      },
      err => {
        console.error(err);
      }
    )
  }
}
