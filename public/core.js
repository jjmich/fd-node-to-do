var nodeTodo = angular.module("nodeTodo", []);

const FILTER_COMPLETE = "COMPLETED";
const FILTER_INCOMPLETE = "INCOMPLETE";
const FILTER_NONE = "NO_FILTER";

function mainController($scope, $http) {
  $scope.formData = {};
  $scope.filteringMode = FILTER_NONE;

  $scope.filteredList = (filteringMode) => {
    let result = [];
    switch(filteringMode){
      case FILTER_NONE: {
        return $scope.todos;          
      }
      case FILTER_INCOMPLETE: {
        for(note in $scope.todos){
          if($scope.todos[note].done === false) result.push($scope.todos[note]);
        }
        break;
      }
      case FILTER_COMPLETE: {
        for(note in $scope.todos){
          if($scope.todos[note].done === true) result.push($scope.todos[note]);
        }
        break;
      }
    }
    return result;
  }
 


  // when landing on the page, get all todos and show them
  $http
    .get("/api/todos")
    .success(function(data) {
      $scope.todos = data;
    })
    .error(function(data) {
      console.log("Error: " + data);
    });

  // when submitting the add form, send the text to the node API
  $scope.createTodo = function () {
    $http
      .post("/api/todos", $scope.formData)
      .success(function (data) {
        $("input").val("");
        $scope.todos = data;
      })
      .error(function (data) {
        console.log("Error: " + data);
      });
  };

   // update a todo after checking it
   $scope.updateTodo = function (item) {
    $http
      .put("/api/todos/" + item._id, item)
      .success(function (data) {
        $scope.todos = data;
      })
      .error(function (data) {
        console.log("Error: " + data);
      });
  };
  // delete a todo after checking it
  $scope.deleteTodo = function (id) {
    $http
      .delete("/api/todos/" + id)
      .success(function (data) {
        $scope.todos = data;
      })
      .error(function (data) {
        console.log("Error: " + data);
      });
  };
}
