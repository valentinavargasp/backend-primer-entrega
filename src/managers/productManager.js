import {promises as fs} from 'fs'
import {v4 as uuidv4} from 'uuid'

export class ProductManager {
    constructor(){
        this.path = './src/data/products.json';
        this.products = []
    }

    addProduct = async ({title, description, price, thumbnail, code, stock, status = true, category}) => {
        const id = uuidv4()

        let newProduct = {id, title, description, price, thumbnail, code, stock, status, category}

        this.products = await this.getProducts()
        this.products.push(newProduct)

        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2))

        return newProduct;
    }


    getProducts = async () => {
        const response = await fs.readFile(this.path , 'utf-8')
        const responseJSON = JSON.parse(response)

        return responseJSON; 
    }

    getProductById = async (id) => {
        const response = await this.getProducts()
        const product = response.find(product => product.id === id)

        if (product) {
            return product
        } else {
            console.log('No se encontró el producto.');
        }
    }

    updateProduct = async (id, {...data}) => {
        const products = await this.getProducts()
        const index = products.findIndex(product => product.id === id)

        if (index != -1){
            response[index] = {id, ...data}
            await fs.writeFile(this.path, JSON.stringify(products))
            return response[index]
        } else {
            console.log('No se encontró el producto');
        }
    }

    deleteProduct = async (id) => {
        const products = await this.getProducts()
        const index = products.findIndex(product => product.id === id)

        if(index != -1){
            products.splice(index, 1)
            await fs.writeFile(this.path, JSON.stringify(products))
        } else{
            console.log('No se encontró el producto');
        }
    }
}
