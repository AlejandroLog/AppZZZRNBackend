require('dotenv').config(); // Esta línea debe ir hasta arriba
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const books = require('./routes/books');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use('/api/books', books);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));

app.listen(4000, () => console.log('Server running on port 4000'));