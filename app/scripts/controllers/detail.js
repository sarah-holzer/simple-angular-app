'use strict';

/**
 * @ngdoc function
 * @name medbridgeApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the medbridgeApp
 */
angular.module('medbridgeApp')
  .controller('DetailCtrl', ['$scope', 'objectService', function($scope, objectService) {
    $scope.item = objectService.getCurrentObject();
  }]);
