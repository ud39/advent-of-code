import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Language, Solution, InputData } from "../interfaces/interface";
import { NumericRange, CardContents, AvailableSolutions } from "../types";
import { Observable, debounceTime, forkJoin } from "rxjs";

type searchFormShape<T> = {
  [K in keyof T]: T[K] | undefined;
};

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  selectedYear: number = recentYear;
  isLoading: boolean = true;
  cards: number[] = [];
  initialCards: number[] = [];
  languages: string[] = [];
  year: NumericRange<2015, typeof recentYear> = recentYear;
  cardContents: CardContents = {};
  availableSolutions: AvailableSolutions = {};
  inputData: { [day: number]: string } = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData(recentYear);
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

  loadData(year: number): void {
    this.availableSolutions = {};
    this.cardContents = {};
    this.inputData = {};
    this.isLoading = true;

    this.getNumberOfSolutions(year)
      .pipe(debounceTime(1000))
      .subscribe({
        next: ([languages, solutions, inputs]) => {
          this.cards = Array.from(
            new Set(solutions.map((solution) => solution.day))
          ).sort((a, b) => a - b);

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
                  this.availableSolutions[day] = [logo];
                } else {
                  this.cardContents[day].push(cardContent);
                  this.availableSolutions[day].push(logo);
                }
              }
            }
          }
          this.isLoading = false;
          this.initialCards = [...this.cards];
          console.log(this.cardContents);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  searchChallenge(searchTerm: string) {
    if (!searchTerm) this.cards = this.initialCards;

    const matchingChallenges: Array<number> = Object.keys(this.inputData)
      .map((key) => Number(key))
      .filter((key) => this.inputData[key].toLowerCase().includes(searchTerm));

    this.cards = matchingChallenges;
  }

  setYear(selectedYear: number) {
    this.selectedYear = selectedYear;
    this.loadData(selectedYear);
  }
}

const recentYear: number = new Date().getFullYear() - 2;
