var express   = require('express');
var router    = express.Router();
var twitter   = require('../twitter');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('../frontend/index.html');	
});

// test
router.get('/twtapi', function(req, res, next) {
  res.status(200).json({ name: 'Murphy Horta Camargo' });
});


/**
 * Route:   /twtapi/searchtweets
 * Method:  GET
 * Fetchs the latest 5 tweets under the #nowplaying hashtag
 */
router.get('/twtapi/searchtweets', (req, res) => {
  
  twitter.search('#NowPlaying')

  .then((result) => {
    res.json(result)
  })

  .catch((error) => {  
    res.json(error)
  })
});

/**
 * Route:   /twtapi/newpost
 * Method:  POST
 * Create a new tweet under the #nowplaying hashtag
 */
router.post('/twtapi/newpost', (req, res) => { 


});

module.exports = router;
