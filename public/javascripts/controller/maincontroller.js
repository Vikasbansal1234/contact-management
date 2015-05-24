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


    $scope.logout=function(){
        sessionStorage.removeItem('loggedUser');
    }
})