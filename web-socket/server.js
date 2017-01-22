var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var bodyParser = require('body-parser');
var data = [];


var appW = expressWs.app;

appW.ws('/test', function(ws, req) {
});

var aWss = expressWs.getWss('/test');
/*
setInterval(function () {
    console.log(data.length);
    if (data.length !== 0) {
        var temp = data;
        data = [];
        aWss.clients.forEach(function (client) {
            client.send(temp);
        });
    }
}, 5000);*/



app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST,  PATCH');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    console.log('middleware');
    req.testing = 'testing';
    return next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
    console.log('hello');
});

app.post('/', function (req, res, next) {

    console.log('body: ', req.body);

    jsonData = JSON.stringify(req.body);

    aWss.clients.forEach(function (client) {
        client.send(jsonData);
    });
});

app.delete('/', function (req, res) {
    console.log('body: ', req.body);

    req.body['delete'] = true;

    jsonData = JSON.stringify(req.body);

    aWss.clients.forEach(function (client) {
        client.send(jsonData);
    });
});

app.listen(3333);