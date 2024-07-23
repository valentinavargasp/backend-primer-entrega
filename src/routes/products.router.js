import { Router } from "express";
import { productManager } from "../app.js";

const productsRouter = Router()

productsRouter.get('/', async(req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts()

        if(limit){
            const limitedProducts = products.slice(0, limit)
            return res.json(limitedProducts)
        }
        return res.json(products)

    } catch (error) {
        console.log(error);
        res.send('Hubo un error al intentar recibir los productos.')
    }
})

productsRouter.get('/:pid', async(req, res) => {
    const {pid} = req.params;
    try {
        const products = await productManager.getProductById(pid)
        res.json(products)

    } catch (error) {
        console.log(error);
        res.send(`Hubo un error al intentar recibir el producto co el id ${pid} `)
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const {title, description, price, thumbnail, code, stock, status = true, category} = req.body;

        const response = await productManager.addProduct({title, description, price, thumbnail, code, stock, status, category})
        res.json(response)

    } catch (error) {
        console.log(error);
        res.send('Hubo un error al intentar agregar el producto.')
    }
})

productsRouter.put('/:pid', async (req, res) => {
    const {pid} = req.params;
    try {
        const {title, description, price, thumbnail, code, stock, status = true, category} = req.body;
        const response = await productManager.updateProduct(pid, {title, description, price, thumbnail, code, stock, status, category} )
        res.json(response)

    } catch (error) {
        console.log(error);
        res.send(`Hubo un error al intentar editar el producto con id ${pid}`)
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    const {pid} = req.params;
    try {
        await productManager.deleteProduct(pid)
        res.send('El producto fue eliminado exitosamente')
    } catch (error) {
        console.log(error);
        res.send(`Hubo un error al intentar eliminar el producto con id ${pid}`)
    }
})



export {productsRouter};