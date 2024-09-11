document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalElement = document.getElementById('cart-total');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartTotal = 0;

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        cartTotal = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">${item.price}</span>
                <button class="remove-button" data-index="${index}">Remover</button>
            `;
            cartItemsContainer.appendChild(itemElement);

        
            const priceValue = parseFloat(item.price.replace('R$', '').replace(',', '.'));
            cartTotal += priceValue;
        });

        cartTotalElement.textContent = cartTotal.toFixed(2).replace('.', ',');
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-button')) {
            const index = event.target.getAttribute('data-index');
            cart.splice(index, 1);
            updateCart(); 
        }
    });

    updateCart(); 
});
