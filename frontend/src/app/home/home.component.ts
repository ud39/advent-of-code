import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { CardComponent } from '../card/card.component';
import { Language, Solution, InputData } from '../interfaces/interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  cards: CardComponent[] = []


  constructor (private http : HttpClient) {}

  ngOnInit(): void{
    this.getNumberOfSolutions()

  }

  getNumberOfSolutions(): void {

    const credentials = btoa('foo:bar')
    const headers = new HttpHeaders().set('Authorization', `Basic ${credentials}`)

    this.http.get<Solution[]>('http://localhost:8000/', {headers})
      .subscribe({
      next: resp => {
        console.log(resp);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}

