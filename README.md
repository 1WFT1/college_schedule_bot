College Schedule Bot - Руководство по установке
📋 О проекте
Telegram бот для управления расписанием колледжа с AI-ассистентом. Студенты могут просматривать расписание, а кураторы - добавлять мероприятия. Бот отвечает на голосовые и текстовые вопросы о расписании.

🚀 Быстрый старт
Предварительные требования
Перед началом установите:

Git - скачать
Docker Desktop - скачать
Node.js 18+ - скачать
.NET 8 SDK - скачать

Visual Studio 2022 или VS Code - скачать

1. Клонирование репозитория
bash
# Клонируйте репозиторий
git clone https://github.com/1WFT1/college_schedule_bot.git
cd college-schedule-bot
2. Настройка базы данных
bash
# Запустите PostgreSQL в Docker
docker-compose up -d

# Проверьте, что контейнер запущен
docker ps
3. Настройка Backend (ASP.NET Core)
В Visual Studio:
Откройте Backend/Backend.sln

Восстановите NuGet пакеты (автоматически при открытии)

Настройте строку подключения в Backend/Backend/appsettings.json:

json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=ScheduleDB;Username=postgres;Password=your_strong_password"
  }
}
Или через командную строку:
bash
# Перейдите в папку Backend
cd Backend/Backend

# Восстановите зависимости
dotnet restore

# Примените миграции базы данных
dotnet ef database update
4. Настройка Frontend (Angular)
bash
# Перейдите в папку Frontend
cd Frontend/college-schedule-frontend

# Установите зависимости
npm install

# Запустите сервер разработки
ng serve
5. Создание Telegram бота
Откройте Telegram и найдите @BotFather

Отправьте команду /newbot

Следуйте инструкциям:

Введите имя бота (например: College Schedule Bot)

Введите username (например: college_schedule_test_bot)

Сохраните токен API (пример: 7123456789:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw)

6. Настройка переменных окружения
Создайте файл Backend/Backend/appsettings.Development.json:

json
{
  "TelegramBot": {
    "Token": "ВАШ_ТОКЕН_ОТ_BOTFATHER",
    "WebhookUrl": "https://ваш-домен.ngrok.io/api/telegram"
  },
  "AiSettings": {
    "ApiKey": "ваш-ключ-ai-сервиса",
    "Model": "gpt-4"
  }
}
7. Запуск приложения
Запуск Backend:
bash
# Из папки Backend/Backend
dotnet run
# Или через Visual Studio: F5
Запуск Frontend:
bash
# Из папки Frontend/college-schedule-frontend
ng serve --open
Проверка API:
Откройте в браузере: http://localhost:5000/swagger

8. Настройка Ngrok для Telegram Webhook (для разработки)
bash
# Установите ngrok (скачайте с https://ngrok.com/)
ngrok http 5000
# Скопируйте полученный HTTPS URL
Настройте webhook в коде или через API:

bash
curl -F "url=https://ваш-ngrok-url.ngrok.io/api/telegram" https://api.telegram.org/botВАШ_ТОКЕН/setWebhook
