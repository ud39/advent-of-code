import {
  state,
  trigger,
  animate,
  transition,
  style,
  animation,
  useAnimation,
} from '@angular/animations';

export const colorChangeAnimation = animation([
  animate('300ms', style({ color: '{{ toColor }}' })),
]);
