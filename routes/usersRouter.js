const express = require('express');
const router = express.Router();
const usersService = require('../services/usersService');

router.get('/', async (req, res, next) => {
    try {
        const users = await usersService.getAll();
        res.json(users);
    } catch (error) {
        next(error);
    }
});

router.post('/register', async (req, res, next) => {
    try {
        const newUser = await usersService.register(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await usersService.login(email, password);
        res.json(user);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const updatedUser = await usersService.update(req.params.id, req.body);
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await usersService.delete(req.params.id);
        res.json({ message: 'Cuenta eliminada correctamente' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;