## Environment variables
-  DB
-  USER
-  PWD

## Database
MySQL database deployed on AWS RDS
to connect a terminal to the database:
- cd C:\Program Files\MySQL\MySQL Server 8.1\bin
- `mysql.exe -h <YOUR HOST HERE> -P 3306 -u admin -p`
- Enter password

## Run server
run build, then:
start server: pm2 start dist/server
stop server: pm2 stop dist/server
check status: pm2 status | pm2 list


### ssh certificate 
- [Watch this video](https://www.youtube.com/watch?v=Kk9kuf6D8so)
-  Allow inbound to port 80
-  Stop server 
-  run ` sudo certbot certonly --standalone`