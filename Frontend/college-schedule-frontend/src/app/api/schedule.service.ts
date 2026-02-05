import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface ScheduleItem {
  id: number;
  groupName: string;
  subject: string;
  teacher: string;
  room: string;
  startTime: string;
  endTime: string;
  isEvent: boolean;
  type?: 'lecture' | 'practice' | 'extra' | 'activity';
  isCurrent?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = 'http://localhost:5000/api'; // Замените на ваш API URL

  constructor(private http: HttpClient) {}

  getTodaySchedule(): Observable<ScheduleItem[]> {
    // Временно возвращаем заглушку
    return of([]);
    
    // Позже замените на:
    // return this.http.get<ScheduleItem[]>(`${this.apiUrl}/schedule/today`);
  }

  addEvent(event: any): Observable<ScheduleItem> {
    // Временно возвращаем заглушку
    return of({} as ScheduleItem);
    
    // Позже замените на:
    // return this.http.post<ScheduleItem>(`${this.apiUrl}/schedule`, event);
  }
}