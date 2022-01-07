#!/bin/bash

MONITOR_PATH=/etc/nginx/script/

inotifywait -m -r -e create -e modify -e delete "$MONITOR_PATH" |
while read dirname eventlist filename
do
  /usr/sbin/nginx -s reload
done