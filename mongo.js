const mongoose = require('mongoose');

if (process.argv.length<3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://diegoandres20201003:${password}@cluster0.7lb65.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`; // Pasamos el password y el nombre de la db, en este caso es noteApp

mongoose.set('strictQuery', false); // Definimos strictQuery en false.

mongoose.connect(url); // Implementamos la coneción.

/**
 * Esquemas: Los esquemas establecen la estructura y validacion de los datos, basicamente como se almacenarán los datos en DB.
 */

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
});

/**
 * Modelo: El modelo define la forma de los documentos dentro de una colección de mongoDB.
 * First Param: Nombre del modelo, en este caso Note.
 * Second Param: El esquema que debe seguir el modelo.
 */

const Note = mongoose.model('Note', noteSchema);

// /**
//  * Creamos un nuevo objeto note con la ayuda del modelo Note.
//  * Los modelos son funciones constructoras que crean nuevos objetos js basados en los parametros proporcionados.
//  */

// const note = new Note({
//     content: 'Prueba de inserción 3',
//     important: true,
// })

/**
 * Obteniendo objetos de la db.
 * Esto se logra a partir del método find, del modelo Note.
 */

Note.find({important: true}).then(result => { // Con el parametro de objeto vacío obtenemos todas las notas.
    result.forEach(note => {
        console.log(note);
    });
    mongoose.connection.close();
});

// note.save().then(result => { // Guardamos el objeto note con el método save, que se puede proporcionar con un controlador de eventos con el método then.
//     console.log('Note saved!');
//     mongoose.connection.close(); // Cerramos la conexión.
// });
