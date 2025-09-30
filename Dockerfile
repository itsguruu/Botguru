FROM node:lts-buster

# Use root to install OS dependencies
USER root

# Install required system packages
RUN apt-get update && \
    apt-get install -y ffmpeg webp git && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*

# Create and use a safe working directory
WORKDIR /home/node/app

# Copy all your project files into the image
COPY . .

# Install node/yarn dependencies
RUN yarn install --network-concurrency 1

# Expose the port your bot will listen on
EXPOSE 7860
ENV NODE_ENV=production

# Start the bot using npm (pm2 will be triggered by package.json)
CMD ["npm", "start"]
