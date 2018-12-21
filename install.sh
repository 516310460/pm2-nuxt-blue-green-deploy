#!/bin/bash

cd src/deployments/blue
cnpm i
npm run build
# yarn install
# yarn build

cd ../green
cnpm i
npm run build
# yarn install
# yarn build
