import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event } from '../models/event.model';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="event-card" [ngClass]="[event.category, event.type]" [attr.data-type]="event.category">
      <div class="event-type" [ngClass]="'type-' + event.type">
        {{ getTypeLabel(event.type) }}
      </div>
      <div class="event-time">
        <i class="far fa-clock"></i> {{ event.time }}
        <span *ngIf="event.timeRemaining" style="margin-left:15px;color:#ef4444;">• {{ event.timeRemaining }}</span>
      </div>
      <div class="event-name">{{ event.name }}</div>
      <div class="event-details">
        <span *ngFor="let detail of event.details">
          <i class="fas fa-{{ detail.icon }}"></i> {{ detail.text }}
        </span>
      </div>
      <div class="event-tags">
        <div class="tag" *ngFor="let tag of event.tags" [ngClass]="{'important': tag === 'Зачёт' || tag === 'Текущая', 'online': tag === 'Можно онлайн' || tag === 'Трансляция'}">
          {{ tag }}
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {
  @Input() event!: Event;

  getTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      lecture: 'Лекция',
      practice: 'Практика',
      extra: 'Доп. занятие',
      activity: 'Мероприятие'
    };
    return labels[type] || type;
  }
}