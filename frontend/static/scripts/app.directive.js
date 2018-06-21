(function() {
    'use strict';

    angular
        .module('NowPlaying')
        .directive('onScroll', OnScroll);

    OnScroll.inject = [];

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