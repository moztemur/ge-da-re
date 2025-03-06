#!/bin/sh

# Use envsubst to replace environment variables in the template and output to nginx.conf
envsubst '${BACKEND_URL}' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/default.conf

# Start Nginx
exec nginx -g "daemon off;"
