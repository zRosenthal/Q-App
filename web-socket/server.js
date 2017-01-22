var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var bodyParser = require('body-parser');
var data = [];

app.use(function (req, res, next) {
    console.log('middleware');
    req.testing = 'testing';
    return next();
});


app.use(bodyParser.json());

app.post('/send', function(req, res, next){

    data.concat(req.body);

    res.end();
});

app.ws('/', function(ws, req) {

    if (data.length > 0) {
        var temp = data;
        data = [];
        ws.send(temp);
    }
});

app.listen(3000);