/* jshint esversion : 6 */
/* Author : Alan Hortz <alan@handson.io> */

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const metawear = require('node-metawear');

var rate = 50;
var range = 2;

app.use(express.static('public'));

server.listen(8000, function() {
  console.log('server listening on port 8000');
});

io.on('connection', function() {
  console.log('user connected');
});

metawear.discover(function(device) {
    console.log('metawear discovered ', device.address);

    device.on('disconnect', function() {
        console.log('we got disconnected! :( ');
    });

    device.connectAndSetup(function(error) {
        console.log('were connected!');
        console.log('Start accelerometer with ' + rate + 'hz ang +-' + range + 'g');

        var accelerometer = new device.Accelerometer(device);
        var logger        = new device.Log(device);

        accelerometer.setOutputDataRate(rate);
        accelerometer.setAxisSamplingRange(range);
        logger.startLogging(false);

        accelerometer.setConfig();
        accelerometer.enableNotifications();
        accelerometer.enableAxisSampling();
        accelerometer.start();

        accelerometer.onChange(function(data) {
           io.emit('accelerometer', data);
        });
    });
});