# pull the Node.js Docker image
FROM node:16-alpine

# create the directory inside the container
WORKDIR /usr/src/app

# copy the package.json files from local machine to the workdir in container
COPY package.json ./
COPY yarn.lock ./

# run npm install in our local machine
RUN yarn install --frozen-lock-file

COPY server.js ./

# our app is running on port 4400 within the container, so need to expose it
EXPOSE 4400

# the command that starts our app
CMD ["node", "server.js"]
