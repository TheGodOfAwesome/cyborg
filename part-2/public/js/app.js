var socket = io();
var xAxe = document.getElementById('x-axe');
var yAxe = document.getElementById('y-axe');
var zAxe = document.getElementById('z-axe');

socket.on('accelerometer', function (data) {
  xAxe.innerHTML = data.x.toFixed(3);
  yAxe.innerHTML = data.y.toFixed(3);
  zAxe.innerHTML = data.z.toFixed(3);
});