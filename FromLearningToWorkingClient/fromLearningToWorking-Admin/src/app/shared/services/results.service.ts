import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InterviewResult } from '../models/interview-result.model';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  private apiUrl= `${environment.apiUrl}/Interview`
  constructor(private http: HttpClient) { }

  getResults(): Observable<InterviewResult[]> {
    return this.http.get<InterviewResult[]>(this.apiUrl);
  }

  getResultById(id: number): Observable<InterviewResult> {
    return this.http.get<InterviewResult>(`${this.apiUrl}/${id}`);
  }

  getResultsByUserId(userId: number): Observable<InterviewResult[]> {
    return this.http.get<InterviewResult[]>(`${this.apiUrl}/byUserId/${userId}`);
  }

  // Additional methods for creating, updating, and deleting results can be added here
}