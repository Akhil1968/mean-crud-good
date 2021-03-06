//--------------------------- loginController --------------------------------
rApp.controller('loginController', 
  ['$http', 'TechService', '$location', function($http, tservice, $location) {
  var lc = this;
  tservice.clearMessages();
  lc.loginSubmit = function() {
      $http({method: 'post',
            url: '/auth',
            data: lc.login,
            headers: {'Content-Type': 'application/vnd.api+json'}
      }).then(
        function(response) {
          if(response.data){
            lc.message = 'Login succeessful';
            tservice.addMessage(lc.message);
            tservice.setLoggedIN(true);
            $location.path('console');
          }else{
            lc.message = 'Login Failed';
            tservice.setLoggedIN(false);
          };
          console.log(lc.message);
        }
      );//then
  };//self.loginSubmit 
}]); //loginController
//--------------------------- loginController --------------------------------------------

//--------------------------- logoutController --------------------------------
rApp.controller('logoutController', 
  ['$http', 'TechService', '$location', function($http, tservice, $location) {
  var lc = this;
  tservice.clearMessages();

      $http({method: 'get',
            url: '/logout',
            headers: {'Content-Type': 'application/vnd.api+json'}
      }).then(
        function(response) {
          if(response.data){
            lc.message = 'Logout succeessful';
            tservice.addMessage(response.data);
            tservice.addMessage(lc.message);
            tservice.setLoggedIN(false);
            $location.path('login');
          }else{
            lc.message = 'Logout Failed';
            tservice.addMessage(lc.message);
          };
          console.log(lc.message);
        }
      );//then

}]); //logoutController
//--------------------------- logoutController --------------------------------------------

//--------------------------- registerController --------------------------------
rApp.controller('registerController', 
  ['$http', 'TechService', '$location', function($http, tservice, $location) {
  var lc = this;
  tservice.clearMessages();
  var rc = this;
  
  rc.registerSubmit = function() {
    $http({method: 'post',
          url: '/register',
          data: rc.user,
          headers: {'Content-Type': 'application/vnd.api+json'}
    }).then(
      function(response) {
        if(response.data){
          rc.message = 'Registration succeessful';
          tservice.addMessage(response.data);
          tservice.addMessage(rc.message);
          tservice.setLoggedIN(false);
          $location.path('login');
        }else{
          rc.message = 'Registration Failed';
          tservice.addMessage(rc.message);
        };
        console.log(rc.message);
      }
    );//then
  } //rc.registerSubmit
}]); //registerController
//--------------------------- registerController --------------------------------------------


//--------------------------- consoleController --------------------------------------------
rApp.controller('consoleController', 
  ['$http', '$location', 'TechService', function($http, $location, TechService) {
  var cc = this;
  cc.techRecords = [];
  cc.loginStatus = TechService.getLoggedIN();
  
  cc.fetchTechRecords = function() {
    return $http.get('/console').then(
        function(response) {
      cc.techRecords = response.data;
      TechService.addMessage('Fetch succeeded');
      cc.message = JSON.stringify(TechService.getMessages());
    }, function(errResponse) {
      cc.message = 'Error while fetching tech records';
    });
  };//cc.fetchTechRecords

  cc.fetchTechRecords();

}]);//consoleController
//--------------------------- consoleController --------------------------------------------


//--------------------------- editController --------------------------------------------
rApp.controller('editController', 
    ['$http', '$location', 'TechService', '$routeParams',
      function($http, $location, TechService, $routeParams) {
  var ec = this;
  var rec2Edit = $routeParams.editTech; 
  TechService.clearMessages(); 
  $http({method: 'get',
            url: '/edit?tech=' + rec2Edit,
            headers: {'Content-Type': 'application/vnd.api+json'}
      }).then(
        function(response) {
          if(response.data){
            ec.message = JSON.stringify(response.data);
            //valueTech = response.data.tech;
            //valueDesc = response.data.description;
            // TechService.setTech(response.data);  //response.data.tech
            // self.editTech = TechService.getTech();
            ec.editTech = response.data;
            console.log("recordToEdit in editController=" + response.data.tech);
            //TechService.addMessage("recordToEdit =" + response.data.tech);
          }else{
            ec.message = 'Record to edit unavailable';
            TechService.addMessage(ec.message);
            console.log("rec to edit" + ec.message);
          };
          
        }
  );//

    ec.editFormSubmit = function() {
    console.log("Record to Save after edit (tech* description)= (" + ec.editTech.tech + "*" + ec.editTech.description + ")");

      $http({method: 'post',
            url: '/saveChanges',
            data: ec.editTech,
            headers: {'Content-Type': 'application/vnd.api+json'}
      }).then(
        function(response) {
          if(response.data){
            ec.message = 'Record Saved Successfully';
            TechService.addMessage(ec.message);
            $location.path('console');
          }else{
            ec.message = 'Record could not be saved';
            TechService.addMessage(ec.message);
            console.log("******Server response from edit save=" + ec.message);
          };
        }
      );//then
  };//self.editFormSubmit 
}]);//editController
//--------------------------- editController --------------------------------------------

//--------------------------- deleteController --------------------------------------------
rApp.controller('deleteController', 
    ['$http', '$location', 'TechService', '$routeParams',
      function($http, $location, TechService, $routeParams) {
  var dc = this;
  TechService.clearMessages(); 

  $http({method: 'get',
            url: '/delete?tech=' + $routeParams.delTech,
            headers: {'Content-Type': 'application/vnd.api+json'}
      }).then(
        function(response) {
          if(response.data){
            dc.message = 'Record deleted successfully';
            TechService.addMessage(dc.message);
            $location.path('console');
          }else{
            dc.message = 'Record could not be deleted';
            TechService.addMessage(dc.message);
            console.log("******Server response from edit save=" + dc.message);
          };
        }
  );//then

}]);//deleteController
//--------------------------- deleteController --------------------------------------------

//--------------------------- addController --------------------------------------------
rApp.controller('addController', 
    ['$http', '$location', 'TechService', 
      function($http, $location, TechService) {
  var ac = this;

  TechService.clearMessages(); 

  ac.addTech = {};

    ac.addFormSubmit = function() {
    console.log("Record to Save after add (tech* description)= " 
      + ac.addTech.tech + "*" + ac.addTech.description);

    $http({method: 'post',
          url: '/add',
          data: ac.addTech,
          headers: {'Content-Type': 'application/vnd.api+json'}
    }).then(
      function(response) {
        if(response.data){
          ac.message = 'Record added Successfully';
          TechService.addMessage(ac.message);
          $location.path('console');
        }else{
          ac.message = 'Record could not be added';
          TechService.addMessage(ac.message);
          console.log("******Server response from add save=" + ac.message);
        };
      }
    );
  };//self.editFormSubmit 
}]);//addController
//--------------------------- addController --------------------------------------------
  
