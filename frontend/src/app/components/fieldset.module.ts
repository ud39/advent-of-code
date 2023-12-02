import { CommonModule } from "@angular/common";

import FieldsetComponent from "./FieldsetComponent";
import TagComponent from "./TagComponent";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [CommonModule],
  exports: [TagComponent, FieldsetComponent],
  declarations: [TagComponent, FieldsetComponent],
  providers: [],
})
export class FieldsetModule {}
