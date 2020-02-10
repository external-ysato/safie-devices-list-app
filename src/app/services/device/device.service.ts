import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { AJAX_RETRY_LIMIT, API_PATH } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(
    private http: HttpClient
  ) { }

  private updateSubject: Subject<Date> = new Subject<Date>();
  updateState: Observable<Date> = this.updateSubject.asObservable();

  private retryLimit: number = AJAX_RETRY_LIMIT;

  private apiKey: {[key: string]: string} = {
    [environment.API_KEY_NAME]: environment.API_KEY
  };

  private httpOptions: {[key: string]: (HttpHeaders | string)} = {
    headers: new HttpHeaders(Object.assign({}, this.apiKey))
  };

  private httpOptionsForImage: {[key: string]: (HttpHeaders | string)} = Object.assign(
    {},
    this.httpOptions,
    { responseType: 'blob' as 'json' }
  );

  private apiHost: string = environment.API_HOST;

  private apiPath: {[key: string]: any} = {
    devices: API_PATH.DEVICES,
    image:   API_PATH.IMAGE,
    stream:  (id: string): string => `${API_PATH.STREAM_PREFIX}${id}${API_PATH.STREAM_SUFFIX}`
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation}: ${error}`);
      return of(result as T);
    }
  }

  getApiKey(): {[key: string]: string} {
    return this.apiKey;
  }

  getDevices(): Observable<any> {
    return this.http.get<any>(
      `${this.apiHost}${this.apiPath.devices}`,
      this.httpOptions
    )
      .pipe(
        retry(this.retryLimit),
        catchError(this.handleError<any>('getDevices', []))
      )
  }

  // updateSubject receive update signal from interval timer(in list.component)
  updateDevices(date: Date): void {
    this.updateSubject.next(date);
  }

  getImage(id: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiHost}${this.apiPath.image}${id}`,
      this.httpOptionsForImage
    )
      .pipe(
        retry(this.retryLimit),
        catchError(this.handleError<string>(`getImage id=${id}`))
      )
  }

  getStreamUrl(id: string): string {
    return `${this.apiHost}${this.apiPath.stream(id)}`;
  }

}
