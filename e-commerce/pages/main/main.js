const menu = document.querySelectorAll('#aside-bar ol > li');
const pages = document.querySelectorAll('.cards__type');
const langButton = document.getElementById('lang-button');
const cartButton = document.getElementById('cart-button');
const cartContainer = document.getElementById('cart-container');
const cartCounter = document.getElementById('data-count');
const alertBody = document.getElementById('alert-body')
const alertWindow = document.getElementById('alert-window')
const closeAlertButton = document.getElementById('close-alert')

const cartList = document.createElement('ol');
cartContainer.appendChild(cartList);

let cart = [];

const asideContent = {
    home: {
        img: "/e-commerce/assets/list-images/home-page.jpg",
        text: "Welcome to our cafe!"
    },
    hotDrinks: {
        img: "/e-commerce/assets/list-images/hot-drinks-page.jpg",
        text: "Our best hot drinks"
    },
    coldDrinks: {
        img: "/e-commerce/assets/list-images/cold-drinks-page.jpg",
        text: "Our best cold drinks"
    },
    dishes: {
        img: "/e-commerce/assets/list-images/dishes-page.jpg",
        text: "Our best dishes"
    }
};

function initProductCards() {
    document.querySelectorAll('.product-card').forEach(card => {
        const quantityDisplay = document.createElement('span');
        quantityDisplay.className = 'quantity';
        quantityDisplay.textContent = '0';
        
        const addRemoveDiv = card.querySelector('.add-remove');
        addRemoveDiv.insertBefore(quantityDisplay, addRemoveDiv.children[1]);
        
        const minusBtn = card.querySelector('.add-remove button:first-child');
        const plusBtn = card.querySelector('.add-remove button:last-child');
        
        minusBtn.addEventListener('click', () => updateCart(card, -1));
        plusBtn.addEventListener('click', () => updateCart(card, 1));
    });
}

function updateCart(card, change) {
    const productId = card.querySelector('h2').textContent;
    const productImg = card.querySelector('.product-image').src;
    const productPrice = parseFloat(card.querySelector('.price').textContent.replace('$', ''));

    let item = cart.find(item => item.id === productId);
    let newQuantity = (item ? item.quantity : 0) + change;
    
    newQuantity = Math.max(0, Math.min(9, newQuantity));
    
    if (item) {
        if (newQuantity === 0) {
            cart = cart.filter(i => i.id !== productId);
        } else {
            item.quantity = newQuantity;
        }
    } else if (newQuantity > 0) {
        cart.push({
            id: productId,
            img: productImg,
            name: productId,
            price: productPrice,
            quantity: newQuantity
        });
    }
    
    updateQuantityDisplay(card, newQuantity);
    updateCartDisplay();
}

function updateQuantityDisplay(card, quantity) {
    if (card.querySelector('.quantity')) {
        card.querySelector('.quantity').textContent = quantity;
    }
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.textContent = totalItems > 0 ? totalItems : '';
    cartCounter.style.display = totalItems > 0 ? 'flex' : 'none';
}

function updateCartDisplay() {
    cartList.innerHTML = '';
    
    if (cart.length === 0) {
        const emptyMsg = document.createElement('li');
        emptyMsg.textContent = 'Your cart is empty';
        cartList.appendChild(emptyMsg);
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.className = 'cart-item';

        cartItem.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">$${item.price.toFixed(2)} × ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}</span>
                <div class="cart-item-controls">
                    <button class="cart-minus"><i class='bx bx-minus'></i></button>
                    <button class="cart-plus"><i class='bx bx-plus'></i></button>
                    <button class="cart-remove"><i class='bx bxs-trash'></i></button>
                </div>
            </div>
        `;

        cartItem.querySelector('.cart-minus').addEventListener('click', () => updateCartItem(item, -1));
        cartItem.querySelector('.cart-plus').addEventListener('click', () => updateCartItem(item, 1));
        cartItem.querySelector('.cart-remove').addEventListener('click', () => updateCartItem(item, -item.quantity));

        cartList.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    const totalElement = document.createElement('li');
    totalElement.className = 'cart-total';
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
    cartList.appendChild(totalElement);
}

function updateCartItem(item, change) {
    const productCard = [...document.querySelectorAll('.product-card')].find(
        card => card.querySelector('h2').textContent === item.id
    );
    
    if (productCard) {
        updateCart(productCard, change);
    }
}

function showPage(index) {

    menu.forEach(item => item.classList.remove('active'));
    menu[index].classList.add('active');

    pages.forEach(page => {
        setTimeout(() => {
            page.style.display = 'none';
        }, 10);
    });
    
    setTimeout(() => {
        pages[index].style.display = 'grid';
    }, 10);

    const pageId = menu[index].dataset.li;
    const content = asideContent[pageId];
    const asideContentElement = document.getElementById('aside-content');

    if (content) {
        asideContentElement.style.opacity = '0';
        
        setTimeout(() => {
            asideContentElement.innerHTML = `
                <img src="${content.img}" alt="Category image">
                <p>${content.text}</p>
            `;
            asideContentElement.style.opacity = '1';
            asideContentElement.style.transition = 'opacity 0.3s ease';
        }, 10);
    }
}

initProductCards();
showPage(0);

menu.forEach((element, index) => {
    element.addEventListener('click', () => showPage(index));
});

cartButton.addEventListener('click', () => {
    cartContainer.classList.toggle('active');
});

langButton.addEventListener('click', () => {
    alertBody.style.display = 'flex'
})

closeAlertButton.addEventListener('click', () => {
    alertBody.style.display = 'none'
})
