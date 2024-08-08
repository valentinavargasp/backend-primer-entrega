import {promises as fs} from 'fs';

export class CartManager {
    constructor(path){
        this.path = path;
        this.carts = [];
    }

    getCarts = async () => {
        const response = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(response);
    }

    getCartProducts = async (id) => {
        const carts = await this.getCarts();
        const cart = carts.find(cart => cart.id === id);

        if(cart){
            return cart.products;
        } else{
            throw new Error('Carrito no encontrado.');
        }
    }

    newCart = async () => {
        const carts = await this.getCarts();
        const newCart = {
            id: carts.length ? carts[carts.length - 1].id + 1 : 1,
            products: []
        };

        carts.push(newCart);

        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return newCart;
    }

    addProductToCart = async (cartId, productId) => {
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex(cart => cart.id === cartId);

        if (cartIndex !== -1) {
            const cartProducts = await this.getCartProducts(cartId);
            const productIndex = cartProducts.findIndex(product => product.productId === productId);

            if (productIndex !== -1) {
                cartProducts[productIndex].quantity += 1;
            } else {
                cartProducts.push({ productId, quantity: 1 });
            }

            carts[cartIndex].products = cartProducts;
            await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
            return 'Producto agregado exitosamente.';
        } else {
            throw new Error('Carrito no encontrado.');
        }
    }
}


