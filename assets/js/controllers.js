weatherApp.controller('homeCtrl', function($scope,weatherApi,cfpLoadingBar) {	

	// this check is for non-supported navigator browser
	if (navigator.geolocation) {
		cfpLoadingBar.start();
		navigator.geolocation.getCurrentPosition(showPosition, showError);
  	} else {
		$scope.showPopup();
	}

	// if we get current location then this fuction will get the weather of his current location
	function showPosition(position){
	  $scope.$apply(function(){
		  weatherApi.getWeatherByLatLong(position.coords.latitude,position.coords.longitude).then(function(data) {
			  $scope.weather = data;
			  cfpLoadingBar.complete();
		  });
	  });
	}

	// If user declined to get current location or browser disabled then this function will run and display popup
	function showError(error){
		showMessage("Sorry your browser did not detect your location, kindly please select your location.");
		$scope.showPopup();
		cfpLoadingBar.complete();	
	}

	function showMessage(message){
		$messageBox = $('<div class="messageBox">'+message+'</div>');
		$messageBox.appendTo('body');
		setTimeout(function(){
			$(".messageBox").hide().remove();
		}, 10000);

	}

	// Generating Popup if user decline to get current location or browser disabled
	$scope.showPopup = function(){
		$popupBgDiv = $('<div class="popupBg"></div>');
	 	$popupDiv = $('<div class="popup"></div>');
		
	 	$qLabel = $('<label class="label">Please type your location:</label>');
		$qLabel.appendTo($popupDiv);
		
	 	$qInput = $('<input type="text" class="input" ng-model="q" name="q" placeholder="Eg: United Kingdom or London or PostalCode" />');
		$qInput.appendTo($popupDiv);

	 	$qBtn = $('<input type="button" class="btn" ng-click="getWeather()" value="Search" />');
		$qBtn.appendTo($popupDiv);

	 	$qCloseIcon = $('<span class="closeIcon"></span>');
		$qCloseIcon.appendTo($popupDiv);

		$popupDiv.appendTo($popupBgDiv);	 			
		$popupBgDiv.appendTo('body');

	}

	// Hiding genrated popup
	function hidePopUp() {
		$(".popupBg").remove();
	}

	// Hide popup when user click on close icon
	$("body").on("click", "span.closeIcon", function(){
		hidePopUp();
	});
	
	$("body").on("click", ".popup .btn", function(){
		$input = $('.popup input.input').val();
		if($input != '') {
			cfpLoadingBar.start();
			weatherApi.getWeatherByQueryString($input).then(function(data) {
			  $scope.weather = data;
			  hidePopUp();
			  cfpLoadingBar.complete();
		  });
		} else {
			alert('Please enter your location.');
		}
	});	

});