FROM node:16.17-bullseye-slim AS base

FROM base AS builder
WORKDIR /web-scraper-backend
COPY ["package.json", "yarn.lock",  "tsconfig.json", "./"]
RUN  yarn
COPY ["src", "./src"]
RUN yarn build

FROM builder AS dependencies
WORKDIR /web-scraper-backend
COPY ["package.json", "yarn.lock", "./"]
RUN yarn --prod

# STAGE: Run migrations
FROM base AS migrate
WORKDIR /web-scraper-backend
COPY --from=base /web-scraper-backend /web-scraper-backend
CMD yarn migrate

# STAGE: Rollback migrations
FROM base AS migrate-rollback
WORKDIR /web-scraper-backend
COPY --from=base /web-scraper-backend /web-scraper-backend
CMD yarn rollback

FROM base AS main
WORKDIR /web-scraper-backend
EXPOSE ${SERVER_PORT}
COPY --from=builder /web-scraper-backend/dist /web-scraper-backend/dist
COPY --from=builder ["web-scraper-backend/package.json", "web-scraper-backend/yarn.lock", "web-scraper-backend/"]
COPY --from=dependencies /web-scraper-backend/node_modules /web-scraper-backend/node_modules
ENTRYPOINT [ "node", "dist/server.js" ]
