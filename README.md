# castfm

Douban FM Chrome Cast extension

# How to install

* Install Node.js
```
sudo apt-get update
sudo apt-get install -y python-software-properties python g++ make
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```

* Install Grunt
```
sudo npm install -g grunt-cli
```

* Install dependencies
cd to the root folder of this project, then run:

```
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