document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        fetch('db.json')
            .then(response => response.json())
            .then(data => {
                const product = data.products.find(p => p.id == productId);
                if (product) {
                    displayProduct(product);
                } else {
                    console.error('Product not found');
                }
            })
            .catch(error => console.error('Error fetching product details:', error));
    }

    function displayProduct(product) {
        const container = document.getElementById('product-details');
        container.innerHTML = `
            <h1>${product.name}</h1>
            <img src="${product.image}" alt="${product.name}">
            <p>${product.price}</p>
            <button class="blue-button">Adicionar ao Carrinho</button>
        `;
    }
});
