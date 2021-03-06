FROM nodesource/trusty:6.2.0

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json

RUN npm install
COPY . /usr/src/app

EXPOSE 8081

CMD [ "node", "./server/bin/server.js" ]