const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    albumName: { type: String, required: true },
    artistName: { type: String, required: true },
    price: { type: Number, required: true },
    releaseDate: { type: String },
    type: { type: String, default: 'vinilo' },
    category: { type: String },
    seller: { type: String, default: 'VINIA Distribución' },
    imageUrl: { type: String, required: true },
    description: { type: String }
}, {
    timestamps: true // Agrega automáticamente fecha de creación y actualización
});

module.exports = mongoose.model('Product', productSchema);