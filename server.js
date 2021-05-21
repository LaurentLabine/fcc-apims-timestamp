// server.js
// where your node app starts
//webpack HOT configuration : https://webpack.js.org/guides/hot-module-replacement/

// init project
require('dotenv').config();
var express = require('express');
var app = express();


Date.prototype.getUnixTime = function () { return this.getTime() / 1000 | 0 };

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/timestamp/:date?", function (req, res) {

  const param = req.params.date;
  let utcMilliSeconds;
  let date = new Date(param);
  let response = {};

  if (!param) {

    var currentdate = new Date();
    var datetime = currentdate.getFullYear() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getDate() + " "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();

    date = new Date(datetime)
    utcMilliSeconds = date.getUnixTime() * 1000

  } else if (!isNaN(param)) {//If number
    date = new Date(0)
    date.setUTCMilliseconds(param)
    utcMilliSeconds = date.getUnixTime() * 1000
  } else if (!isNaN(date.getTime())) {//If valid date
    date = new Date(param);
    utcMilliSeconds = date.getUnixTime() * 1000
  } else return (res.json({ error: "Invalid Date" })); //Invalid Format

  return (res.json(
    {
      unix: utcMilliSeconds,
      utc: date.toUTCString()
    }))
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
