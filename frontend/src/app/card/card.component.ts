import { Component, OnInit, Input} from '@angular/core';
import { NumericRange, CardContent } from '../types'
import { Language } from '../interfaces/interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})


export class CardComponent implements OnInit{
  @Input() day: number = 0;
  @Input() recentYear: number = 0;
  @Input() languages: Language[] = []
  @Input() logos: string[] = []
  @Input() cardContents: Array<CardContent> = []

  selectedLanguage: Partial<CardContent> = {}

  adventDay: NumericRange<1, 24>[] = []
  year: number = 0
  solutions: String[] = []

  constructor() {}

  ngOnInit(): void {
    this.year = this.recentYear
    this.solutions = []
    this.logos = this.logos.map(logo => svgSize(logo, 24))
    this.selectedLanguage = this.cardContents[0]

  }

  changeSolution(event: Event) {
    const clickedSolution = event.currentTarget as HTMLElement
    const clickedSolutionID = clickedSolution.getAttribute('id')?.split('-')[1]

    if (clickedSolutionID) {
      this.selectedLanguage = this.cardContents[Number(clickedSolutionID)]
    }


  }
}

function svgSize(svg: string, size: number) {
  svg = svg.replace(/width="\d+px"|height="\d+px"/g, `width="${size}px" height="${size}px"`);
  return svg;
}

