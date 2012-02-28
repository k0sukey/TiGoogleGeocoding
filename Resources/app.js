geocoding = require('geocoding').Geocoding();

geocoding.forward({
	address: '東京駅',
	language: Ti.Platform.locale,
	success: function(e){
		e.results.forEach(function(result){
			Ti.API.info(result.latitude + ', ' + result.longitude);
		});
	},
	error: function(e){
		Ti.API.info(e);
	}
});

geocoding.reverse({
	latitude: 35.681396,
	longitude: 139.76606,
	language: Ti.Platform.locale,
	success: function(e){
		e.results.forEach(function(result){
			Ti.API.info(result.address);
		});
	},
	error: function(e){
		Ti.API.info(e);
	}
});
