import {
  Component,
  Output,
  Input,
  EventEmitter,
  AfterViewInit,
  ViewChildren,
  QueryList,
} from "@angular/core";
import { Tag } from "../models/tag.model";
import TagComponent from "./TagComponent";

@Component({
  selector: "app-fieldset",
  templateUrl: "./fieldset.component.html",
})
export default class FieldsetComponent implements AfterViewInit {
  @Output() selectedTagsOutput: EventEmitter<string[]> = new EventEmitter<
    string[]
  >();

  @Input() availableTags: Tag[] = [];

  @Input() fieldsetType?: "languages" | "algorithm";

  @ViewChildren(TagComponent) tagComponents!: QueryList<TagComponent>;

  handleTagSelection(tag: Tag): void {
    if (tag.selected) this.availableTags.push(tag);
    const index = this.availableTags.findIndex(
      (availableTag) => (availableTag.id = tag.id)
    );
    if (index !== -1) this.availableTags.splice(index, 1);
  }

  ngAfterViewInit(): void {
    this.tagComponents.forEach((tagComponent) => {
      const nativeCheckbox = tagComponent.tagCheckbox.nativeElement;
    });
  }
}
