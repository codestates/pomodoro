#!/bin/sh

MONITOR_PATH=/root/deploy/client

inotifywait -m -e create "$MONITOR_PATH" |
while read dirname eventlist filename
do
  #move to destination location & store Environment variables
  cd $dirname
  TARGET_FOLDER=`cat *`
  rm -rf *
  cd ..
  SOURCE_REPO=`cat ./.repo`
  if [ $? -eq 0 ]; then
  
    WORKING_DIR=$(pwd)

    echo "======================================="
    echo "** GITHUB Client Deployment Initiated **"
    echo "======================================="

    # if a pid file exists, kill all its descendants
    if [ -f "./deployClient.pid" ]; then
      echo "A deployment is already in progress, stopping it..."
      kill $(ps -o pid= --ppid `cat ./deployClient.pid`)
      kill `cat ./deployClient.pid`
    fi

    # create a pid file
    echo "** (1/4) Github Clone initiated... **"
    echo $$ > ./deployClient.pid

    # remove previous build
    rm -rf ./deployClient_temp*
    pid=`cat ./deployClient.pid`
    DEPLOY_DIRECTORY="./deployClient_temp_${pid}"
    git clone -b $filename $SOURCE_REPO $DEPLOY_DIRECTORY

    echo "** (2/4) Installing packages... **"

    # create new build
    cd $DEPLOY_DIRECTORY/client
    npm ci

    echo "** (3/4) Building packages... **"
    npm run build
    rm -rf $TARGET_FOLDER/static
    rm -f $TARGET_FOLDER/index.html
    rm -f $TARGET_FOLDER/favicon.ico
    rm -f $TARGET_FOLDER/robots.txt
    rm -f $TARGET_FOLDER/asset-manifest.json
    mv -f build/* $TARGET_FOLDER

    # remove files after finish
    cd ../..
    rm -rf ./deployClient_temp*
    rm -f ./deployClient.pid
    rm -f ./.repo

    echo "====================="
    echo "** Client Deployed **"
    echo "====================="

  else
    echo "no .repo files, exiting ..."
  fi
done