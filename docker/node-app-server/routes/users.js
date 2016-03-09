var amqp = require('amqplib/callback_api');
var express = require('express');
var router = express.Router();
var db = require('./../schema/db');
var user = require('./../schema/model/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/find/:id', function(req, res, next) {
  user.findByUserId(req.params.id, function(err, user) {
    console.log(req.params);
    console.log(err);
    console.log(user);
    if (err) {
      res.status = 400;
      res.send(err);
      return;
    } else if (user) {
      res.status = 402;
      res.send(user);
      return;
    } else {
      res.status = 404;
      res.send('{not found}');
      return;
    }
  })
});

router.get('/create', function(req, res) {
  user.createAndSave('RB270B6N', 'Romain', 'Bouchaud', function(err, done) {
    res.status = 202
    res.send('created');
    return;
  })
});

router.get('/test-mqrabbit', function(req, res) {
  amqp.connect('amqp://my-rabbit', function(err, conn) {
    if (err) { console.log(err); }
    conn.createChannel(function(err, ch) {
      var q = 'hello';

      ch.assertQueue(q, {durable: false});
      ch.sendToQueue(q, new Buffer('Hello World!'));
      console.log(" [x] Sent 'Hello World!'");
      ch.consume(q, function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
        res.status(200).send(" [x] Received " + msg.content.toString());
      }, {noAck: true});
    });
    setTimeout(function() { conn.close(); process.exit(0) }, 500)
  });
});

module.exports = router;
