document.addEventListener("DOMContentLoaded", function () {
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    const addButton = document.querySelector(".todo-widget button");

    function addTodoElement(text) {
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
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "❌";
        deleteButton.addEventListener("click", function () {
            li.remove();
        });

        li.appendChild(dragHandle);
        li.appendChild(taskText);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    }

    addButton.addEventListener("click", function () {
        if (todoInput.value.trim() !== "") {
            addTodoElement(todoInput.value.trim());
            todoInput.value = "";
        }
    });

    // 🛠 彻底修复拖动功能
    new Sortable(todoList, {
        animation: 150,
        handle: ".drag-handle",
        onEnd: function () {
            console.log("任务已拖动");
        }
    });
});
