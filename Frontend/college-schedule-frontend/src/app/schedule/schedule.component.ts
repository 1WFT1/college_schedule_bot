import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="schedule-container">
      <h1>Расписание загружается...</h1>
      <p>Здесь будет ваше расписание</p>
    </div>
  `,
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {
  // Временная заглушка
}