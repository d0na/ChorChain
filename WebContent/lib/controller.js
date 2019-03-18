'use strict'


var module = angular.module('homePage.controllers', ['ngCookies']);
module.controller("controller", [ "$scope","$window", "$location", "service",'$cookies',
		function($scope,$window, $location,service, $cookies) {
		
			$scope.regUser = {};
			$scope.user = {};
			$scope.role = null;
			$scope.content = {};
			$scope.models = {};
			$scope.instances = {};
			$scope.present = false;
			$scope.msg = null;
			$scope.contracts = {};
			$location.path();
			$scope.cookieId = null;
			$scope.user.address = "0x0D49A19F4732184E03549a4A190684a316c725F7";
			$scope.user.privateKey = "andrea";
		
			
			
			
			$scope.registerUser = function(){
				
				service.registerUser($scope.regUser).then(function(response){	
					alert(response.data);
					
				});		
			}
			
			$scope.loginUser = function(){
				service.loginUser($scope.user).then(function(response){
					console.log("logged");
					if(response.data != -1){
						console.log(response.data);
						$cookies.put('UserId', response.data);
						$scope.cookieId = response.data;
						console.log($scope.cookieId);
						window.location.href = 'http://193.205.92.133:8080/ChorChain/homePage.html';
					}
					else{
						console.log("Negatvie response");
					}
					
				});		
			}
			
			$scope.getModels = function(){
				$scope.cookieId = $cookies.get('UserId');
				service.getModels().then(function(response){
					$scope.models = response.data;
				});
			}
			
			$scope.subscribe = function(instance,role){
				service.subscribe(instance, $scope.user.role, $cookies.get('UserId')).then(function(response){
					$scope.msg = response.data;
					service.getInstances(instance.name).then(function(response){
						$scope.instances = response.data;
						$scope.present = true;
						
					});
				})
			}
			
			
			$scope.getInstances = function(name){
				service.getInstances(name).then(function(response){
					$scope.instances = response.data;
					console.log(response.data);
					$scope.present = true;
				});
			}
			
			$scope.createInstance = function(model){
				service.createInstance(model, $cookies.get('UserId')).then(function(){
					
					$scope.msg = "Instance created";
				});
			}
			
			$scope.deploy = function(instance){
				service.deploy(instance, $cookies.get('UserId')).then(function(response){
					sessionStorage.setItem('contract', JSON.stringify(response.data));
					$window.location.href = 'http://193.205.92.133:8080/ChorChain/deploy.html';
				});
			}
			
			$scope.getContracts = function(){
				console.log("COOKIE: " + $cookies.get('UserId'));
				service.getContracts($cookies.get('UserId')).then(function(response){
					console.log(response.data);
					$scope.contracts = response.data;
				})
			}
			
		
			
		
		    
   }]);