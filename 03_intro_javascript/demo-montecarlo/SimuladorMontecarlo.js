<script>
 
 
function SimuladorMontecarloPI(iteracionesTotales) {
        this.iteracionesTotales = iteracionesTotales || SimuladorMontecarloPI.prototype.iteracionesTotales;    
}
 
SimuladorMontecarloPI.RADIO = 10000.0;
 
SimuladorMontecarloPI.prototype.iteracionesTotales = 10000;
SimuladorMontecarloPI.prototype.aciertos = 0;
 
SimuladorMontecarloPI.prototype.ejecutarSimulacion = function() {
        for (var i=0; i < this.iteracionesTotales; i++) {
                var x = Math.random() * SimuladorMontecarloPI.RADIO;
                var y = Math.random() * SimuladorMontecarloPI.RADIO;
                var distancia = this._calcularDistancia(x, y);
                if (distancia < SimuladorMontecarloPI.RADIO) {
                        this.aciertos = this.aciertos + 1;
                }
        }
}
 
SimuladorMontecarloPI.prototype.obtenerPi = function() {
        return 4.0 * this.aciertos / this.iteracionesTotales;
}
 
SimuladorMontecarloPI.prototype._calcularDistancia = function(x, y) {
        return Math.sqrt(x*x + y*y);
}

</script>