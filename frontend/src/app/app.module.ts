import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { CardComponent } from './card/card.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { CodeComponent } from './code/code.component';
import {
  HighlightOptions,
  HIGHLIGHT_OPTIONS,
} from 'ngx-highlightjs';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    CardComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CodeComponent
  ],
  providers: [{
      provide: HIGHLIGHT_OPTIONS,
      useValue: <HighlightOptions>{
        lineNumbers: true,
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          javascript: () => import('highlight.js/lib/languages/javascript'),
          c: () => import('highlight.js/lib/languages/c'),
          cpp: () => import('highlight.js/lib/languages/cpp'),
          python: () => import('highlight.js/lib/languages/python'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml'),
        },
      },
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
