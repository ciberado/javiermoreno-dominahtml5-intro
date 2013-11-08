function Pronostico(fecha, minima, maxima, cielo, badge) {
	this.fecha = fecha;
	this.minima = minima;
	this.maxima = maxima;
	this.cielo = cielo;
	this.badge = badge;
}


function PronosticoService() {
}

PronosticoService.URL = 'http://query.yahooapis.com/v1/public/yql?q=select item from weather.forecast where woeid in (select woeid from geo.placefinder where text="{0}, {1}" and gflags="R") and u="c" &format=json';

PronosticoService.prototype.obtenerPronostico = function(lat, lon, fn) {
	
	var urlServicio = PronosticoService.URL
				.replace('{0}', lat).replace('{1}', lon);
	$.ajax({
		url : urlServicio,
		type : 'GET',
		dataType : 'jsonp'
	}).done(function(data) {
		var yahooPronostico = data.query.results.channel.item.forecast[0];
		var yahooDescripcion = data.query.results.channel.item.description;
		var textoFecha = yahooPronostico.date;
		var momentFecha = moment(textoFecha, 'DD MMM YYYY');
		var fecha = momentFecha.toDate();
		
		var pronostico = new Pronostico(fecha, 
										window.parseFloat(yahooPronostico.low),
		                                window.parseFloat(yahooPronostico.high), 
										yahooPronostico.text,
										yahooDescripcion);

										fn(pronostico);
	});

}








