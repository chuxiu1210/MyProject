document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

function addTask() {
    let input = document.getElementById("todo-input");
    let taskText = input.value.trim();

    if (taskText !== "") {
        let list = document.getElementById("todo-list");
        let li = document.createElement("li");

        li.innerHTML = `${taskText} <button onclick="removeTask(this)">❌</button>`;
        list.appendChild(li);
        saveTasks();
        input.value = "";
    }
}

function removeTask(button) {
    let li = button.parentElement;
    li.remove();
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#todo-list li").forEach(li => {
        tasks.push(li.textContent.replace("❌", "").trim());
    });
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = localStorage.getItem("todoTasks");
    if (savedTasks) {
        let list = document.getElementById("todo-list");
        JSON.parse(savedTasks).forEach(taskText => {
            let li = document.createElement("li");
            li.innerHTML = `${taskText} <button onclick="removeTask(this)">❌</button>`;
            list.appendChild(li);
        });
    }
}
