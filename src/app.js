import express from 'express';
import { ProductManager } from './managers/productManager.js';
import { CartManager } from './managers/cartManager.js';
import { productsRouter } from './routes/products.router.js';
import { cartsRouter } from './routes/carts.router.js';


const PUERTO = 8080;
const app = express();

export const productManager = new ProductManager;
export const cartManager = new CartManager;

app.use(express.json())

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PUERTO, (req, res) => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})