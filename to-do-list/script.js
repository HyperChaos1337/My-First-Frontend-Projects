const newTaskField = document.getElementById("newTask")
const addTaskButton = document.getElementById("addTask")
const taskList = document.getElementById("taskList")

const createTask = (taskText) =>
    `
    <div class="task">
        <input type="checkbox">
        <span class="task-text">${taskText}</span>
        <br>
        <div class="control-buttons">
            <button class="edit-button">
                <i class='bx bx-edit-alt'></i>
            </button>
            <button class="delete-button">
                <i class='bx bx-minus' ></i>
            </button>
        </div>
    </div>
    `


const createEdit = (currentText = '') =>
    `
    <div class="edit-task">
        <input type="text" class="edit-input" value="${currentText}">
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

}

setup = (taskElement) => {
    taskElement.querySelector('.delete-button').addEventListener('click', () => remove(taskElement));
    taskElement.querySelector('.edit-button').addEventListener('click', () => edit(taskElement));
    
    const checkbox = taskElement.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
        const taskSpan = taskElement.querySelector('.task-text');
        taskSpan.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
    });
}

edit = (listItem) => {
    const currentText = listItem.querySelector('.task-text').textContent;
    listItem.innerHTML = createEdit(currentText);
    
    listItem.querySelector('.confirm-button').addEventListener('click', () => save(listItem, currentText));
    listItem.querySelector('.cancel-button').addEventListener('click', () => cancel(listItem, currentText));
}

remove = (listItem) => {
    listItem.remove()
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

addTaskButton.addEventListener('click', add)