const express = require('express');
const app = express();
const passport = require('passport');
const { JWTStrategy } = require('@sap/xssec');
const xsenv = require('@sap/xsenv');

// XSUAA Middleware
passport.use(new JWTStrategy(xsenv.getServices({uaa:{tag:'xsuaa'}}).uaa));

app.use(passport.initialize());
app.use(passport.authenticate('JWT', { session: false }));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post("/")

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('myapp listening on port ' + port);
});