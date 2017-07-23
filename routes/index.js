var express = require('express');
var router = express.Router();
var http = require('http');
var DomParser = require('dom-parser');


/* GET home page. */
router.get('/:page', function(req, res, next) {


          res.render(req.params.page, { title: 'Express' });


});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

var getPage = function(host, path, callback){
    var options = {
        host: host,
        path: path
    };

    var req = http.get(options, function(res) {
        var bodyChunks = [];
        res.on('data', function(chunk) {
            bodyChunks.push(chunk);
        }).on('end', function() {
            var body = Buffer.concat(bodyChunks);
            callback(body);
        })
    });

    req.on('error', function(e) {
        console.log('ERROR: ' + e.message);
    });


};
module.exports = router;

