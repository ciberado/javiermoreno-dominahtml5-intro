GestionTareasServ.prototype.obtenerTareas = function(fn) {

	var tareasAsString = window.localStorage.get('tareas');
	var tareas  = JSON.parse(tareasAsString);
	
	fn(tareas);
};

GestionTareasServ.prototype.agregarTarea = function(tarea) {	
	var tareasAsString = window.localStorage.get('tareas');
	var tareas  = JSON.parse(tareasAsString);
	tareas.push(tarea);
	tareasAsString = JSON.stringify(tareas);
	window.localStorage.set('tareas', tareasAsString);
};
