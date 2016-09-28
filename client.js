var nodemailer = require('nodemailer');
var smtpTransport = require("nodemailer-smtp-transport");
var EmailTemplate = require('email-templates').EmailTemplate;
var path = require('path');

var templateDir = path.join(__dirname, 'templates');


// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.zoho.com',
    secureConnection: true,
    port: 465,
    auth: {
        user: 'alertas@ensinaae.com.br',
        pass: 'dev@ensinaae'
    }
}));

var template = new EmailTemplate(templateDir);


return module.exports = {
    send: send
};


function send(options, callback) {

    template.render(options, function (err, result) {
        var send = transporter.templateSender({
            from: 'alertas@ensinaae.com.br',
            html: result.html
        }, callback);

        send({
            to: options.email,
            subject: 'Interesse de aula'
        }, options, callback);
    });
    // var sender = transporter.templateSender, {
    //     from: '<alertas@ensinaae.com.br>'
    // });

    // sender({
    //     to: options.email,
    //     subject: options.subject
    // }, options, callback);
}