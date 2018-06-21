(function() {
    // It is not a statement, but a literal expression.
    // The purpose of "use strict" is to indicate that the code should be
    // executed in "strict mode".
    'use strict';

    // Intantiates Angularjs global var
    angular

        //  Here we instantiate the main module
        //  The module's name is `NowPlaying`
        .module('NowPlaying')


        //  Declares an Angular component
        //  The method takes two arguments:
        //      * {String} The name of the Component.
        //      * {Object} The Component config
        .component('mainApp', {
            templateUrl: '/static/scripts/app.template.html',
            controllerAs: '$ctrl',
            controller: AppController,
            scope: {}
        });



    // `$inject` Array of the strings that represent 
    //  names of services to be injected into the function.

    AppController.inject = ['$http', 'Apihost', '$timeout', '$window'];

    function AppController($http, Apihost, $timeout, $window) {

        // Custom $scope.
        let $this = this;        

        // Where tweets will be stored
        $this.collection = [];

        // Used to storage geocode for tweet search
        $this.geocode = null;

        // Used to be a time reference 
        $this.auxtime = new Date();




        /**
         * Makes a request to create a new tweet
         * @param {String} comment Text you want to post/share.
         */
        $this.newtweet = function (text) {

            // Break if input is empty.
            if (!text) {
                window.alert('A tweet text is required');
                return;
            }

            // Makes a request for a new post.
            $http.post(`${Apihost}/newpost`, {
                comment: text,
                lng: $this.geocode[1],
                lat: $this.geocode[0],
            })
            
            
            .then((result) => {
                
                // Lets reset input text.
                $this.mytweet = null;
                
                $this.collection.push(result.data.data);
                
            })
        }



        /**
         * Makes a request to fetch tweet under the #nowplaying hashtag
         */
        $this.fetch = function (max_id) {

            // default empty object for parameters
            let param = {};
            
            // If parameters are available ...
            if ($this.geocode)  param['geocode']  = $this.geocode;
            if (max_id)         param['max_id']   = max_id;


            $http.get(`${Apihost}/searchtweets${$this.toQueryString(param)}`)

            .then((result) => {
                
                // To prevent duplicity of last elemtent
                if ($this.collection.length > 0) {

                    // If there is element in the array,
                    // remove the last on because will be repeated
                    $this.collection.shift();
                }
                
                // Adds tweet to the collection
                result.data.data.statuses.forEach(element => {
                    $this.collection.unshift(element);
                });                

            })
        }
       

        /**
         * Called by infinitive scrolling to fetch more tweets.
         */
        $this.moretweets = function () {
            
            // This block is to avoid unnecessary request at the same time.
            // Let's wait at least 5 seg
            let time = new Date();
            let diff = time.getTime() - $this.auxtime.getTime();
            if ( (diff / 1000) < 5 ) return;

            //  Gets last element
            let last =  $this.collection[0];

            console.log(last.text);
            
            $this.fetch(last.id);

            $this.auxtime = time;
        }


        /**
         * lifecycle hooks.
         * Component initialized.
         */
        $this.$onInit = function() {

            //  The geolocation API is published through the `navigator.geolocation` object.
            if ("geolocation" in navigator) {

                // geolocation is available 
                navigator.geolocation.getCurrentPosition((position) => {

                    //  The parameter value is specified by 
                    //  "latitude,longitude,radius", 
                    //  where radius units must be specified 
                    //  as either ” mi ” (miles) or ” km ” (kilometers). 
                    $this.geocode = [
                        position.coords.latitude,
                        position.coords.longitude,
                        '200km'
                    ];
                   
                    //  Fetchs the latest 5 tweets under the #nowplaying hashtag
                    $this.fetch();
                    
                });
            } else {
                // geolocation IS NOT available
                window.alert("Geolocation is not supported by your browser");

                //  Fetchs the latest 5 tweets under the #nowplaying hashtag
                $this.fetch();
            }
        };
       
        /**
        * This function parse an object a pass to query string in uri format
        * @param {Object} obj  Parameters to pass
        * @returns {String} query string
        **/
       
        $this.toQueryString = function(object) {
            if (object) {
                let parts = [];
                for (const index in object) {
                    if (object.hasOwnProperty(index)) {

                        parts.push(encodeURIComponent(index) + "=" + encodeURIComponent(object[index]));
                    }
                }

                if (parts.length > 0) {                    
                    return "?" + parts.join("&");
                } else {
                    return "";
                }
            } else {
                return "";
            }
        }
    }
})();

