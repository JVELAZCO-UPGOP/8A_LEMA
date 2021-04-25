const { palabraSinAcentos } = require("../util");

module.exports = function duenosHandler(duenos) {
    return {
        get: (data, callback) => {
            if (typeof data.indice !== "undefined") {
                console.log("handler duenos", { data });
                if (duenos[data.indice]) {
                    return callback(200, duenos[data.indice]);
                }
                return callback(404, {
                    mensaje: `dueno con indice ${data.indice} no encontrado`,
                });
            }
            if (
                data.query &&
                (data.query.nombre || data.query.apellido || data.query.documento)
              ) {
                const llavesQuery = Object.keys(data.query);
                let respuestaDuenos = [...duenos];
                respuestaDuenos = respuestaDuenos.filter((_dueno) => {
                  let resultado = false;
                  for (const llave of llavesQuery) {
                    const busqueda = palabraSinAcentos(data.query[llave]);
                    const expresionRegular = new RegExp(busqueda, "ig");
                    const campoDuenoSinAcentos = palabraSinAcentos(_dueno[llave]);
                    resultado = campoDuenoSinAcentos.match(expresionRegular);
                    if (resultado) {
                      break;
                    }
                  }
                  return resultado;
                });
                return callback(200, respuestaDuenos);
              }
            callback(200, duenos);
        },
        post: (data, callback) => {
            duenos.push(data.payload);
            callback(201, data.payload);

        },
        put: (data, callback) => {
            if (typeof data.indice !== "undefined") {
                if (duenos[data.indice]) {
                    duenos[data.indice] = data.payload;
                    return callback(200, duenos[data.indice]);
                }
                return callback(404, {
                    mensaje: `dueno con indice ${data.indice} no encontrado`,
                });
            }
            callback(404, { mensaje: "indice no enviado" });
        },
        delete: (data, callback) => {
            if (typeof data.indice !== "undefined") {
                if (duenos[data.indice]) {
                    duenos = duenos.filter(
                        (_dueno, indice) => indice != data.indice
                    );
                    return callback(204, { mensaje: 'elemento con indice ${data.indice} elimimado' });
                }
                return callback(404, {
                    mensaje: `dueno con indice ${data.indice} no encontrado`,
                });
            }
            callback(404, { mensaje: "indice no enviado" });
        },
    };
};