#!/bin/bash

if [ $(uname -s) = "Darwin" ]; then
    echo "MacOS detected"
    docker rm -f $(docker ps -a -q)
    #docker volume rm $(docker volume ls -q)
    #docker rmi $(docker images "dangling=true" -q)
    docker rmi -f $(docker images -a -q)
elif [ $(uname -s) = "Linux" ]; then
    echo "Linux detected"
    #sudo docker ps -a | grep Exit | cut -d ' ' -f 1 | xargs sudo docker rm
    sudo docker rm -f $(sudo docker ps -a -q)
    #sudo docker volume rm $(sudo docker volume ls -q)
    #sudo docker rmi $(sudo docker images -f "dangling=true" -q)
    sudo docker rmi -f $(sudo docker images -a -q)
fi