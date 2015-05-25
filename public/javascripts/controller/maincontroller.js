<<<<<<< HEAD
/**
 * Created by aethons on 2/5/15.
 */
angular.module('contactApp').controller('MainCtrl',['$scope','$modal','$state','$location', function($scope,$modal,$state,$location){
    $scope.loggedUser=JSON.parse(sessionStorage.getItem('loggedUser'));
    $scope.login=function(){
        var modal=$modal.open({
            templateUrl:'templates/login.html',
            controller:'LoginCtrl',
            size:'sm'
        })
        modal.result.then(function(){
=======
angular.module('contactApp').controller('MainCtrl',function($scope,$modal,$state,$location,httpService){
    httpService(function (err, result) {
        if (err)
            console.log('error occurs');
        else {
            if (result.status === 200) {
                sessionStorage.setItem('loggedUser', JSON.stringify(result.data));
                $scope.loggedUser=JSON.parse(sessionStorage.getItem('loggedUser'));
                if(result.data.role==='guest')
                  $state.go('contact.all')
                else
                  $state.go('admin.alluser')
            }
        }
    }, {url: "/currentuser", method: "GET"});
>>>>>>> a26378c07a111694451291e8826c23d6856945f0


    $scope.logout=function(){
        sessionStorage.removeItem('loggedUser');
    }
}])
