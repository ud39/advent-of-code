import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  state,
  useAnimation,
} from '@angular/animations';
import { NgFor } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { colorChangeAnimation } from '../animations';

@Component({
  selector: 'lib-array',
  standalone: true,
  imports: [NgFor],
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.css'],
  animations: [
    trigger('listAnimation', [
      state('enabled', style({ color: 'red' })),
      state('disabled', style({ color: 'blue' })),
      transition('enabled <=> disabled', [
        useAnimation(colorChangeAnimation, {
          params: { fromColor: 'red', toColor: 'blue' },
        }),
      ]),
    ]),
    trigger('startInsertElement', [
      state('start', style({ color: 'yellow' })),
      state('end', style({ color: 'black' })),
      transition('start <=> end', [animate('100ms')]),
    ]),
  ],
})
export default class ArrayComponent implements AfterViewInit {
  @ViewChild('array') array!: ElementRef<HTMLUListElement>;
  animationEnabled: boolean = false;
  startInsertElement: boolean = false;
  inputArray: { value: number; animationState: 'start' | 'end' }[] = [
    { value: 1, animationState: 'end' },
    { value: 2, animationState: 'end' },
    { value: 3, animationState: 'end' },
    { value: 4, animationState: 'end' },
  ];

  constructor() {}

  ngAfterViewInit(): void {}

  addElement(num: number = 1337): void {
    this.inputArray.push({ value: num, animationState: 'start' });
    this.triggerInsertLastElementAnimation(num);
  }

  toogleAnimation() {
    this.animationEnabled = !this.animationEnabled;
  }

  sleep = (delay: number = 1000) => {
    setTimeout(() => {}, delay);
  };

  triggerInsertElementAnimation(
    num: number = 0,
    delay: number = 1000,
    index: number = 0,
  ): void {
    const addedElement: { value: number; animationState: 'start' | 'end' } = {
      value: num,
      animationState: 'start',
    };
    this.inputArray.splice(index, 1, addedElement);
    setTimeout(() => {
      addedElement.animationState = 'end';
    }, delay);
  }

  triggerElementHighlightAnimation(
    elem: {
      value: number;
      animationState: 'start' | 'end';
    },
    delay: number = 1000,
  ): void {
    setTimeout(() => {}, delay);
  }

  triggerRemoveElementAnimation(delay: number = 1000, index: number = 0): void {
    const removeElements = this.inputArray.slice(0);
    removeElements.map((elem) => {
      elem.animationState = 'start';
    });

    setTimeout(() => {
      removeElements.map((elem) => {
        elem.animationState = 'end';
      });
    }, delay);
  }

  triggerInsertLastElementAnimation(num: number, delay: number = 1000): void {
    const addedElement = this.inputArray[this.inputArray.length - 1];
    setTimeout(() => {
      if (addedElement) addedElement.animationState = 'end';
    }, delay);
  }
}

// Bootstrapping the application
bootstrapApplication(ArrayComponent, {
  providers: [provideAnimations()],
});
