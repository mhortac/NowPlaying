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

    AppController.inject = [];

    function AppController($scope) {

        // Custom $scope.
        let $this = this;
        
        
        //  lifecycle hooks.
        //  Component initialized.
        $this.$onInit = function() {

        };
       
    }
})();

