const { Schema, model } = require('mongoose');

const ProductoSchema = new Schema({
    nombre: String,
    rut_empresa: String,
    codigo: String,
    precio_compra: Number,
    precio_venta: Number,
    en_stock: Number,
    stock: Number,
    img: String,
    estado: Number
}, {
    timestamps: true
});


module.exports = model('Producto', ProductoSchema);