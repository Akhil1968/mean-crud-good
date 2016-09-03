// ##################### TechService ############################
rApp.service('TechService', [function(){
  var messages = [];
  var techSvc = this;

  techSvc.getMessages = function(){
    return messages;
  }

  techSvc.addMessage = function(aMsg){
    messages.push(aMsg);
  }

  techSvc.clearMessages = function(){
    messages = [];
  }

  var isLoggedIN = false;
  techSvc.getLoggedIN = function(){
    return isLoggedIN;
  }

  techSvc.setLoggedIN = function(loginsStatus){isLoggedIN = loginsStatus;}

}]);//service
// ##################### TechService ############################
