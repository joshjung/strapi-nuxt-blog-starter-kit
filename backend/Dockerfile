FROM strapi/base

RUN npm i -g strapi

WORKDIR $DIRPATH/$DIRNAME

COPY . .

RUN yarn install
RUN chmod +x /wait-for-it.sh

EXPOSE 1337

ENV NODE_ENV production
ENTRYPOINT [ "sh", "-c", "./wait-for-it.sh -t 30 $POSTGRES_HOST:$POSTGRES_EXTERNAL_PORT -- yarn start:docker:prod" ]