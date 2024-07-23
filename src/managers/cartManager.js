import {promises as fs} from 'fs'
import {v4 as uuidv4} from 'uuid'

export class CartManager {
    constructor(){
        this.path = './src/data/carts.json';
        this.carts = []
    }

    getCarts = async () => {
        const response = await fs.readFile(this.path, 'utf-8')
        const responseSON = JSON.parse(response)
        return responseSON;
    }

    getCartProducts = async (id) => {
        const carts = await this.getCarts()

        const cart = carts.find(cart => cart.id === id);

        if(cart){
            return cart.products
        } else{
            console.log('Carrito no encontrado.');
        }
    }

    newCart = async () => {
        const id = uuidv4()

        const newCart = {id, products: []}

        this.carts = await this.getCarts()
        this.carts.push(newCart)

        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2))
        return newCart;
    }

    addProductToCart = async (cartId, productId) => {
        const carts = await this.getCarts()
        const index = carts.findIndex(cart => cart.id === cartId)

        if (index != -1) {
            const cartProducts = await this.getCartProducts(cartId)
            const existingProduct = cartProducts.findIndex(product => product.productId === productId)

            if (existingProduct != -1) {
                cartProducts[existingProduct].quantity = cartProducts[existingProduct].quantity + 1
            } else {
                cartProducts.push({productId, quantity : 1})
            }

            carts[index].products = cartProducts

            await fs.writeFile(this.path, JSON.stringify(carts))
            console.log('Producto agregado exitosamente.');
        } else {
            console.log('Carrito no encontrado. ');
        }

    }

}

