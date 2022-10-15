# webpack-vue

- node-version: v16.10.0

## Node 安装

```
mkdir /usr/software/
wget https://nodejs.org/dist/v16.10.0/node-v16.10.0-linux-x64.tar.xz
tar xf  node-v16.10.0-linux-x64.tar.xz -C /usr/software/
cd /usr/software/ && mv node-v16.10.0-linux-x64 nodejs

ln -s /usr/software/nodejs/bin/npm   /usr/local/bin/ 
ln -s /usr/software/nodejs/bin/node   /usr/local/bin/
npm -v   ---> 7.24.0
node -v  ---> v16.10.0
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
