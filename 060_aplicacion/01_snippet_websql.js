
GestionTareasServ.prototype.obtenerTareas = function(fn) {
	window.openDatabase('tareas', '1.0', 'Lista de tareas usuario', 
						5*1024*1024, function (db) {
		db.transaction(function (tx) {
		  tx.executeSql('SELECT timestampCreacion, texto, finalizada '
						'FROM tareas', [], function (tx, data) {
			var tareas = [];
			for (var i=0; i < data.rows.length; i++) {
				console.log(data.rows[i].texto);
				var tareaActual = new Tarea(...,data.rows[i].texto,...);
				tareas.push(tareaActual);
			}
			fn(tareas);
		  });
		});	
	});
}

.... inicializar ...
var serv = new GestionTareasServ();
var tareas = serv.obtenerTareas(function(tareas) {
	mostrarTareas(tareas);
});