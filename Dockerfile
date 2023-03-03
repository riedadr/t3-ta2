FROM node:18.12.1-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/
RUN npm install && npm cache clean --force
COPY ./ /usr/src/app
ENV NODE_ENV production
ENV PORT 80
ARG MYSQL_URL=${MYSQL_URL}
ENV MYSQL_URL=${MYSQL_URL}
ARG MYSQL_USER=${MYSQL_USER}
ENV MYSQL_USER=${MYSQL_USER}
ARG MYSQL_PASS=${MYSQL_PASS}
ENV MYSQL_PASS=${MYSQL_PASS}
ARG MYSQL_DB=${MYSQL_DB}
ENV MYSQL_DB=${MYSQL_DB}
EXPOSE 80
RUN npm run build
CMD [ "npm", "start" ]