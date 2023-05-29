import { Component } from '@angular/core';
import { NumericRange } from '../types'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})


export class CardComponent {

  adventDay: NumericRange<1, 24>[] = []
  year: number = 0
  solutions: String[] = []

  ngOnInit() {
    const currentDate = new Date()
    this.year = currentDate.getFullYear()
    this.solutions = ['C', 'C']
    this.adventDay = []
  }

}
