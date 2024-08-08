import {promises as fs} from 'fs';

export class ProductManager {
    constructor(path){
        this.path = path;
        this.products = [];
    }

    addProduct = async ({title, description, price, thumbnail, code, stock, status = true, category}) => {
        this.products = await this.getProducts();

        if (this.products.some(product => product.code === code)) {
            throw new Error('El código del producto ya existe.');
        }

        const newProduct = {
            id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category
        };

        this.products.push(newProduct);

        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));

        return newProduct;
    }

    getProducts = async () => {
        const response = await fs.readFile(this.path , 'utf-8');
        return JSON.parse(response); 
    }

    getProductById = async (id) => {
        const products = await this.getProducts();
        return products.find(product => product.id === id) || null;
    }

    updateProduct = async (id, data) => {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1){
            products[index] = { id, ...data };
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
            return products[index];
        } else {
            throw new Error('No se encontró el producto.');
        }
    }

    deleteProduct = async (id) => {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if(index !== -1){
            products.splice(index, 1);
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        } else {
            throw new Error('No se encontró el producto.');
        }
    }
}

