#!/bin/bash

# Run the docker compose
docker-compose pull
docker-compose down

# Traefik
(cd traefik && docker-compose down && docker-compose up -d)

# Blog and Postgres
docker-compose up -d --remove-orphans --force-recreate
