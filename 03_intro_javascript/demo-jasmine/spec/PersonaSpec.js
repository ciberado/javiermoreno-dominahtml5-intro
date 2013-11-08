describe('Pruebas sobre jerarquía Persona', function() {
	
	it('El sueldo neto de un empleado es el 125% del base', function() {
		var emp = new Empleado('01234567A', 'Alice', 'W', null, 1000.0);
		expect(Math.abs(emp.getSueldoNeto()-1250.0) <0.001).toBe(true);
	});
	
});