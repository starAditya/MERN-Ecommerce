import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/product.js';

dotenv.config();

const products = [
  {
    name: 'Dell XPS 13',
    description: 'Lightweight ultrabook for work and travel.',
    price: 999,
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    stock: 10,
  },
  {
    name: 'MacBook Air',
    description: 'Lightweight laptop for students and professionals.',
    price: 1099,
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    stock: 7,
  },
  {
    name: 'Samsung Galaxy S24',
    description: 'Premium Android smartphone with excellent camera.',
    price: 749,
    category: 'Mobiles',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    stock: 15,
  },
  {
    name: 'iPad Air',
    description: 'Tablet with light performance and long battery life.',
    price: 599,
    category: 'Tablets',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    stock: 12,
  },
  {
    name: 'Rolex Watch',
    description: 'Classic luxury watch for everyday elegance.',
    price: 1499,
    category: 'Watches',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80',
    stock: 8,
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Seeded products successfully');
    console.log('Total products:', await Product.countDocuments());
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seed();
