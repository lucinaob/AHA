import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {BaseService} from './base.service';

@Injectable({
  providedIn: 'root'
})

export class SessionsService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getSessionSummary(sessionID: number): Observable<any> {
    const endpoint = `${this.baseUrl}/sessions/${sessionID}`;

    return this.get(endpoint).pipe(
      map((data: Object) => ({
        endpoint: endpoint,
        apiResponse: data
      }))
    );
  }


}