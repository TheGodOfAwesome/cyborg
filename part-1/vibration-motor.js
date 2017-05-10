
var metawear = require('node-metawear');

metawear.discover(function(device) {
  console.log('metawear discovered : ', device.address);

  device.connectAndSetup(function(error) {
    console.log('metawear connected');

    var haptic = new device.Haptic(device);

    setInterval(function() {
      haptic.startMotor(500,278);
      console.log('MOTOR activated !')
    }, 2000);
  });
});