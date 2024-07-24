FROM node:16-alpine

WORKDIR /app/worker

COPY package* ./
RUN npm install
RUN npm install typescript @types/node --save-dev

COPY tsconfig.json ./

COPY src ./src
RUN npx tsc --build

CMD ["node", "dist/index.js"]