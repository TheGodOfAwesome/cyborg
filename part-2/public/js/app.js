var socket = io();
var xAxe = document.getElementById('x-axe');
var yAxe = document.getElementById('y-axe');
var zAxe = document.getElementById('z-axe');




var options = {grid:{fillStyle:'transparent',strokeStyle:'transparent',verticalSections:0,borderVisible:false},maxValue:2,minValue:-2};
var lineOptions = {lineWidth:2};

var x = new TimeSeries();
var y = new TimeSeries();
var z = new TimeSeries();

var xChart = new SmoothieChart(options);
xChart.streamTo(document.getElementById("x-chart"), 1000);

var yChart = new SmoothieChart(options);
yChart.streamTo(document.getElementById("y-chart"), 1000);

var zChart = new SmoothieChart(options);
zChart.streamTo(document.getElementById("z-chart"), 1000);


// Data

xChart.addTimeSeries(x,lineOptions);
yChart.addTimeSeries(y,lineOptions);
zChart.addTimeSeries(z,lineOptions);

socket.on('accelerometer', function (data) {
  var dataX = data.x.toFixed(3);
  var dataY = data.y.toFixed(3);
  var dataZ = data.z.toFixed(3);


  xAxe.innerHTML = dataX;
  yAxe.innerHTML = dataY;
  zAxe.innerHTML = dataZ;

  x.append(new Date().getTime(), dataX);
  y.append(new Date().getTime(), dataY);
  z.append(new Date().getTime(), dataZ);
  
});
