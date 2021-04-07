module.exports = function veterinariasHandler(veterinarias) {
    return {
        get: (data, callback) => {
            if (typeof data.indice !== "undefined") {
                console.log("handler veterinarios", { data });
                if (veterinarios[data.indice]) {
                    return callback(200, veterinarios[data.indice]);
                }
                return callback(404, {
                    mensaje: `veterinario con indice ${data.indice} no encontrado`,
                });
            }
            callback(200, veterinarios);
        },
        post: (data, callback) => {
            veterinarias.push(data.payload);
            callback(201, data.payload);

        },
        put: (data, callback) => {
            if (typeof data.indice !== "undefined") {
                if (veterinarias[data.indice]) {
                    veterinarias[data.indice] = data.payload;
                    return callback(200, veterinarias[data.indice]);
                }
                return callback(404, {
                    mensaje: `veterinaria con indice ${data.indice} no encontrado`,
                });
            }
            callback(404, { mensaje: "indice no enviado" });
        },
        delete: (data, callback) => {
            if (typeof data.indice !== "undefined") {
                if (veterinarias[data.indice]) {
                    veterinarias = veterinarias.filter(
                        (_veterinaria, indice) => indice != data.indice
                    );
                    return callback(204, { mensaje: 'elemento con indice ${data.indice} elimimado' });
                }
                return callback(404, {
                    mensaje: `veterinaria con indice ${data.indice} no encontrada`,
                });
            }
            callback(404, { mensaje: "indice no enviado" });
        },
    };
};