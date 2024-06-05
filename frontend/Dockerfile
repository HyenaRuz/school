# Устанавливаем базовый образ
FROM node:20.12.2 AS build

# Создаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в рабочую директорию
COPY . .

# Собираем приложение
RUN npm run build

# Устанавливаем базовый образ для сервера
FROM nginx:alpine

# Копируем собранное приложение в папку Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Копируем конфигурационный файл Nginx в правильную директорию
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
