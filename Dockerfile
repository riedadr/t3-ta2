FROM node:18.12.1-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/
RUN npm install && npm cache clean --force
COPY ./ /usr/src/app
ENV NODE_ENV production
ENV PORT 80
ARG DATABASE_URL=${DATABASE_URL}
ENV DATABASE_URL=${DATABASE_URL}
EXPOSE 80
RUN npm run build
CMD [ "npm", "start" ]