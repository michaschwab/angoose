angular.module('angoose.ui.directives').directive("deformSublist", function($ui){
  var directive = {
      restrict:'AE',
      templateUrl: '/js/deform/tpl/deform.sublist.tpl.html',
      scope:{
          instance:'=',
          path:'=',
          modelSchema:'=',
          fieldSchema:'='
      },
      compile: function(element, attrs){
          //element.html("sub elements");
          return function link(scope, element, attrs){
              enterscope(scope, "sublist path "+ scope.path)
              console.debug("our data: ", getter(scope, 'instance.'+ scope.path));
              scope.getter = $ui.getter;
              console.log("Creating sublist ", scope.$id)
              // we can't just use sublist because nested scopes - where subscope may override parents
              scope['sublist'+ scope.$id] = getter(scope, 'instance.'+ scope.path) || [];
              $ui.setter(scope, 'instance.'+ scope.path, scope['sublist'+ scope.$id] );
              scope.subschema =  $ui.getter(scope.fieldSchema, 'schema');
              Object.keys(scope.subschema.paths).forEach(function(path){
                  if($ui.filterPath(path, scope.subschema.paths[path], scope.subschema)){
                    delete scope.subschema.paths[path];  
                  } 
              });
              scope.sublist  = function(scopeId){
                  return scope['sublist'+ scopeId];
              }
              scope.removeSublistItem = function($index){
                  scope.sublist(scope.$id).splice($index, 1)
              }
              scope.addSublistItem = function(){
                  scope.sublist(scope.$id).push({__toggle:1})
              }
          }
      }
  };
  return directive;   
}).directive("deformSubschema", function(){
    // this is not used as of 2/28/14
    var directive = {
      restrict:'AE',
      templateUrl: '/js/deform/tpl/deform.subschema.tpl.html',
      compile: function(element, attrs){
          //element.html("sub elements");
          return function link(scope, element, attrs){
              enterscope(scope, 'sbuschema: ' + scope.path);
              scope.getter = $ui.getter;
              scope.subschema = scope.modelSchema && $ui.getter( scope.modelSchema.paths[  scope.path ], 'schema');
          }
      }
  };
  return directive;   
});


   
 