import { Injectable } from '@angular/core';

import { DICTIONARY_FROM_PAGENAME_TO_TITLE } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor() { }

  // translate from component.pageName to title for display
  getTitle(pageName: string): string {
    return DICTIONARY_FROM_PAGENAME_TO_TITLE[pageName];
  }
}
