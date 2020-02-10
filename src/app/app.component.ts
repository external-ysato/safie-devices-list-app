import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TitleService } from './services/title/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  private headerTitle: string = '';

  constructor(
    private titleService: TitleService,
    private title: Title
  ) { }

  // when app activate new route, set title by component.pageName
  onActivate(e) {
    this.setTitle(e.pageName);
  }

  // set header title in html and document.title
  setTitle(pageName: string): void {
    const t = this.titleService.getTitle(pageName);

    this.headerTitle = t;
    this.title.setTitle(t);
  }

}
