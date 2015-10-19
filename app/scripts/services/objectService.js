'use strict';

/**
 * @ngdoc function
 * @name medbridgeApp.services:objectService
 * @description
 * # object service
 * service for the objects of the medbridgeApp
 */
angular.module('medbridgeApp')
  .service('objectService', function() {
    var currentObject = null;
    var currentListValue = 1;

    return {
      getCurrentObject: function() {
        return currentObject;
      },
      setCurrentObject: function( object ) {
        currentObject = object;
      },
      getCurrentListValue: function() {
        return currentListValue;
      },
      setCurrentListValue: function( value ) {
        currentListValue = value;
      }
    };
  });
