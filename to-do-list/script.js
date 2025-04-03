const newTaskField = document.getElementById("newTask")
const addTaskButton = document.getElementById("addTask")
const taskList = document.getElementById("taskList")

let pages = 0
let tasksPerPage = 5
let currentPage = 1

const allTasks = document.querySelectorAll('ol > li')

const createTask = (taskText) => `
    <div class="task">
        <input type="checkbox">
        <span class="task-text">${taskText}</span>
        <div class="control-buttons">
            <button class="edit-button">
                <i class='bx bx-edit-alt'></i>
            </button>
            <button class="delete-button">
                <i class='bx bx-trash'></i>
            </button>
        </div>
    </div>
`


const createEdit = (currentText = '') =>
    `
    <div class="edit-task">
        <textarea class="edit-input">${currentText}</textarea>
        <br>
        <div class="control-buttons">
            <button class="confirm-button">
                <i class='bx bx-check-double'></i>
            </button>
            <button class="cancel-button">
                <i class='bx bx-arrow-back' ></i>
            </button>
        </div>
    </div>
`


add = () => {
    let taskText = newTaskField.value.trim()
    if (taskText === '') return

    let newTask = document.createElement('li')
    newTask.innerHTML = createTask(taskText)
    taskList.appendChild(newTask)
    newTaskField.value = ''

    setup(newTask)
    counter()
    showPage(pages)
    //  console.log(pages)
}

counter = () => {

    const navBar = document.getElementById('page-manager')
    const pageContainer = document.getElementById('page-count')

    const neededPages = Math.ceil(allTasks.length / tasksPerPage)
    
    if (neededPages !== pages) {
        pages = neededPages
        
        pageContainer.innerHTML = ''
        
        for (let i = 1; i <= pages; i++) {
            const pageButton = document.createElement('button')
            pageButton.textContent = i
            pageButton.addEventListener('click', () => showPage(i))
            pageContainer.appendChild(pageButton)
        }

        if (neededPages > pages) {
            currentPage = neededPages
        }

    }
    navBar.style.display = pages > 1 ? 'flex' : 'none'
    showPage(currentPage);

}

check = (navBar) => {
    const listCount = document.querySelectorAll('ol > li').length
    const pagesContainer = document.getElementById('page-count')
    if (listCount == tasksPerPage)
        navBar.style.display = 'none'
    if(listCount % tasksPerPage == 0){
        pages--;
        pagesContainer.removeChild(pagesContainer.lastElementChild)
    }
}

setup = (taskElement) => {
    taskElement.querySelector('.delete-button').addEventListener('click', () => remove(taskElement))
    taskElement.querySelector('.edit-button').addEventListener('click', () => edit(taskElement))
    
    const checkbox = taskElement.querySelector('input[type="checkbox"]')
    checkbox.addEventListener('change', () => {
        const taskSpan = taskElement.querySelector('.task-text')
        taskSpan.style.textDecoration = checkbox.checked ? 'line-through' : 'none'
    });
}

edit = (listItem) => {
    const currentText = listItem.querySelector('.task-text').textContent
    listItem.innerHTML = createEdit(currentText)
    
    listItem.querySelector('.confirm-button').addEventListener('click', () => save(listItem, currentText))
    listItem.querySelector('.cancel-button').addEventListener('click', () => cancel(listItem, currentText))
}

remove = (listItem) => {
    listItem.remove()
    check(document.getElementById('page-manager'))
    const listCount = document.querySelectorAll('ol > li').length
    showPage(Math.ceil(listCount / tasksPerPage))
}

save = (listItem, text) => {
    let newTextField = listItem.querySelector('.edit-input')
    let newText = newTextField.value.trim()
    listItem.innerHTML = createTask(newText || text)
    setup(listItem)
}

cancel = (listItem, text) => {
    listItem.innerHTML = createTask(text)
    setup(listItem)
}

showPage = (pageNumber) => {
    const startTask = (pageNumber - 1) * tasksPerPage
    const endTask = startTask + tasksPerPage

    allTasks.forEach((task, index) => {
        task.style.display = (index >= startTask && index < endTask) ? 'block' : 'none'
    });
    
    currentPage = pageNumber
}

updatePaginationButtons = () => {
    document.getElementById('toggle-left').disabled = currentPage === 1
    document.getElementById('toggle-right').disabled = currentPage === 1
    document.getElementById('toggle-first').disabled = currentPage === pages
    document.getElementById('toggle-last').disabled = currentPage === pages
}

addTaskButton.addEventListener('click', add)

document.getElementById('toggle-first').addEventListener('click', () => showPage(1))
document.getElementById('toggle-left').addEventListener('click', () =>{
    if(currentPage > 1) 
        showPage(currentPage - 1)
} )
document.getElementById('toggle-right').addEventListener('click', () => {
    if (currentPage < pages)
        showPage(currentPage + 1)
} )
document.getElementById('toggle-last').addEventListener('click', () => showPage(pages))