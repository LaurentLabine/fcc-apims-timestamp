// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();


Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };
if(!Date.now) Date.now = function() { return new Date(); }
Date.time = function() { return Date.now().getUnixTime(); }

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date?", function(req, res) {
  var date = new Date(req.params.date);// = new Date(req.params.date)//try to convert
  var utcMilliSeconds;

  if(!isNaN(req.params.date)){//if is a number, treat as epoch
    utcMilliSeconds = req.params.date;
    date = new Date(0)
    date.setUTCMilliseconds(utcMilliSeconds)
  }else if(!isNaN(date.getTime())){
    utcMilliSeconds = date.getUnixTime()
  }else return "Not a valid format"
  return (res.json(
      { unix : utcMilliSeconds, 
        utc: date.toUTCString()
  }))
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
