import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
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
  id: string;
  value: number;
  animationState: 'start' | 'end' | 'transition';
};

@Component({
  selector: 'lib-array',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
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
      state('start', style({ color: 'gray' })),
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
    { id: crypto.randomUUID(), value: 4, animationState: 'end' },
    { id: crypto.randomUUID(), value: 3, animationState: 'end' },
    { id: crypto.randomUUID(), value: 2, animationState: 'end' },
    { id: crypto.randomUUID(), value: 1, animationState: 'end' },
  ];

  form = new FormGroup({
    numberInput: new FormControl('', [Validators.min(0)]),
  });

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const inputValue = this.form.get('numberInput')?.value;
      console.log(inputValue);
      this.triggerInsertElementAnimation(
        {
          id: crypto.randomUUID(),
          value: Number(inputValue),
          animationState: 'start',
        },
        1000,
        2,
      );
    }
  }

  constructor() {}

  ngAfterViewInit(): void {}

  toogleAnimation() {
    this.animationEnabled = !this.animationEnabled;
  }

  trackByFn(index: number, elem: elementWithAnimationState): string {
    return elem.id;
  }

  triggerInsertElementAnimation(
    elem: elementWithAnimationState = {
      id: crypto.randomUUID(),
      value: 1,
      animationState: 'start',
    },
    delay: number = 1000,
    index: number = 0,
  ): Promise<void> {
    return new Promise(async (resolve) => {
      const currentElement = this.inputArray[index];
      if (currentElement) {
        await this.triggerElementHighlightAnimation(currentElement, delay);
      }
      this.addInsertElement(elem, index);
      elem.animationState = 'start';
      await this.delay(delay);
      elem.animationState = 'end';
      resolve();
    });
  }

  triggerElementHighlightAnimation(
    elem: elementWithAnimationState,
    delay: number = 1000,
  ): Promise<void> {
    return new Promise(async (resolve) => {
      elem.animationState = 'start';
      await this.delay(delay);
      elem.animationState = 'end';
      resolve();
    });
  }

  triggerRemoveElementAnimation(
    delay: number = 1000,
    startIndex: number = 1,
    endIndex: number = startIndex + 1,
  ): Promise<void> {
    return new Promise(async (resolve) => {
      const removeElements = this.inputArray.slice(startIndex, endIndex);
      removeElements.map((elem) => {
        elem.animationState = 'start';
      });

      await this.delay(delay);
      removeElements.map((elem) => {
        elem.animationState = 'end';
      });
      const [firstHalf, secondHalf] = this.removeElement(startIndex, endIndex);
      await this.triggerConcatArrayAnimation(1000, firstHalf, secondHalf);
      resolve();
    });
  }

  removeElement(
    startIndex: number = 0,
    endIndex: number = startIndex + 1,
  ): Array<elementWithAnimationState[]> {
    if (this.inputArray.length === 1) return (this.inputArray = []);
    if (startIndex === 0) return [this.inputArray.slice(endIndex)];
    return [
      this.inputArray.slice(0, startIndex),
      this.inputArray.slice(endIndex, this.inputArray.length),
    ];
  }

  triggerConcatArrayAnimation(
    delay: number = 1000,
    firstHalf: elementWithAnimationState[],
    secondHalf: elementWithAnimationState[],
  ): Promise<void> {
    return new Promise(async (resolve) => {
      firstHalf.forEach((elem) => (elem.animationState = 'start'));
      secondHalf.forEach((elem) => (elem.animationState = 'start'));
      await this.delay(delay);
      firstHalf.forEach((elem) => (elem.animationState = 'end'));
      secondHalf.forEach((elem) => (elem.animationState = 'end'));
      this.concatArrays(firstHalf, secondHalf);
      resolve();
    });
  }

  triggerSwappingAnimation(
    delay: number = 1000,
    firstIndex: number = 1,
    secondIndex: number = this.inputArray.length - 1,
  ): Promise<void> {
    return new Promise(async (resolve) => {
      await Promise.all([
        this.triggerElementHighlightAnimation(this.inputArray[firstIndex]),
        this.triggerElementHighlightAnimation(this.inputArray[secondIndex]),
      ]);
      await this.delay(delay);
      this.swappingElements(firstIndex, secondIndex);
      resolve();
    });
  }

  triggerCompareAnimation(
    firstIndex: number = 0,
    secondIndex: number = this.inputArray.length - 1,
    delay: number = 1000,
  ): Promise<void> {
    return new Promise(async (resolve) => {
      await Promise.all([
        this.triggerElementHighlightAnimation(this.inputArray[firstIndex]),
        this.triggerElementHighlightAnimation(this.inputArray[secondIndex]),
      ]);
      resolve();
    });
  }

  swappingElements(
    firstIndex: number = 1,
    secondIndex = this.inputArray.length - 1,
  ): void {
    const temp = this.inputArray[firstIndex];
    const temp2 = this.inputArray[secondIndex];
    this.inputArray[firstIndex] = { ...temp2 };
    this.inputArray[secondIndex] = { ...temp };
  }

  compareElements(
    firstElem: elementWithAnimationState,
    secondElem: elementWithAnimationState,
    compareFn: (
      a: elementWithAnimationState,
      b: elementWithAnimationState,
    ) => boolean,
  ): boolean {
    return compareFn(firstElem, secondElem);
  }

  addInsertElement(elem: elementWithAnimationState, index: number = 0): void {
    this.inputArray[index] = elem;
  }
  concatArrays(
    firstHalf: elementWithAnimationState[],
    secondHalf: elementWithAnimationState[],
  ): void {
    this.inputArray = firstHalf.concat(secondHalf);
  }

  delay(ms: number = 1000): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Bootstrapping the application
bootstrapApplication(ArrayComponent, {
  providers: [provideAnimations()],
});
