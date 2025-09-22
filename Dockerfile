# Use Node.js LTS (Debian Bullseye for more recent packages)
FROM node:lts-bullseye

# Switch to root to install system dependencies
USER root

# Install required packages
RUN apt-get update && \
    apt-get install -y ffmpeg webp git && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*

# Switch back to the non-root user for security
USER node

# Clone your public GitHub repo (no credentials needed)
RUN git clone https://github.com/itsguruu/Botguru /home/node/Botguru

# Set working directory inside the container
WORKDIR /home/node/Botguru

# Adjust permissions and install dependencies
RUN chmod -R 777 /home/node/Botguru
RUN yarn install --network-concurrency 1 || npm install

# Expose the port your bot uses
EXPOSE 7860

# Set environment variable for production
ENV NODE_ENV=production

# Start the bot
CMD ["npm", "start"]
