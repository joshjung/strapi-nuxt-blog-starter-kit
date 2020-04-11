FROM node:10

# Create app directory
WORKDIR /app
ADD . /app/

RUN rm yarn.lock
RUN yarn

ARG BLOG_API_DOMAIN=https://api.myblogdomain.com
ENV BLOG_API_DOMAIN=$BLOG_API_DOMAIN
RUN STRAPI_BASE_URL=$BLOG_API_DOMAIN yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

# start command
ENTRYPOINT [ "sh", "-c", "yarn start" ]