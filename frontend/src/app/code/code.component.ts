import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input, OnInit} from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, HighlightModule]

})

export class CodeComponent implements OnInit{

  @Input() code!: string;
  @Input() languages!: string[];
  @Input() lineNumbers!: boolean;

  ngOnInit(): void {
      this.code = `function myFunction() {
  document.getElementById("demo1").innerHTML = "Test 1!";
  document.getElementById("demo2").innerHTML = "Test 2!";
}`
  }


}
