const menu = document.querySelectorAll('#aside-bar ol > li')
const pages = document.querySelectorAll('.cards__type')

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

showPage(0);