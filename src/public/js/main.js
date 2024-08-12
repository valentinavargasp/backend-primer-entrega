const socket = io();

socket.on('update-products', (products) => {
    const productList = document.getElementById('product-list');
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
            </li>
        `;
        productList.innerHTML += productItem;
    });
});
