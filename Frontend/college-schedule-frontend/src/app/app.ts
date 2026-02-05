import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventCardComponent } from './event-card/event-card.component';
import { Event } from './models/event.model';
import { TimeService } from './services/time.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, EventCardComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  currentDate: string;
  greeting: string;
  isSyncing: boolean = false;
  syncError: boolean = false;
  
  stats = {
    lectures: 3,
    activities: 2,
    nextTime: '40м'
  };

  activeFilter: string = 'all';
  showAddModal: boolean = false;
  selectedEventType: string = 'study';

  newEvent = {
    title: '',
    datetime: '',
    location: '',
    description: ''
  };

  events: Event[] = [
    {
      id: 1,
      type: 'lecture',
      category: 'study',
      time: '10:00 – 11:30',
      name: 'Высшая математика',
      details: [
        { icon: 'door-open', text: '415 ауд.' },
        { icon: 'chalkboard-teacher', text: 'Иванова И.И.' },
        { icon: 'users', text: 'ПИ-21-1' }
      ],
      tags: ['Зачёт', 'Математика'],
      isCurrent: false,
      startTime: '10:00',
      endTime: '11:30'
    },
    {
      id: 2,
      type: 'practice',
      category: 'study',
      time: '12:00 – 13:30',
      name: 'Программирование на Python',
      details: [
        { icon: 'door-open', text: '404 ауд.' },
        { icon: 'chalkboard-teacher', text: 'Петров П.П.' },
        { icon: 'laptop-code', text: 'Комп. класс №2' }
      ],
      tags: ['Python', 'Лабораторная'],
      isCurrent: false,
      startTime: '12:00',
      endTime: '13:30'
    },
    {
      id: 3,
      type: 'lecture',
      category: 'study',
      time: '14:00 – 15:30',
      name: 'Компьютерные сети',
      details: [
        { icon: 'door-open', text: '301 ауд.' },
        { icon: 'chalkboard-teacher', text: 'Денис Пузиков' },
        { icon: 'wifi', text: 'Лаб. Cisco' }
      ],
      tags: ['Текущая', 'Сети', 'Можно онлайн'],
      isCurrent: true,
      startTime: '14:00',
      endTime: '15:30'
    },
    {
      id: 4,
      type: 'extra',
      category: 'extra',
      time: '16:30 – 18:00',
      name: 'Разбор олимпиадных задач',
      details: [
        { icon: 'map-marker-alt', text: 'Коворкинг «Гик»' },
        { icon: 'user-tie', text: 'Клуб алгоритмов' },
        { icon: 'user-friends', text: 'Добровольно' }
      ],
      tags: ['Олимпиада', 'Алгоритмы'],
      isCurrent: false,
      startTime: '16:30',
      endTime: '18:00'
    },
    {
      id: 5,
      type: 'activity',
      category: 'extra',
      time: '19:00 – 21:00',
      name: 'Встреча IT-клуба: Карьера в Big Data',
      details: [
        { icon: 'map-marker-alt', text: 'Актовый зал' },
        { icon: 'user-tie', text: 'Приглашённый спикер' }
      ],
      tags: ['Карьера', 'IT-клуб', 'Трансляция'],
      isCurrent: false,
      startTime: '19:00',
      endTime: '21:00'
    }
  ];

  // ДОБАВЬТЕ ЭТО ПОЛЕ В КЛАСС AppComponent (после других свойств)
  userName: string = 'Алексей';
  private timeSubscription: Subscription;
  

  // ЗАМЕНИТЕ метод getGreeting() в классе AppComponent:
  private getGreeting(): string {
    const hour = new Date().getHours();
    let greeting = '';
    
    if (hour < 6) greeting = 'Доброй ночи';
    else if (hour < 12) greeting = 'Доброе утро';
    else if (hour < 18) greeting = 'Добрый день';
    else greeting = 'Добрый вечер';
    
    return `${greeting}, ${this.userName}!`;
  }

  

  constructor(private timeService: TimeService) {
    const now = new Date();
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    
    this.currentDate = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`;
    this.greeting = this.getGreeting();
  
    this.getTelegramUserName();
    this.timeSubscription = new Subscription();

    setTimeout(() => {
      this.updateNextTimeFromEvents();
    }, 100);
  }


  syncData(): void {
    if (this.isSyncing) return;
    
    this.isSyncing = true;
    this.syncError = false;
    
    // Имитация синхронизации с сервером
    setTimeout(() => {
      this.isSyncing = false;
      
      const success = Math.random() > 0.2;
      
      if (success) {
        // После синхронизации обновляем время
        this.updateNextTimeFromEvents();
        this.updateCurrentEvents();
        this.saveEventsToStorage();
        this.showToast('Расписание синхронизировано!');
      } else {
        this.syncError = true;
        this.showToast('Ошибка синхронизации', 'error');
      }
    }, 1500);
  }

  // Добавьте этот новый метод в класс AppComponent:
  private initializeNextTime(): void {
    // Создаем массив времен событий из карточек
    const eventTimes = this.events
      .filter(event => event.startTime && event.endTime)
      .map(event => ({
        startTime: event.startTime!,
        endTime: event.endTime!
      }));

    // Передаем времена событий в сервис
    this.timeService.calculateNextTime(eventTimes);
  }


  ngOnDestroy(): void {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
  }

    ngOnInit(): void {
    // Сохраняем события в localStorage для доступа из сервиса
    this.saveEventsToStorage();

    // Подписываемся на обновление времени до следующей пары
    this.timeSubscription = this.timeService.getNextTime().subscribe(time => {
      this.stats.nextTime = time;
    });

    // Инициализируем время до следующей пары
    this.updateNextTimeFromEvents();

    // Обновляем статус текущих событий
    this.updateCurrentEvents();
    
    // Запускаем обновление каждую минуту
    setInterval(() => {
      this.updateCurrentEvents();
      this.updateNextTimeFromEvents(); // Обновляем время до следующей пары
    }, 60000);
  }
    private saveEventsToStorage(): void {
    localStorage.setItem('scheduleEvents', JSON.stringify(this.events));
  }

  private updateNextTimeFromEvents(): void {
    // Передаем текущие события в сервис для расчета времени
    this.timeService.calculateNextTime(this.events);
  }

  private updateCurrentEvents(): void {
    this.events.forEach(event => {
      // Обновляем статус "текущий"
      event.isCurrent = this.timeService.isEventCurrent(event.time);
      
      // Обновляем оставшееся время для текущих событий
      if (event.isCurrent) {
        event.timeRemaining = this.timeService.getTimeRemainingForEvent(event.time);
        
        // Обновляем тег "Текущая"
        const hasCurrentTag = event.tags.includes('Текущая');
        if (event.isCurrent && !hasCurrentTag) {
          event.tags = ['Текущая', ...event.tags.filter(tag => tag !== 'Текущая')];
        } else if (!event.isCurrent && hasCurrentTag) {
          event.tags = event.tags.filter(tag => tag !== 'Текущая');
        }
      } else {
        event.timeRemaining = undefined;
      }
    });
  }

  private getTelegramUserName(): void {
  // В реальном приложении здесь будет получение имени из Telegram Web App
  // Сейчас имитируем получение из localStorage или используем значение по умолчанию
  const telegramName = localStorage.getItem('telegramUserName') || 'Алексей';
  this.userName = telegramName;

  
}
  
  
  // Вспомогательный метод для обновления данных
  private updateScheduleData(): void {
    // Здесь можно добавить логику обновления расписания
    console.log('Данные обновлены');
    // Например, получение новых событий с сервера
  }

  // Метод для показа уведомлений
  private showToast(message: string, type: 'success' | 'error' = 'success'): void {
    // В реальном приложении можно использовать сервис уведомлений
    const color = type === 'success' ? 'green' : 'red';
    console.log(`%c${message}`, `color: ${color}; font-weight: bold;`);
    
    // Можно добавить всплывающее уведомление
    if (type === 'success') {
      alert(message);
    }
  }

  


  filterEvents(type: string): void {
    this.activeFilter = type;
  }

  get filteredEvents(): Event[] {
    if (this.activeFilter === 'all') return this.events;
    return this.events.filter(event => event.category === this.activeFilter);
  }

  openAddModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.resetNewEvent();
  }

  selectEventType(type: string): void {
    this.selectedEventType = type;
  }

  addNewEvent(): void {
    if (this.newEvent.title && this.newEvent.datetime) {
      // Парсим дату и время
      const date = new Date(this.newEvent.datetime);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const endDate = new Date(date);
      endDate.setHours(date.getHours() + 1);
      const endHours = endDate.getHours().toString().padStart(2, '0');
      const endMinutes = endDate.getMinutes().toString().padStart(2, '0');
      
      // Создаем новое событие
      const newEvent: Event = {
        id: this.events.length + 1,
        type: this.selectedEventType as any,
        category: this.selectedEventType === 'study' ? 'study' : 'extra',
        time: `${hours}:${minutes} – ${endHours}:${endMinutes}`,
        name: this.newEvent.title,
        details: [
          { icon: 'map-marker-alt', text: this.newEvent.location || 'Не указано' }
        ],
        tags: ['Новое'],
        isCurrent: false,
        startTime: `${hours}:${minutes}`,
        endTime: `${endHours}:${endMinutes}`
      };

      // Добавляем в список
      this.events = [newEvent, ...this.events];
      
      // Сохраняем в localStorage и обновляем время
      this.saveEventsToStorage();
      this.updateNextTimeFromEvents();
      this.updateCurrentEvents();
      
      alert('Событие добавлено!');
      this.closeAddModal();
    }
  }

  resetNewEvent(): void {
    this.newEvent = {
      title: '',
      datetime: '',
      location: '',
      description: ''
    };
    this.selectedEventType = 'study';
  }
}