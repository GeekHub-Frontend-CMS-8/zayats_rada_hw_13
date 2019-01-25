let addButton = document.getElementById('add');
let inputTask = document.getElementById('new-task');
let unfinishedTask = document.getElementById('unfinished-tasks');
let finishedTask = document.getElementById('finished-tasks');

function createNewElement(task) {

    let listItem = document.createElement('li');

    let checkbox = document.createElement('button');
    checkbox.className = 'material-icons checkbox';
    checkbox.innerHTML = '<i class="far fa-square"></i>';

    let label = document.createElement('label');
    label.innerText = task;

    let input = document.createElement('input');
    input.type = 'text';

    let editButton = document.createElement('button');
    editButton.className = 'material-icons edit';
    editButton.innerHTML = '<i class="fas fa-pen"></i>';

    let deleteButton = document.createElement('button');
    deleteButton.className = 'material-icons delete';
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(input);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;


}

function addTask() {
    if (inputTask.value) {
        let listItem = createNewElement(inputTask.value);
        unfinishedTask.appendChild(listItem);
        bindTaskEvents(listItem, finishTask);
        inputTask.value = '';
    }
    save();
}

addButton.onclick = addTask;

function deleteTask() {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
    save();
}

function editTask() {
    let editButton = this;
    let listItem = this.parentNode;
    let label = listItem.querySelector('label');
    let input = listItem.querySelector('input[type=text]');

    let containsClass = listItem.classList.contains('editMode');

    if (containsClass) {
        label.innerText = input.value;
        editButton.className = 'material-icons edit';
        editButton.innerHTML = '<i class="fas fa-pen"></i>';
        save();
    } else {
        input.value = label.innerText;
        editButton.className = 'material-icons save';
        editButton.innerHTML = '<i class="fas fa-save"></i>';
    }

    listItem.classList.toggle('editMode');
}

function finishTask() {
    let listItem = this.parentNode;
    let checkbox = listItem.querySelector('button.checkbox');
    checkbox.className = 'material-icons checkbox';
    checkbox.innerHTML = '<i class="far fa-check-square"></i>';

    finishedTask.appendChild(listItem);
    bindTaskEvents(listItem, unfinishTask);
    save();
}

function unfinishTask() {
    let listItem = this.parentNode;
    let checkbox = listItem.querySelector('button, checkbox');
    checkbox.className = 'material-icons checkbox';
    checkbox.innerHTML = '<i class="far fa-square"></i>';
    unfinishedTask.appendChild(listItem);
    bindTaskEvents(listItem, finishTask);
    save();
}

function bindTaskEvents(listItem, checkboxEvent) {
    let checkbox = listItem.querySelector('button.checkbox');
    let editButton = listItem.querySelector('button.edit');
    let deleteButton = listItem.querySelector('button.delete');

    checkbox.onclick = checkboxEvent;
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
}

function save() {
    let unfinishedTasksArr = [];

    for (let i = 0; i < unfinishedTask.children.length; i++) {
        unfinishedTasksArr.push(unfinishedTask.children[i].getElementsByTagName('label')[0].innerText);
    }
    let finishedTasksArr = [];

    for (let i = 0; i < finishedTask.children.length; i++) {
        finishedTasksArr.push(finishedTask.children[i].getElementsByTagName('label')[0].innerText);
    }

    localStorage.removeItem('todo');

    localStorage.setItem('todo', JSON.stringify({
        unfinishedTask: unfinishedTasksArr,
        finishedTask: finishedTasksArr
    }));
}

function load() {
    return JSON.parse(localStorage.getItem('todo'))
}

let data = load();

for (let i = 0; i < data.unfinishedTask.length; i++) {
    let listItem = createNewElement(data.unfinishedTask[1]);
    unfinishedTask.appendChild(listItem);
    bindTaskEvents(listItem, finishTask);

}

for (let i = 0; i < data.finishedTask.length; i++) {
    let listItem = createNewElement(data.finishedTask[1]);
    finishedTask.appendChild(listItem);
    bindTaskEvents(listItem, unfinishTask);
}
