# You need server with following requierements

8-Core (16-Thread) / 8GBRAM DDR4 / 500GB SSD

## 1. Upgrade your server
```
sudo apt update && sudo apt upgrade -y
```
```
sudo apt install make clang pkg-config libssl-dev libclang-dev build-essential git curl ntp jq llvm tmux htop screen unzip -y
```
## 2. Install docker and docker-compose

Check the latest version of [docker-compose](https://github.com/docker/compose) and follow the guide
```
sudo apt install docker.io -y
```
```
git clone https://github.com/docker/compose
```
```
cd compose
git checkout v2.6.1
make
```
```
cd
mv compose/bin/docker-compose /usr/bin
docker-compose version
```
## 3. Install and synch Aurora node

Download installation from [official documentation](https://github.com/aurora-is-near/partner-relayer-deploy)
```
git clone https://github.com/aurora-is-near/partner-relayer-deploy
```

