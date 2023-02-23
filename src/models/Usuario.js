const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    rut: { type: String, required: true },
    rut_empresa: String,
    password: { type: String, required: true },
    telefono: String,
    email: { type: String, required: true },
    perfil: Number,
    status: Number,
    fecha_nacimiento: String,
    direccion: String
}, {
    timestamps: true
});


module.exports = model('Usuario', UsuarioSchema);