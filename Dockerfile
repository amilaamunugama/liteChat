FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/expressapp
WORKDIR /usr/src/expressapp

# Install app dependencies
COPY package.json /usr/src/expressapp/
RUN npm install

# Bundle app source
COPY . /usr/src/expressapp

EXPOSE 3000
CMD [ "npm", "start" ]
