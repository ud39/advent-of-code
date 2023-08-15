import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Language, Solution } from "../interfaces/interface";
import { NumericRange, CardContents, AvailableSolutions} from "../types";
import { Observable, forkJoin } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  cards: number[] = [];
  languages: string[] = [];
  year: NumericRange<2015, typeof recentYear> = recentYear;
  recentYear: number = recentYear;
  cardContents: CardContents = {};
  avaiableSolutions: AvailableSolutions = {}

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    this.getNumberOfSolutions().subscribe({
      next: ([languages, solutions]) => {
        this.cards = Array.from(
          new Set(solutions.map((solution) => solution.day)),
        ).sort((a, b) => a - b);

        solutions.sort((a, b) => a.language_id - b.language_id)

        for (const { day, language_id, code } of solutions) {
          for (const { id, language, logo} of languages) {
            if (id === language_id) {
              let cardContent: CardContents[number] extends Array<infer U>
                ? U
                : never = { code: code , language: language, language_id};
              if (this.cardContents[day] === undefined) {
                this.cardContents[day] = [cardContent];
                this.avaiableSolutions[day] = [logo]
              } else {
                this.cardContents[day].push(cardContent);
                this.avaiableSolutions[day].push(logo);
              }
            }
          }
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getNumberOfSolutions(
    year: number = recentYear,
  ): Observable<[Language[], Solution[]]> {
    const credentials = btoa("foo:bar");
    const headers = new HttpHeaders().set(
      "Authorization",
      `Basic ${credentials}`,
    );
    const params = new HttpParams().set("year", year);

    const languages = this.http.get<Language[]>(
      `http://localhost:8000/solutions_logos`,
      { headers, params },
    );
    const solutions = this.http.get<Solution[]>(
      `http://localhost:8000/solutions`,
      { headers, params },
    );

    return forkJoin([languages, solutions]);
  }
}

const recentYear: number = new Date().getFullYear() - 2;
