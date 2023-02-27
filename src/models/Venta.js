const { Schema, model } = require('mongoose');

const VentaSchema = new Schema({
  usuario: {
    id_usuario: String,
    email: String,
    nombre: String,
  },
  productos: [{
    id_producto: String,
    cantidad: Number,
    nombre: String,
    codigo: String,
    precio_compra: Number,
    precio_venta: Number,
    stock: Number,
  }],
  rut_empresa: String,
  total_ganancia: Number,
  total_venta: Number,
  metodo_pago: Number
}, {
    timestamps: true
});


module.exports = model('Venta', VentaSchema);