#!/bin/bash

echo "-----------------------------------"
echo "  Running yarn..."
echo "-----------------------------------"
(cd backend && yarn)
(cd frontend && yarn)

echo "-----------------------------------"
echo "  Creating .env"
echo "  (you will need to edit this)"
echo "-----------------------------------"
cp .env.sample .env

echo "-----------------------------------"
echo "  Making scripts executable..."
echo "-----------------------------------"
chmod +x build-all.sh
chmod +x deploy-to-production.sh