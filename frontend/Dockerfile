FROM node:20 AS build-env
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY index.html ./
COPY src /app/src
COPY public /app/public

# install all deps, build, then remove dev deps
RUN npm install && npm run build && npm prune --production

# Stage for running application
FROM nginx:1.27.4-alpine
WORKDIR /app

COPY --from=build-env /app/dist /usr/share/nginx/html


# Install envsubst for environment variable replacement
RUN apk add --no-cache bash gettext

COPY nginx.conf /etc/nginx/templates/nginx.conf.template
COPY docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh
# Copy custom Nginx config template and startup script


EXPOSE 80

# Use custom entrypoint script
CMD ["/docker-entrypoint.sh"]
