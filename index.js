var addButton = document.getElementById('add');
var inputTask = document.getElementById('new-task');
var unfinishedTasks = document.getElementById('unfinished-tasks');
var finishedTasks = document.getElementById('finished-tasks');

//метод создания элемента списка

function createNewElement(task, finished) {
    var listItem = document.createElement('li');
    var checkbox = document.createElement('button');

    if (finished) {
        checkbox.className = "material-icons checkbox";
        checkbox.innerHTML = "<i class='material-icons'>check_box</i>";
    } else {
        checkbox.className = "material-icons checkbox";
        checkbox.innerHTML = "<i class='material-icons'>check_box_outline_blank</i>";
    }


    var label = document.createElement('label');
    label.innerText = task;
    var input = document.createElement('input');
    input.type = "text";
    var editButton = document.createElement('button');
    editButton.className = "material-icons edit";
    editButton.innerHTML = "<i class='material-icons'>edit</i>";
    var deleteButton = document.createElement('button');
    deleteButton.className = "material-icons delete";
    deleteButton.innerHTML = "<i class='material-icons'>delete</i>";

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(input);
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);

    return listItem;
}

//метод добавления элемента списка

function addTask() {
    if (inputTask.value) {
        var listItem = createNewElement(inputTask.value, false);
        unfinishedTasks.appendChild(listItem);
        bindTaskEvents(listItem, finishTask)
        inputTask.value = "";
    }
}
addButton.onclick = addTask;

//метод удаления элемента списка

function deleteTask() {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
}

//метод редактирования элемента списка (не закончен, т.к. редактирует и завершённые)

function editTask() {
    var editButton = this;
    var listItem = this.parentNode;
    var label = listItem.querySelector('label');
    var input = listItem.querySelector('input[type=text]');

    var containsClass = listItem.classList.contains('editMode');

    if (containsClass) {
        label.innerText = input.value;
        editButton.className = "material-icons edit";
        editButton.innerHTML = "<i class='material-icons'>edit</i>";
    } else {
        input.value = label.innerText;
        editButton.className = "material-icons save";
        editButton.innerHTML = "<i class='material-icons'>save</i>";

    }
    listItem.classList.toggle('editMode');
}

//выполнение задачи при нажатии на checkbox 

function finishTask() {
    var listItem = this.parentNode;
    var checkbox = listItem.querySelector('button.checkbox');
    checkbox.className = "material-icons checkbox";
    checkbox.innerHTML = "<i class='material-icons'>check_box</i>";
    finishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, unfinishTask);
}

//отмена выполнения задачи при нажатии на checkbox в завершённых задачах

function unfinishTask() {
    var listItem = this.parentNode;
    var checkbox = listItem.querySelector('button.checkbox');
    checkbox.className = "material-icons checkbox";
    checkbox.innerHTML = "<i class='material-icons'>check_box_outline_blank</i>";

    unfinishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, finishTask);
}

//функция для привязки методов к новому элементу во время создания

function bindTaskEvents(listItem, checkboxEvent) {
    var checkbox = listItem.querySelector('button.checkbox');
    var editButton = listItem.querySelector('button.edit');
    var deleteButton = listItem.querySelector('button.delete');

    checkbox.onclick = checkboxEvent;
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;

}
