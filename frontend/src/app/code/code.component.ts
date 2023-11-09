import { CommonModule } from "@angular/common";
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
} from "@angular/core";
import { HighlightModule } from "ngx-highlightjs";

@Component({
  selector: "app-code",
  templateUrl: "./code.component.html",
  styleUrls: ["./code.component.scss"],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, HighlightModule],
})
export class CodeComponent implements OnInit {
  @Input() code!: string;
  @Input() languages!: string[];
  @Input() lineNumbers!: boolean;

  ngOnInit(): void {}
}
