#!/bin/bash
cd src/deployments/blue
cnpm i
# 查看该文件是否包含该地址，true: 直接 npm run build false 先执行替换在npm run build
grep -w "http://192.168.9.232" nuxt.config.js && echo "yes messycode" || sed -i "s/let NODE_BASEURL = null, NODE_IMGSERVERURL = null, NODE_WEBSOCKETURL = null, NODE_WEBSOCKETHTTPURL = null/let NODE_BASEURL = 'http:\/\/192.168.9.232', NODE_IMGSERVERURL = 'http:\/\/192.168.9.236:8999\/', NODE_WEBSOCKETURL = 'ws:\/\/192.168.9.232:8082', NODE_WEBSOCKETHTTPURL = 'http:\/\/192.168.9.232:8082'/g" nuxt.config.js

npm run build
# yarn install
# yarn build

cd ../green
cnpm i
grep -w "http://192.168.9.232" nuxt.config.js &&  echo "yes messycode" || sed -i "s/let NODE_BASEURL = null, NODE_IMGSERVERURL = null, NODE_WEBSOCKETURL = null, NODE_WEBSOCKETHTTPURL = null/let NODE_BASEURL = 'http:\/\/192.168.9.232', NODE_IMGSERVERURL = 'http:\/\/192.168.9.236:8999\/', NODE_WEBSOCKETURL = 'ws:\/\/192.168.9.232:8082', NODE_WEBSOCKETHTTPURL = 'http:\/\/192.168.9.232:8082'/g" nuxt.config.js

npm run build
# yarn install
# yarn build
