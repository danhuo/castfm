# castfm

Douban FM Chrome Cast extension

# How to install

* Install dependencies for Ubuntu

This is requried by the douban.fm lib

```
sudo apt-get install libasound2-dev
```

Install Ruby 1.9.3 on Ubuntu 13.04 or Ruby 1.9.1 on Ubuntu 12.04

```
sudo apt-get install ruby1.9.3 or sudo apt-get install ruby1.9.1
sudo gem install compass
```

Install MongoDB

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update
sudo apt-get install mongodb-10gen
```

* Install Node.js
```
sudo apt-get update
sudo apt-get install -y python-software-properties python g++ make
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```

* Install Grunt and Bower
```
sudo npm install -g grunt-cli bower
```

* Install dependencies
cd to the root folder of this project, then run:

```
npm cache clear
npm install
bower install
grunt build
```

# How to start and test

```
grunt serve
```

# Optional

Install the [generator-angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack) scaffolding to fasten the developement.