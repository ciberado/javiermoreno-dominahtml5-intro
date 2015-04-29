var GestionTareasService = function() {
};

GestionTareasService.STORAGE_KEY = 'alist_tareas'; /* Ojo! constante. */

GestionTareasService.prototype.agregarTarea = function(nuevaTarea, fnSuccess /* Ojo! asíncrono */, fnError) {
   var tareasAsString = localStorage.getItem(GestionTareasService.STORAGE_KEY);
    var tareas;
    if (tareasAsString == null) {
        tareas =  [];
    } else {
		tareas = JSON.parse(tareasAsString); /* ojo! Serialización */
	}
    tareas.push(nuevaTarea);
    tareasAsString = JSON.stringify(tareas);
    localStorage.setItem(GestionTareasService.STORAGE_KEY, tareasAsString);
    fnSuccess();
};

GestionTareasService.prototype.obtenerTareas = function(fnSuccess, fnError) {
    var tareasAsString = localStorage.getItem(GestionTareasService.STORAGE_KEY);
    var tareas = JSON.parse(tareasAsString);
    fnSuccess(tareas);
};










