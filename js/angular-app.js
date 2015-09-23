/* 
 *  angular-app.js - useradmin-angular
 *  contains the main angularjs logic
 *  
 *  Aziz | 21 Sep 2015
 */


//////////////////////////////////////////////////
// Modules & Config - angular modules are basically mini applications
//////////////////////////////////////////////////

var app = angular.module( 'useradmin-angular', [ 'ui.router' ] );

app.config
(
    function( $stateProvider, $urlRouterProvider )
    {
        $stateProvider
        
            // entire list of posts
            .state
            (
                'home',
                {
                    url: '/home',
                    templateUrl: '/home.html',
                    controller: 'NewsListCtrl',
                    
                    // belongs to ui-router and is used to execute code before 
                    // the state is successfully loaded
                    resolve:
                    {
                        // handle/name of dependency, and function return to be preloaded
                        // please ensure that the handle name here is something other than the factory handle/name
                        // otherwise it becomes difficult for angularjs ot differntiate between the two
                        postPromise: function( posts )
                        {
                            return posts.getAll();
                        }
                    }
                }
            );
            
        // other routes (unspecified) will be directed to "home"
        $urlRouterProvider.otherwise( 'home' );
    }
);



//////////////////////////////////////////////////
// Services - reusable logic independent of views
//////////////////////////////////////////////////

// definition of the posts factory (ie a kind of service)
app.factory( 'posts', function( $http )
{
    // the posts service factory initial object definition
    var service = 
    { 
        posts:[] 
    };
    
    // object functionality definition
     
    // retrieve all posts
    service.getAll = function()
    {
        return $http.get( 'ajax/getUsers.php' ).success( function( data )
        {
            angular.copy( data, service.posts );
        });
    };
    
    // now return the defined posts service object
    return service;
});



//////////////////////////////////////////////////
// Controllers - direct view logic
//////////////////////////////////////////////////

// definition of the 'NewsListCtrl' controller
// responsible for listing the news posts
// the following is wired to the posts factory service
app.controller( 'NewsListCtrl', function( $scope, posts )
{
    $scope.posts = posts.posts;
});