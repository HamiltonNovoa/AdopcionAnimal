const { Schema, model } = require('mongoose');

const Mascota = new Schema({
    nombre: String,
    raza: String,
    edad: Number,
    imagen: String,
    tipo: String,
    descripcion: String,
    fechaNacimiento: Date,
    peso: Number,
    sexo: String,
    entregan: [Object]
}, { timestamps: true, versionKey: false });

module.exports = model('Mascota', Mascota);