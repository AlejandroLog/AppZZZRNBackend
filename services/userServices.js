const User = require('../models/User');

class UsersService {
    async getAll() {
        return await User.find();
    }

    async getById(id) {
        return await User.findById(id);
    }

    async register(data) {
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            throw new Error('El correo ya está registrado');
        }
        const user = new User(data);
        return await user.save();
    }

    async login(email, password) {
        const user = await User.findOne({ email, password });
        if (!user) {
            throw new Error('Credenciales incorrectas');
        }
        return user;
    }

    async update(id, data) {
        return await User.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await User.findByIdAndDelete(id);
    }
}

module.exports = new UsersService();