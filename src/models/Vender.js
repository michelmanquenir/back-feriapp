const { Schema, model } = require('mongoose');

const VenderSchema = new Schema({
    id_usuario: String,
    total: Number,
    ganancia: Number,
    fecha: String,
    productos: [{
      id_producto: String,
      nombre_producto: String,
      precio_compra: Number,
      precio_venta: Number
  }],

}, {
    timestamps: true
});


module.exports = model('Vender', VenderSchema);