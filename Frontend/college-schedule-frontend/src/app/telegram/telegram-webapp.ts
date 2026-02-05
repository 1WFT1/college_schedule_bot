import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TelegramWebappService {
  private tg: any;

  constructor() {
    // Проверяем наличие Telegram Web App
    if (typeof window !== 'undefined') {
      this.tg = (window as any).Telegram?.WebApp;
    }
  }

  init() {
    if (this.tg) {
      try {
        this.tg.ready();
        this.tg.expand(); // Раскрываем на весь экран
        console.log('Telegram Web App инициализирован');
        
        // Логируем данные пользователя
        const user = this.tg.initDataUnsafe?.user;
        if (user) {
          console.log('Telegram user:', user);
        }
      } catch (error) {
        console.error('Ошибка инициализации Telegram Web App:', error);
      }
    } else {
      console.warn('Telegram Web App не обнаружен, работаем в браузере');
    }
  }

  isTelegramWebApp(): boolean {
    return !!this.tg;
  }

  showMainButton(text: string = 'Закрыть', callback?: () => void) {
    if (this.tg?.MainButton) {
      this.tg.MainButton.setText(text);
      this.tg.MainButton.show();
      
      if (callback) {
        this.tg.MainButton.onClick(callback);
      } else {
        this.tg.MainButton.onClick(() => this.close());
      }
    }
  }

  getUserId(): number | null {
    return this.tg?.initDataUnsafe?.user?.id || null;
  }

  getUserName(): string | null {
    const user = this.tg?.initDataUnsafe?.user;
    return user?.first_name || user?.username || null;
  }

  close() {
    if (this.tg) {
      this.tg.close();
    }
  }

  sendToBot(message: string) {
    if (this.tg) {
      // Отправляем сообщение через Telegram Web App
      this.tg.sendData(JSON.stringify({
        type: 'message',
        text: message
      }));
    } else {
      // В браузере просто открываем ссылку на бота
      window.open(`https://t.me/college_schedule_bot?start=${encodeURIComponent(message)}`, '_blank');
    }
  }

  // Получаем тему Telegram (light/dark)
  getTheme(): string {
    return this.tg?.colorScheme || 'light';
  }
}