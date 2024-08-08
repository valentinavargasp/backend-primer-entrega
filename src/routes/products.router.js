import { Router } from "express";
import { ProductManager } from "../managers/productManager.js";

const productsRouter = Router();
const productManager = new ProductManager('./src/data/products.json');

productsRouter.get('/', async(req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts();

        if(limit){
            const limitedProducts = products.slice(0, limit);
            return res.json(limitedProducts);
        }
        res.json(products);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al intentar recibir los productos.');
    }
});

productsRouter.get('/:pid', async(req, res) => {
    const {pid} = req.params;
    try {
        const product = await productManager.getProductById(pid);
        res.json(product);

    } catch (error) {
        console.log(error);
        res.status(404).send(`Hubo un error al intentar recibir el producto con el id ${pid}`);
    }
});

productsRouter.post('/', async (req, res) => {
    try {
        const {title, description, price, thumbnail = [], code, stock, status = true, category} = req.body;

        if (!title || !description || !price || !code || !stock || !category) {
            return res.status(400).send('Todos los campos obligatorios deben ser completados.');
        }

        const response = await productManager.addProduct({title, description, price, thumbnail, code, stock, status, category});
        res.json(response);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al intentar agregar el producto.');
    }
});

productsRouter.put('/:pid', async (req, res) => {
    const {pid} = req.params;
    try {
        const {title, description, price, thumbnail = [], code, stock, status = true, category} = req.body;
        const response = await productManager.updateProduct(pid, {title, description, price, thumbnail, code, stock, status, category});
        res.json(response);

    } catch (error) {
        console.log(error);
        res.status(500).send(`Hubo un error al intentar editar el producto con id ${pid}`);
    }
});

productsRouter.delete('/:pid', async (req, res) => {
    const {pid} = req.params;
    try {
        await productManager.deleteProduct(pid);
        res.send('El producto fue eliminado exitosamente');
    } catch (error) {
        console.log(error);
        res.status(500).send(`Hubo un error al intentar eliminar el producto con id ${pid}`);
    }
});

export {productsRouter};
