const socket = io();

// Actualizar la lista de productos en tiempo real
socket.on('products', (products) => {
    const productList = document.getElementById('productsList');
    productList.innerHTML = '';
    products.forEach(product => {
        const productItem = `
            <li>
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p>Precio: ${product.price}</p>
                <p>Código: ${product.code}</p>
                <p>Stock: ${product.stock}</p>
                <p>Categoría: ${product.category}</p>
                <img src="${product.thumbnails}" alt="${product.title}" />
                <button class="delete-button" data-id="${product.id}">Eliminar</button>
            </li>
        `;
        productList.innerHTML += productItem;
    });
});

// Manejar la eliminación de un producto
document.getElementById('productsList').addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        const productId = event.target.getAttribute('data-id');
        socket.emit('deleteProduct', productId);
    }
});

// Enviar un nuevo producto desde un formulario
document.getElementById('productForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const product = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        code: document.getElementById('code').value,
        stock: document.getElementById('stock').value,
        category: document.getElementById('category').value,
        thumbnails: document.getElementById('thumbnails').value,
    };

    socket.emit('newProduct', product);

    // Limpiar formulario después de enviar
    event.target.reset();
});

function deleteProduct(id) {
    socket.emit('deleteProduct', id);
}
