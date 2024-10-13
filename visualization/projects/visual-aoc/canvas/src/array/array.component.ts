import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
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
      state('enabled', style({ color: 'red', opacity: 1 })), // Define state for 'enabled'
      state('disabled', style({ color: 'blue', opacity: 1 })), // Define state for 'disabled'

      transition('enabled <=> disabled', [animate('300ms')]),
    ]),
  ],
})
export default class ArrayComponent implements AfterViewInit {
  @ViewChild('array') array!: ElementRef<HTMLUListElement>;
  isAnimationEnabled: boolean = false;
  inputArray: number[] = [1, 2, 3, 4];

  constructor() {}

  ngAfterViewInit(): void {}

  toogleAnimation() {
    this.isAnimationEnabled = !this.isAnimationEnabled;
  }
}

// Bootstrapping the application
bootstrapApplication(ArrayComponent, {
  providers: [provideAnimations()],
});
