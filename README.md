# Smart home app on microservices

In project root:

 1. `docker-compose build`
 
 2. `docker-compose up -d`
 
### To install npm dependency:
 
 `docker-compose run node /bin/bash`
 
 You'll be inside of `node` container, run in bash npm command, e.g.:
 
 `npm i --save express`
 
 After this package.json on your host machine should be updated
