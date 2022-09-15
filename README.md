<h1 align="center">
🌐 HackerEarth Full Stack Challenge 
</h1>
<p align="center">
MongoDB, Expressjs, React/Redux, Nodejs
</p>



> MERN is a fullstack implementation in MongoDB, Expressjs, React/Redux, Nodejs.

MERN stack is the idea of using Javascript/Node for fullstack web development.



## clone or download
```terminal
$ git clone https://github.com/vinodnextcoder/hackerearth-full-stack-challenge.git

for backend 
$ cd bill-backend
$ npm install

for frontend
$ cd bill-frontend
$ npm install


```
## project structure
```terminal
LICENSE
package.json
 server side bill-frontend/
   package.json
   cp .env.example cp
   .env (to create .env, check [prepare your secret session])
cliend side bill-backend/
   package.json
...
```

# Usage (run fullstack app on your machine)

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal
$ cd client   // go to client folder
$ npm i       // npm install packages
$ npm run dev // run it locally

// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```

## Server-side usage(PORT: 5000)
## Frontend-side usage(PORT: 3006)

 "JWT_SECRET=YOUR_JWT_SECRET" >> ./server/src/.env
```

### Start

```terminal
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm run start // run it locally
$ npm run build // this will build the server code to es5 js codes and generate a dist file
```
