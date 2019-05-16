# mqtt2loxone

[![mqtt-smarthome](https://img.shields.io/badge/mqtt-smarthome-blue.svg?style=flat-square)](https://github.com/mqtt-smarthome/mqtt-smarthome)
[![npm](https://img.shields.io/npm/v/mqtt2loxone.svg?style=flat-square)](https://www.npmjs.com/package/mqtt2loxone)
[![travis](https://img.shields.io/travis/claudiospizzi/mqtt2loxone.svg?style=flat-square)](https://travis-ci.org/claudiospizzi/mqtt2loxone)

This node.js application is a bridge between the [Loxone Smart Home] and a mqtt
broker. The Loxone MiniServer can publish a message by using the UDP virtual
output and using port 4000 on mqtt2loxone by default. The mqtt2loxone will
**publish** the message afterwards to the mqtt broker.

On the other way, the mqtt2loxone will **subscribe** to the topic `loxone/set/#`
and forward all messages received from the mqtt broker to the Loxone MiniServer.
The mqtt2loxone will check the `val` property. If the property is a string, it
will be forwarded to a Loxone virtual text input. If it's a number, boolean or
null, it will be forwarded to a Loxone UDP virtual input, using the same port
4000 by default.

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

### HTTP

tbd

### UDP

![UDP Virtual Output](https://github.com/claudiospizzi/mqtt2loxone/blob/master/assets/loxone-virtualoutput-udp.png?raw=true)

This module contains a udp api to receive udp datagrams from the Loxone
MiniServer logger component. The loxone logger component always has the prefix
with date and time as well as the source device name, separated by a semicolon.
To process the udp message, the following structure must is required:

`<yyyy-MM-dd HH:mm:ss>;<Name>;<Room>;<Device>;<Measurement>;<Value>`

## Topics

ToDo

[Loxone Smart Home]: https://www.loxone.com/
/mqtt/loxone/humidity/EG.0 Gang/Touch Zimmer