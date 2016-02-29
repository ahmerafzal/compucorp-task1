weatherApp.factory('weatherApi', function($http, $log, $q) {
	$apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
	$appid = '44db6a862fba0b067b1930da0d769e98';
	$unites = 'metric';
	return {
		// this function required longitude and latitude
		getWeatherByLatLong: function($latitude,$longitude) {
			var deferred = $q.defer();
	
			$http({
				url: $apiUrl, 
				method: "GET",
				params: {lat: $latitude, lon: $longitude, appid: $appid, units: $unites }
			}).success(function(data) { 
			  	deferred.resolve(data);
		   	}).error(function(msg, code) {
				deferred.reject(msg);
				$log.error(msg, code);
		   	});
	
			return deferred.promise;
		},
		// this function required city, country or postalcode
		getWeatherByQueryString: function($querystring) {
			var deferred = $q.defer();
	
			$http({
				url: $apiUrl, 
				method: "GET",
				params: {q: $querystring, appid: $appid, units: $unites }
			}).success(function(data) { 
			  	deferred.resolve(data);
		   	}).error(function(msg, code) {
				deferred.reject(msg);
				$log.error(msg, code);
		   	});
	
			return deferred.promise;
		}

  }
 });