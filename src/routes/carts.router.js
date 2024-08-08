import { Router } from "express";
import { CartManager } from "../managers/cartManager.js";

const cartsRouter = Router();
const cartManager = new CartManager('./src/data/carts.json');

cartsRouter.post('/', async (req, res) => {
    try {
        const response = await cartManager.newCart();
        res.json(response);
    } catch (error) {
        res.status(500).send('Error al crear carrito.');
    }
});

cartsRouter.get('/:cid', async (req, res) => {
    const {cid} = req.params;
    try {
        const response = await cartManager.getCartProducts(cid);
        res.json(response);
    } catch (error) {
        res.status(500).send('Error al enviar los productos.');
    }
});

cartsRouter.post('/:cid/products/:pid', async (req, res) => {
    const {cid, pid} = req.params;
    try {
        await cartManager.addProductToCart(cid, pid);
        res.send('Producto agregado exitosamente.');
    } catch (error) {
        res.status(500).send('Error al intentar guardar producto.');
    }
});

export {cartsRouter};
