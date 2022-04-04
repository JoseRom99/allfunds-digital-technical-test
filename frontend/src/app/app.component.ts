import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  public toggled:boolean = false;

  toggleHamburguer(){
    this.toggled = !this.toggled;
  }
}
