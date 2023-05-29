import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  cards: CardComponent[] = []

  ngOnInit(){
    this.cards = Array(24).fill(0)
  }

}
