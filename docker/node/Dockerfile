FROM node:6.2

RUN useradd --user-group --create-home --shell /bin/false app
# RUN npm install -g npm

ENV HOME=/home/app

COPY package.json npm-shrinkwrap.json $HOME/homebackend
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/homebackend
RUN npm install

USER root
RUN npm i -g pm2
COPY . $HOME/homebackend
RUN chown -R app:app $HOME/*
USER app

CMD ["pm2", "ecosystem.json"]
