
function MainControlador() {
	this._inicializar();
}

MainControlador.prototype._actualizacionEnCurso = false;

MainControlador.prototype._inicializar = function() {
	var self = this;
	$('.btnCheckIn').on('click', function() {
		if (self._actualizacionEnCurso == false) {
			self._actualizarPantalla();
		}
	});
}

MainControlador.prototype._actualizarPantalla = function() {
	var self = this;
	this._actualizacionEnCurso = true;
	$('.btnCheckIn').text('Accediendo GPS');
	navigator.geolocation.getCurrentPosition(function(position) {
		// Success
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		var acc = position.coords.accuracy;
		self._actualizarPronostico(lat, lon);
	}, function(error) {
		// Error
		window.alert(error.code + ': ' + error.message);
		// self.mostrarError(error.message);
	}, { 
		// Options
		enableHighAccuracy : true,
		timeout : 1000 * 60
	});	
}

MainControlador.prototype._actualizarPronostico = function(lat, lon) {
	PronosticoService.instancia.obtenerPronostico(lat, lon, function(pronostico) {
		$('#portletTiempo p').fadeOut('slow', function() {
			$(this).html(pronostico.badge)
			       .fadeIn('slow');
		});
	});	
}








