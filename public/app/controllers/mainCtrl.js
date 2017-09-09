angular.module('mainController', ['authServices'])

.controller('mainCtrl', function(Auth,$timeout, $location, $rootScope){
	 var app = this;

	 app.loadme = false;

	 $rootScope.$on('$routeChangeStart', function(){
	 	
	 	 if(Auth.isLoggedIn()) {
	 		app.isLoggedIn = true;
	 		Auth.getUser().then(function(data){
	 		console.log(data.data.username);
	 		app.username = data.data.username;
	 		app.useremail = data.data.email;
	 		app.loadme = true;
	 	});
		 }else{
	 		app.isLoggedIn = false;
	 		app.username = '';
	 		app.loadme = true;
	 	}
	 

	 });

	

	this.doLogin = function(loginData) {
		app.loading = true;
		app.errorMsg = false;

		Auth.login(app.loginData).then(function(data){
			if (data.data.success) {
				app.loading = false;
				//create success message
				app.successMsg = data.data.message + '...Redirecting';
				//redirect to home page
				$timeout(function(){
					$location.path('/about');
					app.loginData = '';
					app.successMsg = false;
				}, 2000);
					
			} else {
				//create error message
				app.loading = false;
				app.errorMsg = data.data.message;
			}
		});
	};

	this.logout = function(){
		Auth.logut();
		$location.path('/logout');
		$timeout(function() {
			$location.path('/');
		}, 2000);

	};
});
 






