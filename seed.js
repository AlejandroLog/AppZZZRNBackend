require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const productosData = require('./data/productos.json');

// Conectamos a la base de datos
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('🔥 Conectado a MongoDB Atlas. Iniciando la migración...');

    // 1. Limpiamos la colección de productos por si había pruebas anteriores
    await Product.deleteMany({});
    console.log('🧹 Colección antigua limpiada.');

    // 2. Mapeamos el JSON para quitarle el 'id' manual, ya que Mongo crea un '_id' automáticamente
    const productosLimpios = productosData.map(item => {
        const { id, ...restoDelProducto } = item;
        return restoDelProducto;
    });

    // 3. Insertamos todos los discos de golpe
    await Product.insertMany(productosLimpios);
    console.log(`✅ ¡Éxito! Se inyectaron ${productosLimpios.length} discos en la nube.`);

    // 4. Cerramos la conexión y salimos del script
    process.exit();
  })
  .catch((error) => {
    console.error('❌ Error durante la migración:', error);
    process.exit(1);
  });