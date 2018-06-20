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
   
  console.log(req.query);
  
  twitter.search('%23NowPlaying+%23nowplaying+', req.query.geocode || null )

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
    
  // Checks required parameter.
  if (!req.body.comment) {

    // Returs an error message.
    res.json({ok: false, msg: 'Error: [comment] parameter is required' })
  }
  
  twitter.post({ 
    status: `${req.body.comment} #NowPlaying #nowplaying`,
    long: req.body.lng,
    lat:  req.body.lat
  })
  
  .then((result) => {
    console.log('Success');  
    res.json(result)
  })

  .catch((error) => {
    console.log('Error:');   
    res.json(error)
  })
});

module.exports = router;
