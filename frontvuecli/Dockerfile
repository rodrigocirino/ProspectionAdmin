#https://docs.docker.com/get-started/nodejs/build-images/
FROM node:latest
ENV NODE_ENV=development
# COPY ["package.json", "package-lock.json*", "./"]
COPY . /var/www
WORKDIR /var/www
RUN npm install
# RUN npm install -g nodemon
EXPOSE 8080
ENTRYPOINT ["npm", "start"]
# CMD ["npm", "run", "dev"]



# Para entrar no terminal do node do container criado (um linux server) use
# docker exec -it node_server /bin/bash


# FROM node:latest as build-stage
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY ./ .
# RUN npm run build

# FROM nginx as production-stage
# RUN mkdir /app
# COPY --from=build-stage /app/dist /app
# COPY nginx.conf /etc/nginx/nginx.conf
