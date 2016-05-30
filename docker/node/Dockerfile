FROM ubuntu:14.04

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 6.2.0
# Run updates and install deps
RUN apt-get update
# Install needed deps and clean up after
RUN apt-get install -y -q --no-install-recommends \
    apt-transport-https \
    build-essential \
    ca-certificates \
    curl \
    g++ \
    gcc \
    git \
    make \
    nginx \
    sudo \
    wget \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get -y autoclean

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash \
    && /usr/local/bin/nvm install $NODE_VERSION \
    && /usr/local/bin/nvm alias default $NODE_VERSION \
    && /usr/local/bin/nvm use default
#RUN nvm install $NODE_VERSION
#RUN nvm alias default $NODE_VERSION
#RUN nvm use default

ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN npm install -g pm2
RUN mkdir -p /var/www/homeapp/data/www/home.loc
WORKDIR /var/www/homeapp/data/www/home.loc
ADD . /var/www/homeapp/data/www/home.loc
RUN npm install
COPY docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]

# Expose port
EXPOSE 8800

# Run app
CMD pm2 start --no-daemon  processes.json
