FROM ubuntu:14.04
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
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
     && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default
#RUN nvm install $NODE_VERSION
#RUN nvm alias default $NODE_VERSION
#RUN nvm use default

ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN npm install -g pm2
RUN mkdir -p /var/www/homeapp/data/www/home.loc
WORKDIR /var/www/homeapp/data/www/home.loc
RUN echo 234
ADD . /var/www/homeapp/data/www/home.loc
RUN npm install
COPY ./entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]

# Expose port
EXPOSE 8800

# Run app
CMD pm2 start --no-daemon  processes.json
