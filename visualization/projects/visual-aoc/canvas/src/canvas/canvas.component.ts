import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'lib-canvas',
  standalone: true,
  imports: [],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css',
})
export default class CanvasComponent implements AfterViewInit {
  canvasWidth: number = 200;
  canvasHeigth: number = 200;
  @ViewChild('mainCanvas') mainCanvasRef!: ElementRef<HTMLCanvasElement>;
  constructor() {}

  ngAfterViewInit(): void {
    this.setupCanvas();
  }

  setupCanvas() {
    const canvasCtx = this.mainCanvasRef.nativeElement.getContext('2d');
    if (!canvasCtx) return;
    this.setupBorder(canvasCtx);
  }

  setupBorder(canvasCtx: CanvasRenderingContext2D) {
    canvasCtx.strokeStyle = 'black';
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeRect(0, 0, this.canvasWidth, this.canvasHeigth);
  }
}
