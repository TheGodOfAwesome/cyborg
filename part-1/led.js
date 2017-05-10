/*
TITLE: 
Light the led from node.js

DESCRIPTION:
We will use the node-metawear library to connect to the sensor and light the led
*/

var metawear = require('node-metawear');

metawear.discover(function(device) {
  console.log('metawear discovered');

  device.connectAndSetup(function(error) {
    console.log('metawear connected');
    var led = new device.Led(device);
    led.config.setColor(led.config.GREEN);
    led.config.patternSolid();
    led.commitConfig();
    led.play();
    console.log('LED activated !');
  });
});
