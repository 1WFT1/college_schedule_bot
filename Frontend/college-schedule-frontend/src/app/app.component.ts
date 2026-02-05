import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="app-container">
      
      <!-- Telegram Web App инициализация -->
      <div *ngIf="isTelegram" class="telegram-banner">
        <span>📱 Запущено в Telegram</span>
      </div>
      
      <!-- Шапка -->
      <div class="header">
        <div class="header-content">
          <div>
            <div class="greeting">Доброе утро, Студент!</div>
            <div class="current-date">{{currentDate}}</div>
            <div class="week-info">{{weekInfo}}</div>
          </div>
          <div class="header-buttons">
            <button class="icon-btn" (click)="openAI()">
              <i class="fas fa-robot"></i>
            </button>
            <button class="icon-btn">
              <i class="fas fa-user"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Статистика -->
      <div class="stats">
        <div class="stat-item">
          <div class="stat-value">3</div>
          <div class="stat-label">Пары сегодня</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">2</div>
          <div class="stat-label">Мероприятия</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">40м</div>
          <div class="stat-label">До следующего</div>
        </div>
      </div>

      <!-- Расписание -->
      <div class="schedule-section">
        <h2><i class="far fa-calendar-alt"></i> Расписание на сегодня</h2>
        
        <!-- Фильтры -->
        <div class="filters">
          <button class="filter-btn active">Все</button>
          <button class="filter-btn">Учёба</button>
          <button class="filter-btn">Внеурочное</button>
        </div>

        <!-- Карточки пар -->
        <div class="schedule-list">
          
          <!-- Пара 1 -->
          <div class="card lecture">
            <div class="card-type">Лекция</div>
            <div class="card-time">🕘 10:00 – 11:30</div>
            <div class="card-title">Высшая математика</div>
            <div class="card-details">
              <span>🏫 415 ауд.</span>
              <span>👨‍🏫 Иванова И.И.</span>
              <span>👥 ПИ-21-1</span>
            </div>
          </div>

          <!-- Пара 2 -->
          <div class="card practice">
            <div class="card-type">Практика</div>
            <div class="card-time">🕛 12:00 – 13:30</div>
            <div class="card-title">Программирование на Python</div>
            <div class="card-details">
              <span>🏫 404 ауд.</span>
              <span>👨‍🏫 Петров П.П.</span>
              <span>💻 Комп. класс №2</span>
            </div>
          </div>

          <!-- Текущая пара -->
          <div class="card current">
            <div class="card-type">СЕЙЧАС</div>
            <div class="card-time">🕑 14:00 – 15:30 <span class="time-left">• Осталось 25 мин</span></div>
            <div class="card-title">Компьютерные сети</div>
            <div class="card-details">
              <span>🏫 301 ауд.</span>
              <span>👨‍🏫 Денис Пузиков</span>
              <span>🌐 Лаб. Cisco</span>
            </div>
            <div class="card-tags">
              <span class="tag current-tag">Текущая</span>
              <span class="tag">Сети</span>
              <span class="tag online">Можно онлайн</span>
            </div>
          </div>

          <!-- Мероприятие -->
          <div class="card event">
            <div class="card-type">Мероприятие</div>
            <div class="card-time">🕢 19:00 – 21:00</div>
            <div class="card-title">Встреча IT-клуба: Карьера в Big Data</div>
            <div class="card-details">
              <span>🏛️ Актовый зал</span>
              <span>🎤 Приглашённый спикер</span>
            </div>
          </div>

        </div>
      </div>

      <!-- Кнопки действий -->
      <div class="action-buttons">
        <button class="ai-btn" (click)="openAI()">
          <i class="fas fa-robot"></i> ИИ помощник
        </button>
        <button class="add-btn" (click)="addEvent()">
          <i class="fas fa-plus"></i> Добавить
        </button>
      </div>

      <!-- ИИ ответ -->
      <div *ngIf="showAIResponse" class="ai-response">
        <div class="ai-response-content">
          <h3>🤖 ИИ помощник отвечает:</h3>
          <p>"Сейчас у вас пара <strong>Компьютерные сети</strong> в <strong>301 аудитории</strong>, преподаватель <strong>Денис Пузиков</strong>."</p>
          <button class="close-btn" (click)="showAIResponse = false">Закрыть</button>
        </div>
      </div>

    </div>
  `,
  styles: [`
    /* Основные стили */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .app-container {
      background: #f8fafc;
      min-height: 100vh;
      padding-bottom: 80px;
    }
    
    /* Telegram баннер */
    .telegram-banner {
      background: #0088cc;
      color: white;
      text-align: center;
      padding: 8px;
      font-size: 0.9em;
    }
    
    /* Шапка */
    .header {
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: white;
      padding: 20px;
      box-shadow: 0 4px 20px rgba(99, 102, 241, 0.2);
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    
    .greeting {
      font-size: 0.9em;
      opacity: 0.9;
      margin-bottom: 5px;
    }
    
    .current-date {
      font-size: 1.6em;
      font-weight: 800;
    }
    
    .week-info {
      font-size: 0.8em;
      background: rgba(255, 255, 255, 0.15);
      padding: 4px 10px;
      border-radius: 20px;
      display: inline-block;
      margin-top: 5px;
    }
    
    .header-buttons {
      display: flex;
      gap: 10px;
    }
    
    .icon-btn {
      background: rgba(255, 255, 255, 0.15);
      border: none;
      border-radius: 10px;
      width: 40px;
      height: 40px;
      color: white;
      font-size: 1.1em;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    /* Статистика */
    .stats {
      display: flex;
      justify-content: space-around;
      background: white;
      margin: 20px;
      padding: 15px;
      border-radius: 15px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    
    .stat-item {
      text-align: center;
    }
    
    .stat-value {
      font-size: 1.5em;
      font-weight: 800;
      color: #6366f1;
    }
    
    .stat-label {
      font-size: 0.8em;
      color: #64748b;
      margin-top: 5px;
    }
    
    /* Секция расписания */
    .schedule-section {
      padding: 0 20px;
    }
    
    .schedule-section h2 {
      margin: 20px 0 15px;
      color: #1e293b;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    /* Фильтры */
    .filters {
      display: flex;
      background: white;
      border-radius: 12px;
      padding: 5px;
      margin-bottom: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    
    .filter-btn {
      flex: 1;
      padding: 12px;
      border: none;
      background: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      color: #64748b;
    }
    
    .filter-btn.active {
      background: #6366f1;
      color: white;
    }
    
    /* Карточки */
    .schedule-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .card {
      background: white;
      border-radius: 15px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      border-left: 5px solid #6366f1;
    }
    
    .card.current {
      border-left-color: #ef4444;
      animation: pulse 2s infinite;
    }
    
    .card.lecture {
      border-left-color: #6366f1;
    }
    
    .card.practice {
      border-left-color: #0ea5e9;
    }
    
    .card.event {
      border-left-color: #f59e0b;
    }
    
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
      100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
    }
    
    .card-type {
      display: inline-block;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.75em;
      font-weight: 700;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    
    .lecture .card-type { background: #e0e7ff; color: #6366f1; }
    .practice .card-type { background: #f0f9ff; color: #0ea5e9; }
    .current .card-type { background: #fee2e2; color: #dc2626; }
    .event .card-type { background: #fef3c7; color: #d97706; }
    
    .card-time {
      font-size: 0.9em;
      color: #6366f1;
      font-weight: 700;
      margin-bottom: 8px;
    }
    
    .time-left {
      color: #ef4444;
      margin-left: 10px;
    }
    
    .card-title {
      font-size: 1.3em;
      font-weight: 800;
      color: #1e293b;
      margin-bottom: 12px;
    }
    
    .card-details {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      color: #64748b;
      font-size: 0.9em;
      margin-bottom: 15px;
    }
    
    .card-tags {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    
    .tag {
      background: #f1f5f9;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.8em;
      color: #64748b;
    }
    
    .current-tag { background: #fee2e2; color: #dc2626; }
    .online { background: #dbeafe; color: #1d4ed8; }
    
    /* Кнопки действий */
    .action-buttons {
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: 20px;
      display: flex;
      gap: 10px;
      z-index: 100;
    }
    
    .ai-btn, .add-btn {
      flex: 1;
      padding: 15px;
      border: none;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-size: 1em;
    }
    
    .ai-btn {
      background: #8b5cf6;
      color: white;
    }
    
    .add-btn {
      background: #6366f1;
      color: white;
    }
    
    /* ИИ ответ */
    .ai-response {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      z-index: 1000;
    }
    
    .ai-response-content {
      background: white;
      padding: 25px;
      border-radius: 20px;
      max-width: 500px;
      width: 100%;
      animation: slideUp 0.3s ease;
    }
    
    @keyframes slideUp {
      from { transform: translateY(30px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .ai-response-content h3 {
      margin-bottom: 15px;
      color: #1e293b;
    }
    
    .ai-response-content p {
      color: #475569;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    
    .close-btn {
      background: #6366f1;
      color: white;
      border: none;
      padding: 12px 25px;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 600;
    }
    
    /* Адаптивность */
    @media (max-width: 480px) {
      .current-date { font-size: 1.3em; }
      .card-title { font-size: 1.2em; }
      .card-details { gap: 10px; }
    }
  `]
})
export class AppComponent implements OnInit {
  currentDate: string;
  weekInfo: string;
  isTelegram: boolean = false;
  showAIResponse: boolean = false;

  constructor() {
    // Устанавливаем текущую дату
    const now = new Date();
    this.currentDate = this.formatDate(now);
    
    // Определяем неделю (верхняя/нижняя)
    const weekNumber = Math.ceil(now.getDate() / 7);
    this.weekInfo = `Неделя ${weekNumber} (${weekNumber % 2 === 0 ? 'нижняя' : 'верхняя'})`;
  }

  ngOnInit() {
    // Проверяем, запущено ли в Telegram
    if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
      this.isTelegram = true;
      const tg = (window as any).Telegram.WebApp;
      tg.ready();
      tg.expand();
      console.log('Telegram Web App инициализирован');
    }
  }

  private formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    };
    const formatted = date.toLocaleDateString('ru-RU', options);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  openAI() {
    this.showAIResponse = true;
    
    // Если в Telegram, отправляем данные боту
    if (this.isTelegram) {
      const tg = (window as any).Telegram.WebApp;
      tg.sendData(JSON.stringify({
        type: 'ai_request',
        question: 'Какая пара сейчас?'
      }));
    }
  }

  addEvent() {
    alert('Форма добавления мероприятия будет реализована позже');
    
    // Для Telegram можно открыть новую страницу
    if (this.isTelegram) {
      const tg = (window as any).Telegram.WebApp;
      tg.openLink('https://t.me/your_bot?start=add_event');
    }
  }
}