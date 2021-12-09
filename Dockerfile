FROM zvinger/docker-node-alpine:ubuntu

WORKDIR /app
ADD ./app/package.json /tmp/package.json
COPY ./app/package.json ./app/package-lock.json* /tmp/
RUN cd /tmp && npm i && mkdir -p /app && mv /tmp/node_modules /app/node_modules
ADD ./app /app
ARG API_HOST
ENV API_HOST=${API_HOST}

RUN API_HOST=${API_HOST} npm run build

CMD npm start
