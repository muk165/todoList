const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');


mongoose.connect('mongodb://localhost:27017/todoDb', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(function () { console.log('database conected...') })
    .catch(function (err) { console.log('could not connect to database ' + err) });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const mustacheExpressInstance = mustacheExpress();
mustacheExpressInstance.cache = null;

app.engine('mustache', mustacheExpressInstance);
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

const routes = require('./routes/routes');
app.use('/', routes);

const Port = process.env.PORT || 3000;
app.listen(Port, function () { console.log(`app running on port ${Port}`) });

