FROM node:lts-alpine

#set timezone 
RUN apk add --no-cache tzdata
RUN cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime
RUN echo "Asia/Seoul" >  /etc/timezone

#get the nodejs ready
WORKDIR /source
COPY ./source/. .

#git ready
RUN apk add --no-cache openssh
RUN apk add --no-cache git
RUN apk add --no-cache bash

# git settings
RUN git config --global user.email pomodoro@pomodoro.com
RUN git config --global user.name Pomodoro-dockerized

#inotify
RUN apk add --no-cache inotify-tools

RUN npm install -g nodemon
CMD ["nodemon", "app.js"]