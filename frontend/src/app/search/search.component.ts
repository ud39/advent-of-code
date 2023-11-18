import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  searchTerm: string = "";

  onSubmit(form: NgForm) {
    form.resetForm();
  }
}
