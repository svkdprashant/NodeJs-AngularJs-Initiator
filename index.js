const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const i18n = require('i18n')

const app = express();

const models = require('./models');

i18n.configure({
  directory: __dirname + '/modules/lang'
});

// i18n init parses req for language headers, cookies, etc.
app.use(i18n.init);

const api = require('./api')

// Set limit to parse json upto 6 MB.
app.use(bodyParser.json({limit: '6mb'}))
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '6mb'
}))

// Define static path
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', api)

// Render admin panel
app.get('/', function (req, res) {
  res.sendFile('index.html', __dirname);
});

app.use(function(req, res) {
    res.status(404).send("Invalid request");
});

/**
 * Database sync and server start
 */
models.sequelize.sync().then(function() {
    /**
     * Listen on provided port, on all network interfaces.
     */
    app.listen(8000, function() {
      console.log('API listening on port ' + 8000 + '!');
    });
});
