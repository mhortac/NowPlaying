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


        //  Declares an Angular derective
        .directive('onScroll', OnScroll);

    function OnScroll() {
        
        return function link(scope, element, attrs) {

            // Target container
            var $this = element[0];

            // Handle scroll event
            element.bind('scroll', function() 
            {
                //console.log($this.scrollTop + $this.offsetHeight >= $this.scrollHeight);
                
                // If it reach div limit trigger a event
                if ($this.scrollTop + $this.offsetHeight >= $this.scrollHeight) 
                {
                    //$this.scrollIntoView(false);
                    scope.$apply(attrs.onScroll);
                    $this.scrollTop = $this.offsetHeight;
                    
                }
            });
        };
        
    }
})();