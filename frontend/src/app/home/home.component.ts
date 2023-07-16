import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Solution} from '../interfaces/interface';
import { NumericRange } from '../types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {

  cards: number[] = []
  year: NumericRange<2015, typeof recentYear> = recentYear

  constructor (private http : HttpClient) {}

  ngOnInit(): void{
    const solutions = this.getNumberOfSolutions(this.year)
    const numberOfSolutions: Set<number> = new Set() 

    solutions.subscribe({
      next: (resp: Solution[]) => {
        Array.from(resp).forEach( solution => {
          numberOfSolutions.add(solution.day)
        })
        this.cards = Array.from(numberOfSolutions).sort((a, b) => a - b);
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  getNumberOfSolutions(year: number): Observable<Solution[]> {

    const credentials = btoa('foo:bar')
    const headers = new HttpHeaders().set('Authorization', `Basic ${credentials}`)
    const params = new HttpParams().set('year', year)

    return this.http.get<Solution[]>(`http://localhost:8000/solutions`, {headers, params})
  }
}

const recentYear: number = new Date().getFullYear() - 2
