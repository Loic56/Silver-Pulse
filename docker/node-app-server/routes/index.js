var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Silver Pulse' });
});

router.get('/graph', function(req, res, next) {
  res.render('test_graph', { title: 'Silver Pulse' });
});

router.get('/ic1', function(req, res, next) {
  res.render('ic1', { title: 'Silver Pulse' });
});

module.exports = router;
