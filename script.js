document.addEventListener("DOMContentLoaded", function () {
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    const addButton = document.querySelector(".todo-widget button");

    function saveTodos() {
        const todos = [];
        document.querySelectorAll("#todo-list li").forEach(item => {
            todos.push({
                text: item.querySelector(".task-text").textContent,
                completed: item.classList.contains("completed")
            });
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.forEach(todo => addTodoElement(todo.text, todo.completed));
    }

    function addTodoElement(text, completed = false) {
        const li = document.createElement("li");
        li.classList.add("task-item");

        const dragHandle = document.createElement("span");
        dragHandle.textContent = "☰";
        dragHandle.classList.add("drag-handle");

        const taskText = document.createElement("span");
        taskText.textContent = text;
        taskText.classList.add("task-text");

        const completeButton = document.createElement("button");
        completeButton.textContent = "✅";
        completeButton.addEventListener("click", function () {
            li.classList.toggle("completed");
            saveTodos();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "❌";
        deleteButton.addEventListener("click", function () {
            li.remove();
            saveTodos();
        });

        li.appendChild(dragHandle);
        li.appendChild(taskText);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        todoList.appendChild(li);

        if (completed) {
            li.classList.add("completed");
        }
        saveTodos();
    }

    addButton.addEventListener("click", function () {
        if (todoInput.value.trim() !== "") {
            addTodoElement(todoInput.value.trim());
            todoInput.value = "";
        }
    });

    new Sortable(todoList, {
        animation: 150,
        handle: ".drag-handle",
        onEnd: function () {
            saveTodos();
        }
    });

    loadTodos();
});
