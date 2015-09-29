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
    
    // default values of the following variables,
    // that will potentially change in the app
    $scope.currentPage = 1;
    $scope.itemsPerPage = 5;
    
    // gives the currently available number of posts
//    $scope.filteredItems = $scope.posts.length;

    // total number of items, including onces that are filtered out
//    $scope.totalItems = $scope.posts.length;
    
    
    $scope.setPage = function( pageNo ) 
    {
        $scope.currentPage = pageNo;
    };
    
    
    $scope.pageCount = function()
    {
        // round the result upwards
        return Math.ceil( $scope.posts.length / $scope.itemsPerPage );
    };
    
    
    // if current page is first page, set disabled class
    $scope.prevPageDisabled = function()
    {
        return $scope.currentPage === 1;
    };
    
    
    // if current page is last page, set disabled class
    $scope.nextPageDisabled = function()
    {
        return $scope.currentPage === $scope.pageCount();
    };
    
    
    $scope.prevPage = function()
    {
        if ( $scope.currentPage > 1 )
        {
            $scope.currentPage--;
        }
    };
    
    
    $scope.nextPage = function()
    {
        if ( $scope.currentPage < $scope.pageCount() )
        {
            $scope.currentPage++;
        }
    };
    
});



//////////////////////////////////////////////////
// Custom Filters
//////////////////////////////////////////////////

// returns a 'sliced' version of the original dataset,
// given the current page and the items you want on that page
app.filter( 'limit', function() 
{
    return function( input, currentPage, itemsPerPage ) 
    {
        // 'start' is the number to be converted to integer
        // '10' here represents the decimal numeral system commonly used by humans
        currentPage = parseInt( currentPage, 10 );
        itemsPerPage = parseInt( itemsPerPage, 10 );

        // extract the input array from provided start limit to end limit 
        // but please note that slice returns from 'index' up to but not including the end,
        // hence there is a need to add '-1' and '+1'
        // finally return the newly subsectioned array
        return input.slice( ( currentPage - 1 ) * itemsPerPage, currentPage * itemsPerPage );
    };
});
