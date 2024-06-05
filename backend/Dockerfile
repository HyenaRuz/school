FROM node:20

# Установите рабочий каталог
WORKDIR /app

# Установите зависимости
COPY package*.json ./
RUN npm install

# Пересоберите нативные модули
RUN npm rebuild bcrypt

# Скопируйте остальной код приложения
COPY . .

# Соберите приложение
RUN npm run build

# Откройте необходимый порт
EXPOSE 3002

# Запустите приложение в режиме разработки
CMD ["npm", "run", "start"]
