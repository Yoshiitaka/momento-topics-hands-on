FROM node:16 AS builder
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install
RUN npm run build

FROM node:16-stretch-slim AS runner
ENV NODE_ENV=production
COPY --from=builder /usr/src/app/next.config.js ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next/static ./.next/static

COPY --from=builder /usr/src/app/.next/standalone ./

RUN npm install -g next
EXPOSE 3000
CMD ["npm", "run", "start"]