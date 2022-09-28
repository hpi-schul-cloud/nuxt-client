FROM node:16-alpine as vue-build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./ .
RUN npm run build

FROM nginx:1.23-alpine
COPY dockerconf/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=vue-build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
