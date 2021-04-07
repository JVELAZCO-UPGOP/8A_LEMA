const recursos = require("./recursos");
const mascotas = require("./rutas/mascotas");
const veterinarias = require("./rutas/veterinarias");
const duenos = require("./rutas/duenos");
const consulta = require("./rutas/consultas");


module.exports = {
    ruta: (data, callback) => {
    callback(200, {mensaje: "esta es /ruta"});
    },
    mascotas: mascotas(recursos.mascotas), 
    veterinarias: veterinarias(recursos.veterinaria),
    duenos: duenos(recursos.duenos),
    consultas: this.consultas(recursos.consultas),
    noEncontrado: (data,callback) => {
    callback(404, {mensaje: "no encontrado"});
    },
};