import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="event-add-container">
      <h2>Добавить мероприятие</h2>
      <!-- Здесь будет форма -->
    </div>
  `,
  //styleUrls: ['./event-add.component.scss']
})
export class EventAddComponent {
  // Временная заглушка
}