// Twitter API Client for node
const Twit = require('twit');


//  Creates a Twit instance that can be used 
//  to make requests to Twitter's APIs.
//  
//  Your application's Consumer Key and Secret 
//  are used to authenticate requests to the Twitter Platform.
//
//  App:  binowplaying
//  Desc: this is the app we use for our developing tests
//  https://apps.twitter.com/
const client = new Twit({
    consumer_secret:      'Y49dNi2NPN9vJaPS95QnRLslOqisEuC7v934lHOfN05cVjbtDB',
    consumer_key:         'CXVNsTDohsJaIxl0cjpuLKXYr',
    access_token:         '2834545563-QYQqm8hnLPiU3eFyAD8SGtKhfIYW7gMp8fGh8Xd',
    access_token_secret:  'SUquQt3XC2ve3IIa8JbwMa4bsRCpZSJuCVKYAXLUTDBBT'
});

const limit = 10;

/**
 * Makes a Twitter API Resquets to fetch all tweets acording query parameter.
 * @param   {String} (r) query - query
 * @returns {Promise} result
 */
const search = (query, _geocode) => {    
    // Searches for Tweets
    // https://developer.twitter.com/en/docs/tweets/search/guides/standard-operators
    return client.get('search/tweets', { 
        q: query, 
        count: limit,
        geocode: _geocode,
        result_type: 'recent'
    });
}

/**
 * Makes a Twitter API Resquets to create a tweet.
 * @param   {String} (r) comment  -   Commnet
 * @param   {String} (o) urlmedia -   Url of a image/video
 * @returns {Promise} result
 */
const create = (params) => {
    return client.post('statuses/update', params);
}


module.exports = {
    search: search,
    post: create
}