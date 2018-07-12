var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const message = {
  listData: [
    {
      title: 'Toni Kroos',
      image: 'images/1.jpg',
    },
    {
      title: 'James Rodriguez',
      image: 'images/2.jpg',
    },
    {
      title: 'Raphaël Varane',
      image: 'images/3.jpg',
    },
    {
      title: 'France national football team',
      image: 'images/4.jpg',
    },
  ],
};

router.get('/api/data', function(req, res, next) {

  res.send({ code: 0, message });
});

module.exports = router;
