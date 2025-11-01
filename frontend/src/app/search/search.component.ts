import { Component, EventEmitter, Output, OnDestroy } from "@angular/core";
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
} from "rxjs";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"],
    standalone: false
})
export class SearchComponent implements OnDestroy {
  @Output() searchTermChange: EventEmitter<string> = new EventEmitter<string>();
  searchTermSubscribtion: Subscription = new Subscription();
  searchTerm: string = "";

  onInputChange(): void {
    const searchTerm$ = of(this.searchTerm);

    this.searchTermSubscribtion = searchTerm$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map((term) => term.toLocaleLowerCase()),
        filter((term) => term.length > 3 || term.length === 0)
      )
      .subscribe((term) => this.searchTermChange.emit(term));
  }

  ngOnDestroy(): void {
    this.searchTermSubscribtion.unsubscribe();
  }
}
