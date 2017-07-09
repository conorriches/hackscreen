var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:page', function(req, res, next) {

  switch(req.params.page){
      case "001_train":
      case "002_metrolink":
      case "003_bus":
      case "004_time":
      case "notification":
      default:
          res.render(req.params.page, { title: 'Express' });
  }

});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;

