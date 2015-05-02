angular.module('contactApp').controller('ContactCtrl',function($scope,httpService,$state){

    $scope.loggedUser=JSON.parse(localStorage.getItem('loggedUser'));
    httpService(function(err,result){
        console.log('>>>>>>>>>',err,result);
        if(err)
            console.log(err);
        else
        {
            if(result && result.status===200)
                $scope.contacts=result.data;
        }

    },{method:"GET",url:"/contact",params:{user_id: $scope.loggedUser._id}})


    $scope.create=function(){

        $scope.modifiedObject={};
        $scope.modifiedObject.user_id=$scope.loggedUser._id;
        $state.go('contact.create');
    }
    $scope.update=function(item){
        $scope.modifiedObject=angular.copy(item);
        $scope.modifiedObject.user_id=$scope.loggedUser._id;
        $state.go('contact.edit');
    }
    $scope.delete=function(item){
        httpService(function(err,result){
            console.log('>>>>>>>>>',err,result);
            if(err)
                console.log(err);
            else
            {
                if(result && result.status===200)
                    $scope.contacts.splice($scope.contacts.indexOf(item),1);
            }

        },{method:"DELETE",url:"/contact/"+item._id,params:{user_id:$scope.loggedUser._id}})

    }
    $scope.save=function(){
        if($scope.modifiedObject._id){

            httpService(function(err,result){
                if(err)
                {
                    console.log(err);
                }
                else{
                    httpService(function(err,result){
                        if(err)
                            console.log(err);
                        else
                        {
                            if(result && result.status===200)
                            {$scope.contacts=result.data;
                                $state.go('contact.all');}
                            else{
                                console.log(">>>>",result.error);
                            }
                        }

                    },{method:"GET",url:"/contact",params:{user_id:$scope.loggedUser._id}})
                }

            },{method:"PUT",headers:{"content-type":"application/json"},params:{user_id:$scope.modifiedObject.user_id},url:'/contact/'+$scope.modifiedObject._id,data:$scope.modifiedObject});
        }
        else{

            httpService(function(err,result){
                if(err)
                {
                    console.log(err);
                }
                else{
                    httpService(function(err,result){
                        if(err)
                            console.log(err);
                        else
                        {
                            if(result && result.status===200)
                            {$scope.contacts=result.data;
                                $state.go('contact.all');}
                            else{
                                console.log(">>>>",result.error);
                            }
                        }

                    },{method:"GET",url:"/contact",params:{user_id:$scope.loggedUser._id}})
                }

            },{method:"POST",headers:{"content-type":"application/json"},url:'/contact',data:$scope.modifiedObject});
        }
    }
    $scope.cancel=function(){
        $scope.modifiedObject=null;
        $state.go('contact.all');
    }
})