function Foto(titulo, url, ancho, alto) {
	this.titulo = titulo;
	this.url = url;
	this.ancho = ancho;
	this.alto = alto;
}

function FotoService() {
}

FotoService.URL = 'http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=10&minx={minx}&miny={miny}&maxx={maxx}&maxy={maxy}&size=medium&mapfilter=true';

FotoService.prototype.obtenerFotosPorLatLon = function(lat, lon, radio, fn) {
	var coord = new LatLon(lat, lon);
	var coordMaxxMaxy = coord.destinationPoint(45, radio);
	var coordMinxxMiny = coord.destinationPoint(45+180, radio);
	
	var urlQuery = FotoService.URL.replace('{minx}', coordMinxxMiny.lon())
								  .replace('{miny}', coordMinxxMiny.lat())
								  .replace('{maxx}', coordMaxxMaxy.lon())
								  .replace('{maxy}', coordMaxxMaxy.lat());

    $.ajax({
		url : urlQuery,
		type : 'GET',
		dataType : 'jsonp'
	}).done(function(data) {
		var fotos = [];
		for (var idx=0; idx < data.photos.length; idx++) {
			var fotoActual = data.photos[idx];
			fotos.push(new Foto(fotoActual.photo_title, fotoActual.photo_url,
			                    fotoActual.width, fotoActual.height));
		}
		fn(fotos);
	});

}


