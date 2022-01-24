#!/bin/bash

MONITOR_PATH=/etc/nginx/nginx.conf
chmod +w $MONITOR_PATH

inotifywait -m -e modify "$MONITOR_PATH" |
while read dirname eventlist filename
do
  /usr/sbin/nginx -s reload
done