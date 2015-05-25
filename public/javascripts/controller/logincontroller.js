<<<<<<< HEAD
angular.module('contactApp').controller('LoginCtrl',['$scope','$modalInstance','$state','httpService',function($scope,$modalInstance,$state,httpService){

    $scope.login=function(){
=======
angular.module('contactApp').controller('LoginCtrl',function($scope,$modalInstance,$state,httpService){
        $scope.login=function(){
>>>>>>> a26378c07a111694451291e8826c23d6856945f0

        if($scope.loginForm.$invalid){
            $scope.submitForm=true;

        }
        else {
            httpService(function (err, result) {
                if (err)
                    console.log('error occurs');
                else {
                    if (result.status === 200) {
                        sessionStorage.setItem('loggedUser', JSON.stringify(result.data));
                        $modalInstance.close();
                        if(result.data.role==='guest')
                            $state.go('contact.all');
                        else
                            $state.go('admin.alluser');
                    }
                    else if (result.status === 500) {
                        $scope.errorMessage = result.error;
                    }
                }
            }, {url: "/login", method: "POST", data: $scope.user});
        }
    }
    $scope.cancel=function(){
        $modalInstance.dismiss();
    }
}])
