const express = require('express');
const router = express.Router();
const productsService = require('../services/productsService');

router.get('/', async (req, res, next) => {
    try {
        const products = await productsService.getAll();
        res.json(products);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const product = await productsService.getOne(req.params.id);
        if (!product) return res.status(404).json({ message: 'Disco no encontrado' });
        res.json(product);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const newProduct = await productsService.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const updatedProduct = await productsService.update(req.params.id, req.body);
        if (!updatedProduct) return res.status(404).json({ message: 'Disco no encontrado' });
        res.json(updatedProduct);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedProduct = await productsService.delete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Disco no encontrado' });
        res.json({ message: 'Disco eliminado correctamente' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;