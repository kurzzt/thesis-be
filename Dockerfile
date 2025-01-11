# Use a Node.js image as the base
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Bundle app source
COPY . .

# Install app dependencies
RUN npm install

# Copy the .env and .env.development files
# COPY .env ./

RUN npx prisma generate

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3000

# Set environment variable for Prisma
# ENV NODE_ENV=production

# Start the server using the production build
# CMD ["npm", "run", "start:prod"]
CMD ["node", "dist/main"]