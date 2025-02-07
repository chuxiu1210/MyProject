document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

/* 添加任务 */
function addTask() {
    let input = document.getElementById("todo-input");
    let task = input.value.trim();
    if (task) {
        let list = document.getElementById("todo-list");
        let li = document.createElement("li");
        li.textContent = task;
        li.setAttribute("draggable", "true");
        li.addEventListener("dragstart", dragStart);
        list.appendChild(li);
        saveTasks();
        input.value = "";
    }
}

/* 拖动功能 */
let draggedItem = null;
function dragStart(event) {
    draggedItem = event.target;
    setTimeout(() => event.target.style.display = "none", 0);
}
document.getElementById("todo-list").addEventListener("dragover", function (event) {
    event.preventDefault();
});
document.getElementById("todo-list").addEventListener("drop", function (event) {
    event.preventDefault();
    if (draggedItem) {
        this.appendChild(draggedItem);
        draggedItem.style.display = "block";
        saveTasks();
    }
});

/* 存储任务 */
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#todo-list li").forEach(li => {
        tasks.push(li.textContent);
    });
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

/* 加载任务 */
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("todoTasks") || "[]");
    let list = document.getElementById("todo-list");
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.textContent = task;
        li.setAttribute("draggable", "true");
        li.addEventListener("dragstart", dragStart);
        list.appendChild(li);
    });
}
