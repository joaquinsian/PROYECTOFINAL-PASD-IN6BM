async function ejemploGuardar() {

    try {
        /*
        // VERIFICA SI YA EXISTEN LOS DATOS
        const count = await ModeloExportado.estimatedDocumentCount();

        if (count > 0) return;


        // GUARDAR DATOS
        const values = await Promise.all([
            new ModeloExportado({ carro: "toyota" }).save(),
            new ModeloExportado({ carro: "mazda" }).save(),
            new ModeloExportado({ carro: "honda" }).save(),
        ]);


        // MOSTRARLOS EN CONSOLA
        console.log(values);
    */

        console.log("El ejemplo del inicial para Sian funciona, miralo en la consola")
    } catch (e) {
        console.error(e);
    }
}


module.exports = { ejemploGuardar }