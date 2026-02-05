import { Injectable } from '@angular/core';
import { interval, Observable, BehaviorSubject } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  private nextTimeSubject = new BehaviorSubject<string>('40м');

  constructor() {
    // Запускаем обновление каждую минуту
    interval(60000).pipe(
      startWith(0)
    ).subscribe(() => {
      // Обновляем время (события будут переданы из компонента)
      const events = this.getStoredEvents();
      this.calculateNextTime(events);
    });
  }

  // Метод для расчета времени до следующей пары
  calculateNextTime(events: any[]): void {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    let minTimeDiff = Infinity;
    
    // Ищем ближайшую будущую пару
    for (const event of events) {
      if (!event.startTime) continue;
      
      const [startHours, startMinutes] = event.startTime.split(':').map(Number);
      const eventStartTime = startHours * 60 + startMinutes;
      
      // Если пара еще не началась
      if (eventStartTime > currentTime) {
        const timeDiff = eventStartTime - currentTime;
        
        if (timeDiff < minTimeDiff) {
          minTimeDiff = timeDiff;
        }
      }
    }
    
    // Форматируем время
    let timeString: string;
    
    if (minTimeDiff === Infinity) {
      timeString = 'Нет пар';
    } else if (minTimeDiff >= 60) {
      const hours = Math.floor(minTimeDiff / 60);
      const minutes = minTimeDiff % 60;
      timeString = minutes > 0 ? `${hours}ч ${minutes}м` : `${hours}ч`;
    } else {
      timeString = `${minTimeDiff}м`;
    }
    
    this.nextTimeSubject.next(timeString);
  }

  getNextTime(): Observable<string> {
    return this.nextTimeSubject.asObservable();
  }

  

  getTimeRemainingForEvent(eventTime: string): string {
    const [startStr, endStr] = eventTime.split(' – ');
    const [hours, minutes] = startStr.split(':').map(Number);
    const [endHours, endMinutes] = endStr.split(':').map(Number);
    
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const eventStartTime = hours * 60 + minutes;
    const eventEndTime = endHours * 60 + endMinutes;
    
    // Если событие уже началось
    if (currentTime >= eventStartTime && currentTime <= eventEndTime) {
      const remainingTime = eventEndTime - currentTime;
      
      if (remainingTime > 60) {
        const hoursRemaining = Math.floor(remainingTime / 60);
        const minutesRemaining = remainingTime % 60;
        return `Осталось ${hoursRemaining}ч ${minutesRemaining}м`;
      } else {
        return `Осталось ${remainingTime}м`;
      }
    }
    
    return '';
  }

  isEventCurrent(eventTime: string): boolean {
    const [startStr, endStr] = eventTime.split(' – ');
    const [startHours, startMinutes] = startStr.split(':').map(Number);
    const [endHours, endMinutes] = endStr.split(':').map(Number);
    
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const eventStartTime = startHours * 60 + startMinutes;
    const eventEndTime = endHours * 60 + endMinutes;
    
    return currentTime >= eventStartTime && currentTime <= eventEndTime;
  }

  // Вспомогательный метод для хранения событий
  private getStoredEvents(): any[] {
    return JSON.parse(localStorage.getItem('scheduleEvents') || '[]');
  }
}