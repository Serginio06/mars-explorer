FROM node:14.5.0-alpine as build

WORKDIR /build

COPY package.json package-lock.json ./
RUN npm i

COPY . ./
RUN npm run build

EXPOSE 7000

CMD ["node", "dist/main.js"]
