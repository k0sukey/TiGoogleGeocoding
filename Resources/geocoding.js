var exports = exports || this;
exports.Geocoding = (function(global){
	var K = function(){};

	/**
	 * bounds		http://code.google.com/intl/ja-JP/apis/maps/documentation/geocoding/index.html#Viewports
	 * region		http://code.google.com/intl/ja-JP/apis/maps/documentation/geocoding/index.html#RegionCodes
	 * language		https://spreadsheets.google.com/pub?key=p9pdwsai2hDMsLkXsoM05KQ&gid=1
	 * status		http://code.google.com/intl/ja-JP/apis/maps/documentation/geocoding/index.html#StatusCodes
	 */
	var Geocoding = function(){
		var self;

		if (this instanceof Geocoding) {
			self = this;
		} else {
			self = new K();
		}

		return self;
	};

	K.prototype = Geocoding.prototype;

	Geocoding.prototype.forward = function(options){
		var self = this;

		var address = options.address || '';
		var bounds = options.bounds ? options.bounds[0].latitude + ',' + options.bounds[0].longitude + '|' + options.bounds[1].latitude + ',' + options.bounds[1].longitude : '';
		var region = options.region || '';
		var language = options.language || '';
		var sensor = options.sensor || 'false';

		if (language === 'zh_hans') {
			language = 'zh-CN';
		} else if (language === 'zh_hant') {
			language = 'zh-TW';
		}

		var xhr = Ti.Network.createHTTPClient();
		xhr.open('GET', 'http://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&bounds=' + bounds + '&region=' + region + '&language=' + language + '&sensor=' + sensor);
		xhr.onload = function(){
			var json = JSON.parse(this.responseText);

			if (json.status === 'OK') {
				var results = [];

				json.results.forEach(function(result){
					results.push({
						latitude: parseFloat(result.geometry.location.lat),
						longitude: parseFloat(result.geometry.location.lng)
					});
				});

				options.success({
					status: json.status,
					results: results,
					raw: json.results
				});
			} else {
				options.error({ error: json.status });
			}

			xhr.onerror = null;
			xhr.onload = null;
			xhr.onreadystatechange = null;
			xhr.ondatastream = null;
			xhr = null;
		};
		xhr.onerror = function(e){
			options.error({ error: e.error });
		};
		xhr.send();
	};

	Geocoding.prototype.reverse = function(options){
		var self = this;

		var latlng = options.latitude + ',' + options.longitude;
		var bounds = options.bounds ? options.bounds[0].latitude + ',' + options.bounds[0].longitude + '|' + options.bounds[1].latitude + ',' + options.bounds[1].longitude : '';
		var region = options.region || '';
		var language = options.language || '';
		var sensor = options.sensor || 'false';

		if (language === 'zh_hans') {
			language = 'zh-CN';
		} else if (language === 'zh_hant') {
			language = 'zh-TW';
		}

		var xhr = Ti.Network.createHTTPClient();
		xhr.open('GET', 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&bounds=' + bounds + '&region=' + region + '&language=' + language + '&sensor=' + sensor);
		xhr.onload = function(){
			var json = JSON.parse(this.responseText);

			if (json.status === 'OK') {
				var results = [];

				json.results.forEach(function(result){
					results.push({
						address: result.formatted_address.toString()
					});
				});

				options.success({
					status: json.status,
					results: results,
					raw: json.results
				});
			} else {
				options.error({ error: json.status });
			}

			xhr.onerror = null;
			xhr.onload = null;
			xhr.onreadystatechange = null;
			xhr.ondatastream = null;
			xhr = null;
		};
		xhr.onerror = function(e){
			options.error({ error: e.error });
		};
		xhr.send();
	};

	return Geocoding;
})(this);