const menu = document.querySelectorAll('#aside-bar ol > li');
const pages = document.querySelectorAll('.cards__type');
const cartButton = document.getElementById('cart-button');
const cartContainer = document.getElementById('cart-container');

const cartList = document.createElement('ol');
cartContainer.appendChild(cartList);

let cart = [];

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
    card.querySelector('.quantity').textContent = quantity;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if(totalItems > 0)
        cartButton.setAttribute('data-count', totalItems);
    else if (totalItems === 0) cartButton.removeAttribute('data-count')
}

function updateCartDisplay() {
    cartList.innerHTML = '';
    
    if (cart.length === 0) {
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
            </div>
        `;
        
        cartList.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    
    const totalElement = document.createElement('li');
    totalElement.className = 'cart-total';
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
    cartList.appendChild(totalElement);

}

menu.forEach((element, index) => {
    element.addEventListener('click', () => {
        showPage(index);
    });
});

showPage = index => {
    menu.forEach(item => item.classList.remove('active'));
    
    menu[index].classList.add('active');
    
    pages.forEach(page => {
        setTimeout(() => {
            page.style.display = 'none';
        }, 300);
    });
    
    setTimeout(() => {
        pages[index].style.display = 'grid';
    }, 300);
}

cartButton.addEventListener('click', () => {
    setTimeout(() => {
        cartContainer.classList.toggle('active')
    }, 300)
})

showPage(0);