var exec = require('cordova/exec'),
    InfoTelefono = require('./InfoTelefono');

console.info('Registrando plugin InfoTelefono.');	

function InfoTelefonoPlugin(){
}

InfoTelefonoPlugin.prototype.obtenerInfo = function(successCallback,failureCallback) {
 exec(successCallback, failureCallback, 
      'infotelefonoplugin', 'ACCION_OBTENER_TELEFONO', []);
	
}

var instancia = new InfoTelefonoPlugin();
console.info('Objeto exportado: ', instancia);

module.exports = instancia;

