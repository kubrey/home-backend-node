FROM node:6.2

# Create app directory
RUN mkdir -p /home/app/homebackend
WORKDIR /home/app/homebackend

RUN mkdir -p /home/app/homebackend/node_modules

# Install app dependencies
COPY package.json /home/app/homebackend
RUN npm install
RUN npm i -g pm2

# Bundle app source
COPY . /home/app/homebackend

EXPOSE 3000

CMD [ "pm2", "start","--no-daemon", "ecosystem.json"]