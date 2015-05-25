angular.module('contactApp').controller('MainCtrl',function($scope,$modal,$state,$location,httpService,$window){
       $scope.login=function(){
        var modal=$modal.open({
            templateUrl:'templates/login.html',
            controller:'LoginCtrl',
            size:'sm'
        })
        modal.result.then(function(){

            $scope.loggedUser=JSON.parse(sessionStorage.getItem('loggedUser'));
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
            $scope.loggedUser=JSON.parse(sessionStorage.getItem('loggedUser'));
        },function(err){})
    }

    $scope.logout=function(event){
            event.preventDefault();
        httpService(function(err,result){
            if(err)
             console.log(err);
            else{
                sessionStorage.removeItem('loggedUser');
               $window.open('index','_self');
            }
        },{method:"GET",url:"/logout"})
    }
})