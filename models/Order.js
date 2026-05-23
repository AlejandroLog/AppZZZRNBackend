const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    albumName: { type: String, required: true },
    artistName: { type: String },
    price: { type: Number, required: true },
    cantidad: { type: Number, required: true },
    imageUrl: { type: String }
});

// Esquema principal del pedido
const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true }, 
    date: { type: String, required: true },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    status: { type: String, default: 'Pendiente' } 
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);