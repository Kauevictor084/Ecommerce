document.addEventListener('DOMContentLoaded', () => {
    let productContainerWidth = document.querySelector('.product-cards-container').offsetWidth;
    let productCardWidth = 260;
    let productCardsPerRow = Math.floor(productContainerWidth / (productCardWidth + 10));
    let marginSpacing = (productContainerWidth - (productCardsPerRow * productCardWidth)) / (productCardsPerRow - 1);

    let lastElement = productCardsPerRow  - 1;
    let productCards;

    let productSections = document.querySelectorAll('.product-section');
    productSections.forEach((section) => {
        productCards = section.querySelectorAll('.product-cards');

        for (let i = 0; i < productCardsPerRow; i++) {
            productCards[i].classList.add('active');

            if (i === lastElement){
                productCards[i].style.marginRight = '0px';
            }
            else{
                productCards[i].style.marginRight = `${marginSpacing}px`;
            }
        }
    });

    let wishListCount = document.querySelector('#wishlist-link span');
    let heartButtons = document.querySelectorAll('.heart-button');

    heartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');

            wishListCount.innerHTML = document.querySelectorAll('.heart-button.active').length;
        });
    });

    let cartCount = document.querySelector('#cart-link span');
    let cartButtons = document.querySelectorAll('.product-cards .blue-button');

    cartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');

            let buttonString = button.innerHTML.trim();

            if (buttonString === "Adicionar ao Carrinho"){
                button.innerHTML = "Remover";
            }
            else if (buttonString === "Remover"){
                button.innerHTML = "Adicionar ao Carrinho";
            }
            else{
                console.log("Erro: Falha ao adicionar.", buttonString);
            }
            cartCount.innerHTML = document.querySelectorAll('.product-cards .blue-button.active').length;
        });
    });

});

document.addEventListener('DOMContentLoaded', () => {
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            const productCardsContainer = document.querySelector('.product-cards-container ul');
            
            products.forEach(product => {
                const productCard = document.createElement('li');
                productCard.className = 'product-cards';
                productCard.innerHTML = `
                    <div class="product-image-container">
                        <img src="${product.image}" alt="${product.name}">
                        <button class="heart-button">
                            <!-- SVG code -->
                        </button>
                    </div>
                    <div class="product-text-container">
                        <h1>${product.name}</h1>
                        <p>${product.price}</p>
                        <button class="blue-button">
                            Adicionar ao Carrinho
                        </button>
                    </div>
                `;
                productCardsContainer.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
});

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.blue-button');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-cards');
            const productName = productCard.querySelector('h1').textContent;
            const productPrice = productCard.querySelector('p').textContent;

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({ name: productName, price: productPrice });
            localStorage.setItem('cart', JSON.stringify(cart));

            updateCartCount();
        });
    });

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartLink = document.getElementById('cart-link');
        const cartCount = cart.length;
        cartLink.querySelector('span').textContent = cartCount;
    }

    updateCartCount();
});

