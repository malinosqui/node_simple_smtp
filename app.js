var express = require('express');
var app = express();
var http = require('http').Server(app);
var smtpClient = require('./client.js');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

//plugin para pegar params via POST
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/sendSimple', function (req, resp) {
    var options = {};

    // options.email = "gabrielmalinosqui@gmail.com, felgimenes@gmail.com, wellington.c.v.santana@gmail.com";
    options.email = "gabrielmalinosqui@gmail.com";
    options.name = req.body.name || "";
    options.phone = req.body.phone || "";
    options.usePhoneToContact = req.body.usePhoneToContact ? "sim" : "não" || "";
    options.dateClass = req.body.dateClass || "";
    options.hourLesson = req.body.hourLesson || "";
    options.customerEmail = req.body.email || "";
    options.price = req.body.price || "";
    options.location = req.body.location || "";
    options.level = req.body.level || "";
    options.course = req.body.course || "";
    options.subject = 'Interesse em aula';
    options.frequency = req.body.frequency || "";


    smtpClient.send(options, function (err) {
        if (err) {
            resp.send({ err: err });
        } else {
            resp.send({ status: 400 });
        }
    });

});

//inicia servidor no express 
http.listen(port, function () {
    console.log('Express server listening on port ', port);
});