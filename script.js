document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function addTask() {
    let input = document.getElementById("todo-input");
    let taskText = input.value.trim();

    if (taskText === "") return;

    let li = document.createElement("li");
    li.textContent = taskText;
    li.onclick = () => toggleTask(li);

    document.getElementById("todo-list").appendChild(li);
    saveTasks();

    input.value = "";
}

function toggleTask(task) {
    task.classList.toggle("completed");
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#todo-list li").forEach(task => {
        tasks.push({ text: task.textContent, completed: task.classList.contains("completed") });
    });
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];
    let list = document.getElementById("todo-list");
    list.innerHTML = "";
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) li.classList.add("completed");
        li.onclick = () => toggleTask(li);
        list.appendChild(li);
    });
}
