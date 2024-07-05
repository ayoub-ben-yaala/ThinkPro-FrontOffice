import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LevelManagementService {
  private apiUrl = 'http://127.0.0.1:8080/level'; // Replace with your backend URL
  constructor(private http: HttpClient) {}

  getAllLevels(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  
  getCoursById(coursId: string): Observable<any> {
    const url = `http://127.0.0.1:8080/cours/${coursId}`;
  return this.http.get<any>(url);
  }
}
