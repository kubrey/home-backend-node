#! /bin/bash

docker-compose logs > docker.log

tail -20 docker.log