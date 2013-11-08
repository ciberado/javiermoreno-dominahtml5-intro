
function SuperHeroe(id, nombre, identidadSecreta, grupo, urlImagen) {
	this.id = id;
	this.nombre = nombre;
	this.identidadSecreta = identidadSecreta;
	this.grupo = grupo;
	this.urlImagen = urlImagen;
}

SuperHeroe.prototype.id = null;
SuperHeroe.prototype.nombre = null;
SuperHeroe.prototype.identidadSecreta = null;
SuperHeroe.prototype.grupo = null;
SuperHeroe.prototype.superpoder = null;
SuperHeroe.prototype.vulnerabilidad = null;
SuperHeroe.prototype.tipo = null;
SuperHeroe.prototype.sexo = null;
SuperHeroe.prototype.universo = null;
SuperHeroe.prototype.urlImagen = null;

SuperHeroe.SUPER_HEROES_EJEMPLO = [
	new SuperHeroe(1, 'Batman', 'Bruce Wayne', null, 
	               'http://commons.wikimedia.org/wiki/File:Batman_Cosplay_-_Dragon_Con_2012.jpg'),
	new SuperHeroe(2, 'Ironman', 'Tony Stark', 'Avengers', 
				   'http://commons.wikimedia.org/wiki/File:Iron_Man_Comic_Con_1.jpg0'),
	new SuperHeroe(3, 'Spiderman', 'Peter Parker', 'Avengers', 
	               'http://commons.wikimedia.org/wiki/File:Spiderman_warner.jpg')
];


function GestionSuperHeroesService() {

}

GestionSuperHeroesService.ON_READY_EVENT = 'GestionSuperHeroesService_ON_READY_EVENT';

GestionSuperHeroesService.prototype.obtenerPorId = null;
GestionSuperHeroesService.prototype.obtenerPorGrupo = null;
GestionSuperHeroesService.prototype.registrar = null;

function GestionSuperHeroesServiceSQL() {
	var self = this;
	// if (!window.openDatabase) { ...}
	this._db = window.openDatabase('superheroesInc', '1.0', 
	                               'superheroes', 1024*1024*5);
	this._db.transaction(function(tx) {
		self._crearTablas(tx);
		for (var idx=0; idx < SuperHeroe.SUPER_HEROES_EJEMPLO.length; idx++) {
			self._insertSuperHeroe(tx, SuperHeroe.SUPER_HEROES_EJEMPLO[idx]);
		}
		$(self).trigger(GestionSuperHeroesService.ON_READY_EVENT);
	});
}

GestionSuperHeroesServiceSQL.prototype.obtenerPorId = function(id, fn) {
	var self = this;
	this._db.transaction(function(tx) {
	    self._selectPorId(tx, id, fn);
	});
}

GestionSuperHeroesServiceSQL.prototype._defaultDatabaseError = function(tx, error) {
	console.warn(JSON.stringify(error));
}

GestionSuperHeroesServiceSQL.prototype._defaultDatabaseSuccess = function(tx) {
	console.debug(JSON.stringify(tx));
}	

GestionSuperHeroesServiceSQL.prototype._crearTablas = function(tx) {
	var sql = 'CREATE TABLE IF NOT EXISTS superheroes (' 
	        + '   id INTEGER PRIMARY KEY AUTOINCREMENT, '
			+ '   nombre VARCHAR(160), ' 
			+ '   identidadSecreta VARCHAR(160), '
			+ '   grupo VARCHAR(160), '
			+ '   urlImagen TEXT'
			+ ')';
	tx.executeSql(sql, [], 
		GestionSuperHeroesServiceSQL.prototype._defaultDatabaseSuccess, 
		GestionSuperHeroesServiceSQL.prototype._defaultDatabaseError);
		
}

GestionSuperHeroesServiceSQL.prototype._insertSuperHeroe = function(tx, superHeroe) {
	var sql = 'INSERT INTO superHeroes '
	        + '    (id,  nombre, identidadSecreta, grupo, urlImagen) '
			+ 'VALUES (?, ?, ?, ?, ?) ';
	tx.executeSql(sql, [superHeroe.id, superHeroe.nombre,
						superHeroe.identidadSecreta,
						superHeroe.grupo, superHeroe.urlImagen], 
		GestionSuperHeroesServiceSQL.prototype._defaultDatabaseSuccess, 
		GestionSuperHeroesServiceSQL.prototype._defaultDatabaseError);
}

GestionSuperHeroesServiceSQL.prototype._selectPorId = function(tx, id, fn) {
	var sql =  'SELECT id, nombre, identidadSecreta, grupo, urlImagen '
	        +  'FROM superheroes '
			+  'WHERE id = ? ';
	tx.executeSql(sql, [id], 		 
		function(tx, results) {
			var superHeroe = null;
			if (results.rows.length == 1) {
				var fila = results.rows.item(0);
				superHeroe = new SuperHeroe(
					fila.id, fila.nombre, fila.identidadSecreta, fila.grupo, fila.urlImagen);
			}
			fn(superHeroe);
		}, 
		GestionSuperHeroesServiceSQL.prototype._defaultDatabaseError);	
}


GestionSuperHeroesService.instancia = new GestionSuperHeroesServiceSQL();







