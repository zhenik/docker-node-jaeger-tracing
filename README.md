# Docker, Node, MongoDB 

### Standalone  
* How to build (run from standalone folder)  
`docker build -t zhenik/hello-node .` 
 
* How to run    
`docker run -d -p1234:1234 zhenik/hello-node`

### Compose-with-mongo  
*Notice: mongo port 27017 is not exposed. Mongodb accessible only inside docker container.  
* How to run(run from standalone folder. detached mode)  
`docker-compose up -d`   