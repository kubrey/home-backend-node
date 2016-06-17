#! /bin/bash

docker-compose logs > docker.log

tail -30 docker.log