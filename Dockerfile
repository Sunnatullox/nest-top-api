FROM node:22-alpine

WORKDIR /opt/app

COPY package.json package.json

RUN npm install && npm run build && npm prune --production

COPY . .

CMD ["node", "./dist/main.js"]
