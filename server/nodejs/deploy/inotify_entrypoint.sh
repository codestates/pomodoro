#!/bin/sh

if [ ! -d "/html/images" ]; then
  mkdir /html/images
fi

if [ ! -d "/root/deploy/server" ]; then
  mkdir /root/deploy/server
else 
  rm -rf /root/deploy/server/*
fi

if [ ! -d "/root/deploy/client" ]; then
  mkdir /root/deploy/client
else
  rm -rf /root/deploy/client/*
fi

chmod 777 /root/deploy
chmod 777 /root/deploy/server
chmod 777 /root/deploy/client
rm -f /root/deploy/.repo
cd /source
npm ci

/root/deploy/clientDeploy.sh &
/root/deploy/serverDeploy.sh &
