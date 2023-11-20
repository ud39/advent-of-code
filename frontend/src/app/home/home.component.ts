import { Component, OnInit, Input } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Language, Solution, InputData } from "../interfaces/interface";
import { NumericRange, CardContents, AvailableSolutions } from "../types";
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  map,
  of,
} from "rxjs";
import { searchForm } from "../search/search.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  @Input() searchTerm: string = "";
  isLoading: boolean = true;
  cards: number[] = [];
  languages: string[] = [];
  year: NumericRange<2015, typeof recentYear> = recentYear;
  recentYear: number = recentYear;
  cardContents: CardContents = {};
  avaiableSolutions: AvailableSolutions = {};
  inputData: { [day: number]: string } = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getNumberOfSolutions().subscribe({
      next: ([languages, solutions, inputs]) => {
        this.cards = Array.from(
          new Set(solutions.map((solution) => solution.day))
        ).sort((a, b) => a - b);

        this.inputData = {};
        inputs
          .map((input) => ({ [input.day]: input.title.split("---")[1] }))
          .forEach((obj) => {
            const key = Object.keys(obj)[0];
            this.inputData[Number(key)] = Object.values(obj)[0];
          });

        solutions.sort((a, b) => a.language_id - b.language_id);

        for (const { day, language_id, code } of solutions) {
          for (const { id, language, logo } of languages) {
            if (id === language_id) {
              let cardContent: CardContents[number] extends Array<infer U>
                ? U
                : never = { code: code, language: language, language_id };
              if (this.cardContents[day] === undefined) {
                this.cardContents[day] = [cardContent];
                this.avaiableSolutions[day] = [logo];
              } else {
                this.cardContents[day].push(cardContent);
                this.avaiableSolutions[day].push(logo);
              }
            }
          }
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getNumberOfSolutions(
    year: number = recentYear
  ): Observable<[Language[], Solution[], InputData[]]> {
    const credentials = btoa("foo:bar");
    const headers = new HttpHeaders().set(
      "Authorization",
      `Basic ${credentials}`
    );
    const params = new HttpParams().set("year", year);

    const languages$ = this.http.get<Language[]>(
      `http://localhost:8000/solutions_logos`,
      { headers, params }
    );
    const solutions$ = this.http.get<Solution[]>(
      `http://localhost:8000/solutions`,
      { headers, params }
    );

    const inputData$ = this.http.get<InputData[]>(
      `http://localhost:8000/inputs`,
      { headers, params }
    );

    return forkJoin([languages$, solutions$, inputData$]);
  }

  searchChallenge(searchForm: searchForm) {
    type searchFormShape<T> = {
      [K in keyof T]: T[K] | undefined;
    };
    const searchTerm$: Observable<searchFormShape<searchForm>> = of(searchForm);

    searchTerm$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map((term) => (typeof term === "string" ? term : null))
      )
      //TODO search for challenges that fits the input
      .subscribe();
  }
}

const recentYear: number = new Date().getFullYear() - 2;
