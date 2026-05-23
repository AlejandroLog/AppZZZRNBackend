require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productsRouter = require('./routes/productsRouter');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); 

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('🔥 Conexión exitosa a la base de datos MongoDB Atlas (VINIMUSIC)');
  })
  .catch((error) => {
    console.error('❌ Error al conectar a MongoDB:', error);
  });

// Ruta principal de prueba
app.get('/', (req, res) => {
    res.send('API de VINIMUSICAPP conectada y escuchando 🎧');
});
app.use('/api/products', productsRouter);

// Levantar el servidor
app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});