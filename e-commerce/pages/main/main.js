const menu = document.querySelectorAll('#aside-bar ol > li')
const pages = document.querySelectorAll('.cards__type')

let currentPage = 1

menu.forEach((element, index) => {
    element.addEventListener('click', () => {
        currentPage = index + 1
        showPage()
    })
})

showPage = () => {
    pages.forEach((element, index) => {
        element.style.display = index + 1 === currentPage ? 'grid' : 'none'
    })
}