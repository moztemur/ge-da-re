FROM node:20 AS build-env
WORKDIR /app
# copy configs to /app folder
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
# copy source code to /app/src folder
COPY src /app/src
# install all deps, build, then remove dev deps
RUN npm install && npm run build && npm prune --production

FROM node:20-alpine AS runtime-env
WORKDIR /app
COPY --from=build-env /app/dist /app/dist
COPY --from=build-env /app/node_modules /app/node_modules

EXPOSE 3000

CMD node dist/main.js
