import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LegendService {
  private jsonUrl = 'assets/legends.json';

  constructor(private http: HttpClient) {}

  getLegends(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }
}
