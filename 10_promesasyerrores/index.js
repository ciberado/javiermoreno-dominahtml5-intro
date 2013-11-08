
function MainControlador() {
	var self = this;
	this._inicializar();	
}

MainControlador.prototype._actualizacionEnCurso = false;

MainControlador.prototype._inicializar = function() {
	var self = this;
	
	$(document).ajaxStart(function(evt, jqxhr, opciones, exc) {
		$('.btnCheckIn').html('contactando servidor');
	});
	$(document).ajaxStop(function(evt, jqxhr, opciones, exc) {
		$('.btnCheckIn').html('actualizado');
	});
	
	$(document).ajaxError(function(evt, jqxhr, opciones, exc) {
		self.mostrarError();
	});
	
	$('.btnCheckIn').on('click', function() {
		if (self._actualizacionEnCurso == false) {
			self._actualizarPantalla();
		}
	});
}

MainControlador.prototype.mostrarError = function() {
	$('#errorBox').css('visibility', 'visible')
			      .hide()
				  .removeClass('hidden')
				  .fadeIn();
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
		var $pro1 = self._actualizarPronostico(lat, lon);
		/* TODO ***************************************
		var $pro2 = self._actualizarFotos(lat, lon);
		var $pro3 = self._actualizarWinki(lat, lon);
		********************************************* */
		$.when($pro1/*TODO: , $pro2, $pro3*/).then(function() {	
			$('.btnCheckIn').fadeOut();
		});
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
	var $promesaPronostico = 
			PronosticoService.instancia.obtenerPronostico(lat, lon, function(pronostico) {
		$('#portletTiempo p').fadeOut('slow', function() {
			$(this).html(pronostico.badge)
			       .fadeIn('slow');
		});
	});
	return $promesaPronostico;
}









