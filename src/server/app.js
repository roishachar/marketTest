var express = require('express');
var path = require('path');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/../../dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(morgan('dev'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://roi:intel696@ds163699.mlab.com:63699/heroku_hb0gjd9p');
var db = mongoose.connection;
mongoose.Promise = global.Promise;
var Pay = require('./pay.model.js');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');

// Server API
  app.get('/pays', function (req, res) {
    Pay.find({}, function (err, docs) {
      if (err) return console.error(err);
      res.json(docs);
    });
  });


  app.post('/pay', function (req, res) {
    let mailOptions = {
      from: 'roishachar@gmail.com', // sender address
      to: req.body.email, // list of receivers
      subject: 'Payment Completed', // Subject line
      text: 'Payment Completed', // plain text body
      html: 'Payment Completed' // html body
    };
// send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });


    var obj = new Pay(req.body);

    obj.save(function (err, obj) {
      if (err) return console.error(err);
      res.status(200).json(obj);
    });
  });

  app.get('/pay/:id', function (req, res) {
    Pay.findOne({_id: req.params.id}, function (err, obj) {
      if (err) return console.error(err);
      res.json(obj);
    })
  });

  app.put('/pay/:id', function (req, res) {
    Pay.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
      if (err) return console.error(err);
      res.sendStatus(200);
    })
  });

  app.delete('/pay/:id', function (req, res) {
    Pay.findOneAndRemove({_id: req.params.id}, function (err) {
      if (err) return console.error(err);
      res.sendStatus(200);
    });
  });


  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/../../dist/index.html'));
  });

  app.listen(app.get('port'), function () {
    console.log('listening on port ' + app.get('port'));
  });
});

module.exports = app;

'use strict';
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ironsourcetest2@gmail.com',
    pass: 'intel696'
  }
});

// setup email data with unicode symbols



