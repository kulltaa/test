#!/bin/bash

# NODE_ENV=development /bin/bash db_migrate.sh

if [ -z "$NODE_ENV" ]; then
  echo "Please set NODE_ENV env variable before using this script"
  exit 1
fi


if [ "$NODE_ENV" != "development" ]; then
  echo "Should not run this in test or production environment"
  exit 1
fi

MYSQL_USERNAME=root
MYSQL_PASSWORD=123456
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DBNAME=condo

cd ..
url="mysql://${MYSQL_USERNAME}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DBNAME}"

./node_modules/.bin/sequelize db:migrate --url $url
