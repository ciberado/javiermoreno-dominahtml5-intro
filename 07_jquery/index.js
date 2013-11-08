
function MainControlador() {
	this._inicializar();
}

MainControlador.prototype._inicializar = function() {
	var self = this;
	$('.btnCheckIn').on('click', function() {
		self._actualizarPantalla();
	});
}

MainControlador.prototype._actualizarPantalla = function() {
	$('.item').text('Oh! Estoy actualizado!');
}
