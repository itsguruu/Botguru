FROM node:20-bullseye-slim

USER root

RUN apt-get update && \
    apt-get install -y ffmpeg webp git python3 make g++ && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 7860

ENV NODE_ENV=production

CMD ["node", "index.js"]
