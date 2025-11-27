let taskList = document.getElementById("taskList");

window.onload = () => loadTasks();

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value;

    if (taskText === "") return;

    let li = document.createElement("li");
    li.textContent = taskText;
    li.onclick = function() { this.remove(); saveTasks(); };

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
}

function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
    taskList.innerHTML = localStorage.getItem("tasks") || "";
}