const Product = require('../models/Product');

class ProductsService {
    async getAll() {
        return await Product.find();
    }

    async getOne(id) {
        return await Product.findById(id);
    }

    async create(data) {
        const product = new Product(data);
        return await product.save();
    }

    async update(id, data) {
        return await Product.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Product.findByIdAndDelete(id);
    }
}

module.exports = new ProductsService();