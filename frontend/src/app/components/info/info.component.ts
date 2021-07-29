import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  paramsSubscription: Subscription = new Subscription;

  public iddocumento = "";
  myDate = new Date();

  public informacion = {
    titulo: "Eminem, lorem ipsum dolor imet",
    imagen: "https://eltiempolv.com/wp-content/uploads/2020/01/13255110_web1_eminemweb.jpg?w=700",
    parrafos: [
      {
        parrafo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris interdum, diam vulputate mollis lacinia, sem nulla varius urna, sit amet luctus dolor nibh volutpat sapien. Etiam ut velit quis sapien luctus finibus id eu urna. Pellentesque a massa sit amet est volutpat varius. Integer convallis elit eros, et placerat elit suscipit eget. Quisque tincidunt ipsum justo, at facilisis sapien elementum sit amet. Donec tincidunt dapibus dolor a elementum. Sed viverra massa est, ac consequat metuscondimentum in."
      },
      {
        parrafo: "Aliquam blandit, enim ut bibendum bibendum, enim purus gravida dolor, convallis pretium ex dolor quis nisl. In eu metus quis elit consectetur ullamcorper. Etiam semper congue turpis, et condimentum lorem convallis at. Vestibulum rutrum condimentum estsed sollicitudin. Phasellus gravida ex sed felis commodo tincidunt id ac tellus. Maecenas ac mi imperdiet, dictum diam a, mattis erat. Nam tincidunt congue suscipit."
      },
      {
        parrafo: "Cras vitae venenatis ante, efficitur euismod elit. Maecenas at varius velit, in lobortis dolor. Fusce id vulputate dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at bibendum augue. Morbi ut lacinia sem. Nullam leo erat, tincidunteu tempus et, rhoncus a lorem. Praesent nec hendrerit leo. Sed vitae turpis libero. Nullam vitae sem odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus neque risus, interdum et turpis non, feugiat sollicitudin felis. Mauriseleifend elit nec ullamcorper condimentum. Donec eu leo sed est aliquam laoreet. Proin vitae malesuada risus. Ut commodo sit amet urna euismod volutpat."
      },
      {
        parrafo: "Nam a leo ligula. Nullam non nulla ac justo aliquet euismod non eu ipsum. Morbi eleifend ante nec odio tincidunt, et tempus massa consectetur. Aenean id tristique orci. Quisque pulvinar purus dapibus nisl consectetur, ut ornare orci gravida. Sed at porttitor justo. Etiam porta fringilla nibh, sed consectetur augue laoreet ut. Fusce ut cursus nibh."
      }]
  }

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.iddocumento = params['id'];
    });
  }

}
