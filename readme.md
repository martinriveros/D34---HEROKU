# Simple NGINX example

My first approach to [NGINX](https://www.nginx.com/) and [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/).

## To run

Install all dependencies

```bash
npm install
```
```bash
npm i nodemon -d
```

Then you need to run nginx.exe as Administrator (right-click over .exe)

Then you have some scripts predefined te quick test (e.g: "npm run devcluster") to help you get the exercise results:
```bash
dev:        nodemon ./Node/index.js
```
```bash
devcluster: node index.js --mode cluster --port 8081
```
```bash
devfork:    node index.js --mode fork --port 8080
```
```bash
devfork:    nodemon ./Node/index.js --mode fork --port 8080
```
```bash
devchild:   node index.js --mode child --port 8080
```
```bash
pm2:        pm2 strat index.js --name='PM2-Fork' --watch -- 8080
```
```bash
pm2cluster: pm2 start index.js --name='PM2-Cluster' --watch -i max -- 8080
```
```bash
nginx1: pm2 start index.js --name='PM2-fork-standalone8082' --watch -- --port 8082
```
```bash
nginx2: pm2 start index.js --name='PM2-fork-standalone8083' --watch -- --port 8083
```
```bash
nginx3: pm2 start index.js --name='PM2-fork-standalone8084' --watch -- --port 8084
```
```bash
nginx4: pm2 start index.js --name='PM2-fork-standalone8085' --watch -- --port 8085
```


## A couple of alternatives


- ### Configuration #1


All requests to /api/randoms will be derived to a native cluster-mode server listening on port 8081 (see conf.d/first.conf on NGINX folder)

```bash
localhost/api/randoms?cant=   (whatever number you like. If no number, default=100000))
```
For this you can use:

```bash
npm run devcluster
```

All requests to /info will be derived to simple server listening on port 8080. 
```bash
localhost/info
```
- ### Configuration #2

All requests to /api/randoms will be derived to servers (launched with PM2-fork mode)listening on ports 8082, 8083, 8084 and 8085 (see conf.d/secod.conf on NGINX folder) in an even round-robin mode (no weight)

For this you can use:

```bash
npm run nginx1
```
```bash
npm run nginx2
```
```bash
npm run nginx3
```
```bash
npm run nginx4
```
Also, /info is redirected to 8080 port, so you need to start:
```bash
npm run devfork
```



## Switch from Configuration #1 to #2

To test this, you need to comment the include directive in nginx.conf to allow only one of them.

## Enjoy this next saturday night
