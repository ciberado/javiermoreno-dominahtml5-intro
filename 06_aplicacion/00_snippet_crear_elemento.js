var elem = document.createElement('li');
elem.innerHTML = 'Texto de la nueva tarea';
var lista = document.querySelector('#tareas');
lista.appendChild(elem);











var crearServicioGestionTareas = function() {
	return new GestionTareasServDB();
}


 ...
 var serv = crearServicioGestionTareas();
 serv.agregarTarea(...);
 ...
 

 ...
 var serv = crearServicioGestionTareas();
 serv.agregarTarea(...);
 ...
 

 ...
 var serv = crearServicioGestionTareas();
 serv.agregarTarea(...);
 ...
 

 ...
 var serv = new GestionTareasServServer();
 serv.agregarTarea(...);
 ...
 
 