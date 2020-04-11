#!/bin/bash

# Stolen from https://gist.github.com/judy2k/7656bfe3b322d669ef75364a46327836
read_var() {
    VAR=$(grep $1 $2 | xargs)
    IFS="=" read -ra VAR <<< "$VAR"
    echo ${VAR[1]}
}

SITE_IP=$(read_var SITE_IP .env)
POSTGRES_EXTERNAL_PORT=$(read_var POSTGRES_EXTERNAL_PORT .env)
POSTGRES_USER=$(read_var POSTGRES_USER .env)
POSTGRES_DB=$(read_var POSTGRES_DB .env)

echo "--------------------------------------------------"
echo " Fetching production database to local..."
echo ""
echo " NOTE: this will only work if you have access to "
echo " your production database from your local machine. "
echo " Do not expose your public database to the world. "
echo " Recommend using a VPN, tunnel, or IP-specific "
echo " firewall. You have been warned if you get hacked :D "
echo "--------------------------------------------------"

pg_dump -h $SITE_IP -p $POSTGRES_EXTERNAL_PORT -U $POSTGRES_USER $POSTGRES_DB > prod_db.dump

echo "--------------------------------------------------"
echo " Database fetched to prod_db.dump"
echo " Importing to local joshoncode..."
echo "--------------------------------------------------"

psql -U postgres -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'joshoncode';"
psql -U postgres -c "drop database joshoncode"
psql -U postgres -c "create database joshoncode"
psql -U postgres joshoncode < prod_db.dump