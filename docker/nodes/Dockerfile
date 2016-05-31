FROM node:latest

RUN npm install -g pm2@latest

VOLUME ["/app"]
ADD start /start
RUN chmod 755 /start
CMD ["/start"]
ENTRYPOINT []

EXPOSE 80
EXPOSE 443
