import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";

export interface searchForm {
  searchTerm: string | number;
}

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  @Output() searchTerm: EventEmitter<searchForm> =
    new EventEmitter<searchForm>();

  onSubmit(form: NgForm): void {
    this.searchTerm.emit(form.value);
    form.resetForm();
  }
}
