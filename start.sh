#!/bin/bash

# Create /current symlink and start PM2
rm -rf src/current || true
sudo ln -s -v $PWD/src/deployments/blue $PWD/src/current
cp $PWD/src/deployments/blue $PWD/src/current
pm2 start src/current/ecosystem.config.json
#cd src/current
#npm run prd
