# 
FROM node:alpine

# Copy package.json and package-lock.json to the image
# We need them to build the dependencies for our project

WORKDIR /app

#RUN npm i npm@latest -g
COPY package.json package.json
COPY package-lock.json package-lock.json

# Run `npm ci` to install project dependencies
RUN npm i 

# Set environment variables
ENV CI=true
ENV PORT=3000

ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app/frontend

COPY . .

EXPOSE $PORT

# Default command to start the app
CMD [ "npm", "start" ]
