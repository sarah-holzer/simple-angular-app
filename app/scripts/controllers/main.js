'use strict';

/**
 * @ngdoc function
 * @name medbridgeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the medbridgeApp
 */
angular.module('medbridgeApp')
  .controller('MainCtrl', ['$scope', '$http', '$location', 'objectService', function( $scope, $http, $location, objectService) {
    $scope.dropDownOptions = [
      {name: 'List 1', value: 1},
      {name: 'List 2', value: 2},
      {name: 'List 3', value: 3}
    ];

    //Clean up for list 2, if find an array will grab all objects out of it before continuing on.
    var flattenArrayOfObjectsAndArrays = function( data ){
      var newData = new Array();
      var index = 0;

      for( var i = 0; i < data.length; i++ ) {
        if( data[i] instanceof Array ) {
          var recursiveData = flattenArrayOfObjectsAndArrays( data[i] );
          for( var j = 0; j < recursiveData.length; j++ ) {
            newData[index++] = recursiveData[j];
          }
        }
        else {
          newData[index++] = data[i];
        }
      }

      return newData;
    };

    //Clean up for list 3, will add ourselves to the data and then add all our children
    var flattenTreeOfObjects = function( data ){
      var newData = new Array();
      var index = 0;

      newData[index++] = data.node;

      if( data.children ) {
        for( var i = 0; i < data.children.length; i++ ) {
          var recursiveData = flattenTreeOfObjects( data.children[i] );
          for( var j = 0; j < recursiveData.length; j++ ) {
            newData[index++] = recursiveData[j];
          }
        }
      }

      return newData;
    };

    //Change the list that we are showing
    $scope.fetchList = function() {
      objectService.setCurrentListValue($scope.selectedOption.value);
      $http.jsonp('https://www.medbridgeeducation.com/api/codechallenge?list=' + $scope.selectedOption.value + '&callback=JSON_CALLBACK').success(function (data) {
        //Get data into correct format
        if( $scope.selectedOption.value === 2 ) {
          data = flattenArrayOfObjectsAndArrays( data );
        }
        else if( $scope.selectedOption.value === 3 ) {
          data = flattenTreeOfObjects( data );
        }

        $scope.list = data;
      });
    };

    //Show the details for the given object
    $scope.showDetail = function( item ) {
      objectService.setCurrentObject(item);
      $location.path('/detail');
    };

    //Load up the initial list
    $scope.selectedOption = $scope.dropDownOptions[objectService.getCurrentListValue() - 1];
    $scope.fetchList();
  }]);
