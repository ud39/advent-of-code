import { Component, OnInit, Input} from '@angular/core';
import { NumericRange } from '../types'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})


export class CardComponent implements OnInit{
  @Input() day: number = 0;

  adventDay: NumericRange<1, 24>[] = []
  year: number = 0
  solutions: String[] = []

  constructor() {}

  ngOnInit(): void {
    const currentDate = new Date()
    this.year = currentDate.getFullYear()
    this.solutions = []
  }
}

