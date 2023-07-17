import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Language, Solution} from '../interfaces/interface';
import { NumericRange } from '../types';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {

  cards: number[] = []
  languages: Language[] = []
  logos: string[] = []
  year: NumericRange<2015, typeof recentYear> = recentYear
  recentYear: number = recentYear

  constructor (private http : HttpClient) {}

  ngOnInit(): void{
    const numberOfSolutions: Set<number> = new Set() 

    this.getNumberOfSolutions().subscribe({
      next: ([languages, solutions]) => {
        this.cards = Array.from(new Set(solutions.map(solution => solution.day))).sort( (a, b) => a - b)
        this.logos = Array.from(new Set(languages.map(language => language.logo)))

        for (const {day, language_id} of solutions) {
          for (const {id, language} of languages) {
          }
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });


  }

  getNumberOfSolutions(year: number = recentYear): Observable<[Language[], Solution[]]> {

    const credentials = btoa('foo:bar')
    const headers = new HttpHeaders().set('Authorization', `Basic ${credentials}`)
    const params = new HttpParams().set('year', year)

    const languages = this.http.get<Language[]>(`http://localhost:8000/solutions_logos`, {headers, params})
    const solutions = this.http.get<Solution[]>(`http://localhost:8000/solutions`, {headers, params})

    return  forkJoin([languages, solutions])
  }
}

const recentYear: number = new Date().getFullYear() - 2
