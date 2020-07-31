const express = require('express');
const path = require('path');
const app = express();
app.use('/public', express.static(path.join(__dirname, 'public')));
require('./startup/env')();
require('./startup/routes')(app);
require('./startup/db')();



app.use(function (err, req, res, next) {
  if (app.get('env') === 'local') {
    return errorhandler(err, req, res, next);
  } else {
    res.sendStatus(401);
  }
});
const port = process.env.NODE_PORT || 4050;

if (process.env.NODE_ENV !== 'test') app.listen(port, () => console.log(`Listening on port ${port}...`));

if (process.env.NODE_ENV === 'test') module.exports = app;