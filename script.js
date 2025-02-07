document.addEventListener("DOMContentLoaded", function () {
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    const addButton = document.querySelector(".todo-widget button");

    // 读取本地存储
    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.forEach(todo => {
            addTodoElement(todo.text, todo.completed);
        });
    }

    // 保存到本地存储
    function saveTodos() {
        const todos = [];
        document.querySelectorAll("#todo-list li").forEach(item => {
            todos.push({ text: item.querySelector(".task-text").textContent, completed: item.classList.contains("completed") });
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    // 添加任务
    function addTodoElement(text, completed = false) {
        const li = document.createElement("li");
        li.classList.add("task-item");

        const dragHandle = document.createElement("span");
        dragHandle.textContent = "☰";
        dragHandle.classList.add("drag-handle");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = completed;
        checkbox.addEventListener("change", function () {
            li.classList.toggle("completed");
            saveTodos();
        });

        const span = document.createElement("span");
        span.textContent = text;
        span.classList.add("task-text");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "❌";
        deleteButton.addEventListener("click", function () {
            li.remove();
            saveTodos();
        });

        li.appendChild(dragHandle);
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        if (completed) {
            li.classList.add("completed");
        }

        todoList.appendChild(li);
        saveTodos();
    }

    // 监听添加任务
    addButton.addEventListener("click", function () {
        if (todoInput.value.trim() !== "") {
            addTodoElement(todoInput.value.trim());
            todoInput.value = "";
        }
    });

    // 允许拖动排序
    new Sortable(todoList, {
        animation: 150,
        handle: ".drag-handle",
        onEnd: function () {
            saveTodos();
        }
    });

    // 加载任务列表
    loadTodos();
});
