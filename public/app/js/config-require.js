if (typeof define !== 'function') {
  // to be able to require file from node
  var define = require('amdefine')(module);
}

define({
  baseUrl: '.',
  // Here paths are set relative to `/app` folder
  paths: {
    'angular': '../bower_components/angular/angular',
    //'angular-resource': '../bower_components/angular-resource/angular-resource',
    'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
    "angular-bootstrap": "../bower_components/angular-bootstrap/ui-bootstrap-tpls.min",
    
    "angular-couch-potato": "../bower_components/angular-couch-potato/dist/angular-couch-potato",
   
    'jquery': '../bower_components/jquery/dist/jquery',
    "bootstrap": "../bower_components/bootstrap/dist/js/bootstrap.min",
    "jquery.ui.widget": "../bower_components/jquery-ui/ui/widget",
    "domReady": "../bower_components/domReady/domReady" ,
    "angular-animate": "vendor/angular-animate/angular-animate.min",
    
    
  }, 
  shim: {
    'angular': {'deps': ['jquery'], 'exports': 'angular'},
   
   // "angular-resource": {"deps": ["angular"]},
    
    "angular-ui-router": {"deps": ["angular"]},
    "angular-bootstrap": {"deps": ["angular"]},
    "angular-couch-potato": {"deps": ["angular"]},
   
    "bootstrap": {"deps": ["jquery"]},
    "jquery.ui.widget": {"deps": ["jquery", "angular"]},
    "angular-animate": {"deps": ["angular"]},
   
  },
  "priority": [
    "jquery",
    "bootstrap",
    "angular"
  ]
});


