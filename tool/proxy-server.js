var connect = require('connect');
var http = require('http');
var proxy = require('http-proxy').createProxyServer({});
var path = require('path');
var serveStatic = require('serve-static');

var app = connect();
app.use(serveStatic('../../../../src'));

app.use(function (req, res) {
    console.log('proxying ' + req.url);
    proxy.web(req, res, {target: 'http://localhost:8888'});
    proxy.on('error', function (err) {
        console.log(err);
    });
});

http.createServer(app).listen(8000);