#!/bin/bash

MONITOR_PATH=/root/deploy/server

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
    echo "** GITHUB Server Deployment Initiated **"
    echo "======================================="

    # if a pid file exists, kill all its descendants
    if [ -f "./deployServer.pid" ]; then
      echo "A deployment is already in progress, stopping it..."
      kill $(ps -o pid= --ppid `cat ./deployServer.pid`)
      kill `cat ./deployServer.pid`
    fi

    # create a pid file
    echo "** (1/3) Github Clone initiated... **"
    echo $$ > ./deployServer.pid

    # remove previous build
    rm -rf ./deployServer_temp*
    pid=`cat ./deployServer.pid`
    DEPLOY_DIRECTORY="./deployServer_temp_${pid}"
    git clone -b $filename $SOURCE_REPO $DEPLOY_DIRECTORY

    # create a pid file
    echo "** (2/3) Installing packages... **"
    pushd $DEPLOY_DIRECTORY/server/nodejs/source
    npm ci

    echo "** (3/3) Copying new server... **"
    rm -rf $TARGET_FOLDER/*
    cp -rf * $TARGET_FOLDER/
    cp -f ./app.js $TARGET_FOLDER/
    chown -R 1000 $TARGET_FOLDER/.
    chgrp -R 1000 $TARGET_FOLDER/.
    chown -R 1000 $TARGET_FOLDER/*
    chgrp -R 1000 $TARGET_FOLDER/*

    # remove files after finish
    popd
    rm -rf ./deployServer_temp*
    rm -f ./deployServer.pid
    rm -f ./.repo

    echo "====================="
    echo "** Server Deployed **"
    echo "====================="
  else
    echo "no .repo files, exiting ..."
  fi
done