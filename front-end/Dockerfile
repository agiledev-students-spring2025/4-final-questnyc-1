FROM node:lts AS builder
WORKDIR /app
COPY front-end/package*.json ./
RUN npm install
COPY front-end ./
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY front-end/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]