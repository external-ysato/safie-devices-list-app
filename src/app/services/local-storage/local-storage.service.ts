import { Injectable } from '@angular/core';

import _ from 'lodash';

import { LOCAL_STORAGE_KEY } from '../../constants';

@Injectable({
  providedIn: 'root'
})
// manage window.localStorage through this service
// save JSON string value paired by one key
export class LocalStorageService {
  // can use dot syntax for argument 'path'
  // example
  // this.set('hoge.fuga', 'foo') -> save {'hoge': {'fuga': 'foo'}}
  // this.get('hoge.fuga') -> return 'foo'
  // this.remove('hoge.fuga') -> save {'hoge': {}}

  constructor() { }

  private isAvailable: boolean = !!window.localStorage;
  private baseKey: string = LOCAL_STORAGE_KEY.BASE;

  private getJSON(): {[key: string]: any} {
    return JSON.parse(window.localStorage.getItem(this.baseKey)) || {};
  }

  get(path: string): any {
    if (!this.isAvailable) {
      return;
    }

    return _.get(this.getJSON(), path);
  }

  set(path: string, value: any): void {
    if (!this.isAvailable) {
      return;
    }

    const json: {[key: string]: any} = this.getJSON();

    _.set(json, path, value);
    window.localStorage.setItem(this.baseKey, JSON.stringify(json));
  }

  remove(path: string): void {
    if (!this.isAvailable) {
      return;
    }

    const json: {[key: string]: any} = this.getJSON();

    _.unset(json, path);
    window.localStorage.setItem(this.baseKey, JSON.stringify(json));
  }

}
