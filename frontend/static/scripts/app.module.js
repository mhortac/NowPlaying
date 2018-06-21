/* 
 * Angular JS NowPlaying
 * 
 * The #NowPlaying page is a simple one-page app 
 * where visitors can visualize the most recent 
 * videos being shared on Twitter by people nearby.
 *
 * Project started on: Tue, 19 Jun 2018 - 8:40 PM
 * Current version: 1.0.0
 * */

(function() {
    'use strict';

    angular
    
    .module('NowPlaying', [
        'ngtweet'
    ])

    .constant('Apihost', 'http://localhost:3000/twtapi');
})();

