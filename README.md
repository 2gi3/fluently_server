Node version: 20.5.1.

This is an Express.js API designed for: [fluently_client](https://github.com/2gi3/fluently_client)

## Run project 
Make sure to create all the [Environment variables](#environment-variables)
, you can find them in .env.example or at 

### Development mode
- ```npm run dev```
  This script watches for any change saved in /src (typescript), when a change is detected it will compile the the javascript code in /dist and then it will run nodemon /dist/server.

### Local production mode 
- ```npm run build```
  This will compile the typescript code to javascript
- ```npm start```
  This will start the server


### Remote production deployment ()
Install pm2 then:
- ```npm run build```
  This will compile the typescript code to javascript
- ```pm2 start dist/server```
  This will start the server and keep it running when the console is closed

  -  #### Stop production server  
     ```pm2 stop dist/server```

  -  #### Check production server status
     - ```pm2 status```  
     or
     - ```pm2 list```


## <h2 id="environment-variables">Environment variables</h2>
- ### Database
  -  DB=< database-name >
  -  DATABASE_USER=
  -  DATABASE_PWD=
  -  DATABASE_HOST=

- ### AWS S3 Bucket
  -  BUCKET_NAME=
  -  BUCKET_REGION=< example: 'eu-west-2' >
  -  IAM_ACCESS_KEY=
  -  IAM_SECRET_ACCESS_KEY=

- ### Authentication
  -  ACCESS_TOKEN_SECRET=< any string >
  -  REFRESH_TOKEN_SECRET=< any string >

- ### CORS
  - ALLOWED_ORIGIN=< example: http://localhost:8081 > 




## <h2 id="authentication-authorization">Authentication & Authorization</h2>

### JSON Web Tokens (JWT)
When a user signs up or logs in, 2 Tokens are created:
- Access token 
  - Used to authenticate and authorize the user in the middleware auth function
  -  Hes an expiration time
  -  Is saved in the client's cookies as `speaky-access-token`
    
- Refresh token
  - Used to create a new access token when the available one is expired
  - Has no expiration time
  - Is saved in the database
  - Is also saved in the client's cookies as `speaky-access-token`   
  
#### Ways to renew an expired access tokens
- If the user hasn't logged out and the refresh token is still in the cookies
  - Make a GET request to .../api/auth/token
  - Make any request at all and the auth middleware will renew the expired access token


## Middleware 

### rateLimiter

This file export 3 different rate limiters

- lowLimiter
  This is the strictest limiter, used for sensitive routes (i.e., login, signup)

- mediumLimiter
  Used for most routes

- highLimiter
  Used for routes where a high number of requests may be expected.


### auth
This function does the following actions:
- Decodes the JSON web token (JWT), than takes the user id contained in the token and saves it in the CustomRequest as follows ```req.userId = < ID CONTAINED IN THE JWT >```, 
- If the access token is valid it calls next() and the code keeps running to the next function in the route
- If the access token is expired but the refresh token is still in the cookies and is also still saved in the database, then it will refresh the access token and perform the 2 actions above.

#### Examples
- Allow access to anyone:
     ```
     router.post('/login', login as RequestHandler);
     ```

- Allow access only to authenticated users:
     ```
     router.get('/', auth, getAllUsers as RequestHandler);
     ```


- Allow only one specific user to erform an action

  -   ```
      router.delete('/:id', auth, deleteUser as RequestHandler);
      ```
  -  deleteUser function 

      ```
      if (req.params.id === req.userId) {
      Only in this case the account can be deleted,       because the  id in the JWT is the same  as the one       in the uri parameter
      }
      ```




## Database
MySQL database deployed on AWS RDS

 [Schema](https://lucid.app/lucidchart/51657296-144f-4c77-bb6d-d884633feee1/edit?viewport_loc=771%2C892%2C1634%2C905%2C0_0&invitationId=inv_dac76781-4be4-4192-baf0-91d521b9d3fc)

to connect a terminal to the database:
- cd C:\Program Files\MySQL\MySQL Server 8.1\bin
- `mysql.exe -h <YOUR HOST HERE> -P 3306 -u admin -p`
- Enter password

to dupm database structure:
- from remote ```mysqldump -h <hostname> -u <username> -p<password> <DbName> > <DbName>_dump.sql```

- from local directory ```mysqldump -u <USER>> -p --no-data <DbName> > <DbName>_structure_only.sql```



### ssh certificate 
- [Watch this video](https://www.youtube.com/watch?v=Kk9kuf6D8so)
-  Allow inbound to port 80
-  Stop server 
-  Run ` sudo certbot certonly --standalone`
-  Save certificates to /certificates (ignored by git)
