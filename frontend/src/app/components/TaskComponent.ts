import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-task",
    templateUrl: "./task.component.html",
    standalone: false
})
export default class TaskComponent {
  /**
   * The shape of the task object
   */
  @Input() task: any;

  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onPinTask = new EventEmitter<Event>();

  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onArchiveTask = new EventEmitter<Event>();
}
