

function SplashControlador(pageName) {
	var self = this;
	this.pageName = pageName;
	
	$(document).on('pageinit', this.pageName, function() {
		self._inicializarUI();
	});
}

SplashControlador.prototype.pageName = null;

SplashControlador.prototype._inicializarUI = function() {
	var self = this;
	$(this.pageName).on('tap' /*vclick*/, function() {
		$.mobile.changePage('#menu');
	});
	window.setTimeout(function() {
		var $page = $(self.pageName + ':visible');
		if ($page.length > 0) {
			$page.trigger('tap');
		}
	}, 2000);
}

SplashControlador.instacia = new SplashControlador('#splash');


function GruposControlador(pageName) {
	var self = this;
	this.pageName = pageName;
	$(document).on('pagebeforeshow', this.pageName, function() {
		self._inicializarUI();
	});	
}

GruposControlador.prototype.pageName = null;

GruposControlador.prototype._inicializarUI = function() {
	var self = this;
	var $lista = $(this.pageName + ' ul');
	//$lista.empty();
	//cargar grupos en lista;
	var $a = $lista.find('a');
	$a.off('vclick').on('vclick', function(evt) {
		var href = $(this).attr('href');
		var grupo = href.substring(href.indexOf('grupo=') + 'grupo='.length);
		self._mostrarListadoSuperheroes(grupo);
		return false;
	});
}

GruposControlador.prototype._mostrarListadoSuperheroes = function(grupo) {
	localStorage.setItem('filtro', grupo);
	$.mobile.changePage('#listado');
}

GruposControlador.instancia = new GruposControlador('#grupos');

function ListadoControlador(pageName) {
	var self = this;
	this.pageName = pageName;
	$(document).on('pagebeforeshow', this.pageName, function() {
		self._inicializarUI();
	});		
}

ListadoControlador.prototype._inicializarUI = function() {
	var grupo = localStorage.getItem('filtro');
	/* TODO:
	GestionSuperHeroesService.instancia.obtenerPorGrupo(grupo, function(superheroes) ...);
	*/	
	var superheroes = ['El Zancudo', 'Hombre Rana', 'Armadillo', 'Mapache Cohete'];
	var $lista = $(this.pageName + ' ul');
	$lista.empty();
	for (var idx=0; idx < superheroes.length; idx++) {
		$('<li/>').append(
			$('<a/>').attr('href', '#ficha?id=X')
			         .html('<h3>' + superheroes[idx]+'</h3>')			      
		).appendTo($lista);
	}
	$lista.listview('refresh');
}

ListadoControlador.prototype.pageName = null;

ListadoControlador.instancia = new ListadoControlador('#listado');


function RegistroControlador(pageName) {
	var self = this;
	this.pageName = pageName
	$(document).on('pageinit', this.pageName, function() {
		self._inicializarUI();
	});
}

RegistroControlador.prototype.pageName = null;

RegistroControlador.prototype._inicializarUI = function() {
	var self = this;
	$('#formRegistro').on('submit', function() {
		self._procesarFormulario();
		return false;
	});
}

RegistroControlador.prototype._procesarFormulario = function() {
	var self = this;
	var superHeroe = new SuperHeroe(undefined, 
									$('#nombre').val(),
									$('#identidad').val(),
									$('[name=tipo]:checked').val(),
									$('#grupo').val(),
									undefined);
	GestionSuperHeroesService.instancia.registrar(superHeroe, function() {
		self._mostrarSuperHeroeRegistrado(superHeroe);
	});
}

RegistroControlador.prototype._mostrarSuperHeroeRegistrado = function(superHeroe) {
	$.mobile.changePage('#ficha');
}


RegistroControlador.instancia = new RegistroControlador('#registro');









