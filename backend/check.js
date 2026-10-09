import mongoose from 'mongoose';
import Product from './models/product.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to DB');
  Product.find().then(products => {
    console.log('Products in DB:', products);
    process.exit();
  }).catch(err => {
    console.error('Error finding products:', err);
    process.exit();
  });
}).catch(err => {
  console.error('DB connection error:', err);
  process.exit();
});