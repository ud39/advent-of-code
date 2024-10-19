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

type elementWithAnimationState = {
  value: number;
  animationState: 'start' | 'end' | 'transition';
};

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
  inputArray: elementWithAnimationState[] = [
    { value: 4, animationState: 'end' },
    { value: 3, animationState: 'end' },
    { value: 2, animationState: 'end' },
    { value: 1, animationState: 'end' },
  ];

  constructor() {}

  ngAfterViewInit(): void {}

  toogleAnimation() {
    this.animationEnabled = !this.animationEnabled;
  }

  triggerInsertElementAnimation(
    num: number = 0,
    delay: number = 1000,
    index: number = 0,
  ): Promise<void> {
    return new Promise((resolve) => {
      const addedElement: { value: number; animationState: 'start' | 'end' } = {
        value: num,
        animationState: 'start',
      };
      this.inputArray.splice(index, 1, addedElement);
      setTimeout(() => {
        addedElement.animationState = 'end';
        resolve();
      }, delay);
    });
  }

  triggerElementHighlightAnimation(
    elem: elementWithAnimationState,
    delay: number = 1000,
  ): Promise<void> {
    return new Promise((resolve) => {
      elem.animationState = 'start';
      setTimeout(() => {
        elem.animationState = 'end';
        resolve();
      }, delay);
    });
  }

  triggerRemoveElementAnimation(
    delay: number = 1000,
    startIndex: number = 1,
    endIndex: number = startIndex + 1,
  ): Promise<void> {
    return new Promise((resolve) => {
      const removeElements = this.inputArray.slice(startIndex, endIndex);
      removeElements.map((elem) => {
        elem.animationState = 'start';
      });

      setTimeout(() => {
        removeElements.map((elem) => {
          elem.animationState = 'end';
          if (startIndex === 0) {
            this.inputArray = this.inputArray.slice(
              endIndex,
              this.inputArray.length,
            );
          }
          const firstHalfOfInputArray = this.inputArray.slice(0, startIndex);
          const secondHalfOfInputArray = this.inputArray.slice(
            startIndex + 1,
            this.inputArray.length,
          );
          this.triggerConcatArrayAnimation(
            1000,
            firstHalfOfInputArray,
            secondHalfOfInputArray,
          );
          resolve();
        });
      }, delay);
    });
  }

  triggerConcatArrayAnimation(
    delay: number = 1000,
    firstHalfOfArray: elementWithAnimationState[],
    secondHalfOfArray: elementWithAnimationState[],
  ): Promise<void> {
    return new Promise((resolve) => {
      firstHalfOfArray.forEach((elem) => (elem.animationState = 'start'));
      secondHalfOfArray.forEach((elem) => (elem.animationState = 'start'));
      setTimeout(() => {
        firstHalfOfArray.forEach((elem) => (elem.animationState = 'end'));
        secondHalfOfArray.forEach((elem) => (elem.animationState = 'end'));
        this.inputArray = firstHalfOfArray.concat(secondHalfOfArray);
        resolve();
      }, delay);
    });
  }
}

// Bootstrapping the application
bootstrapApplication(ArrayComponent, {
  providers: [provideAnimations()],
});
