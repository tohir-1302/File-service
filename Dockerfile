# Node.js asosiy konteyner
FROM node:21-alpine

# Konteyner ichida ishlaydigan katalog
WORKDIR /app

RUN apk --no-cache add curl

# Barcha fayllarni kopyalash
COPY . /app

# Kerakli modullarni o'rnatish
RUN npm install

RUN npm run build

# Portni belgilash (admin modul uchun 3030 port)
EXPOSE 3000

# Serverni ishga tushirish
CMD [ "npm", "run", "start:prod" ]