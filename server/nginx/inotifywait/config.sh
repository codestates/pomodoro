#!/bin/bash

MONITOR_PATH=/etc/nginx/nginx.conf

inotifywait -m -e modify "$MONITOR_PATH" |
while read dirname eventlist filename
do
  /usr/sbin/nginx -s reload
done