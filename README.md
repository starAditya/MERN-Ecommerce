# MERN-Ecommerce

A full-stack ecommerce application built with React, Express, and MongoDB. Customers can browse products, manage a cart, save delivery addresses, and place Cash on Delivery orders.

## Features

- Product listing and product details
- Product search and category filtering
- User signup and login
- Shopping cart with quantity updates and item removal
- Delivery address selection at checkout
- Cash on Delivery order placement
- Product management pages for adding, editing, and listing products

## Tech Stack

- Frontend: React, Vite, React Router, Axios, Tailwind CSS
- Backend: Node.js, Express, Mongoose
- Database: MongoDB

## Run Locally

### Requirements

- Node.js and npm
- MongoDB running locally, or a MongoDB Atlas database







Set `MONGO_URI` and a new, private `JWT_SECRET` in the backend host's environment variables. Set `VITE_API_URL` in Vercel to the deployed backend URL ending in `/api`, then redeploy the frontend. Do not commit `.env` files or publish database credentials.
