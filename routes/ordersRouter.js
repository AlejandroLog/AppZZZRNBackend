const express = require('express');
const router = express.Router();
const ordersService = require('../services/ordersService');

router.get('/', async (req, res, next) => {
    try {
        const orders = await ordersService.getAll();
        res.json(orders);
    } catch (error) {
        next(error);
    }
});

router.get('/user/:userId', async (req, res, next) => {
    try {
        const orders = await ordersService.getByUser(req.params.userId);
        res.json(orders);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const newOrder = await ordersService.create(req.body);
        res.status(201).json(newOrder);
    } catch (error) {
        next(error);
    }
});

router.patch('/:id/status', async (req, res, next) => {
    try {
        const updatedOrder = await ordersService.updateStatus(req.params.id, req.body.status);
        if (!updatedOrder) return res.status(404).json({ message: 'Pedido no encontrado' });
        res.json(updatedOrder);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedOrder = await ordersService.delete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: 'Pedido no encontrado' });
        res.json({ message: 'Pedido eliminado correctamente' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;