FROM node:lts-buster

USER root
RUN apt-get update && \
    apt-get install -y ffmpeg webp git && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*

# Create and use a safe working directory
WORKDIR /home/node/app

# Copy your project files into the image
COPY . .

# Install dependencies
RUN yarn install --network-concurrency 1

# Expose the port your app uses
EXPOSE 7860
ENV NODE_ENV=production

# Start the bot
CMD ["npm", "start"]
