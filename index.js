#!/usr/bin/env node

const log = require('yalm');
const mqtt = require('mqtt');
const express = require('express');
const bodyParser = require('body-parser');

const pkg = require('./package.json');
const cfg = require(process.argv[2] || './config.json');

let mqttConnected;

log.setLevel(cfg.log);
log.info(pkg.name + ' ' + pkg.version + ' starting');

const mqttClient = mqtt.connect(
    cfg.mqtt.url, {
        will: { topic: cfg.mqtt.name + '/connected', payload: '0', retain: true },
        rejectUnauthorized: cfg.mqtt.secure
    }
);

mqttClient.on('connect', () => {

    mqttClient.publish(cfg.mqtt.name + '/connected', '2', { retain: true });

    mqttConnected = true;
    log.info('mqtt: connected ' + cfg.mqtt.url);

    // ToDo: Subscribe
});

mqttClient.on('close', () => {

    if (mqttConnected) {
        mqttConnected = false;
        log.info('mqtt: disconnected ' + cfg.mqtt.url);
    }
});

mqttClient.on('error', err => {

    log.error('mqtt: error ' + err.message);
});

mqttClient.on('message', (topic, payload, msg) => {

    // ToDo: Parse Messages
});

const expressServer = express();
expressServer.use(bodyParser.text({ type: 'text/*' }));

expressServer.route('/mqtt/' + cfg.mqtt.name + '/:topic(*)')
    .post(parseRequest);

expressServer.listen(cfg.loxone.port, '0.0.0.0', () => {
    log.info('express: server running on http://0.0.0.0:' + cfg.loxone.port);
});

function parseRequest(req, res) {

    publishMqttStatus(req.params.topic, req.body);
    res.send();
}

function publishMqttStatus(topic, value) {

    let parsedValue;
    if (value == 'true') {
        parsedValue = 1;
    }
    else if (value == 'false') {
        parsedValue = 0;
    }
    else if (!isNaN(value)) {
        parsedValue = Number(value);
    }
    else {
        parsedValue = value;
    }

    payload = {
        ts: Date.now() / 1000,
        val: parsedValue
    }

    mqttClient.publish(cfg.mqtt.name + '/' + topic, JSON.stringify(payload));
    log.info('mqtt: publish ' + cfg.mqtt.name + '/' + topic + ' ' + JSON.stringify(payload));
}
