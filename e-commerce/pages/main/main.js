const menu = document.querySelectorAll('#aside-bar ol > li')
const pages = document.querySelectorAll('.cards__type')
const cartButton = document.getElementById('cart-button')
const cartContainer = document.getElementById('cart-container')

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