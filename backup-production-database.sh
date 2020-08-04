#!/bin/bash

# Stolen from https://gist.github.com/judy2k/7656bfe3b322d669ef75364a46327836
read_var() {
    VAR=$(grep $1 $2 | xargs)
    IFS="=" read -ra VAR <<< "$VAR"
    echo ${VAR[1]}
}

BLOG_IP=$(read_var BLOG_IP .env.prod)
POSTGRES_EXTERNAL_PORT=$(read_var POSTGRES_EXTERNAL_PORT .env.prod)
POSTGRES_USER=$(read_var POSTGRES_USER .env.prod)
POSTGRES_DB=$(read_var POSTGRES_DB .env.prod)

echo "--------------------------------------------------"
echo " Backing up production database to local..."
echo ""
echo " NOTE: this will only work if you have access to "
echo " your production database from your local machine. "
echo " Do not expose your public database to the world. "
echo " Recommend using a VPN, tunnel, or IP-specific "
echo " firewall. You have been warned if you get hacked :D "
echo "--------------------------------------------------"

NOW=`date +"%m_%d_%Y_%H_%M"`
FILE_NAME="${POSTGRES_DB}_db_${NOW}.bak"
pg_dump -h $BLOG_IP -p $POSTGRES_EXTERNAL_PORT -U $POSTGRES_USER $POSTGRES_DB > $FILE_NAME
