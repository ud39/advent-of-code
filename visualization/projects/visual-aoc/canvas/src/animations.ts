// File to store various animations
import { animate, style, animation } from '@angular/animations';

export const colorChangeAnimation = animation([
  animate('300ms', style({ color: '{{ toColor }}' })),
]);
