require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const ordersRouter = require('./routes/ordersRouter');

const errorHandler = require('./middlewares/errorHandler'); // 1. Importar

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('🔥 Conexión exitosa a la base de datos MongoDB Atlas (VINIMUSIC)'))
  .catch((error) => console.error('❌ Error al conectar a MongoDB:', error));

app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);

// 2. Usar el middleware de errores (Siempre debe ir después de las rutas)
app.use(errorHandler); 

app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});