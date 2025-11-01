import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { Tag } from "../models/tag.model";

@Component({
    selector: "app-tag",
    templateUrl: "./tag.component.html",
    standalone: false
})
export default class TagComponent implements AfterViewInit {
  @Input() tag?: Tag;

  @Output()
  selected = new EventEmitter<Boolean>();

  @ViewChild("tagCheckbox") tagCheckbox!: ElementRef;

  isChecked: boolean | undefined = this.tag?.selected;

  toggleSelection() {
    this.isChecked = !this.isChecked;
  }

  ngAfterViewInit(): void {
    this.isChecked = this.tagCheckbox.nativeElement.checked;
  }
}
