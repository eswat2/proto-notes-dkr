FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn install

# Bundle app source
COPY . .

EXPOSE 8082 8182
CMD [ "yarn", "start" ]
