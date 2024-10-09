import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgFor } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'lib-array',
  standalone: true,
  imports: [NgFor],
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.css'],
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        style({ opacity: 0 }), // Start from transparent
        animate('300ms', style({ opacity: 1 })), // Fade to opaque
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })), // Fade out
      ]),
    ]),
  ],
})
export default class ArrayComponent implements AfterViewInit {
  @ViewChild('array') array!: ElementRef<HTMLUListElement>;
  inputArray: number[] = [1, 2, 3, 4];

  constructor() {}

  ngAfterViewInit(): void {}

  sortArray() {
    this.inputArray.sort((a, b) => a - b);
  }
}

// Bootstrapping the application
bootstrapApplication(ArrayComponent, {
  providers: [provideAnimations()],
});
