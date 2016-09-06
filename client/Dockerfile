FROM nodesource/trusty:6.2.0

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
RUN npm install --g global webpack webpack-dev-server karma-cli protractor typings  typescript
COPY . /usr/src/app

EXPOSE 8082

CMD [ "npm", "start" ]