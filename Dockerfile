# Use a Node.js image as the base
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Install app dependencies
RUN npm install

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port on which the app will run
EXPOSE 8080

# Set environment variable for Prisma

# Start the server using the production build
CMD ["npm", "run", "start:prod"]