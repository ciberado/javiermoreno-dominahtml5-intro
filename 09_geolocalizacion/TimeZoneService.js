function InfoHora(hora, minuto, segundo) {
	this.hora = hora;
	this.minuto = minuto;
	this.segundo = segundo;
}


function TimeZoneService() {
}

TimeZoneService.URL = 'timezone.json';

TimeZoneService.prototype.obtenerHoraHome = function(fn) {	
	$.getJSON(TimeZoneService.URL).done(function(data) {
		var jsDate = new Date(data.timestamp);
		var infoHora = new InfoHora(jsDate.getHours(), 
		                            jsDate.getMinutes(),
									jsDate.getSeconds());
		fn(infoHora);
	});	
}




