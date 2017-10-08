'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket = require('./socket.js');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 9000;

var app = (0, _express2.default)();
var server = _http2.default.Server(app);
(0, _socket2.default)(server);

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

var pathToRoutes = _path2.default.resolve(__dirname, './server/routes') + "/";
var pathToControllers = _path2.default.resolve(__dirname, './server/controllers') + "/";

_mongoose2.default.connect('mongodb://heroku_k2pz1bq2:ta7ni3luchib79d4mo8d4hbv71@ds113505.mlab.com:13505/heroku_k2pz1bq2');

_fs2.default.readdirSync(pathToRoutes).forEach(function (file) {
    require(pathToRoutes + file)(app, require(pathToControllers + file));
});

app.get('*', function (req, res) {
    res.send('Hello');
});

app.use(function (req, res) {
    res.status(404).send({ success: false, message: 'Page not found' });
});

server.listen(port, function () {
    console.log('-- Server running on port ' + port + ' --');
});