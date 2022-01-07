#!/bin/bash

if [ $(uname -s) = "Darwin" ]; then
    echo "MacOS detected"
    docker-compose up --build
elif [ $(uname -s) = "Linux" ]; then
    echo "Linux detected"
    sudo docker-compose up --build
fi