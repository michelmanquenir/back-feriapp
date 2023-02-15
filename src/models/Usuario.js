const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    nombre: String,
    apellido: String,
    rut: String,
    password: String,
    telefono: String,
    email: String,
    perfil: Number,
    status: Number,
    fecha_nacimiento: String,
    direccion: String
}, {
    timestamps: true
});


module.exports = model('Usuario', UsuarioSchema);