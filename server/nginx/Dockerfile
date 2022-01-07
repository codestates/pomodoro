FROM nginx:mainline-alpine

# Extract the dynamic module NCHAN from the builder image
#COPY --from=builder /usr/local/nginx/modules/ngx_http_execute_module.so /usr/local/nginx/modules/ngx_http_execute_module.so

# Install required packages
RUN apk update
RUN apk add --no-cache openrc
RUN apk add --no-cache bash
RUN apk add --no-cache tzdata
RUN apk add --no-cache inotify-tools

# Timezone settings
RUN cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime
RUN echo "Asia/Seoul" >  /etc/timezone

# inotifywait 
WORKDIR /root
COPY ./inotifywait/. .
RUN chmod +x /root/*.sh

# Run the console
STOPSIGNAL SIGTERM
CMD ["nginx", "-g", "daemon off;"]