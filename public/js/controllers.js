function IndexCtrl($scope, $http) {
  $http.get('/api/posts').
    success(function(data) {
      $scope.posts = data;
      console.log(data);
    });
}
 
function AddPostCtrl($scope, $http, $location) {
  
  $scope.submitPost = function () {
    $http.post('/api/post', $scope.form).
      success(function(data) {
        $location.path('/');
      });
  };
}
 
function ReadPostCtrl($scope, $http, $routeParams) {
  $http.get('/api/posts/' + $routeParams.pid).
    success(function(data, status) {
      $scope.status = status;
      $scope.posts = data;
      console.log(data);
      
    }).
    error(function(data, status) {
      $scope.data = data || "Request failed";
      $scope.status = status;
    });
    //return;
}
 
function EditPostCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/posts/' + $routeParams.pid).
    success(function(data, status) {
      $scope.status = status;
      $scope.post = data;
  });
    
  $scope.editPost = function () {
    $http.put('/api/posts/' + $routeParams.pid, $scope.post).
      success(function(data) {
        $location.url('/readPost/' + $routeParams.pid);
      });
  };
}
 
function DeletePostCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/posts/' + $routeParams.pid).
    success(function(data) {
      $scope.post = data;
    });
    
  $scope.deletePost = function () {
    $http.delete('/api/posts/' + $routeParams.pid).
      success(function(data) {
        $location.path('/');
      });
  };
  
  $scope.home = function () {
    $location.url('/');
  };
}