/**
 * Created by intelligrape on 2/5/15.
 */
angular.module('contactApp').controller('MainCtrl',function($scope,$modal,$state,$location){
    $scope.loggedUser=JSON.parse(.getItem('loggedUser'));
    $scope.login=function(){
        var modal=$modal.open({
            templateUrl:'templates/login.html',
            controller:'LoginCtrl',
            size:'sm'
        })
        modal.result.then(function(){

            $scope.loggedUser=JSON.parse(.getItem('loggedUser'));
           console.log(">>>>>>>>>",$scope.loggedUser);
        },function(err){})
    }

    $scope.signup=function(){
        var modal=$modal.open({
            templateUrl:'templates/signup.html',
            controller:'SignUpCtrl',
            size:'sm'
        })
        modal.result.then(function(){
            console.log(">>>>>>>>>",$scope.loggedUser);
            $scope.loggedUser=JSON.parse(.getItem('loggedUser'));
        },function(err){})
    }
    $scope.logout=function(){
        $scope.login="false";

        .removeItem('loggedUser');
    }
})