const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Contactos = new Schema ({
        nombre: { type: String },
        imagen: { type: String },
        apellido: { type: String },
        email: { type: String, required: true },
        telefono: { type: String, required: true },
        direccion: { type: String },
});

module.exports = mongoose.model('Contactos', Contactos)