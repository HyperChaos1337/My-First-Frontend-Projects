const newTaskField = document.getElementById("newTask")
const addTaskButton = document.getElementById("addTask")
const taskList = document.getElementById("taskList")

add = () => {
    let taskText = newTaskField.value.trim()
    if (taskText === '') return
    let newTask = document.createElement('li')
    newTask.innerHTML = `
    <input type="checkbox">
    <span class="task-text">${taskText}</span>
    <button class="edit-button">Редактировать</button>
    <button class="delete-button">Удалить</button>
    `
    taskList.appendChild(newTask)
    newTaskField.value = ''

    let removeButton = newTask.querySelector('.delete-button')
    removeButton.addEventListener('click', () => remove(newTask))

    let editButton = newTask.querySelector('.edit-button')
    editButton.addEventListener('click', () => edit(newTask))

}

edit = (listItem) => {
    let inputField = document.createElement('input')
    inputField.type = "text";
    let taskSpan = listItem.querySelector('.task-text')
    taskSpan.appendChild(inputField)
}

remove = (listItem) => {
    listItem.remove()
}

addTaskButton.addEventListener('click', add)