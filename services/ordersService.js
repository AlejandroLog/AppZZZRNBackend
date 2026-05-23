const Order = require('../models/Order');

class OrdersService {
    async getAll() {
        return await Order.find();
    }

    async getByUser(userId) {
        return await Order.find({ userId });
    }

    async create(data) {
        const order = new Order(data);
        return await order.save();
    }

    async updateStatus(id, status) {
        return await Order.findByIdAndUpdate(id, { status }, { new: true });
    }

    async delete(id) {
        return await Order.findByIdAndDelete(id);
    }
}

module.exports = new OrdersService();