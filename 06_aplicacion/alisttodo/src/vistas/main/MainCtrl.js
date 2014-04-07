var MainCtrl = function() {
    this._form = document.querySelector('#agregarTareaForm');
    this._lista = document.querySelector('#listaTareas');
    this._mensajes = document.querySelector('#mensajes');
    this._service = new GestionTareasService();
};

MainCtrl.prototype.inicializar = function() {
    var self = this;
	var boton = this._form.elements.accionAgregarTarea;
    boton.addEventListener('click', function(evt) {
        self._ejecutarAgregarAccion();
        evt.preventDefault(); /* ojo! preventDefault! */
        return false;
    });
    this._mostrarTareas();
};

MainCtrl.prototype._ejecutarAgregarAccion = function() {
    var self = this; /* ojo! self! */
    var nuevaTarea = new Tarea(this._form.elements.texto.value);
    this._service.agregarTarea(nuevaTarea, function() {
        self._mostrarTareas();
        self._mostrarMensaje('Tarea agregada.');
    }, function(error) {
        self._mostrarTarea(error);
    });
	
};

MainCtrl.prototype._mostrarMensaje = function(error) {
    this._mensajes.innerHTML = error;
};

MainCtrl.prototype._mostrarTareas = function() {
    var self = this;
    this._form.elements.texto.value = '';
    this._service.obtenerTareas(function(tareas) {
        self._lista.innerHTML = '';
        if (!tareas || tareas.length == 0) {
            self._mostrarMensaje('No se han registrado tareas.');
        } else {
            for (var idx=0; idx < tareas.length; idx++) {
                var tareaElement = self._crearTareaElement(tareas[idx]);
                self._lista.appendChild(tareaElement);
            }
        }
    });
};

MainCtrl.prototype._crearTareaElement  = function(tarea) {
    var li = document.createElement('li');
    li.innerHTML = tarea.texto;
    return li;
};








