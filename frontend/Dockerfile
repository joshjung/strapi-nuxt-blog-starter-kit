FROM node:10

# Create app directory
WORKDIR /app
ADD . /app/

RUN rm yarn.lock
RUN yarn

ARG SITE_API_DOMAIN=https://api.myblogdomain.com
ENV SITE_API_DOMAIN=$SITE_API_DOMAIN
RUN STRAPI_BASE_URL=$SITE_API_DOMAIN yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

# start command
ENTRYPOINT [ "sh", "-c", "yarn start" ]