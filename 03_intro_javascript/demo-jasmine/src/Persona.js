
function Persona(nif, nombre, apellidos, fechaNacimiento) {
	this.nif = nif || Persona.prototype.nif;
	this.nombre = nombre || Persona.prototype.nombre;
	this.apellidos = apellidos || Persona.prototype.apellidos;
	this.fechaNacimiento = fechaNacimiento || Persona.prototype.fechaNacimiento;
}

Persona.prototype.nif = null;
Persona.prototype.nombre = null;
Persona.prototype.apellidos = null;
Persona.prototype.fechaNacimiento = null;

Persona.prototype.getEdad = function() {
	var ahora = new Date();
	var edad = ahora.getFullYear() 
					- this.fechaNacimiento.getFullYear();
	if (ahora.getMonth() < this.fechaNacimiento.getMonth()) {
		edad = edad - 1;
	}
	
	return edad;
}



// ********************************************

function Empleado(nif, nombre, apellidos, fechaNac, sueldoBase) {
	Persona.call(this, nif, nombre, apellidos, fechaNac);
	//Persona.apply(this, [nif, nombre, apellidos]);
	this.sueldoBase = sueldoBase;
}

Empleado.prototype = new Persona();
Empleado.prototype.constructor = Empleado;

Empleado.prototype.sueldoBase = 0.0;

Empleado.prototype.getSueldoNeto = function() {
	return this.sueldoBase * 1.25;
}

//*********************************************

function Jefe(nif, nombre, apellidos, fechaNac, sueldoBase) {
	Empleado.call(this, nif, nombre, apellidos, 
				  fechaNac, sueldoBase);
}

Jefe.prototype = new Empleado();
Jefe.prototype.constructor = Jefe;
Jefe.prototype._super = Empleado.prototype;

Jefe.prototype.getSueldoNeto = function() {
	return this._super.getSueldoNeto.call(this) * 1.5;
}


var jefe1 = new Jefe('1234567B', 'Bob', 'Esp', 
						new Date(1976, 3-1, 10), 2000.0);
console.log('*');
console.log(jefe1.getSueldoNeto());
console.log(jefe1.getEdad());












