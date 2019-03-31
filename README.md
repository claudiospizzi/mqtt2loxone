# mqtt2loxone

[![mqtt-smarthome](https://img.shields.io/badge/mqtt-smarthome-blue.svg?style=flat-square)](https://github.com/mqtt-smarthome/mqtt-smarthome)
[![npm](https://img.shields.io/npm/v/mqtt2loxone.svg?style=flat-square)](https://www.npmjs.com/package/mqtt2loxone)
[![travis](https://img.shields.io/travis/claudiospizzi/mqtt2loxone.svg?style=flat-square)](https://travis-ci.org/claudiospizzi/mqtt2loxone)

This node.js application is a bridge between the [Loxone Smart Home] and a mqtt
broker. The Loxone MiniServer can publish any message by using the http virtual
output and the REST API of mqtt2loxone listening on port 3000 by default. The
request uri must have the prefix `/mqtt/` to publish mqtt messages.

## Installation

This node.js application is installed from the npm repository and executed with
the node command.

```bash
npm install -g mqtt2loxone
node /usr/local/bin/mqtt2loxone
```

Alternatively, the module can be executed as a docker container. Use the
following Dockerfile to build a container injecting the config file.

```dockerfile
FROM node:alpine

RUN npm install -g mqtt2loxone

COPY config.json /etc/mqtt2loxone.json

ENTRYPOINT [ "/usr/local/bin/mqtt2loxone", "/etc/mqtt2loxone.json" ]
```

## Configuration

ToDo

## API

ToDo

## Topics

ToDo

[Loxone Smart Home]: https://www.loxone.com/
