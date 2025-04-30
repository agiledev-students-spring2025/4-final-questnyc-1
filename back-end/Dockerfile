FROM node:lts AS deps
WORKDIR /app
COPY back-end/package*.json ./
RUN npm install --production

FROM node:lts-alpine
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY back-end ./
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "server.js"]