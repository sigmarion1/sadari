FROM node:16.4.0
RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app

WORKDIR /usr/src/app

# COPY ./back/package.json ./back/yarn.lock ./

COPY ./back/package.json ./

USER node

# RUN yarn install --pure-lockfile

RUN npm install

COPY --chown=node:node ./back .

RUN 

COPY --chown=node:node ./front/build ./build

EXPOSE 4000

CMD ["npm", "start"]