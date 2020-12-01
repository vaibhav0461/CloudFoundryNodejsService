const express = require('express');
const app = express();
const passport = require('passport');
const { JWTStrategy } = require('@sap/xssec');
const xsenv = require('@sap/xsenv');
const bodyParser = require('body-parser');
app.use(bodyParser.json({ extended: true }));

// XSUAA Middleware
passport.use(new JWTStrategy(xsenv.getServices({uaa:{tag:'xsuaa'}}).uaa));

app.use(passport.initialize());
 app.use(passport.authenticate('JWT', { session: false }));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/GetData', function (req, res) {
  console.log("Request data:");
  console.log(req.body);
  res.json({
    "Location": "Melo",
    "ID": "1234",
    "Status": "Ack"
  });
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('myapp listening on port ' + port);
});