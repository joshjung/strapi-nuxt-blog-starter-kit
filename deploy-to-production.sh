#!/bin/bash

# Stolen from https://gist.github.com/judy2k/7656bfe3b322d669ef75364a46327836
read_var() {
    VAR=$(grep $1 $2 | xargs)
    IFS="=" read -ra VAR <<< "$VAR"
    echo ${VAR[1]}
}

BLOG_SERVER=$(read_var BLOG_SERVER .env)
BLOG_HOME=$(read_var BLOG_HOME .env)
DOCKER_EXTERNAL_REPO=$(read_var DOCKER_EXTERNAL_REPO .env)
DOCKER_BACKEND_IMAGE=$(read_var DOCKER_BACKEND_IMAGE .env)
DOCKER_FRONTEND_IMAGE=$(read_var DOCKER_FRONTEND_IMAGE .env)
BLOG_HOME=$(read_var BLOG_HOME .env)

echo "----------------------------------------------------------------------"
echo "DID YOU FORGET TO PUSH YOUR DOCKER IMAGES? (CTRL+C to cancel deployment):"
echo ""
echo "  docker push $DOCKER_EXTERNAL_REPO/$DOCKER_BACKEND_IMAGE:latest && docker push $DOCKER_EXTERNAL_REPO/$DOCKER_FRONTEND_IMAGE:latest"
echo "----------------------------------------------------------------------"
sleep 3

echo "Rsyncing some of the things (docker-compose.yml, start-in-production.sh, traefik)..."

ssh $BLOG_SERVER << EOF
  mkdir -p $BLOG_HOME
EOF

# Start SH file -> AWS
rsync -r -v ./start-in-production.sh $BLOG_SERVER:$BLOG_HOME

# docker-compose file -> AWS
rsync -r -v ./docker-compose.yml $BLOG_SERVER:$BLOG_HOME

# traefik -> AWS
rsync -r -v ./traefik $BLOG_SERVER:$BLOG_HOME

echo "Running $BLOG_HOME/start-in-production.sh on server..."

ssh $BLOG_SERVER << EOF
  cd $BLOG_HOME
  chmod +x start-in-production.sh
  ./start-in-production.sh
EOF