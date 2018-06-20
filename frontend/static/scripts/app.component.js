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

    AppController.inject = ['$http', 'Apihost', '$timeout'];

    function AppController($http, Apihost, $timeout) {

        // Custom $scope.
        let $this = this;
        
        // Where tweets will be stored
        $this.collection = [];
        $this.geocode = null;
        /**
         * Makes a request to create a new tweet
         * @param {String} comment Text you want to post/share.
         */
        $this.newtweet = function (text) {

            if (!text) {
                window.alert('A tweet text is required');
                return;
            }

            $http.post(`${Apihost}/newpost`, {
                comment: text,
                lng: $this.geocode[1],
                lat: $this.geocode[0],
            })
            
            
            .then((result) => {
                
                // Lets reset input text.
                $this.mytweet = null;

                $timeout(function () {
                    //  Fetchs the latest 5 tweets under the #nowplaying hashtag
                    $this.fetch();
                }, 1500);
                
            })
        }

        /**
         * Makes a request to fetch tweet under the #nowplaying hashtag
         */
        $this.fetch = function () {

            let param = ($this.geocode) ? `?geocode=${$this.geocode}` : null;

            $http.get(`${Apihost}/searchtweets${param}`)

            .then((result) => {

                $this.collection = result.data.data.statuses;             
            })
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
       
    }
})();

