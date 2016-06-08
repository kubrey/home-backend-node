FROM node:6.2

# Create app directory
RUN mkdir -p /home/app/homebackend
WORKDIR /home/app/homebackend

# Install app dependencies
COPY package.json /home/app/homebackend
RUN npm install
RUN npm i -g pm2

# Bundle app source
COPY . /home/app/homebackend

CMD [ "pm2", "ecosystem.json" ]