import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { NumericRange } from "../types";

@Component({
    selector: "app-year-selector",
    templateUrl: "./year-selector.component.html",
    styleUrls: ["./year-selector.component.scss"],
    standalone: false
})
export class YearSelectorComponent implements OnInit {
  @Output() selectedYear: EventEmitter<NumericRange<2015, typeof recentYear>> =
    new EventEmitter<NumericRange<2015, typeof recentYear>>();

  year: number = recentYear;

  availableYears: number[] = [];
  ngOnInit() {
    const startYear = 2015;
    this.availableYears = Array(recentYear - startYear + 2)
      .fill(startYear)
      .map((year, index) => year + index);
  }

  selectYear(): void {
    this.selectedYear.emit(this.year);
  }
}

const recentYear: number = new Date().getFullYear() - 2;
