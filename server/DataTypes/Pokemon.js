var Nombre;
var Tipo1;
var Tipo2;
var Hablilidades;
var url;
var stats;

function Pokemon(Nombre, Tipo1, Tipo2, Hablilidades, url, stats) {
    this.Nombre = Nombre;
    this.Tipo1 = Tipo1;
    this.Tipo2 = Tipo2;
    this.Hablilidades = Hablilidades;
    this.url = url;
    this.stats = stats;
}
exports.Pokemon = Pokemon;