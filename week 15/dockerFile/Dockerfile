FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build
RUN npx prisma generate

EXPOSE 3000

ENTRYPOINT ["node", "dist/index.js"]